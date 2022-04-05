import React from 'react';
import { P5Instance, ReactP5Wrapper } from 'react-p5-wrapper';
import image from './manzana.jpg';

function sketch(p5: P5Instance) {
  p5.setup = () => {
    // Here, we use a callback to display the image after loading
    p5.loadImage(image, img => {
      p5.createCanvas(600, 550, p5.WEBGL);
      p5.image(img, -300, -300);
    });
  };

  /*p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };*/

  /*p5.setup = () => p5.createCanvas(710, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);

    p5.translate(-240, -100, 0);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(70);
    p5.pop();

    p5.translate(240, 0, 0);
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.box(70, 70, 70);
    p5.pop();

    p5.translate(240, 0, 0);
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.cylinder(70, 70);
    p5.pop();

    p5.translate(-240 * 2, 200, 0);
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.cone(70, 70);
    p5.pop();

    p5.translate(240, 0, 0);
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.torus(70, 20);
    p5.pop();

    p5.translate(240, 0, 0);
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.sphere(70);
    p5.pop();
  }*/
}

export interface ProcessingProps {
  title?: string;
  children: React.ReactNode;
}

const Processing: React.FC<ProcessingProps> = ({ children, title }) => (
  <ReactP5Wrapper sketch={sketch} />
);

export default Processing;
