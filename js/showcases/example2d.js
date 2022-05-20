
const Example2D = (sketch) => {
    let bx;
    let by;
    const boxSize = 75;
    let overBox = false;
    let locked = false;
    let xOffset = 0.0;
    let yOffset = 0.0;
  
    sketch.setup = () => {
      sketch.createCanvas(720, 400);
      bx = sketch.width / 2.0;
      by = sketch.height / 2.0;
      sketch.rectMode(sketch.RADIUS);
      sketch.strokeWeight(2);
    };
  
    sketch.draw = () => {
      sketch.background(237, 34, 93);
  
      // Test if the cursor is over the box
      if (
        sketch.mouseX > bx - boxSize &&
        sketch.mouseX < bx + boxSize &&
        sketch.mouseY > by - boxSize &&
        sketch.mouseY < by + boxSize
      ) {
        overBox = true;
        if (!locked) {
          sketch.stroke(255);
          sketch.fill(244, 122, 158);
        }
      } else {
        sketch.stroke(156, 39, 176);
        sketch.fill(244, 122, 158);
        overBox = false;
      }
  
      // Draw the box
      sketch.rect(bx, by, boxSize, boxSize);
    };
  
    sketch.mousePressed = () => {
      if (overBox) {
        locked = true;
        sketch.fill(255, 255, 255);
      } else {
        locked = false;
      }
      xOffset = sketch.mouseX - bx;
      yOffset = sketch.mouseY - by;
    };
  
    sketch.mouseDragged = () => {
      if (locked) {
        bx = sketch.mouseX - xOffset;
        by = sketch.mouseY - yOffset;
      }
    };
  
    sketch.mouseReleased = () => {
      locked = false;
    };
}

let p5Example2D = new p5(Example2D, document.getElementById('Example2D'));
