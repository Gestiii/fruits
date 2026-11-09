/**
 * Fruits Emporium - Core Frontend Controller
 * Clean, standard website UI logic for interactive categories, tabs, and item ordering.
 */

const pendingPostHogEvents = [];
const pendingPostHogLogs = [];

(function initializePostHog() {
  const isDevelopment = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const reportMissingConfig = (variableName) => {
    if (isDevelopment) {
      console.error(new Error(`${variableName} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variableName} is configured`));
    }
  };

  const initializeClient = () => {
    const config = window.POSTHOG_CONFIG || {};
    if (!config.apiKey) {
      reportMissingConfig("POSTHOG_PROJECT_TOKEN");
      return;
    }
    if (!config.apiHost) {
      reportMissingConfig("POSTHOG_HOST");
      return;
    }

    const sdkScript = document.createElement("script");
    sdkScript.async = true;
    sdkScript.src = `${config.apiHost.replace(/\/$/, "")}/static/array.js`;
    sdkScript.onload = () => {
      window.posthog.init(config.apiKey, {
        api_host: config.apiHost,
        capture_exceptions: {
          capture_unhandled_errors: true,
          capture_unhandled_rejections: true,
          capture_console_errors: false,
        },
        logs: {
          serviceName: "fruits-emporium-web",
          environment: isDevelopment ? "development" : "production",
        },
      });
      pendingPostHogEvents.splice(0).forEach(([eventName, properties]) => {
        window.posthog.capture(eventName, properties);
      });
      pendingPostHogLogs.splice(0).forEach(([level, message, attributes]) => {
        window.logPostHog(level, message, attributes);
      });
      window.logPostHog("info", "PostHog browser logging initialized", {
        runtime: "browser",
      });
    };
    document.head.appendChild(sdkScript);
  };

  const configScript = document.createElement("script");
  configScript.src = "/posthog-config.js";
  configScript.onload = initializeClient;
  configScript.onerror = () => reportMissingConfig("POSTHOG_PROJECT_TOKEN");
  document.head.appendChild(configScript);
})();

// 1. Toast Notification System
window.showToast = function (message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "✓" : type === "warning" ? "⚠" : "ℹ";
  toast.innerHTML = `
    <span style="font-weight: bold; font-size: 1.1rem;">${icon}</span>
    <span style="flex-grow: 1;">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// 2. Render Top 10 Fruit Categories Pill Strip
function renderCategoryPillStrip(targetContainerId, activeFruitId = null) {
  const container = document.getElementById(targetContainerId);
  if (!container || !window.FRUITS_DATABASE) return;

  const html = window.FRUITS_DATABASE.map(fruit => {
    const isActive = activeFruitId && activeFruitId.toLowerCase() === fruit.id.toLowerCase();
    return `
      <a href="fruit.html?id=${fruit.id}" class="category-pill ${isActive ? 'active' : ''}">
        <span>${fruit.emoji}</span>
        <span>${fruit.name}</span>
      </a>
    `;
  }).join("");

  container.innerHTML = html;
}

// 3. Product analytics helper
window.capturePostHogEvent = function (eventName, properties) {
  if (window.posthog && typeof window.posthog.capture === "function") {
    window.posthog.capture(eventName, properties);
    return;
  }
  pendingPostHogEvents.push([eventName, properties]);
};

window.logPostHog = function (level, message, attributes) {
  const logger = window.posthog && window.posthog.logger;
  if (logger && typeof logger[level] === "function") {
    logger[level](message, attributes);
    return;
  }
  pendingPostHogLogs.push([level, message, attributes]);
};

// 4. Quick Item Order Handler
function orderFruitItem(fruitId, itemName, price) {
  const fruit = getFruitById(fruitId);
  const formattedPrice = typeof price === "number" ? `$${price.toFixed(2)}` : price;
  window.capturePostHogEvent("fruit_ordered", {
    fruit_id: fruit.id,
    item_name: itemName,
    price,
    order_source: "fruit_detail",
  });
  window.logPostHog?.("info", "Fruit detail order selected", {
    fruit_id: fruit.id,
    item_name: itemName,
    price,
    order_source: "fruit_detail",
  });
  window.showToast(`Added ${itemName} (${formattedPrice}) to your selection!`, "success");
}

document.addEventListener("click", (event) => {
  const orderButton = event.target.closest(".recipe-item .fruit-card-actions button");
  if (!orderButton) return;

  const recipeCard = orderButton.closest(".recipe-item");
  const itemName = recipeCard.querySelector(".fruit-card-title span")?.textContent?.trim();
  const itemType = recipeCard.classList.contains("juice-item") ? "juice" : "salad";
  window.capturePostHogEvent("fruit_ordered", {
    item_name: itemName,
    item_type: itemType,
    order_source: "recipes_catalog",
  });
  window.logPostHog?.("info", "Recipe catalogue order selected", {
    item_name: itemName,
    item_type: itemType,
    order_source: "recipes_catalog",
  });
});

// 5. Utility Escape Function
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
