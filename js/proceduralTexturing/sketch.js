/*const ProceduralTexturing = (sketch) => {
    let sh, u_time;
    const SIDE = 700;
    const PADDING = SIDE / 4;

    let u_seed;

    sketch.preload = () => {
        sh = sketch.readShader("ProceduralTexturing.frag")
    }

    sketch.setup = () => {
        sketch.createCanvas(SIDE, SIDE, sketch.WEBGL)
        u_time = 100;
        u_seed = sketch.random(1, 30);
    }

    sketch.draw = () => {
        sketch.background(0);
        sketch.shader(sh);
        
        sh.setUniform("u_time", u_time);
        sh.setUniform("u_resolution", [sketch.width, sketch.height]);
        sh.setUniform("u_seed", u_seed);
        
        sketch.rect(
            -sketch.width + PADDING,
            -sketch.height + PADDING,
            sketch.width + PADDING,
            sketch.height + PADDING
        );
    }
}

let p5ProceduralTexturing = new p5(ProceduralTexturing, document.getElementById('ProceduralTexturing'));
*/

let sh, u_time;

const SIDE = 450;
const PADDING = SIDE / 4;

let u_seed;

function preload(){
  sh = readShader("http://localhost:8000/js/proceduralTexturing/ProceduralTexturing.frag")
}

function setup() {
  createCanvas(SIDE, SIDE, WEBGL)
  u_time = createSlider(95, 100, 96, 1);
  u_time.position(10, 25);
  // u_time.style('width', '280px');

  u_seed = random(1, 30);
}

function draw() {
  background(0);
  shader(sh);
  
  sh.setUniform("u_time", u_time.value());
  sh.setUniform("u_resolution", [width, height]);
  sh.setUniform("u_seed", u_seed);
  
  rect(-width + PADDING, -height + PADDING, width + PADDING, height + PADDING);
}