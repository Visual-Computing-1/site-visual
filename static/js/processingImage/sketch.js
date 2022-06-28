let lumaShader;
let img;
let grey_scale;
let video_src;

function preload() {
    img = loadImage('https://visual-computing-1.github.io/visual-site/js/processingImage/bandera2.jpg');
    maskShader = readShader('https://visual-computing-1.github.io/visual-site/js/processingImage/mask.frag', { varyings: Tree.texcoords2 });
    video_src = createVideo(['https://visual-computing-1.github.io/visual-site/js/processingImage/south_park.mp4']);
    video_src.hide()
}

function setup() {
    input = createFileInput(handleFile);
    createCanvas(600, 600, WEBGL);
    noStroke();
    textureMode(NORMAL);
    fill(0, 102, 153);
    video_on = createCheckbox('Video', false);
    video_on.style('color', 'black');
    video_on.changed(() => {
        if (video_on.checked()) {
            maskShader.setUniform('texture', video_src);
            video_src.loop();
        } else {
            maskShader.setUniform('texture', img);
            video_src.pause();
        }
    });
    video_on.position(540, 10);
    mask_pro = createCheckbox('Protanopia', false);
    mask_pro.position(10, 10);
    mask_pro.style('color', 'black');
    mask_deu = createCheckbox('Deuteranopia', false);
    mask_deu.position(120, 10);
    mask_deu.style('color', 'black');
    mask_tri = createCheckbox('Tritanopia', false);
    mask_tri.position(260, 10);
    mask_tri.style('color', 'black');
    mask_prot = createCheckbox('Protanomalía', false);
    mask_prot.position(10, 30);
    mask_prot.style('color', 'black');
    mask_deut = createCheckbox('Dueteranomalía', false);
    mask_deut.position(120, 30);
    mask_deut.style('color', 'black');
    mask_trit = createCheckbox('Tritanomalía', false);
    mask_trit.position(260, 30);
    mask_trit.style('color', 'black');
    mask_aniot = createCheckbox('Acromatopsia', false);
    mask_aniot.position(10, 50);
    mask_aniot.style('color', 'black');
    mask_anio = createCheckbox('Acromatomía', false);
    mask_anio.position(120, 50);
    mask_anio.style('color', 'black');
    shader(maskShader);
    maskShader.setUniform('texture', img);
    emitTexOffset(maskShader, img, 'texOffset');


}

function draw() {
    background(244, 248, 252);
    if (mask_pro.checked()) {
        mask_deu.checked(false)
        mask_tri.checked(false)
        mask_deut.checked(false)
        mask_trit.checked(false)
        mask_prot.checked(false)
        maskShader.setUniform('mask', [0.567, 0.433, 0.0, 0.558, 0.442, 0.0, 0.0, 0.242, 0.758]);
    } else if (mask_deu.checked()) {
        mask_pro.checked(false)
        mask_tri.checked(false)
        mask_deut.checked(false)
        mask_prot.checked(false)
        mask_trit.checked(false)
        maskShader.setUniform('mask', [0.625, 0.375, 0.0, 0.7, 0.3, 0.0, 0.0, 0.3, 0.7]);
    } else if (mask_tri.checked()) {
        mask_pro.checked(false)
        mask_deu.checked(false)
        mask_prot.checked(false)
        mask_trit.checked(false)
        mask_deut.checked(false)
        maskShader.setUniform('mask', [0.95, 0.05, 0.0, 0.0, 0.433, 0.567, 0.0, 0.475, 0.525]);
    } else if (mask_prot.checked()) {
        mask_deu.checked(false)
        mask_tri.checked(false)
        mask_deut.checked(false)
        mask_pro.checked(false)
        mask_trit.checked(false)
        maskShader.setUniform('mask', [0.817, 0.183, 0.0, 0.333, 0.667, 0.0, 0.0, 0.125, 0.875]);
    } else if (mask_deut.checked()) {
        mask_pro.checked(false)
        mask_deu.checked(false)
        mask_tri.checked(false)
        mask_prot.checked(false)
        mask_trit.checked(false)
        maskShader.setUniform('mask', [0.8, 0.2, 0.0, 0.258, 0.742, 0.0, 0.0, 0.142, 0.858]);
    } else if (mask_trit.checked()) {
        mask_pro.checked(false)
        mask_deu.checked(false)
        mask_tri.checked(false)
        mask_prot.checked(false)
        mask_deut.checked(false)
        maskShader.setUniform('mask', [0.967, 0.033, 0.0, 0.0, 0.733, 0.267, 0.0, 0.183, 0.817]);
    } else if (mask_aniot.checked()) {
        mask_pro.checked(false)
        mask_deu.checked(false)
        mask_tri.checked(false)
        mask_prot.checked(false)
        mask_deut.checked(false)
        maskShader.setUniform('mask', [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114, ]);
    } else if (mask_anio.checked()) {
        mask_pro.checked(false)
        mask_deu.checked(false)
        mask_tri.checked(false)
        mask_prot.checked(false)
        mask_deut.checked(false)
        maskShader.setUniform('mask', [0.618, 0.32, 0.062, 0.163, 0.775, 0.062, 0.163, 0.32, 0.516, ]);
    } else {
        maskShader.setUniform('mask', [1, 0, 0, 0, 1, 0, 0, 0, 1]);
    }
    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    if (video_on.checked()) {} else {
        maskShader.setUniform('texture', img);
        emitTexOffset(maskShader, img, 'texOffset');
    }



}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        img = createImg(file.data, '');
        img.hide();
    } else {
        img = null;
    }
}