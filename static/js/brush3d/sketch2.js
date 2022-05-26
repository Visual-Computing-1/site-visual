let easycam;
let X0 = 0;
let Y0 = 0;
let X1 = 0;
let Y1 = 0;
let Z0 = 0;
let Z1 = 0;
let auxChangeColor = 0;
let Xrotation = 0
let Yrotation = 0
let Zrotation = 0
let controllers = []
let sphereArray = []
let elementArray = []
let elementCylinderArray = []
let element2d = []
let cylinderArray = []
let escorzo;
let Sube = 0;

let distance = 250;
let colors = ['gray', 'blue', 'red', 'green', '#00ff00', '#5E2129', '#800080', 'orange']
let colorA = 'gray';
let timeAuxSphere = 0;
let timeAux = 0;
let timeAuxCylinder = 0;
let timeAuxElement = 0;
let flagSphere = true;
let flagCylinder = false;


function setup() {
    //colour=color('green')
    createCanvas(600, 450, WEBGL)
    let state = {
        distance: 250, // scalar
        center: [0, 0, 0], // vector
        rotation: [0, 0, 0, 1], // quaternion
    };

    easycam = createEasyCam();
    easycam.state_reset = state; // state to use on reset (double-click/tap)
    easycam.setState(state, 2000); // now animate to that state
    escorzo = true;
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
}


function draw() {
    background(90);
    push();
    strokeWeight(0.8);
    grid({ dotted: false });
    pop();
    axes();

    angleMode(DEGREES); // Change the mode to DEGREES
    drawGamepad()

}


function gamepadHandler(event, connecting) {
    let gamepad = event.gamepad;
    if (connecting) {
        print("Connecting to controller " + gamepad.index)
        controllers[gamepad.index] = gamepad
    } else {
        delete controllers[gamepad.index]
    }
}


