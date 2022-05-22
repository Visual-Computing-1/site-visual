const Brush3d = (sketch) => {

    let color;
    let depth;
    let brush;
    let X0 = 0;
    let Y0 = 0;
    let X1 = 0;
    let Y1 = 0;
    let Z1 = 0;
    let timeAux = 0;
    let distance = 250;
    let controllers = [];
    let easycam;
    let state;

    let escorzo;
    let points;
    let record = false;


    sketch.setup = () => {
        sketch.createCanvas(600, 450, sketch.WEBGL);
        // easycam stuff
        let state = {
            distance: 250, // scalar
            center: [0, 0, 0], // vector
            rotation: [0, 0, 0, 1], // quaternion
        };
        easycam = sketch.createEasyCam();
        easycam.state_reset = state; // state to use on reset (double-click/tap)
        easycam.setState(state, 2000); // now animate to that state
        escorzo = true;
        //sketch.perspective();
        window.addEventListener("gamepadconnected", function(e) {
            gamepadHandler(e, true);
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
        });
        window.addEventListener("gamepaddisconnected", function(e) {
            console.log("Gamepad disconnected from index %d: %s",
                e.gamepad.index, e.gamepad.id);
            gamepadHandler(e, false);
        });

        // brush stuff
        points = [];
        brush = sphereBrush;
    };

    function sphereBrush(point) {
        sketch.push();
        sketch.noStroke();
        // TODO parameterize sphere radius and / or
        // alpha channel according to gesture speed
        sketch.fill(point.color);
        sketch.sphere(1);
        sketch.pop();
    }
    sketch.draw = () => {
        update();
        sketch.background(120);
        sketch.push();
        sketch.strokeWeight(0.8);
        sketch.grid({ dotted: false });
        sketch.pop();
        sketch.axes();
        for (const point of points) {
            sketch.push();
            sketch.translate(point.worldPosition);
            brush(point);
            sketch.pop();

        }

    }

    function update() {
        var gamepads = navigator.getGamepads()
        for (let i in controllers) {
            let controller = gamepads[i] //controllers[i]
            if (controller.buttons) {
                if (buttonPressed(controller.buttons[6])) {
                    record = true;
                } else {
                    record = false;

                }
                if (buttonPressed(controller.buttons[10])) {
                    Z1 = (controller.axes[1] * 0.3);
                }
                if (buttonPressed(controller.buttons[4])) {
                    distance = distance + 5;
                }
                if (buttonPressed(controller.buttons[5])) {
                    distance = distance - 5;
                }
                if (buttonPressed(controller.buttons[9])) {
                    points = [];
                }
                if (buttonPressed(controller.buttons[0])) {
                    if (sketch.millis() - timeAux > 500) {
                        escorzo = !escorzo;
                        escorzo ? sketch.perspective() : sketch.ortho();
                        timeAux = sketch.millis()
                    }
                }
            }
            if (controller.axes) {
                let axes = controller.axes;
                X0 = X0 + (axes[0] * 5);
                Y0 = Y0 + (axes[1] * 5);
                if (!buttonPressed(controller.buttons[7])) {
                    X1 = (axes[2] * 0.3);
                    Y1 = (axes[3] * 0.3);
                }

                if (record) {
                    points.push({
                        worldPosition: sketch.treeLocation([X0, Y0], { from: 'SCREEN', to: 'WORLD' }),
                        color: 'green',
                    });
                }
                state = {
                    distance: distance, // scalar
                    center: [0, 0, 0], // vector
                    rotation: [0, Z1, X1, Y1], // quaternion
                }
                easycam.setState(state)

            }
        }

    }

    function buttonPressed(b) {
        if (typeof(b) == "object") {
            if (b.touched == true) {
                return b.touched; // binary 
            }
        }
        return b > 0.9; // analog value
    }

    function gamepadHandler(event, connecting) {
        let gamepad = event.gamepad;
        if (connecting) {
            sketch.print("Connecting to controller " + gamepad.index)
            controllers[gamepad.index] = gamepad
        } else {
            delete controllers[gamepad.index]
        }
    }

}

let p5Brush3d = new p5(Brush3d, document.getElementById('Brush3d'));