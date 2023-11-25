// Used in conjunction to stop the flash of unstyled content
(function initTheme() {
  var theme = localStorage.getItem("theme") || "light";
  if (theme === "dark") {
    document.querySelector("html").classList.add("dark");
  }
})();
