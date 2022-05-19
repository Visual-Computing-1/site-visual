const RasterizationHighLevel = (sketch) => {
    var img = [];
    var idx = 0;
    var theta = 0;

    var basket =  '/js/rasterization/img/basket-ball.jpg';
    var beisbol = '/js/rasterization/img/beisbol.jpg';
    var tenis =   '/js/rasterization/img/tenis-ball.jpg';

    sketch.preload = () => {
        img[0] = sketch.loadImage(tenis);
        img[1] = sketch.loadImage(basket);
        img[2] = sketch.loadImage(beisbol);
    }

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth/2, sketch.windowHeight/2, sketch.WEBGL);
    }

    sketch.draw = () => {
        sketch.background(128, 128, 128, 255);

        sketch.rotateZ(theta * sketch.mouseX * 0.001);
        sketch.rotateX(theta * sketch.mouseX * 0.001);
        sketch.rotateY(theta * sketch.mouseX * 0.001);

        //pass image as texture
        sketch.normalMaterial();
        sketch.texture(img[idx]);
        sketch.sphere(80);

        theta += 0.05;
    }

    sketch.keyPressed = () => {
        if (sketch.keyCode === sketch.UP_ARROW) {
            idx = (idx + 1) % 3;
        } else if (sketch.keyCode === sketch.DOWN_ARROW) {
            idx = (idx - 1 + 3) % 3;
        }
    }
}

let p5RasterizationHighLevel = new p5(RasterizationHighLevel, document.getElementById('RasterizationHighLevel'));
