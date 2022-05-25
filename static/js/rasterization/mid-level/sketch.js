const RasterizationMidLevel = (sketch) => {
    const globe = [];
    const coor = [];
    const total = 35;
    const radius = 120;
    const inf = 1000000000;
    const basket = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/basket-ball.jpg';
    const beisbol = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/beisbol.jpg';
    const mapa = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/map.jpg'
    const tenis = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/tenis-ball.jpg';
    
    var img = [];
    var idx = 0;
    var theta = 1;

    sketch.preload = () => {
        img[0] = sketch.loadImage(basket);
        img[1] = sketch.loadImage(beisbol);
        img[2] = sketch.loadImage(mapa);
        img[3] = sketch.loadImage(tenis);
    }

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth / 2, sketch.windowHeight / 2, sketch.WEBGL);

        sketch.stroke(200);

        for (let i = 0; i < total + 1; i++) {
            globe[i] = [];
            coor[i] = [];
            const lat = sketch.map(i, 0, total, 0, sketch.PI);
            for (let j = 0; j < total + 1; j++) {
                const lon = sketch.map(j, 0, total, 0, sketch.TWO_PI);

                const x = radius * sketch.sin(lat) * sketch.cos(lon);
                const y = radius * sketch.sin(lat) * sketch.sin(lon);
                const z = radius * sketch.cos(lat);

                globe[i][j] = sketch.createVector(x, y, z);
                coor[i][j] = {
                    lat,
                    lon
                };
            }
        }
    }

    sketch.draw = () => {

        sketch.background(128, 128, 128, 255);

        sketch.rotateZ(theta * sketch.mouseX * 0.001);
        sketch.rotateX(theta * sketch.mouseX * 0.001);
        sketch.rotateY(theta * sketch.mouseX * 0.001);

        // lat: θ 
        // lon: φ
        // u = (θ + π)/2π
        // v = φ/π

        sketch.texture(img[idx]);
        sketch.textureMode(sketch.NORMAL);

        var mnU = inf,
            mxU = -inf;
        var mnV = inf,
            mxV = -inf;

        for (let i = 0; i < total; i++) {
            for (let j = 0; j < total + 1; j++) {
                let u = (coor[i][j].lon + sketch.PI) / 2 * sketch.PI;
                let v = coor[i][j].lat / sketch.PI;
                mnU = sketch.min(mnU, u);
                mxU = sketch.max(mxU, u);
                mnV = sketch.min(mnV, v);
                mxV = sketch.max(mxV, v);
            }
        }

        for (let i = 0; i < total; i++) {
            sketch.beginShape(sketch.TRIANGLE_STRIP);
            for (let j = 0; j < total + 1; j++) {
                const v1 = globe[i][j];
                let u = (coor[i][j].lon + sketch.PI) / 2 * sketch.PI;
                let v = coor[i][j].lat / sketch.PI;

                u = sketch.map(u, mnU, mxU, 0, 1);
                v = sketch.map(v, mnV, mxV, 0, 1);

                sketch.vertex(v1.x, v1.y, v1.z, u, v);

                const v2 = globe[i + 1][j];
                u = (coor[i + 1][j].lon + sketch.PI) / 2 * sketch.PI;
                v = coor[i + 1][j].lat / sketch.PI;
                u = sketch.map(u, mnU, mxU, 0, 1);
                v = sketch.map(v, mnV, mxV, 0, 1);

                sketch.vertex(v2.x, v2.y, v2.z, u, v);
            }
            sketch.endShape();
        }

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

let p5RasterizationMidLevel = new p5(RasterizationMidLevel, document.getElementById('RasterizationMidLevel'));