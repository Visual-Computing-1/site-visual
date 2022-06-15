let lumaShader;
let img;
let grey_scale;

function preload() {
    lumaShader = readShader('http://localhost:8000/js/processingImage/luma.frag', { varyings: Tree.texcoords2 });
    img = loadImage('http://localhost:8000/js/processingImage/img/bandera2.jpg');
    maskShader = readShader('http://localhost:8000/js/processingImage/mask.frag', { varyings: Tree.texcoords2 });

}

function setup() {
    createCanvas(650, 500, WEBGL);
    noStroke();
    textureMode(NORMAL);
    video_on = createCheckbox('video', false);
    video_on.style('color', 'white');
    video_on.changed(() => {
        if (video_on.checked()) {
            maskShader.setUniform('texture', video_src);
            video_src.loop();
        } else {
            maskShader.setUniform('texture', img);
            video_src.pause();
        }
    });
    video_on.position(10, 30);
    mask = createCheckbox('ridges', false);
    mask.position(10, 10);
    mask.style('color', 'white');
    shader(maskShader);
    maskShader.setUniform('texture', img);
    emitTexOffset(maskShader, img, 'texOffset');
}

function draw() {
    background(0);
    // /*
    if (mask.checked()) {
        //maskShader.setUniform('mask', [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
        //maskShader.setUniform('mask', [-1, -1, -1, -1, 8, -1, -1, -1, -1]);
        maskShader.setUniform('mask', [0.567, 0.433, 0.0, 0.558, 0.442, 0.0, 0.0, 0.242,
            0.758
        ]);
    } else {
        maskShader.setUniform('mask', [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    }
    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    /*
    push();
    noStroke();
    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    pop();
    */
    // */
    //quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
}