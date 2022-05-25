const RasterizationLowLevel = (sketch) => {
    const globe = [];
    const coor = [];
    const total = 35;
    const inf = 1000000000;
    const basket = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/basket-ball.jpg';
    const beisbol = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/beisbol.jpg';
    const mapa = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/map.jpg'
    const tenis = 'https://visual-computing-1.github.io/visual-site/js/rasterization/img/tenis-ball.jpg';

    var img = [];
    var idx = 0;
    var angle = 45;
    var radius = 120;
    var coorx1 = 0.05,
        coory1 = 0.05;
    var coorx2 = 0.95,
        coory2 = 0.95;
    var coorx3 = 0.05,
        coory3 = 0.95;
    var pg;

    sketch.preload = () => {
        img[0] = sketch.loadImage(basket);
        img[1] = sketch.loadImage(beisbol);
        img[2] = sketch.loadImage(mapa);
        img[3] = sketch.loadImage(tenis);
    }

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth / 2, sketch.windowHeight / 2, sketch.WEBGL);
        pg = sketch.createGraphics(sketch.width / 3, sketch.height / 3);

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

        pg.background(img[idx]);
        sketch.image(pg, 0, 0);
        sketch.push();

        var x1 = sketch.map(coorx1, 0, 1, 0, sketch.width / 3),
            y1 = sketch.map(coory1, 0, 1, 0, sketch.height / 3);
        var x2 = sketch.map(coorx2, 0, 1, 0, sketch.width / 3),
            y2 = sketch.map(coory2, 0, 1, 0, sketch.height / 3);
        var x3 = sketch.map(coorx3, 0, 1, 0, sketch.width / 3),
            y3 = sketch.map(coory3, 0, 1, 0, sketch.height / 3);

        sketch.noFill();
        sketch.stroke(0, 0, 255);

        sketch.triangle(x1, y1, x2, y2, x3, y3);
        sketch.noStroke();

        sketch.translate(-150, -50);

        sketch.rotateZ(angle);
        sketch.rotateX(angle);
        sketch.rotateY(angle * 0.75);

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

                if (is_inside_triangle(u, v, coorx1, coory1, coorx2, coory2, coorx3, coory3)) {
                    sketch.vertex(v1.x, v1.y, v1.z, u, v);
                } else {
                    sketch.vertex(v1.x, v1.y, v1.z);
                }

                const v2 = globe[i + 1][j];
                u = (coor[i + 1][j].lon + sketch.PI) / 2 * sketch.PI;
                v = coor[i + 1][j].lat / sketch.PI;
                u = sketch.map(u, mnU, mxU, 0, 1);
                v = sketch.map(v, mnV, mxV, 0, 1);

                if (is_inside_triangle(u, v, coorx1, coory1, coorx2, coory2, coorx3, coory3)) {
                    sketch.vertex(v2.x, v2.y, v2.z, u, v);
                } else {
                    sketch.vertex(v2.x, v2.y, v2.z);
                }
            }
            sketch.endShape();
        }
        angle += 0.025;
    }

    sketch.keyPressed = () => {
        if (sketch.keyCode === sketch.UP_ARROW) {
            idx = (idx + 1) % 4;
        } else if (sketch.keyCode === sketch.DOWN_ARROW) {
            idx = (idx - 1 + 4) % 4;
        }
    }

    function compute_area(x0, y0, x1, y1, x2, y2) {
        return (y1 - y0) * (x2 - x0) - (y2 - y0) * (x1 - x0);
    }

    function edge_functions(x, y, x0, y0, x1, y1, x2, y2) {
        let edge_01 = (x0 - x1) * y + (y1 - y0) * x + (y0 * x1 - x0 * y1);
        let edge_12 = (x1 - x2) * y + (y2 - y1) * x + (y1 * x2 - x1 * y2);
        let edge_20 = (x2 - x0) * y + (y0 - y2) * x + (y2 * x0 - x2 * y0);
        return {
            edge_01,
            edge_12,
            edge_20
        };
    }

    function barycentric_coords(x, y, x0, y0, x1, y1, x2, y2) {
        let edges = edge_functions(x, y, x0, y0, x1, y1, x2, y2);
        let area = compute_area(x0, y0, x1, y1, x2, y2);
        var w0 = edges.edge_12 / area;
        var w1 = edges.edge_20 / area;
        var w2 = edges.edge_01 / area;
        return {
            w0,
            w1,
            w2
        };
    }

    function is_inside_triangle(x, y, x0, y0, x1, y1, x2, y2) {
        var coords = barycentric_coords(x, y, x0, y0, x1, y1, x2, y2);
        return coords.w0 >= 0 && coords.w1 >= 0 && coords.w2 >= 0;
    }
}

let p5RasterizationLowLevel = new p5(RasterizationLowLevel, document.getElementById('RasterizationLowLevel'));