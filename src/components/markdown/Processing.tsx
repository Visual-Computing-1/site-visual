import React from 'react';
import { P5Instance, ReactP5Wrapper } from 'react-p5-wrapper';
import image from './bandera.jpg';
import image2 from './some.png';
/* eslint no-var: off */

function sketch(p5: P5Instance) {
  const CVDMatrix = {
    // Color Vision Deficiency
    Protanope: [
      // reds are greatly reduced (1% men)
      0.0, 2.02344, -2.52581, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0,
    ],
    Deuteranope: [
      // greens are greatly reduced (1% men)
      1.0, 0.0, 0.0, 0.494207, 0.0, 1.24827, 0.0, 0.0, 1.0,
    ],
    Tritanope: [
      // blues are greatly reduced (0.003% population)
      1.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.395913, 0.801109, 0.0,
    ],
  };
  const CVDMatrixCorrection = {
    // Color Vision Deficiency
    Protanope: [
      // reds are greatly reduced (1% men)
      0.0, 0.0, 0.0, 0.7, 1.0, 0.0, 0.7, 0.0, 1.0,
    ],
    Deuteranope: [
      // greens are greatly reduced (1% men)
      1.0, 0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 1.0,
    ],
    Tritanope: [
      // blues are greatly reduced (0.003% population)
      1.0, 0.0, 0.7, 0.0, 1.0, 0.7, 0.0, 0.0, 0.0,
    ],
  };

  function blindnessfilter(
    img,
    typeblindness,
    correctionerror,
    CVDMatrix,
    CVDMatrixCorrection
  ) {
    img.loadPixels(); // loads image
    for (var id = 0; id < img.width * img.height * 4; id += 4) {
      var L, M, S, l, m, s, R, G, B;
      const r = img.pixels[id];
      const g = img.pixels[id + 1];
      const b = img.pixels[id + 2];
      L = 17.8824 * r + 43.5161 * g + 4.11935 * b;
      M = 3.45565 * r + 27.1551 * g + 3.86714 * b;
      S = 0.02999566 * r + 0.184309 * g + 1.46709 * b;
      // Simulate color blindness
      l =
        CVDMatrix[typeblindness][0] * L +
        CVDMatrix[typeblindness][1] * M +
        CVDMatrix[typeblindness][2] * S;
      m =
        CVDMatrix[typeblindness][3] * L +
        CVDMatrix[typeblindness][4] * M +
        CVDMatrix[typeblindness][5] * S;
      s =
        CVDMatrix[typeblindness][6] * L +
        CVDMatrix[typeblindness][7] * M +
        CVDMatrix[typeblindness][8] * S;
      R = 0.0809444479 * l + -0.130504409 * m + 0.116721066 * s;
      G = -0.0102485335 * l + 0.0540193266 * m + -0.113614708 * s;
      B = -0.000365296938 * l + -0.00412161469 * m + 0.693511405 * s;
      // Shift colors towards visible spectrum (apply error modification)
      /*if (typeblindness != "Deuteranope") {
      R = r - R;
      G = g - G;
      B = b - B;
      RR = (CVDMatrixCorrection[correctionerror][0] * R) + (CVDMatrixCorrection[correctionerror][1] * G) + (CVDMatrixCorrection[correctionerror][2] * B);
      GG = (CVDMatrixCorrection[correctionerror][3] * R) + (CVDMatrixCorrection[correctionerror][4] * G) + (CVDMatrixCorrection[correctionerror][5] * B);
      BB = (CVDMatrixCorrection[correctionerror][6] * R) + (CVDMatrixCorrection[correctionerror][7] * G) + (CVDMatrixCorrection[correctionerror][8] * B);
      // Add compensation to original values
      R = RR + r;
      G = GG + g;
      B = BB + b;
      }*/
      if (R < 0) R = 0;
      if (R > 255) R = 255;
      if (G < 0) G = 0;
      if (G > 255) G = 255;
      if (B < 0) B = 0;
      if (B > 255) B = 255;
      img.pixels[id] = R; // Red
      img.pixels[id + 1] = G; // Green
      img.pixels[id + 2] = B; // Blue
    }
    img.updatePixels();
    return img;
  }

  let z, x, y, cards, imgPro, imgDeu, imgTri, imgCards;
  p5.preload = () => {
    z = p5.loadImage(image);
    x = p5.loadImage(image);
    y = p5.loadImage(image);
    cards = p5.loadImage(image2);
  };

  p5.setup = () => {
    p5.createCanvas(z.width * 4 + 100, z.height * 8); // creates canvas
    p5.image(z, 15, 0, z.width, z.height);
    imgPro = blindnessfilter(
      z,
      'Protanope',
      'Protanope',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.image(imgPro, x.width + 25, 0, imgPro.width, imgPro.height);
    imgDeu = blindnessfilter(
      x,
      'Deuteranope',
      'Protanope',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.image(imgDeu, x.width * 2 + 45, 0, imgDeu.width, imgDeu.height);
    imgTri = blindnessfilter(
      y,
      'Tritanope',
      'Protanope',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.image(imgTri, y.width * 3 + 55, 0, imgTri.width, imgTri.height);
    p5.textSize(30);
    p5.text('Cartas de Ishihara', 0, imgTri.height + 40);
    p5.image(cards, 0, imgTri.height + 50, cards.width, cards.height);
    imgCards = blindnessfilter(
      cards,
      'Protanope',
      'Protanope',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.text(
      'Cartas de Ishihara vistas por una persona con protanopía',
      0,
      imgTri.height + cards.height + 40
    );
    p5.image(
      cards,
      0,
      cards.height + imgTri.height + 80,
      imgCards.width,
      imgCards.height
    );
  };
}

export interface ProcessingProps {
  title?: string;
  children: React.ReactNode;
}

const Processing: React.FC<ProcessingProps> = ({ title }) => (
  <ReactP5Wrapper sketch={sketch} />
);

export default Processing;
