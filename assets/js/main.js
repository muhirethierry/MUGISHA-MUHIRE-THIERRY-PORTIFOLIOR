(function () {
  var root = document.documentElement;
  var year = document.getElementById('yr');
  var themeButton = document.getElementById('theme');

  if (year) year.textContent = new Date().getFullYear();

  function readTheme() {
    try { return localStorage.getItem('theme'); } catch (error) { return null; }
  }
  function saveTheme(theme) {
    try { localStorage.setItem('theme', theme); } catch (error) {}
  }
  function updateThemeButton() {
    if (!themeButton) return;
    var isLight = root.getAttribute('data-theme') === 'light';
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeButton.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    var icon = themeButton.querySelector('span');
    if (icon) icon.textContent = isLight ? '☼' : '◐';
  }

  var savedTheme = readTheme();
  if (savedTheme === 'dark' || savedTheme === 'light') root.setAttribute('data-theme', savedTheme);
  updateThemeButton();

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var next = current === 'light' || (!current && !prefersDark) ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      saveTheme(next);
      updateThemeButton();
    });
  }
})();
