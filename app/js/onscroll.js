window.appHeader = function() {
  let distance = 117, className = "minimise", app = document.querySelector("#app"), header = document.querySelector(".page-header");
  if (app.scrollTop > distance) {
    header.classList.add(className);
  } else {
    header.classList.remove(className);
  }
};

window.scrollListener = function() {
  app.onscroll = function() {
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(function() {window.appHeader();}, 100);
  }; // window.onscroll
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  window.scrollListener();
} else {
  document.addEventListener("DOMContentLoaded", window.scrollListener);
}
