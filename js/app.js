
// ==========================================
// FRUIT INTENT + POSTHOG SESSION REPLAY URL
// ==========================================
(function() {
  const pagePath = window.location.pathname;
  const fruitName = pagePath.split('/').pop().replace('.html', '') || 'home';
  const isFruit = !['index', '', 'recipes', 'analytics-tester'].includes(fruitName);

  let timeSpent = 0;
  let maxScroll = 0;
  let alreadySent = false;

  setInterval(() => {
    timeSpent += 1;
    checkIntent();
  }, 1000);

  window.addEventListener('scroll', () => {
    const scroll = Math.round(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100);
    if (scroll > maxScroll) maxScroll = scroll;
    checkIntent();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a');
    if (btn) {
      const btnText = (btn.innerText || 'button').trim().substring(0, 50);
      sendTrigger('clicked_button', btnText);
    }
  });

  function checkIntent() {
    if (isFruit && timeSpent >= 25 && maxScroll >= 60) {
      sendTrigger('high_intent_reading', 'scrolled_and_read');
    }
  }

  function sendTrigger(eventType, details) {
    if (alreadySent && eventType === 'high_intent_reading') return;
    alreadySent = true;

    const email = localStorage.getItem('user_email') || '';
    const anonId = (window.posthog && posthog.get_distinct_id) ? posthog.get_distinct_id() : 'anon_' + Math.random().toString(36).substring(2, 9);
    
    // Grab PostHog session ID and direct video replay URL
    const sessionId = (window.posthog && posthog.get_session_id) ? posthog.get_session_id() : '';
    const replayUrl = (window.posthog && posthog.get_session_replay_url) 
      ? posthog.get_session_replay_url() 
      : (sessionId ? 'https://eu.posthog.com/project/341556/replay/' + sessionId : '');

    fetch('https://eleven-adults-drive.loca.lt/webhook/site-event', {
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
        session_id: sessionId,
        session_replay_url: replayUrl,
        time_spent: timeSpent,
        scroll_percent: maxScroll,
        page: pagePath,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  }
})();
