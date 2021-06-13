import Lizard from "./lizards.js";
import Shop from "./shop.js";
//let lastFrameTimeMS;
//let maxFPS;
//let delta;
//let timestep;
//let framesThisSecond;
//let fps;
//let lastFpsUpdate;
//let frameID;
//let running;
//let started;
let lizards;
let currentSave;
let runtime;
let expeditionButton = document.getElementById("expeditionButton");
let lizardButton = document.getElementById("identifyLizard");
let saveButton = document.getElementById("saveButton");
let loadButton = document.getElementById("loadButton");
let nextLizard = document.getElementById("nextLizard");
let previousLizard = document.getElementById("previousLizard");
let lizardDisplayDiv = document.getElementById("currentLizard");
let sellLizardButton = document.getElementById("sellLizard");
let shopLizardDisplayDiv = document.getElementById("currentShopLizard");
let buyCatButton = document.getElementById("buyCat");
let advancedStatsButton = document.getElementById("buyStats");
let statsPrice = document.getElementById("statsPrice");
let currentPage;

currentPage = 0;

//lastFrameTimeMS = 0;
//maxFPS = 60;
//lizards = 0;
//timestep = 1000 / 60;
//fps = 60;
//framesThisSecond = 0;
//lastFpsUpdate = 0;
//running = false;
//started = false;

//Object to store game data
let Saves = {
    cats: 1,
    lizards: {
    "Unidentified Lizards": 0,
    "Identified Lizards": 0,
    "Skinks": 0,
    "Anole": 0,
    "Grass Lizards": 0,
    "Brown Basilisk": 0,
    "Rainbow Rock Lizard": 0,
    "Iguana": 0,
    "Bearded Dragon": 0,
    "Uromastyx": 0,
    "Chameleon": 0,
    "Giant Plated Lizard": 0,
    "Legless Lizard": 0,
    "Keeled Lizard": 0,
    "Frilled Dragons": 0,
    "Gecko": 0
    },
    lizardArray: [],
    lizardMultiplier: 1,
    year: 0,
    month: 0,
    day: 0,
    chances: {},
    boughtItems: {
        advancedIdentify: false,
        advancedStats: false,
        luck: 0
    },
    coupons: 0,
    sssnekel: 0,
    sellMultiplier: 0.15,
    buyMultiplier: 1.5,
    expeditionMultipler: 1,
    allTimeStats: {
        "Total Lizards Caught": 0,
        "Total Identifed Lizards": 0,
        "Total Sold Lizards": 0
    }
};

//Object to store data that the game needs, but will cause problems upon save/load
let RuntimeObject = {
    tabLizards: false,
    tabShop: false,
    tabZoo: false,
    tabStats: false
    };

//Function that runs when "Identify Lizard" is clicked.
//By default only reveals Name, Species (has a chance to fail),
function identifyLizard() {
    let nextLizard;

    nextLizard = findUnidentifiedLizard();
    if (nextLizard === "No lizards to identify") {
        alert(nextLizard);
    } else {
    nextLizard.identified = true;
    console.log(nextLizard);

    //change the lizard page to
    currentSave.lizards["Unidentified Lizards"] -= 1;
    currentSave.lizards["Identified Lizards"] += 1;
    currentSave.lizards[nextLizard.species] += 1;
    currentPage = currentSave.lizards["Identified Lizards"] - 1;
    currentSave.allTimeStats["Total Identifed Lizards"] += 1;
    loadLizardPage();
    }
}

//Function to search lizardArray for the next unidentified lizard
function findUnidentifiedLizard() {
    let i;

    for (i = 0; i < currentSave.lizardArray.length; i++) {
        if (!currentSave.lizardArray[i].identified) {
            loadLizardPage();
            return currentSave.lizardArray[i];
            }
        }
        return "No lizards to identify";
    }

//increments the lizard page and resets at index 0 if over the length of the array
function nextLizardPage() {
    currentPage += 1
    if (currentPage >= currentSave.lizards["Identified Lizards"]) {
        currentPage = 0;
    }
    loadLizardPage();
}

//decrements the lizard page and resets at the end if negatives are reached
function previousLizardPage() {
    currentPage -= 1;
    if (currentPage < 0) {
        currentPage = currentSave.lizards["Identified Lizards"] - 1;
    }
    loadLizardPage();
}

