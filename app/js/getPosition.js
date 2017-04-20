function getPosition(element) {
  let bcr = element.getBoundingClientRect(),
      top = Math.floor(bcr.top),
      left = Math.floor(bcr.left),
      w = window,
      e = document.documentElement,
      b = document.body,
      x = b.clientWidth,
      y = w.innerHeight || e.clientHeight || b.clientHeight,
      right = Math.floor(x - bcr.right),
      bottom = Math.floor(y - bcr.bottom);

  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
} // getPosition

export default getPosition;
