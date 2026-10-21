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
    var isDark = root.getAttribute('data-theme') === 'dark';
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeButton.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    var icon = themeButton.querySelector('span');
    if (icon) icon.textContent = isDark ? '☼' : '◐';
  }

  var savedTheme = readTheme();
  if (savedTheme === 'dark' || savedTheme === 'light') root.setAttribute('data-theme', savedTheme);
  updateThemeButton();

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      saveTheme(next);
      updateThemeButton();
    });
  }

  var ideaToggle = document.getElementById('idea-toggle');
  var ideaDemo = document.getElementById('idea-demo');
  var ideaState = document.getElementById('idea-state');
  if (ideaToggle && ideaDemo) {
    ideaToggle.addEventListener('click', function () {
      var isBuilt = ideaToggle.getAttribute('aria-pressed') !== 'true';
      ideaToggle.setAttribute('aria-pressed', String(isBuilt));
      ideaDemo.classList.toggle('is-built', isBuilt);
      ideaDemo.setAttribute('data-state', isBuilt ? 'built' : 'idea');
      var label = ideaToggle.querySelector('.idea-button-label');
      if (label) label.textContent = isBuilt ? 'Back to the sketch' : 'Turn idea into interface';
      if (ideaState) ideaState.textContent = isBuilt ? '02 - The thought, shaped into a tool' : '01 - A thought looking for its shape';
    });
  }
})();