function drawGamepad() {
    var gamepads = navigator.getGamepads()
    for (let i in controllers) {
        let controller = gamepads[i] //controllers[i]
        if (controller.buttons) {
            if (buttonPressed(controller.buttons[9])) {
                elementArray = []
                element2d = []
                sphereArray = []
                cylinderArray = []
                elementCylinderArray = []
            }
            if (buttonPressed(controller.buttons[8])) {
                generateMolecule3d()
            }

            if (buttonPressed(controller.buttons[11])) {
                state = {
                    distance: 250, // scalar
                    center: [0, 0, 0], // vector
                    rotation: [0, 0, 0, 1], // quaternion
                }
                easycam.state_reset = state; // state to use on reset (double-click/tap)
                easycam.setState(state, 1); // now animate to that state
                X0 = 0
                Y0 = 0
            } else {
                state = {
                    distance: distance, // scalar
                    center: [0, 0, 10], // vector
                    rotation: [0, Z1, X1, Y1], // quaternion
                }
                easycam.setState(state)

            }
            if (buttonPressed(controller.buttons[15])) {
                distance = distance + 2;
            }
            if (buttonPressed(controller.buttons[14])) {
                distance = distance - 2;
            }
            if (buttonPressed(controller.buttons[13])) {
                Sube = Sube - 2;
            }
            if (buttonPressed(controller.buttons[12])) {
                Sube = Sube + 2;
            }
            if (buttonPressed(controller.buttons[3])) {
                changeColor()
            }

            if (buttonPressed(controller.buttons[2])) {
                if (millis() - timeAux > 500) {
                    escorzo = !escorzo;
                    escorzo ? perspective() : ortho();
                    timeAux = millis()
                }
            }

        }
        if (controller.axes) {
            let axes = controller.axes;
            if (!buttonPressed(controller.buttons[6])) {
                X0 = X0 + (axes[0] * 2);
                Y0 = Y0 + (axes[1] * 2);
            } else {
                Xrotation = Xrotation - axes[0]
                Yrotation = Yrotation - axes[1]
                Zrotation = Zrotation - Sube
            }
            if (buttonPressed(controller.buttons[7])) {
                X1 = (axes[2] * 0.3);
                Y1 = (axes[3] * 0.3);
                if (buttonPressed(controller.buttons[10])) {
                    Z1 = (controller.axes[1] * 0.3);

                }
            } else {
                X1 = (axes[2] * 0.001);
                Y1 = (axes[3] * 0.001);
                if (buttonPressed(controller.buttons[10])) {
                    Z1 = (controller.axes[1] * 0.001);

                }

            }
            if (flagSphere) {
                push()
                stroke(colorA); // Change the color
                strokeWeight(10); // Make the points 10 pixels in size
                point(-X0, -Y0);
                pop()
                createElement2d(controller, -X0, -Y0, colorA)
            }

            for (let i = 0; i < element2d.length; i++) {
                push()
                stroke(element2d[i][2]); // Change the color
                strokeWeight(10); // Make the points 10 pixels in size
                point(element2d[i][0], element2d[i][1])
                if (element2d.length > 1 && i < element2d.length - 1) {
                    stroke('gray')
                    strokeWeight(3); // Make the points 10 pixels in size
                    line(element2d[i][0], element2d[i][1], element2d[i + 1][0], element2d[i + 1][1])
                }
                pop()
            }
            for (let i = 0; i < sphereArray.length; i++) {

                push()
                noStroke()
                fill(color(sphereArray[i][2]))
                translate(Xrotation + sphereArray[i][0], Yrotation + sphereArray[i][1], Sube);
                sphere(10)
                pop()
            }
            for (let i = 0; i < elementArray.length; i++) {
                push()
                noStroke()
                fill("white")
                translate(Xrotation + elementArray[i][0], Yrotation + elementArray[i][1], elementArray[i][2] + Sube);
                sphere(5)
                pop()
            }
            for (let i = 0; i < elementCylinderArray.length; i++) {
                push()
                noStroke()
                fill('white')
                if (elementCylinderArray[i][3] == 'X') {
                    translate(Xrotation + elementCylinderArray[i][0], Yrotation + elementCylinderArray[i][1], elementCylinderArray[i][2] + Sube);
                    rotateX(90)
                } else {
                    translate(Xrotation + elementCylinderArray[i][0], Yrotation + elementCylinderArray[i][1], Sube);
                    rotateZ(90 + elementCylinderArray[i][4])
                }
                cylinder(3, elementCylinderArray[i][5]);
                pop()
            }
            for (let i = 0; i < cylinderArray.length; i++) {
                push()
                noStroke()
                fill(color('gray'))
                translate(Xrotation + cylinderArray[i][0], Yrotation + cylinderArray[i][1], Sube);
                rotateZ(90 + cylinderArray[i][3])
                cylinder(5, cylinderArray[i][2]);
                pop()
            }

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

function createSphere(a, b, c) {
    let auxArray = []
    append(auxArray, a)
    append(auxArray, b)
    append(auxArray, c)
    append(sphereArray, auxArray)
}

function createElement2d(controller, x, y, color) {
    if (buttonPressed(controller.buttons[0])) {
        if (millis() - timeAuxElement > 500) {
            let auxArray = []
            append(auxArray, x)
            append(auxArray, y)
            append(auxArray, color)
            append(element2d, auxArray)
            timeAuxElement = millis()
        }
    }
}

function createCylinder(a, b, c, d) {
    let auxArray = []
    append(auxArray, a)
    append(auxArray, b)
    append(auxArray, c)
    append(auxArray, d)
        //append(auxArray,e)
    append(cylinderArray, auxArray)
}

function generateMolecule3d() {
    if (millis() - timeAuxCylinder > 300) {
        for (let i = 0; i < element2d.length; i++) {
            createSphere(element2d[i][0] * 2, element2d[i][1] * 2, element2d[i][2])
        }
        for (let i = 0; i < element2d.length; i++) {
            if (element2d.length > 1 && i < element2d.length - 1) {
                let distance = sqrt(pow(element2d[i + 1][0] - element2d[i][0], 2) + pow(element2d[i + 1][1] - element2d[i][1], 2))
                let angle = atan((element2d[i + 1][1] - element2d[i][1]) / (element2d[i + 1][0] - element2d[i][0]))
                createCylinder((sphereArray[i][0] + sphereArray[i + 1][0]) / 2, (sphereArray[i][1] + sphereArray[i + 1][1]) / 2, distance * 2, angle)
            }
        }
        addElements(sphereArray)
        timeAuxCylinder = millis()
        element2d = []

    }
}

function addCylinderElements(arrayEle, arraySphere) {
    for (let i = 0; i < arraySphere.length; i++) {
        for (let j = 0; j < arrayEle.length; j++) {
            if (arrayEle[j][3] == i) {
                if (arraySphere[i][0] == arrayEle[j][0] && arraySphere[i][1] == arrayEle[j][1]) {
                    let aux = []
                    append(aux, (arrayEle[j][0] + arraySphere[i][0]) / 2)
                    append(aux, (arrayEle[j][1] + arraySphere[i][1]) / 2)
                    append(aux, (arrayEle[j][2] + 0) / 2)
                    append(aux, 'X')
                    append(aux, 45)
                    append(aux, arrayEle[j][2])
                    append(elementCylinderArray, aux)
                } else {
                    let distance = sqrt(pow(arrayEle[j][0] - arraySphere[i][0], 2) + pow(arrayEle[j][1] - arraySphere[i][1], 2))
                    let angle = atan((arrayEle[j][1] - arraySphere[i][1]) / (arrayEle[j][0] - arraySphere[i][0]))
                    let aux = []
                    append(aux, (arrayEle[j][0] + arraySphere[i][0]) / 2)
                    append(aux, (arrayEle[j][1] + arraySphere[i][1]) / 2)
                    append(aux, 0)
                    append(aux, 'Z')
                    append(aux, angle)
                    append(aux, 30)
                    append(elementCylinderArray, aux)

                }

            }
        }
    }
}

function addElements(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][2] == 'blue') {
            if (i == 0 || i == (array.length - 1)) {
                let ad = []
                let ad2 = []
                append(ad, array[i][0])
                append(ad, array[i][1])
                append(ad, 20)
                append(ad, i)
                append(elementArray, ad)
                append(ad2, array[i][0])
                append(ad2, array[i][1])
                append(ad2, -20)
                append(ad2, i)
                append(elementArray, ad2)
            } else {
                let ad = []
                append(ad, array[i][0])
                append(ad, array[i][1])
                append(ad, 20)
                append(ad, i)
                append(elementArray, ad)
            }
        } else if (array[i][2] == 'gray') {
            if (i == 0 || i == (array.length - 1)) {
                let ad = []
                let ad2 = []
                let ad3 = []
                append(ad, array[i][0])
                append(ad, array[i][1])
                append(ad, 20)
                append(ad, i)
                append(elementArray, ad)
                append(ad2, array[i][0])
                append(ad2, array[i][1])
                append(ad2, -20)
                append(ad2, i)
                append(elementArray, ad2)
                if (i == 0) {
                    let XX = array[i][0] - array[i + 1][0]
                    let YY = array[i][0] - array[i + 1][0]
                    if (XX < 0) {
                        append(ad3, array[i][0] - 15)
                        if (YY < 0) {
                            append(ad3, array[i][1] - 15)
                        } else {
                            append(ad3, array[i][1] + 15)
                        }
                        append(ad3, 0)
                        append(ad3, i)
                    } else {
                        append(ad3, array[i][0] + 15)
                        if (YY < 0) {
                            append(ad3, array[i][1] - 15)
                        } else {
                            append(ad3, array[i][1] - 15)
                        }
                        append(ad3, 0)
                        append(ad3, i)
                    }
                } else {
                    let XX = array[i][0] - array[i - 1][0]
                    let YY = array[i][0] - array[i - 1][0]
                    if (XX < 0) {
                        append(ad3, array[i][0] - 15)
                        if (YY < 0) {
                            append(ad3, array[i][1] - 15)
                        } else {
                            append(ad3, array[i][1] + 15)
                        }
                        append(ad3, 0)
                        append(ad3, i)
                    } else {
                        append(ad3, array[i][0] + 15)
                        if (YY < 0) {
                            append(ad3, array[i][1] - 15)
                        } else {
                            append(ad3, array[i][1] - 15)
                        }
                        append(ad3, 0)
                        append(ad3, i)

                    }
                }
                append(elementArray, ad3)
            } else {
                let ad = []
                append(ad, array[i][0])
                append(ad, array[i][1])
                append(ad, 20)
                append(ad, i)

                append(elementArray, ad)
                let ad2 = []
                append(ad2, array[i][0])
                append(ad2, array[i][1])
                append(ad2, -20)
                append(ad2, i)
                append(elementArray, ad2)
            }
        } else if (array[i][2] == 'red') {
            if (i == 0 || i == (array.length - 1)) {
                let ad = []
                append(ad, array[i][0])
                append(ad, array[i][1])
                append(ad, 20)
                append(ad, i)
                append(elementArray, ad)
            }
        }
    }
    addCylinderElements(elementArray, array)

}

function changeColor() {
    if (millis() - timeAuxCylinder > 300) {
        auxChangeColor += 1;
        colorA = colors[auxChangeColor]
        if (auxChangeColor == 7) {
            auxChangeColor = 0
            colorA = colors[auxChangeColor]
        }
        timeAuxCylinder = millis()
    }

}