//Loads and displays the currently selected Lizard
function loadLizardPage() {
    let displayLizard;

    displayLizard = currentSave.lizardArray[currentPage];
    if (currentSave.lizards["Identified Lizards"] == 0) {
        lizardDisplayDiv.innerHTML = "";
        shopLizardDisplayDiv.innerHTML = "";
        return;
    }

    //fixes bug where you could previously see an unidentified lizard
    if (displayLizard === undefined || !displayLizard.identified) {
        return;
    }

    //<p style="color: rgb(176, 216, 244)">displayLizard.name</p>
    lizardDisplayDiv.style.color = "rgb(" + displayLizard.color + ")";
    lizardDisplayDiv.innerHTML = "<p>Name: \t" + displayLizard.name;
    lizardDisplayDiv.innerHTML += "Species: \t" + displayLizard.species;
    lizardDisplayDiv.innerHTML += "<br />Color: \t" + displayLizard.color;
    lizardDisplayDiv.innerHTML += "<br/ >Sex: \t" + displayLizard.sex + "</p>";
    if (currentSave.advancedIdentify) {
        lizardDisplayDiv.innerHTML += "<p>Breed: \t" + displayLizard.breed;
        lizardDisplayDiv.innerHTML += "<br />Birthday: \t" + displayLizard.birthday;
        lizardDisplayDiv.innerHTML += "<br />Trait: \t" + displayLizard.trait;
        lizardDisplayDiv.innerHTML += "<br />Stats: \t" + displayLizard.stats; //TODO: determine how to actually show stats
    }
    shopLizardDisplayDiv.style.color = "rgb(" + displayLizard.color + ")";
    shopLizardDisplayDiv.innerHTML = "<p>Name: " + displayLizard.name + "</p>";
}

//Checks for unlock conditions of new tabs, then calls unlockTab(tab) to insert tab into UI
function checkForUnlock() {
    //If lizards is unlocked, and you have more than 1, unlock lizards tab.
    if (!runtime.tabLizards && (currentSave.lizards["Unidentified Lizards"] > 0 || currentSave.lizards["Identified Lizards"] > 0)) {
        unlockTab("lizards");
        runtime.tabLizards = true;
        lizardButton.addEventListener("click", identifyLizard);
        nextLizard.addEventListener("click", nextLizardPage);
        previousLizard.addEventListener("click", previousLizardPage);
    }

    if (!runtime.tabShop && currentSave.lizards["Identified Lizards"] > 0) {
        unlockTab("shop");
        runtime.tabShop = true;
        sellLizardButton.addEventListener("click", sellLizard);
        nextShopLizard.addEventListener("click", nextLizardPage);
        previousShopLizard.addEventListener("click", previousLizardPage);
        buyCatButton.addEventListener("click", buyCat);
        advancedStatsButton.addEventListener("click", buyAdvancedStats);
        statsPrice.innerHTML = Shop.getStatsPrice(currentSave.buyMultiplier);
    }

    if (!runtime.tabStats && currentSave.boughtItems.advancedStats) {
        unlockTab("Stats");
        runtime.tabStats = true;
        advancedStatsButton.removeEventListener("click", buyAdvancedStats);
    }
}

//creates a tab for the feature once it is unlocked
function unlockTab(tab) {
    let tabList;
    tabList = document.getElementById("listOfTabs");
    tabList.innerHTML += "<li><a href=\"\">" + tab + "</a></li>";
    console.log("unlocked " + tab);
}

//function to start the sale of the currently selected lizard.
//calls shop.js sell lizard to do the primary logic
function sellLizard() {
    let soldLizard;

    soldLizard = currentSave.lizardArray[currentPage];
    if (soldLizard === undefined){
        alert("You have no lizards!");
        loadLizardPage();
        return;
    }

    if (!soldLizard.identified) {
        alert("Please identify lizards before selling them");
        return;
    }
    currentSave.coupons += Shop.sellLizard(soldLizard, currentSave.sellMultiplier);
    currentSave.lizards["Identified Lizards"] -= 1;
    currentSave.lizards[soldLizard.species] -= 1;
    currentSave.lizardArray.splice(currentPage, 1);
    currentSave.allTimeStats["Total Sold Lizards"] += 1;
    nextLizardPage();
}

