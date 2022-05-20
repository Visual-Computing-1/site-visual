const Example3D = (sketch) => {
    sketch.setup = () => sketch.createCanvas(710, 400, sketch.WEBGL);
  
    sketch.draw = () => {
      sketch.background(250);
  
      sketch.translate(-350, 0, 0);
      sketch.normalMaterial();
  
      sketch.translate(240, 0, 0);
      sketch.push();
      sketch.rotateZ(sketch.frameCount * 0.01);
      sketch.rotateX(sketch.frameCount * 0.01);
      sketch.rotateY(sketch.frameCount * 0.01);
      sketch.box(70, 70, 70);
      sketch.pop();
  
      sketch.translate(240, 0, 0);
      sketch.push();
      sketch.rotateZ(sketch.frameCount * 0.01);
      sketch.rotateX(sketch.frameCount * 0.01);
      sketch.rotateY(sketch.frameCount * 0.01);
      sketch.torus(70, 20);
      sketch.pop();
    };
}


let p5Example3D = new p5(Example3D, document.getElementById('Example3D'));
