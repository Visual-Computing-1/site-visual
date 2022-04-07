import React from 'react';
import { P5Instance, ReactP5Wrapper } from 'react-p5-wrapper';

function sketch(p5: P5Instance) {
  let bx;
  let by;
  const boxSize = 75;
  let overBox = false;
  let locked = false;
  let xOffset = 0.0;
  let yOffset = 0.0;

  p5.setup = () => {
    p5.createCanvas(720, 400);
    bx = p5.width / 2.0;
    by = p5.height / 2.0;
    p5.rectMode(p5.RADIUS);
    p5.strokeWeight(2);
  };

  p5.draw = () => {
    p5.background(237, 34, 93);

    // Test if the cursor is over the box
    if (
      p5.mouseX > bx - boxSize &&
      p5.mouseX < bx + boxSize &&
      p5.mouseY > by - boxSize &&
      p5.mouseY < by + boxSize
    ) {
      overBox = true;
      if (!locked) {
        p5.stroke(255);
        p5.fill(244, 122, 158);
      }
    } else {
      p5.stroke(156, 39, 176);
      p5.fill(244, 122, 158);
      overBox = false;
    }

    // Draw the box
    p5.rect(bx, by, boxSize, boxSize);
  };

  p5.mousePressed = () => {
    if (overBox) {
      locked = true;
      p5.fill(255, 255, 255);
    } else {
      locked = false;
    }
    xOffset = p5.mouseX - bx;
    yOffset = p5.mouseY - by;
  };

  p5.mouseDragged = () => {
    if (locked) {
      bx = p5.mouseX - xOffset;
      by = p5.mouseY - yOffset;
    }
  };

  p5.mouseReleased = () => {
    locked = false;
  };
}

export interface Example2DComponentProps {
  children: React.ReactNode;
}

const Example2DComponent: React.FC<Example2DComponentProps> = () => (
  <ReactP5Wrapper sketch={sketch} />
);

export default Example2DComponent;
