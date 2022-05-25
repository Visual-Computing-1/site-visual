const RasterizationHighLevel = (sketch) => {
    const radius = 120;
    const basket = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/basket-ball.jpg';
    const beisbol = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/beisbol.jpg';
    const mapa = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/map.jpg'
    const tenis = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/tenis-ball.jpg';
    
    var img = [];
    var idx = 0;
    var theta = 0;

    sketch.preload = () => {
        img[0] = sketch.loadImage(basket);
        img[1] = sketch.loadImage(beisbol);
        img[2] = sketch.loadImage(mapa);
        img[3] = sketch.loadImage(tenis);
    }

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth / 2, sketch.windowHeight / 2, sketch.WEBGL);
    }

    sketch.draw = () => {
        sketch.background(128, 128, 128, 255);

        sketch.rotateZ(theta * sketch.mouseX * 0.001);
        sketch.rotateX(theta * sketch.mouseX * 0.001);
        sketch.rotateY(theta * sketch.mouseX * 0.001);

        sketch.normalMaterial();
        sketch.texture(img[idx]);
        sketch.sphere(radius);

        theta += 0.05;
    }

    sketch.keyPressed = () => {
        if (sketch.keyCode === sketch.UP_ARROW) {
            idx = (idx + 1) % 4;
        } else if (sketch.keyCode === sketch.DOWN_ARROW) {
            idx = (idx - 1 + 4) % 4;
        }
    }
}

let p5RasterizationHighLevel = new p5(RasterizationHighLevel, document.getElementById('RasterizationHighLevel'));