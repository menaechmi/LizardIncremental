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
let lizards;

lastFrameTimeMS = 0;
maxFPS = 60;
lizards = 0;
timestep = 1000 / 60;
fps = 60;
framesThisSecond = 0;
lastFpsUpdate = 0;
running = false;
started = false;

//Object to store game data
let saves = {
    cats: 1,
    lizards: 0
};

function checkForUnlock() {
    if (saves.Lizards > 0) {
        unlockTab(lizards)
    }
}

//creates a tab for the feature once it is unlocked
function unlockTab(tab) {
    let tabList;
    tabList = getElementById("listOfTabs");
    tabList.innerHTML += "<li><a href=\"\">" + tab + "</a></li>";
}

//sends cats on an expedition
function lizardExpedition(requestNum) {
    saves.lizards += requestNum;
    disableButton();
    //blockForSeconds();
    enableButton();
}

//updates the counters on the page
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
    styleSheet.setProperty("pointer-events", "none");
}

//Enables the button through CSS pointer-events, still requires running from an HTTP server
function enableButton() {
    let styleSheet;

    styleSheet = document.styleSheets[0].cssRules[0].style;
    styleSheet.setProperty("pointer-events", "auto");
}

//panic if the numUpdateSteps >240, resets the delta to 0
function panic() {
    delta = 0;
}

//Pauses/stops the game, also saves before the pause
function stop() {
    save();
    running = false;
    started = false;

    cancelAnimationFrame(frameID);
    //save
}

//starts/unpauses the game
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

//saves the data from saves to localstorage
function save() {
    localStorage.setItem("lizardIncrementalSave",JSON.stringify(saves));
}

//loads save data from localstorage
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
        if (numUpdateSteps++ >= 240) {
            panic();
            break;
        }
    }
    updateCounter();
    checkForUnlock();
    frameID = requestAnimationFrame(main);
}

start();