function buyCat() {
    let catPrice;

    catPrice = Shop.getCatPrice(currentSave.cats, currentSave.buyMultiplier);
    if (currentSave.coupons > catPrice) {
        currentSave.cats += 1;
        currentSave.coupons -= catPrice;
    } else {
    return;
    }
}

function buyAdvancedStats() {
    let advancedStatsPrice = Shop.getStatsPrice(currentSave.buyMultiplier);
    if (currentSave.coupons < advancedStatsPrice) {
        return;
    }
    currentSave.coupons -= advancedStatsPrice;
    currentSave.boughtItems.advancedStats = true;
    statsPrice.innerHTML = "";
    advancedStatsButton.innerHTML = "";
}

//sends cats on an expedition
function lizardExpedition() {
    let counter;
    let lizardProduct;
    let currentLizard;
    lizardProduct = 0;

    //blockForSeconds(5);
    lizardProduct += 1 * currentSave.lizardMultiplier * currentSave.cats * currentSave.expeditionMultipler;
    if (Lizard.getRandomInt(0, 1000) <= (10 - currentSave.boughtItems.luck)) {
        lizardProduct = 0;
        console.log("unlucky!");
        alert("Your cats failed to find any lizards");
    } else if (Lizard.getRandomInt(0, 500) <= (10 -  currentSave.boughtItems.luck)) {
        lizardProduct -= (Lizard.getRandomInt(1, currentSave.cats));
        alert("One or more cats failed to find any lizards");
    }

    currentSave.lizards["Unidentified Lizards"] += lizardProduct;
    for (counter = 0; counter < lizardProduct; counter++) {
        currentLizard = new Lizard();
        currentLizard.name = currentLizard.randomName();
        currentLizard.randomSpecies();
        currentLizard.randomBreed();
        currentLizard.randomSex();
        currentLizard.parents[1] = currentLizard.randomName();
        currentLizard.parents[0] = currentLizard.randomName();
        currentLizard.randomTrait();
        currentLizard.randomPersonality();
        currentLizard.randomStats();
        currentLizard.randomColor();
        currentLizard.identified = false;
        currentSave.lizardArray.push(currentLizard);
    }
}

//updates the counters on the page
function updateCounter() {
    let i;
    let catPriceDiv = document.getElementById("catPrice");

    document.getElementById("lizards").innerHTML = "Unidentifed Lizards: "
        + currentSave.lizards["Unidentified Lizards"] + "<br />Identified Lizards: "
        + currentSave.lizards["Identified Lizards"];
    document.getElementById("cats").innerHTML = "Cats: " + currentSave.cats;
    if (currentSave.coupons > 0) {
        document.getElementById("storeCoupons").innerHTML = "Store Coupons: "
        + currentSave.coupons.toFixed(2);
    }
    catPriceDiv.innerHTML = Shop.getCatPrice(currentSave.cats, currentSave.buyMultiplier).toFixed(2);
}


//Blocks the use of the "send cat on expedition" button for lengthOfBlock blockForSeconds
//by running disableButton(), waiting the amount of time, then running enableButton()
function blockForSeconds(lengthOfBlock) {
    let setForSeconds;

    setForSeconds = (lengthOfBlock * 1000) * currentSave.expeditionMultipler;
    disableButton();
    setTimeout(enableButton, setForSeconds);
}

//Disables usage of the "Send cat on expedition" button, requires running from an HTTP Server
function disableButton() {
    expeditionButton.disabled = true;
}

//Enables the button through CSS pointer-events, still requires running from an HTTP server
function enableButton() {
    expeditionButton.removeAttribute("disabled");
}

//saves the data from saves to localstorage
function save() {
    localStorage.setItem("lizardIncrementalSave", JSON.stringify(currentSave));
    console.log("Saving your game :)");
}

//loads save data from localstorage
function load() {
    Object.assign(currentSave, JSON.parse(localStorage.getItem("lizardIncrementalSave")));
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
currentSave = new Object(Saves);
runtime = Object.create(RuntimeObject);
//event listners should *probably* be moved over to ui.js
expeditionButton.addEventListener("click", lizardExpedition);
saveButton.addEventListener("click", save);
loadButton.addEventListener("click", load);

setInterval(main, 16.67);
//setInterval(Calendar.increaseTime, 1000);
