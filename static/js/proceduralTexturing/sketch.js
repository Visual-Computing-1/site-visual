let sh, u_time;
let button;
let options;
let u_option;

const mapping = { "square": 0, "circle": 1, "triangle": 2 };

const SIDE = 430;
const PADDING = SIDE / 4;

let u_seed;

function preload() {
    sh = readShader("https://visual-computing-1.github.io/visual-site/js/proceduralTexturing/ProceduralTexturing.frag")
}

function setup() {
    createCanvas(SIDE, SIDE, WEBGL)
    u_time = createSlider(95, 100, 96, 1);
    u_time.position(10, 25);
    button = createButton("randomly generate");
    button.mousePressed(changeBG);
    u_seed = random(1, 30);

    options = createSelect();
    options.position(10, 10);
    options.option("square"); // square:   0
    options.option("circle"); // circle:   1
    options.option("triangle"); // triangle: 2
    options.selected("square");
    u_option = "square";

    options.changed(changeOptions);

    sh.setUniform("u_option", mapping[u_option]);
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
    sh.setUniform("u_seed", u_seed);
}

function changeOptions() {
    u_option = options.value();
    sh.setUniform("u_option", mapping[u_option]);
}