function transitionColors (options) {
  var startColor = this.hexToRGB(options.gradientStart);
  var endColor = this.hexToRGB(options.gradientEnd);
  var currentStartColor = this.hexToRGB(options.currentStartColor) || [255, 255, 255];
  var currentEndColor = this.hexToRGB(options.currentEndColor) || [255, 255, 255];
  var transitionStart = this.hexToRGB(options.currentStartColor) || [255, 255, 255];
  var transitionEnd= this.hexToRGB(options.currentEndColor) || [255, 255, 255];
  var speed = options.speed || 20;
  var transition;
  transition = setInterval(function() {
    var startR = moveToColor(currentStartColor[0], transitionStart[0], startColor[0], speed),
        startG = moveToColor(currentStartColor[1], transitionStart[1], startColor[1], speed),
        startB = moveToColor(currentStartColor[2], transitionStart[2], startColor[2], speed),
        endR = moveToColor(currentEndColor[0], transitionEnd[0], endColor[0], speed),
        endG = moveToColor(currentEndColor[1], transitionEnd[1], endColor[1], speed),
        endB = moveToColor(currentEndColor[2], transitionEnd[2], endColor[2], speed),
        startRGB = [startR, startG, startB],
        endRGB = [endR, endG, endB];

    $(options.elem).style({
      "background": (options.type || "radial") + "-gradient(rgb(" + startRGB.join() + "), rgb(" + endRGB.join() + "))"
    });
    if (startRGB.join() === startColor.join() && endRGB.join() === endColor.join()) {
      clearInterval(transition);
    }
  }, 100);
}

function moveToNewColor (current, transition, end, speed) {
  var color;
  if (current >= transition) {
    if (transition > end) {
      color = transition - speed;
    } else {
      color = end;
    }
  } else {
    if (transition > end) {
      color = end;
    } else {
      color = transition + speed;
    }
  }
  return color;
}

function hexToRGB (hex) {
    var hexBase = hex.replace("#", "");
    return [parseInt(hexBase.substring(0, 2), 16), parseInt(hexBase.substring(2, 4), 16), parseInt(hexBase.substring(4, 6), 16)];
}


transitionColors({elem: ".some-div", gradientStart: "#0000FF", gradientEnd: "#00FF00", currentStartColor: "#FFFFFF", currentEndColor: "#FF0000", speed: 15, type: "radial"});
