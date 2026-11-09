# 🍍 Fruits Emporium & Observability Testbed

A rich, responsive, multi-page web application featuring **10 interactive fruit categories**, artisanal **juice and salad workshops**, and native hooks for **Grafana Faro Real User Monitoring (RUM)** and **n8n workflow automation**.

---

## 🌟 Key Features

1. **10 Dedicated Fruit Categories:**
   - 🍎 **Crisp Apple** (Pome)
   - 🍌 **Golden Banana** (Tropical Berry)
   - 🍊 **Sunburst Orange** (Citrus)
   - 🥭 **Alphonso Mango** (Tropical Drupe)
   - 🍓 **Garden Strawberry** (Aggregate)
   - 🫐 **Wild Blueberry** (True Berry)
   - 🍍 **Tropical Pineapple** (Multiple Fruit)
   - 🍉 **Crimson Watermelon** (Pepo Berry)
   - 🍑 **Velvet Peach** (Stone Fruit)
   - 🍇 **Royal Grape** (True Berry)

2. **Dedicated Fruit Profile Pages (`fruit.html?id=<fruit>`):**
   - **Juice Workshop Tab:** Cold-press recipe, ingredients, dynamic sweetness slider, ice preference, and clickable "Blend & Serve" / "Order Juice" buttons.
   - **Salad Kitchen Tab:** Gourmet salad recipe, culinary plating guide, dressing intensity controls, and topping selectors.
   - **Nutrition Lab Tab:** Biochemical profile (carbs, sugars, fibers, electrolytes) with simulated spectrophotometer assay (measuring network/compute latency).
   - **Observability Tab:** Fruit-specific telemetry buttons to trigger errors, custom measurements, and n8n restock alerts.

3. **Built-in Grafana Faro Integration (`js/faro-integration.js`):**
   - Automatically tracks page views, route changes, and user clicks.
   - Captures unhandled JavaScript exceptions and unhandled Promise rejections.
   - Logs Core Web Vitals (TTFB, LCP, CLS) and custom measurements.
   - Enter your Grafana Faro collector URL in the **Settings** modal to stream live to your Grafana instance. If unconfigured, events run in simulated mode with live previews.

4. **Built-in n8n Workflow Automation Bridge (`js/n8n-integration.js`):**
   - Dispatches structured JSON webhooks directly to your n8n workflow triggers.
   - Covers events such as:
     - `juice_blend_action`
     - `order_fulfillment`
     - `salad_toss_action`
     - `inventory_restock_alert`
     - `recipe_export`
   - Includes custom JSON payload editor for arbitrary workflow experimentation.

5. **Live Telemetry & Webhook Console (Bottom Drawer):**
   - Docked at the bottom of every page.
   - Shows real-time stream of all user interactions, Faro payloads, and n8n responses with timestamps and status indicators.

---

## 📂 Project Directory Structure

```
fruits-site/
├── index.html               # Main dashboard with 10 fruit categories & status cards
├── fruit.html               # Dedicated fruit detail page with tabs, juice & salad labs
├── recipes.html             # Filterable Juice & Salad laboratory (20 total recipes)
├── analytics-tester.html    # Observability & n8n stress-testing matrix
├── css/
│   └── styles.css           # Modern glassmorphism theme, cards, tabs, and drawer
├── js/
│   ├── fruits-data.js       # Complete database of the 10 fruits, nutrition, recipes
│   ├── faro-integration.js  # Grafana Faro Web SDK wrapper & telemetry dispatcher
│   ├── n8n-integration.js   # n8n webhook HTTP client & payload enrichment
│   └── app.js               # Event bus, toasts, settings modal, and drawer logger
├── Dockerfile               # Production-ready Alpine Nginx container
├── nginx.conf               # Nginx server configuration with gzip & headers
├── docker-compose.yml       # Docker Compose setup for VPS deployment
├── package.json             # Node.js server dependencies
├── server.js                # Express static server & webhook relay
├── vercel.json              # 1-click Vercel configuration
├── netlify.toml             # 1-click Netlify configuration
└── README.md                # Documentation & hosting guide
```

---

## 🚀 How to Host This Website on a Server (Non-Local)

Because this is a clean, production-ready web application with zero mandatory build steps, you have several quick ways to host it online on a remote server:

### Option 1: Vercel (Fastest & Free)
1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect `vercel.json` and deploy it across their global edge network in ~30 seconds.
4. You will receive a live production URL like `https://fruits-emporium.vercel.app`.

### Option 2: Netlify (Fast & Free)
1. Log in to [netlify.com](https://netlify.com).
2. Either drag-and-drop the entire `fruits site` folder directly into the Netlify Sites dashboard, or link your Git repository.
3. It will deploy automatically using `netlify.toml`.

### Option 3: VPS / Dedicated Server via Docker (AWS, DigitalOcean, Hetzner, Linode)
If you have a Linux VPS:
1. Copy the files to your server:
   ```bash
   scp -r . user@your-server-ip:/var/www/fruits-site
   cd /var/www/fruits-site
   ```
2. Start the container in detached mode:
   ```bash
   docker compose up -d --build
   ```
3. Your website will be live on port `8080` (or configured port in `docker-compose.yml`). You can put Nginx Reverse Proxy or Caddy in front of it with an SSL certificate.

### Option 4: Render or Railway (PaaS)
1. Push to GitHub.
2. In [Render](https://render.com) or [Railway](https://railway.app), create a new **Web Service**.
3. It will detect `package.json` and run `npm start` (`node server.js`).
4. Set the environment variable `PORT` if needed (default is 3000).

---

## ⚙ Configuring Grafana Faro & n8n

Click the **⚙ Settings** button in the top navbar on any page:

1. **Grafana Faro Collector URL:**
   - Example: `https://faro-collector-prod-us-east-0.grafana.net/collect/your-app-key`
   - Paste the URL provided by Grafana Cloud or your self-hosted Faro receiver.
   - Set the Application Name (`fruits-emporium`) and Environment (`production` or `demo`).
   - Hit **Save Configurations**. Live telemetry and errors will now stream directly to your Grafana dashboard!

2. **n8n Webhook URL:**
   - In your n8n workflow, create a **Webhook** node.
   - Set HTTP Method to `POST`.
   - Copy the "Production URL" (or "Test URL") from n8n.
   - Paste it into the `n8n Webhook URL` field in the website's Settings.
   - Every time you click "Order Juice", "Toss Salad", or any automation button, a rich JSON payload is sent directly into your n8n workflow.

