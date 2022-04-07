import React from 'react';
import { P5Instance, ReactP5Wrapper } from 'react-p5-wrapper';

function sketch(p5: P5Instance) {
  p5.setup = () => p5.createCanvas(710, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);

    p5.translate(-350, 0, 0);
    p5.normalMaterial();

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
    p5.torus(70, 20);
    p5.pop();
  };
}

export interface Example3DComponentProps {
  children: React.ReactNode;
}

const Example3DComponent: React.FC<Example3DComponentProps> = () => (
  <ReactP5Wrapper sketch={sketch} />
);

export default Example3DComponent;
