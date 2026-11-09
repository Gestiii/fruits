/**
 * n8n Workflow Automation Bridge
 * Dispatches real-time webhooks, triggers automated flows, and logs results for observability.
 */
class N8nAutomationBridge {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    return {
      webhookUrl: localStorage.getItem("n8n_webhook_url") || "",
      authHeader: localStorage.getItem("n8n_auth_token") || "",
      simulateMode: !localStorage.getItem("n8n_webhook_url")
    };
  }

  saveConfig(url, token) {
    localStorage.setItem("n8n_webhook_url", url ? url.trim() : "");
    localStorage.setItem("n8n_auth_token", token ? token.trim() : "");
    this.config = this.loadConfig();
  }

  isConfigured() {
    return !!(this.config.webhookUrl && this.config.webhookUrl.startsWith("http"));
  }

  async dispatch(actionType, payload = {}) {
    const enrichedPayload = {
      source: "fruits-emporium-web",
      event: actionType,
      timestamp: new Date().toISOString(),
      sessionId: window.SessionId || (window.SessionId = "sess_" + Math.random().toString(36).substring(2, 10)),
      pageUrl: window.location.href,
      data: payload
    };

    if (window.TelemetryLogger) {
      window.TelemetryLogger.log("n8n", `Dispatching event: [${actionType}]`, enrichedPayload);
    }

    // If user has not set an n8n webhook, simulate successful workflow response
    if (!this.isConfigured()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (window.TelemetryLogger) {
            window.TelemetryLogger.log("n8n", `[MOCK SUCCESS] n8n received: ${actionType}. (Add Webhook URL in Settings for real workflow triggers).`, {
              status: "simulated_200",
              payload: enrichedPayload
            });
          }
          if (window.showToast) {
            window.showToast(`n8n Triggered (Simulated): ${actionType}`, "info");
          }
          resolve({ ok: true, simulated: true, data: enrichedPayload });
        }, 400);
      });
    }

    // Real HTTP POST to n8n Webhook
    try {
      const headers = { "Content-Type": "application/json" };
      if (this.config.authHeader) {
        headers["Authorization"] = this.config.authHeader;
      }

      const response = await fetch(this.config.webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(enrichedPayload)
      });

      let responseBody = null;
      try {
        responseBody = await response.json();
      } catch (e) {
        responseBody = await response.text();
      }

      if (response.ok) {
        if (window.TelemetryLogger) {
          window.TelemetryLogger.log("n8n", `[LIVE HTTP 200] Workflow triggered: ${actionType}`, responseBody);
        }
        if (window.showToast) {
          window.showToast(`n8n Workflow Dispatched: ${actionType}`, "success");
        }
      } else {
        if (window.TelemetryLogger) {
          window.TelemetryLogger.log("error", `n8n Webhook HTTP ${response.status}`, responseBody);
        }
        if (window.showToast) {
          window.showToast(`n8n Returned HTTP ${response.status}`, "warning");
        }
      }

      // Track network event in Faro
      if (window.FaroClient) {
        window.FaroClient.trackEvent("n8n_webhook_dispatched", {
          action: actionType,
          status: response.status,
          success: response.ok
        });
      }

      return { ok: response.ok, status: response.status, data: responseBody };
    } catch (error) {
      if (window.TelemetryLogger) {
        window.TelemetryLogger.log("error", `n8n Webhook Network Error: ${error.message}`);
      }
      if (window.showToast) {
        window.showToast(`n8n Network Error: ${error.message}`, "error");
      }
      if (window.FaroClient) {
        window.FaroClient.trackError(error, { actionType, destination: "n8n" });
      }
      return { ok: false, error: error.message };
    }
  }
}

// Global instance
window.N8nClient = new N8nAutomationBridge();

