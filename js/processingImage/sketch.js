let lumaShader;
let img;
let grey_scale;
let video_src;
let sel;
let sel2;
let sel3;

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
    sel = createSelect();
    sel.position(10, 10);
    sel.option('Normal');
    sel.option('Protanopía');
    sel.option('Deuteranopía');
    sel.option('Tritanopía');
    sel.option('Protanomalía');
    sel.option('Deuteranomalía');
    sel.option('Tritanomalía');
    sel.option('Acromatopsia');
    sel.option('Acromatomía');
    sel.selected('Normal');
    //sel.changed(mySelectEvent);
    video_on.position(540, 10);
    shader(maskShader);
    maskShader.setUniform('texture', img);
    emitTexOffset(maskShader, img, 'texOffset');
    sel2 = createSelect();
    sel2.position(140, 10);
    sel2.option('Total');
    sel2.option('Lente');
    sel2.selected('Total');

    sel3 = createSelect();
    sel3.position(240, 10);
    sel3.option('Sin Corrección');
    sel3.option('Protanopía');
    sel3.option('Deuteranopía');
    sel3.option('Tritanopía');
    sel3.selected('Sin Corrección');

}



function draw() {
    background(244, 248, 252);
    maskShader.setUniform('mouse_position', [mouseX, mouseY]);
    if (sel2.value() == "Lente") {
        maskShader.setUniform('filter_selected', 1);
    } else if (sel2.value() == "Total") {
        maskShader.setUniform('filter_selected', 2);
    }

    if (sel3.value() == "Protanopía") {
        maskShader.setUniform('filter_selected', 0);
        maskShader.setUniform('mask_correction', [0.0, 2.02344, -2.52581, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]);
        maskShader.setUniform('error_matrix', [0.0, 0.0, 0.0, 0.7, 1.0, 0.0, 0.7, 0.0, 1.0]);
    } else if (sel3.value() == "Deuteranopía") {
        maskShader.setUniform('filter_selected', 0);
        maskShader.setUniform('mask_correction', [1.0, 0.0, 0.0, 0.494207, 0.0, 1.24827, 0.0, 0.0, 1.0]);
        maskShader.setUniform('error_matrix', [1.0, 0.7, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 1.0]);

    } else if (sel3.value() == "Tritanopía") {
        maskShader.setUniform('filter_selected', 0);
        maskShader.setUniform('mask_correction', [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.395913, 0.801109, 0.0]);
        maskShader.setUniform('error_matrix', [1.0, 0.0, 0.7, 0.0, 1.0, 0.7, 0.0, 0.0, 0.0]);

    }

    if (sel.value() == "Protanopía") {
        maskShader.setUniform('mask', [0.567, 0.433, 0.0, 0.558, 0.442, 0.0, 0.0, 0.242, 0.758]);
    } else if (sel.value() == "Deuteranopía") {
        maskShader.setUniform('mask', [0.625, 0.375, 0.0, 0.7, 0.3, 0.0, 0.0, 0.3, 0.7]);
    } else if (sel.value() == "Tritanopía") {
        maskShader.setUniform('mask', [0.95, 0.05, 0.0, 0.0, 0.433, 0.567, 0.0, 0.475, 0.525]);
    } else if (sel.value() == "Protanomalía") {
        maskShader.setUniform('mask', [0.817, 0.183, 0.0, 0.333, 0.667, 0.0, 0.0, 0.125, 0.875]);
    } else if (sel.value() == "Deuteranomalía") {
        maskShader.setUniform('mask', [0.8, 0.2, 0.0, 0.258, 0.742, 0.0, 0.0, 0.142, 0.858]);
    } else if (sel.value() == "Tritanomalía") {
        maskShader.setUniform('mask', [0.967, 0.033, 0.0, 0.0, 0.733, 0.267, 0.0, 0.183, 0.817]);
    } else if (sel.value() == "Acromatopsia") {
        maskShader.setUniform('mask', [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114, ]);
    } else if (sel.value() == "Acromatomía") {
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