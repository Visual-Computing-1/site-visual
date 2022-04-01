import React from "react";
import { ReactP5Wrapper, P5Instance } from "react-p5-wrapper";


function sketch(p5: P5Instance) {
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

  p5.setup = () => p5.createCanvas(710, 400, p5.WEBGL);

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
  }
}


export interface ProcessingProps {
    title?: string;
    children: React.ReactNode;
}
  
const Processing: React.FC<ProcessingProps> = ({ children, title }) => (
    <ReactP5Wrapper sketch={sketch} />
);

export default Processing;