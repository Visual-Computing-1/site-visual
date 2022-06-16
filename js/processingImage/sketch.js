let lumaShader;
let img;
let grey_scale;

function preload() {
    lumaShader = readShader('http://localhost:8000/js/processingImage/luma.frag', { varyings: Tree.texcoords2 });
    img = loadImage('http://localhost:8000/js/processingImage/bandera2.jpg');
    maskShader = readShader('http://localhost:8000/js/processingImage/mask.frag', { varyings: Tree.texcoords2 });

}

function setup() {
    input = createFileInput(handleFile);
    createCanvas(600, 600, WEBGL);
    noStroke();
    textureMode(NORMAL);
    /*video_on = createCheckbox('video', false);
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
    video_on.position(10, 30);*/
    mask_pro = createCheckbox('Protanopia', false);
    mask_pro.position(10, 10);
    mask_pro.style('color', 'white');
    mask_deu = createCheckbox('Deuteranopia', false);
    mask_deu.position(120, 10);
    mask_deu.style('color', 'white');
    mask_tri = createCheckbox('Tritanopia', false);
    mask_tri.position(260, 10);
    mask_tri.style('color', 'white');
    mask_prot = createCheckbox('Protanomalía', false);
    mask_prot.position(10, 30);
    mask_prot.style('color', 'white');
    mask_deut = createCheckbox('Dueteranomalía', false);
    mask_deut.position(120, 30);
    mask_deut.style('color', 'white');
    mask_trit = createCheckbox('Tritanomalía', false);
    mask_trit.position(260, 30);
    mask_trit.style('color', 'white');
    mask_trit = createCheckbox('Tritanomalía', false);
    mask_trit.position(260, 30);
    mask_trit.style('color', 'white');
    mask_trit = createCheckbox('Tritanomalía', false);
    mask_trit.position(260, 30);
    mask_trit.style('color', 'white');
    shader(maskShader);
}

function draw() {
    background(0);
    if (img) {
        image(img, 0, 0, width, height);
    }
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
    } else {
        maskShader.setUniform('mask', [1, 0, 0, 0, 1, 0, 0, 0, 1]);
    }

    quad(-width / 2, -height / 2, width / 2, -height / 2, width / 2, height / 2, -width / 2, height / 2);
    maskShader.setUniform('texture', img);
    emitTexOffset(maskShader, img, 'texOffset');

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