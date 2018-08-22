onmessage = function worker(e) {
  // postMessage(JSON.stringify(e))

  const {
    width,
    clientHeight,
    clientWidth,
    appStyles,
    imageData,
    scaleFactor,
  } = e.data[0];

  const crop = function() {
    const data = imageData.data;

    const sizeWidth = width;

    // only loop through top height of picture
    for (var i = 0; i < data.length / 15; i += 4) {
      // convert i to (x, y)
      const p = {
        x: (i / 4) % sizeWidth,
        y: i / 4 / sizeWidth,
      };

      // for some p(x, y) and some f(x, y):
      //     set alpha to 0 for all (p.x, p.y) < f(x,y)

      const {pow, sqrt} = Math;
      const vh = clientHeight / 100;
      const vw = clientWidth / 100;
      const {unitWidthJs, unitHeightJs} = appStyles;
      const R = (appStyles.header.radius * vh) / scaleFactor;
      const Cy =
        (appStyles.header.centerY * vh - 2.2 * unitHeightJs) / scaleFactor;
      const Cx =
        (appStyles.header.centerX * vw - 5 * unitWidthJs) / scaleFactor;
      const f = (x, y) => sqrt(pow(x - Cx, 2) + pow(y - Cy, 2)) - R;
      if (f(p.x, p.y) < 0) {
        data[i + 3] = 0; // alpha
      }
    }

    return imageData;
  };

  postMessage({processedImg: crop()});
};
