/**
 * Grafana Faro Observability Client Integration
 * Handles initialization, custom event dispatching, simulated errors, and performance traces.
 */
class FaroObservability {
  constructor() {
    this.faroInstance = null;
    this.config = this.loadConfig();
    this.initIfConfigured();
  }

  loadConfig() {
    return {
      url: localStorage.getItem("faro_collector_url") || "",
      appName: localStorage.getItem("faro_app_name") || "fruits-emporium",
      appEnv: localStorage.getItem("faro_env") || "demo",
      appVersion: "1.0.4"
    };
  }

  saveConfig(url, appName, appEnv) {
    localStorage.setItem("faro_collector_url", url || "");
    localStorage.setItem("faro_app_name", appName || "fruits-emporium");
    localStorage.setItem("faro_env", appEnv || "demo");
    this.config = this.loadConfig();
    this.initIfConfigured();
  }

  isConfigured() {
    return !!(this.config.url && this.config.url.trim().length > 0);
  }

  initIfConfigured() {
    if (!this.isConfigured()) {
      if (window.TelemetryLogger) {
        window.TelemetryLogger.log("faro", "Grafana Faro running in Standby Mode (Mock). Enter collector URL in Settings to stream live.", {
          mode: "mock_simulation"
        });
      }
      return;
    }

    try {
      if (window.GrafanaFaroWebSdk) {
        this.faroInstance = window.GrafanaFaroWebSdk.initializeFaro({
          url: this.config.url,
          app: {
            name: this.config.appName,
            version: this.config.appVersion,
            environment: this.config.appEnv
          },
          instrumentations: [
            ...window.GrafanaFaroWebSdk.getWebInstrumentations({
              captureConsole: true,
              captureConsoleErrors: true
            })
          ]
        });

        if (window.TelemetryLogger) {
          window.TelemetryLogger.log("faro", `Connected to Grafana Faro: ${this.config.appName} [${this.config.appEnv}]`, {
            collectorUrl: this.config.url
          });
        }
      }
    } catch (err) {
      console.warn("Faro initialization error:", err);
      if (window.TelemetryLogger) {
        window.TelemetryLogger.log("error", `Faro Init Warning: ${err.message}`);
      }
    }
  }

  trackEvent(eventName, attributes = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      path: window.location.pathname,
      ...attributes
    };

    // Forward to Real Faro SDK if initialized
    if (this.faroInstance && this.faroInstance.api) {
      try {
        this.faroInstance.api.pushEvent(eventName, attributes);
      } catch (e) {
        console.error("Faro pushEvent error:", e);
      }
    }

    // Always log to the in-app telemetry monitor
    if (window.TelemetryLogger) {
      window.TelemetryLogger.log("faro", `Telemetry Event: [${eventName}]`, payload);
    }

    return payload;
  }

  trackError(errorOrMessage, context = {}) {
    let err = typeof errorOrMessage === "string" ? new Error(errorOrMessage) : errorOrMessage;

    if (this.faroInstance && this.faroInstance.api) {
      try {
        this.faroInstance.api.pushError(err, { context });
      } catch (e) {
        console.error("Faro pushError failed:", e);
      }
    }

    if (window.TelemetryLogger) {
      window.TelemetryLogger.log("error", `Captured Error: ${err.message}`, {
        stack: err.stack,
        context
      });
    }

    return err;
  }

  trackMeasurement(name, value, unit = "ms") {
    if (this.faroInstance && this.faroInstance.api) {
      try {
        this.faroInstance.api.pushMeasurement({
          type: name,
          values: { [name]: value }
        });
      } catch (e) {
        console.error("Faro measurement error:", e);
      }
    }

    if (window.TelemetryLogger) {
      window.TelemetryLogger.log("faro", `Measurement [${name}]: ${value}${unit}`);
    }
  }
}

// Global instance
window.FaroClient = new FaroObservability();

