/* By Ellen Interiors — interactions */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Use the real logo PNG automatically once it exists ---------- */
  (function () {
    var test = new Image();
    test.onload = function () { document.body.classList.add("has-logo"); };
    test.src = "assets/logo-Ellen.png";
  })();

  /* ---------- Intro: logo fades in, then the olive screen splits open ---------- */
  var intro = document.querySelector(".intro");
  if (intro) {
    document.body.classList.add("no-scroll");

    function openIntro() {
      if (intro.classList.contains("open")) return;
      intro.classList.add("open");
      document.body.classList.remove("no-scroll");
      window.setTimeout(function () {
        if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
      }, 2100);
    }

    if (reduce) {
      openIntro();
    } else {
      // auto-open after the logo has faded in + a short hold
      window.setTimeout(openIntro, 2700);
      // let the visitor skip ahead
      intro.addEventListener("click", openIntro);
      window.addEventListener("wheel", openIntro, { passive: true, once: true });
      window.addEventListener("keydown", openIntro, { once: true });
      window.addEventListener("touchstart", openIntro, { passive: true, once: true });
    }
  }

  /* ---------- Header background on scroll ---------- */
  var head = document.querySelector(".site-head");
  if (head) {
    var onScroll = function () {
      if (window.scrollY > 40) head.classList.add("scrolled");
      else head.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var closeBtn = document.querySelector(".nav-close");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.add("open");
      document.body.classList.add("no-scroll");
    });
    var close = function () {
      nav.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };
    if (closeBtn) closeBtn.addEventListener("click", close);
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
})();
