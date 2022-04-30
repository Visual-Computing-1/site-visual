import React from 'react';
// import { P5Instance } from 'react-p5-wrapper';

const ReactP5Wrapper = React.lazy(() =>
  import('react-p5-wrapper').then(module => ({
    default: module.ReactP5Wrapper,
  }))
);

function sketch(p5) {
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

const Example3DComponent: React.FC<Example3DComponentProps> = () => {
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

export default Example3DComponent;
