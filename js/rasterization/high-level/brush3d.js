const Brush3d = (p5) => {
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


    p5.setup = () => {
        p5.createCanvas(600, 450, p5.WEBGL);
        // easycam stuff
        let state = {
            distance: 250, // scalar
            center: [0, 0, 0], // vector
            rotation: [0, 0, 0, 1], // quaternion
        };
        easycam = createEasyCam();
        easycam.state_reset = state; // state to use on reset (double-click/tap)
        easycam.setState(state, 2000); // now animate to that state
        escorzo = true;
        //p5.perspective();
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
        p5.push();
        p5.noStroke();
        // TODO parameterize sphere radius and / or
        // alpha channel according to gesture speed
        p5.fill(point.color);
        p5.sphere(1);
        p5.pop();
    }
    p5.draw = () => {
        update();
        p5.background(120);
        p5.push();
        p5.strokeWeight(0.8);
        //p5.grid({ dotted: false });
        p5.pop();
        //p5.axes();
        for (const point of points) {
            p5.push();
            p5.translate(point.worldPosition);
            brush(point);
            p5.pop();

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
                    if (p5.millis() - timeAux > 500) {
                        escorzo = !escorzo;
                        escorzo ? perspective() : ortho();
                        timeAux = p5.millis()
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
                        worldPosition: treeLocation([X0, Y0], { from: 'SCREEN', to: 'WORLD' }),
                        color: 'green',
                        //speed: speed
                    });
                }
                state = {
                        distance: distance, // scalar
                        center: [0, 0, 0], // vector
                        rotation: [0, Z1, X1, Y1], // quaternion
                    }
                    //easycam.setState(state)

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
            p5.print("Connecting to controller " + gamepad.index)
            controllers[gamepad.index] = gamepad
        } else {
            delete controllers[gamepad.index]
        }
    }

}
