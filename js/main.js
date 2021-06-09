// TODO: figure out how to modulize the code
import Lizard from "./lizards.js";

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
let currentSave;
let runtime;
let expeditionButton = document.getElementById("expeditionButton");
let lizardButton = document.getElementById("identifyLizard");
let saveButton = document.getElementById("saveButton");
let loadButton = document.getElementById("loadButton");

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
let Saves = {
    cats: 1,
    lizards: 0,
    lizardArray: [],
    lizardMultiplier: 1,
    year: 0,
    month: 0,
    day: 0,
    };

//Object to store data that the game needs, but will cause problems upon save/load
let RuntimeObject = {
    tabLizards: false
    };

//Object for basic lizard probability

function identifyLizard() {

}
//Checks for unlock conditions of new tabs, then calls unlockTab(tab) to insert tab into UI
function checkForUnlock() {
    //If lizards is unlocked, and you have more than 1, unlock lizards tab.
    if (!runtime.tabLizards && currentSave.lizards > 0) {
        unlockTab("lizards");
        runtime.tabLizards = true;
    }
}

//creates a tab for the feature once it is unlocked
function unlockTab(tab) {
    let tabList;
    tabList = document.getElementById("listOfTabs");
    tabList.innerHTML += "<li><a href=\"\">" + tab + "</a></li>";
    console.log("unlocked " + tab);
}

//sends cats on an expedition
function lizardExpedition() {
    let counter;
    let lizardProduct;
    let currentLizard;
    lizardProduct = 0;

    lizardProduct += 1 * currentSave.lizardMultiplier;
    currentSave.lizards += lizardProduct;
    //disableButton();
    //blockForSeconds();
    for (counter = 0; counter < lizardProduct; counter++) {
        currentLizard = new Lizard();
        currentLizard.name = currentLizard.randomName();
        currentLizard.species = currentLizard.randomSpecies();
        currentLizard.breed = currentLizard.randomBreed();
        currentLizard.sex = currentLizard.randomSex();
        currentLizard.parents[1] = currentLizard.randomName();
        currentLizard.parents[0] = currentLizard.randomName();
        currentLizard.trait = currentLizard.randomTrait();
        currentLizard.personality = currentLizard.randomPersonality();
        currentLizard.stats = currentLizard.randomStats(currentLizard.species)
        currentSave.lizardArray.push();
    }
    //enableButton();
}

//updates the counters on the page
function updateCounter() {
    document.getElementById("lizards").innerHTML = "Unidentifed Lizards: " + currentSave.lizards;
    document.getElementById("cats").innerHTML = "Cats: " + currentSave.cats;
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
    //wait 5 seconds / (number of cats * ???)
}

//Enables the button through CSS pointer-events, still requires running from an HTTP server
function enableButton() {
    let styleSheet;

    styleSheet = document.styleSheets[0].cssRules[0].style;
    styleSheet.setProperty("pointer-events", "auto");
}

//saves the data from saves to localstorage
function save() {
    localStorage.setItem("lizardIncrementalSave",JSON.stringify(currentSave));
    console.log("Saving your game :)");
}

//loads save data from localstorage
function load() {
    Object.assign(currentSave,JSON.parse(localStorage.getItem("lizardIncrementalSave")));
    console.log("Loading Saved Game");
}

function main() {
//    let numUpdateSteps

//    if (timestamp < lastFrameTimeMS + (1000 / maxFPS)) {
//        requestAnimationFrame(main);
//        return;
//    }
//    delta += timestamp - lastFrameTimeMS;
//    lastFrameTimeMS = timestamp;

//    if (timestamp > lastFpsUpdate + 1000) {
//        fps = 0.25 * framesThisSecond + 0.75 * fps;

//        lastFpsUpdate = timestamp;
//        framesThisSecond = 0;
//    }
//    framesThisSecond++;
//    while (delta >= timestep){
//        update(timestep);
//        delta -= timestep;
//        if (numUpdateSteps++ >= 240) {
//            panic();
//            break;
//        }
//    }

    updateCounter();
    checkForUnlock();
//    frameID = requestAnimationFrame(main);
}
currentSave = Object.create(Saves);
runtime = Object.create(RuntimeObject);
expeditionButton.addEventListener("click", lizardExpedition);
lizardButton.addEventListener("click", identifyLizard);
saveButton.addEventListener("click", save);
loadButton.addEventListener("click", load);
setInterval(main, 16.67);
