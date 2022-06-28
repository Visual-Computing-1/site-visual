import React from 'react';
import image from './bandera.jpg';
import image2 from './some.png';
// import { P5Instance } from 'react-p5-wrapper';

const ReactP5Wrapper = React.lazy(() =>
  import('react-p5-wrapper').then(module => ({
    default: module.ReactP5Wrapper,
  }))
);

/* eslint no-var: off */

function sketch(p5) {
  const CVDMatrix = {
    Normal: [
      1.0, 0.0, 0.0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      0, 1,
    ],
    Protanopia: [
      0.567, 0.433, 0.0, 0.0, 0.0, 0.558, 0.442, 0.0, 0.0, 0.0, 0.0, 0.242,
      0.758, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0,
    ],
    Protanomaly: [
      0.817, 0.183, 0, 0, 0, 0.333, 0.667, 0, 0, 0, 0, 0.125, 0.875, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 1,
    ],
    Deuteranopia: [
      0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 1,
    ],
    Deuteranomaly: [
      0.8, 0.2, 0, 0, 0, 0.258, 0.742, 0, 0, 0, 0, 0.142, 0.858, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 1,
    ],
    Tritanopia: [
      0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 1,
    ],
    Tritanomaly: [
      0.967, 0.033, 0, 0, 0, 0, 0.733, 0.267, 0, 0, 0, 0.183, 0.817, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 1,
    ],
    Achromatopsia: [
      0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    ],
    Achromatomaly: [
      0.618, 0.32, 0.062, 0, 0, 0.163, 0.775, 0.062, 0, 0, 0.163, 0.32, 0.516,
      0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
    ],

    // Color Vision Deficiency
    /*Protanope: [
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
    ],*/
  };
  const CVDMatrixCorrection = {
    // Color Vision Deficiency
    Protanopia: [
      // reds are greatly reduced (1% men)
      0.0, 0.0, 0.0, 0.7, 1.0, 0.0, 0.7, 0.0, 1.0,
    ],
    Deuteranopia: [
      // greens are greatly reduced (1% men)
      1.0, 0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 1.0,
    ],
    Tritanopia: [
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
      var L, M, S, l, m, s, R, G, B, A, RR, GG, BB;

      const r = img.pixels[id];
      const g = img.pixels[id + 1];
      const b = img.pixels[id + 2];
      const a = img.pixels[id + 3];
      R =
        CVDMatrix[typeblindness][0] * img.pixels[id] +
        CVDMatrix[typeblindness][1] * img.pixels[id + 1] +
        CVDMatrix[typeblindness][2] * img.pixels[id + 2] +
        CVDMatrix[typeblindness][3] * img.pixels[id + 3] +
        CVDMatrix[typeblindness][4];
      G =
        CVDMatrix[typeblindness][5] * img.pixels[id] +
        CVDMatrix[typeblindness][6] * img.pixels[id + 1] +
        CVDMatrix[typeblindness][7] * img.pixels[id + 2] +
        CVDMatrix[typeblindness][8] * img.pixels[id + 3] +
        CVDMatrix[typeblindness][9];
      B =
        CVDMatrix[typeblindness][10] * img.pixels[id] +
        CVDMatrix[typeblindness][11] * img.pixels[id + 1] +
        CVDMatrix[typeblindness][12] * img.pixels[id + 2] +
        CVDMatrix[typeblindness][13] * img.pixels[id + 3] +
        CVDMatrix[typeblindness][14];
      A =
        CVDMatrix[typeblindness][15] * img.pixels[id] +
        CVDMatrix[typeblindness][16] * img.pixels[id + 1] +
        CVDMatrix[typeblindness][17] * img.pixels[id + 2] +
        CVDMatrix[typeblindness][18] * img.pixels[id + 3] +
        CVDMatrix[typeblindness][19];

      /*      R = r - R;
      G = g - G;
      B = b - B;
      R = (CVDMatrixCorrection[correctionerror][0] * R) + (CVDMatrixCorrection[correctionerror][1] * G) + (CVDMatrixCorrection[correctionerror][2] * B);
      G = (CVDMatrixCorrection[correctionerror][3] * R) + (CVDMatrixCorrection[correctionerror][4] * G) + (CVDMatrixCorrection[correctionerror][5] * B);
        B = (CVDMatrixCorrection[correctionerror][6] * R) + (CVDMatrixCorrection[correctionerror][7] * G) + (CVDMatrixCorrection[correctionerror][8] * B);
      // Add compensation to original values
      R = RR + r;
      G = GG + g;
      B = BB + b;*/

      if (R < 0) R = 0;
      if (R > 255) R = 255;
      if (G < 0) G = 0;
      if (G > 255) G = 255;
      if (B < 0) B = 0;
      if (B > 255) B = 255;
      if (A < 0) B = 0;
      if (A > 255) B = 255;
      img.pixels[id] = R; // Red
      img.pixels[id + 1] = G; // Green
      img.pixels[id + 2] = B; // Blue
      img.pixels[id + 3] = A; // Alpha
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
      'Protanopia',
      'Protanopia',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.image(imgPro, x.width + 25, 0, imgPro.width, imgPro.height);
    imgDeu = blindnessfilter(
      x,
      'Deuteranopia',
      'Deuteranopia',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.image(imgDeu, x.width * 2 + 45, 0, imgDeu.width, imgDeu.height);
    imgTri = blindnessfilter(
      y,
      'Tritanopia',
      'Tritanopia',
      CVDMatrix,
      CVDMatrixCorrection
    );
    p5.image(imgTri, y.width * 3 + 55, 0, imgTri.width, imgTri.height);
    p5.textSize(30);
    p5.text('Cartas de Ishihara', 0, imgTri.height + 40);
    p5.image(cards, 0, imgTri.height + 50, cards.width, cards.height);
    imgCards = blindnessfilter(
      cards,
      'Tritanopia',
      'Tritanopia',
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

const Processing: React.FC<ProcessingProps> = ({ title }) => {
  const isSSR = typeof window === 'undefined';

  return (
    <>
      {!isSSR && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ReactP5Wrapper sketch={sketch} />
        </React.Suspense>
      )}
    </>
  );
};

export default Processing;
