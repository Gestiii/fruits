/**
 * Fruits Emporium - Core Frontend Controller
 * Clean, standard website UI logic for interactive categories, tabs, and item ordering.
 */

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

// 3. Quick Item Order Handler
function orderFruitItem(fruitId, itemName, price) {
  const fruit = getFruitById(fruitId);
  const formattedPrice = typeof price === "number" ? `$${price.toFixed(2)}` : price;
  window.showToast(`Added ${itemName} (${formattedPrice}) to your selection!`, "success");
}

// 4. Utility Escape Function
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
