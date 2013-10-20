// get proper vendor prefix
var transform = (function() {
  var div = document.createElement('div');
  var transform;

  each(['t', 'webkitT', 'mozT', 'msT'], function(prefix) {
    if (prefix + 'ransform' in div.style) {
      transform = prefix + 'ransform';
      return false;
    }
  });

  return transform;
}());


// asdl;fkjasdfsfdsd
var requestAFrame = (function() {
  return requestAnimationFrame ||
    webkitRequestAnimationFrame ||
    mozRequestAnimationFrame ||
    function(callback) {
      setTimeout(callback, 1);
    }
}());


// Linear interpolation
// http://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support
function lerp(v0, v1, t) {
  return v0 + (v1 - v0) * t;
}


// Uniform random numbers
function random(average, variation) {
  return average + 2 * (Math.random() - 0.5) * variation;
}


// for picking out arguments
var slice = Array.prototype.slice;


// not using native for the break ability
function each(things, callback, context) {
  if (things.length) { // gogo duck typing
    for (var i = 0; i < things.length; i++) {
      if (callback.call(context || this, things[i], i, things) === false) {
        return;
      }
    }
  } else {
    for (var i in things) {
      if (callback.call(context || this, things[i], i, things) === false) {
        return;
      }
    }
  }
}


function extend(target) {
  each(slice.call(arguments, 1), function(obj) {
    each(obj, function(val, key) {
      target[key] = val;
    });
  });

  return target;
}
