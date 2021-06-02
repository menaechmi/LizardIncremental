let lastFrameTimeMS;
let maxFPS;
let delta;
let timestep;
let framesThisSecond;
let fps;
let lastFpsUpdate;
let frameID;
let running;
let started;

lastFrameTimeMS = 0;
maxFPS = 60;
lizards = 0;
timestep = 1000 / 60;
fps = 60;
framesThisSecond = 0;
lastFpsUpdate = 0;
running = false;
started = false;

let saves = {
    lizards: 0,
    cats: 1

}
function lizardExpedition(requestNum) {
    saves.lizards += requestNum;
    disableButton();
    //blockForSeconds();
    enableButton();
}
function updateCounter() {
    document.getElementById("lizards").innerHTML = "Unidentifed Lizards: " + saves.lizards;
    document.getElementById("cats").innerHTML = "Cats: " + saves.cats;

}
//Blocks the use of the "send cat on expedition" button for lengthOfBlock blockForSeconds
//by running disableButton(), waiting the amount of time, then running enableButton()
function blockForSeconds(lengthOfBlock) {
    disableButton();
    //wait for lengthOfBlock
    enableButton();
}

//Disables usage of the "Send cat on expedition" button, requires running from an HTTP Server
function disableButton() {
    let styleSheet;

    styleSheet = document.styleSheets[0].cssRules[0].style;
    styleSheet.setProperty('pointer-events', 'none');
}

//Enables the button through CSS pointer-events, still requires running from an HTTP server
function enableButton() {
    let styleSheet;

    styleSheet = document.styleSheets[0].cssRules[0].style;
    styleSheet.setProperty('pointer-events', 'auto');
}
function panic() {
    delta = 0;
}
function stop() {
    save();
    running = false;
    started = false;

    cancelAnimationFrame(frameID);
    //save
}
function start() {
    if (!started) {
        started = true;
        frameID = requestAnimationFrame(function (timestamp) {
            running = true;
            lastFrameTimeMS = timestamp;
            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
            frameID = requestAnimationFrame(main);
        });
    }
}

function save() {
    localStorage.setItem("lizardIncrementalSave",JSON.stringify(saves));
}
function load() {
    let savegame;
    saves = JSON.parse(localStorage.getItem("lizardIncrementalSave"));
}
function main(timestamp) {
    let numUpdateSteps;

    if (timestamp < lastFrameTimeMS + (1000 / maxFPS)) {
        requestAnimationFrame(main);
        return;
    }
    delta += timestamp - lastFrameTimeMS;
    lastFrameTimeMS = timestamp;

    if (timestamp > lastFpsUpdate + 1000) {
        fps = 0.25 * framesThisSecond + 0.75 * fps;

        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }

    while (delta >= timestep){
        update(timestep);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            panic();
            break;
        }
    }
    updateCounter();
    frameID = requestAnimationFrame(main);
}

start();
