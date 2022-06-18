let sh, u_time;
let button;

const SIDE = 430;
const PADDING = SIDE / 4;

let u_seed;

function preload(){
  sh = readShader("https://visual-computing-1.github.io/visual-site/js/proceduralTexturing/ProceduralTexturing.frag")
}

function setup() {
  createCanvas(SIDE, SIDE, WEBGL)
  u_time = createSlider(95, 100, 96, 1);
  u_time.position(10, 25);
  button = createButton("randomly generate");
  button.mousePressed(changeBG);
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

function changeBG() {
  u_seed = random(1, 30);
}