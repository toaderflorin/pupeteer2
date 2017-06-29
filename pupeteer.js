var allElements = [];
var windowOffset = 0;
var scrollUp = false;

var update = function () {
  allElements.forEach(function (e) {
    var rect = e.getBoundingClientRect();
    var anim = e.getAttribute('p-animation');
    var delay = e.getAttribute('p-delay');

    if (rect.top < window.innerHeight && rect.top > 0 && !scrollUp) {
      if (delay) {
        window.setTimeout(function () {
          e.classList.add(anim);
        }, delay);
      } else {
         window.setTimeout(function () {
          e.classList.add(anim);
        }, 0);
      }
     
    } else if (rect.top > window.innerHeight) {
      e.classList.remove(anim);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  allElements = document.querySelectorAll('[p-animation]');
  update();
});

document.addEventListener('scroll', function (e) {
  if (window.pageYOffset < windowOffset) {
    scrollUp = true;
  } else {
    scrollUp = false;
  }

  windowOffset = window.pageYOffset;
  update();
});