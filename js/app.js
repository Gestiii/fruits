// ==========================================
// FRUITS GESTI5: COMPLETE TRACKER & LEAD CAPTURE
// ==========================================
(function() {
  const WEBHOOK_URL = 'https://full-results-join.loca.lt/webhook/site-event';
  const pagePath = window.location.pathname;
  const fruitName = pagePath.split('/').pop().replace('.html', '') || 'home';
  const isFruit = !['index', '', 'recipes', 'analytics-tester'].includes(fruitName);

  // 1. Capture email from URL (?email=... or ?uid=...)
  const params = new URLSearchParams(window.location.search);
  const urlEmail = params.get('email') || params.get('uid');
  if (urlEmail && urlEmail.includes('@')) {
    localStorage.setItem('user_email', urlEmail);
    if (window.posthog && posthog.identify) {
      posthog.identify(urlEmail, { email: urlEmail, initial_fruit: fruitName });
    }
  }

  let timeSpent = 0;
  let maxScroll = 0;
  let intentSent = false;

  // Track time
  setInterval(() => {
    timeSpent += 1;
    checkTriggers();
  }, 1000);

  // Track scroll depth
  window.addEventListener('scroll', () => {
    const scroll = Math.round(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100);
    if (scroll > maxScroll) maxScroll = scroll;
    checkTriggers();
  });

  // Track button clicks & intercept order clicks if anonymous
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a');
    if (btn) {
      const btnText = (btn.innerText || 'button').trim().substring(0, 50);
      const email = localStorage.getItem('user_email');
      
      // If user clicks an order button without having an email, show lead modal
      if (!email && btnText.toLowerCase().includes('order')) {
        e.preventDefault();
        showLeadModal(true);
        return;
      }
      
      sendTrigger('clicked_button', btnText);
    }
  });

  function checkTriggers() {
    // Show capture modal after 15s or 50% scroll if user is anonymous
    if (!localStorage.getItem('user_email') && !sessionStorage.getItem('lead_modal_dismissed')) {
      if (timeSpent >= 15 || maxScroll >= 50) {
        showLeadModal(false);
      }
    }

    // High intent reading trigger (> 25s + > 60% scroll)
    if (isFruit && timeSpent >= 25 && maxScroll >= 60 && !intentSent) {
      intentSent = true;
      sendTrigger('high_intent_reading', 'Scrolled and read fruit page');
    }
  }

  // ------------------------------------------
  // IN-PAGE LEAD CAPTURE WIDGET (Pop-up Toast)
  // ------------------------------------------
  function showLeadModal(isUrgent) {
    if (document.getElementById('fruit-lead-card')) return;

    const fruitTitles = {
      orange: { title: '?? Craving Fresh Valencia Oranges?', sub: 'Unlock 15% off your first harvest box + our 7-Day Citrus Vitality Guide.' },
      apple: { title: '?? Love Crisp Orchard Apples?', sub: 'Unlock 15% off Honeycrisp apples + our Free Health & Fiber Guide.' },
      banana: { title: '?? Fresh Organic Bananas?', sub: 'Unlock 15% off your first organic fruit delivery.' }
    };

    const info = fruitTitles[fruitName] || { 
      title: '?? Welcome to Fresh Orchard!', 
      sub: 'Unlock 15% off your order + our free Whole Foods Nutrition Guide.' 
    };

    const card = document.createElement('div');
    card.id = 'fruit-lead-card';
    card.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; max-width: 360px; width: calc(100% - 40px);
      background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1);
      padding: 20px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      animation: slideUp 0.35s ease-out;
    `;

    card.innerHTML = `
      <style>
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      </style>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
        <h4 style="margin: 0; font-size: 16px; font-weight: 700; color: #1e293b;">${info.title}</h4>
        <button id="close-lead-card" style="background: none; border: none; font-size: 18px; color: #94a3b8; cursor: pointer; padding: 0 4px;">?</button>
      </div>
      <p style="margin: 0 0 14px 0; font-size: 13px; color: #64748b; line-height: 1.4;">${info.sub}</p>
      <form id="lead-form" style="display: flex; flex-direction: column; gap: 8px;">
        <input type="email" id="lead-email-input" placeholder="Enter your email address..." required style="
          padding: 10px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none;
        " />
        <button type="submit" style="
          background: #ff7a00; color: #ffffff; border: none; padding: 10px 14px; border-radius: 8px;
          font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s;
        ">Claim 15% Off Code</button>
      </form>
      <div id="lead-success" style="display: none; color: #166534; background: #f0fdf4; padding: 10px; border-radius: 8px; font-size: 13px; text-align: center; font-weight: 600;">
        ?? Code CITRUS15 unlocked! We just emailed your guide.
      </div>
    `;

    document.body.appendChild(card);

    document.getElementById('close-lead-card').onclick = () => {
      sessionStorage.setItem('lead_modal_dismissed', 'true');
      card.remove();
    };

    document.getElementById('lead-form').onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('lead-email-input').value.trim();
      if (!email || !email.includes('@')) return;

      localStorage.setItem('user_email', email);
      if (window.posthog && posthog.identify) {
        posthog.identify(email, { email: email, favorite_fruit: fruitName });
      }

      document.getElementById('lead-form').style.display = 'none';
      document.getElementById('lead-success').style.display = 'block';

      sendTrigger('lead_captured_popup', 'Claimed 15% discount for ' + fruitName);

      setTimeout(() => { card.remove(); }, 3500);
    };
  }

  // ------------------------------------------
  // DISPATCH EVENT TO n8n & SQL
  // ------------------------------------------
  function sendTrigger(eventType, details) {
    const email = localStorage.getItem('user_email') || '';
    const anonId = (window.posthog && posthog.get_distinct_id) ? posthog.get_distinct_id() : 'anon_' + Math.random().toString(36).substring(2, 9);
    const replayUrl = (window.posthog && posthog.get_session_replay_url) ? posthog.get_session_replay_url() : '';

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'true'
      },
      body: JSON.stringify({
        user_email: email,
        distinct_id: anonId,
        fruit: fruitName,
        event: eventType,
        details: details,
        time_spent: timeSpent,
        scroll_percent: maxScroll,
        page: pagePath,
        session_replay_url: replayUrl,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  }
})();
