var allGroups = [];
var allElements = [];
var allGroupElements = [];
var allElementsSet = new Set();
var windowOffset = 0;
var scrollUp = false;

var update = function () {
  allElementsSet.forEach(function (e) {
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

  allGroups.forEach(function (g) {
    var rect = g.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.top > 0 && !scrollUp) {
      allElements.forEach(function (e) {
        var anim = e.getAttribute('p-animation');
        var delay = e.getAttribute('p-delay');
        if (delay) {
          window.setTimeout(function () {
            e.classList.add(anim);
          }, delay);
        } else {
          window.setTimeout(function () {
            e.classList.add(anim);
          }, 0);
        }
      });
    } else if (rect.top > window.innerHeight) {
      allElements.forEach(function (e) {
        var anim = e.getAttribute('p-animation');
        e.classList.remove(anim);
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  allElements = document.querySelectorAll('[p-animation]');
  allElements.forEach(function (e) {
    allElementsSet.add(e);
  });

  allGroups = document.querySelectorAll('[p-group]');

  allGroups.forEach(function (grp) {
    var groupName = grp.getAttribute('p-group');
    console.log('GROUP=', groupName);
    var elements = document.querySelectorAll(`[p-group="${groupName}"] [p-animation]`);
    console.log('ELS:', elements);

    allGroupElements.push(elements);
    elements.forEach(function (e) {

      allElementsSet.delete(e);
    });
  });

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