// Credit to andjosh - https://gist.github.com/andjosh/6764939
Math.easeInOutQuad = function(t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) -1) + b;
};

function scrollTo(element, to, duration) {
  let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

  let animateScroll = function() {
    let val = Math.easeInOutQuad(currentTime, start, change, duration);
    currentTime += increment;
    element.scrollTop = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };

  animateScroll();
}

export default scrollTo;
