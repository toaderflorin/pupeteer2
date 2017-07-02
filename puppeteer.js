puppeteer = {};
puppeteer.animations = {};

puppeteer.allGroups = [];
puppeteer.allElements = [];
puppeteer.allGroupElements = [];
puppeteer.allElementsSet = new Set();
puppeteer.windowOffset = 0;
puppeteer.scrollUp = false;

puppeteer.update = function () {
  puppeteer.allElementsSet.forEach(function (elem) {
    var rect = elem.getBoundingClientRect();
    var anim = elem.getAttribute('p-animation');
    var animMethod = puppeteer.snakeToCamel(anim);

    if (rect.top < window.innerHeight && rect.top > 0 && !puppeteer.scrollUp) {
      if (!elem.visible) {
        eval(`puppeteer.animations.${animMethod}(elem)`);
        elem.visible = true;
      }
    } else if (rect.top > window.innerHeight) {
      elem.visible = false;
    }
  });

  puppeteer.allGroups.forEach(function (grp) {
    var rect = grp.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.top > 0 && !puppeteer.scrollUp) {
      if (!grp.visible) {
        puppeteer.allElements.forEach(function (e) {
          var anim = e.getAttribute('p-animation');
          var animMethod = puppeteer.snakeToCamel(anim);
          var delay = e.getAttribute('p-delay');

          eval(`puppeteer.animations.${animMethod}(e)`);
        });
      }

      grp.visible = true;
    } else if (rect.top > window.innerHeight) {
      grp.visible = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  puppeteer.allElements = document.querySelectorAll('[p-animation]');
  puppeteer.allElements.forEach(function (e) {
    puppeteer.allElementsSet.add(e);
  });

  puppeteer.allGroups = document.querySelectorAll('[p-group]');

  puppeteer.allGroups.forEach(function (grp) {
    var groupName = grp.getAttribute('p-group');
    var elements = document.querySelectorAll(`[p-group="${groupName}"] [p-animation]`);

    puppeteer.allGroupElements.push(elements);
    elements.forEach(function (e) {
      puppeteer.allElementsSet.delete(e);
    });
  });

  puppeteer.update();
});

document.addEventListener('scroll', function (e) {
  if (window.pageYOffset < puppeteer.windowOffset) {
    puppeteer.scrollUp = true;
  } else {
    puppeteer.scrollUp = false;
  }

  puppeteer.windowOffset = window.pageYOffset;
  puppeteer.update();
});

puppeteer.snakeToCamel = function(s) {
  return s.replace(/(\-\w)/g, function (m) { return m[1].toUpperCase(); });
}

puppeteer.animations.vertical = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));
  var param = parseInt(elem.getAttribute('p-param'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  if (isNaN(param)) {
    param = 20;
  } 

  elem.animate([{
    transform: `translateY(${param}px)`
  },
  {
    transform: 'translateY(0px)'
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.blur = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  elem.animate([{
    filter: 'blur(5px)',
  }, {
    filter: 'blur(0px)',
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.fade = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 1500;
  } 

  elem.animate([{
    opacity: 0,
  }, {
    opacity: 1,
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.colorize = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  elem.animate([{
    filter: 'grayscale(1)'
  }, {
    filter: 'grayscale(0)'
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.horizontal = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));
  var param = parseInt(elem.getAttribute('p-param'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  if (isNaN(param)) {
    param = -40;
  } 

  elem.animate([{
    transform: `translateX(${param}px)`
  },
  {
    transform: 'translateX(0px)'
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.rotate = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));
  var param = parseInt(elem.getAttribute('p-param'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  if (isNaN(param)) {
    param = 30;
  } 

  elem.animate([{
    transform: `rotate(${param}deg)`
  },
  {
    transform: 'rotate(0deg)'
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.scale = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));
  var param = parseInt(elem.getAttribute('p-param'));

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  if (isNaN(param)) {
    param = 0.7;
  }

  elem.animate([{
    transform: `scale(${param})`
  },
  {
    transform: 'scale(1)'
  }], {
      delay: delay,
      duration: duration
    }
  );
}

puppeteer.animations.tv = function(elem) {
  var delay = parseInt(elem.getAttribute('p-delay'));
  var duration = parseInt(elem.getAttribute('p-duration'));  

  if (isNaN(delay)) {
    delay = 0;
  }

  if (isNaN(duration)) {
    duration = 500;
  } 

  elem.animate([{
    transform: 'rotateX(90deg)'
  },
  {
    transform: 'rotateX(0deg)'
  }], {
      delay: delay,
      duration: duration
    }
  );
}