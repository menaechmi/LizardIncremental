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
let speciesSelector = document.getElementById("species");
let sellLizardButton = document.getElementById("sellLizard");
let shopLizardDisplayDiv = document.getElementById("currentShopLizard");
let buyCatButton = document.getElementById("buyCat");
let advancedStatsButton = document.getElementById("buyStats");
let statsPrice = document.getElementById("statsPrice");
let statsDiv = document.getElementById("stats");
let localBookPrice = document.getElementById("localBookPrice");
let localBookButton = document.getElementById("buyLocalBook");
let identificationStationButton = document.getElementById("buyIdentificationStation");
let identificationStationPrice = document.getElementById("identificationStationPrice");
let identificationStationDiv = document.getElementById("identificationStationAmount");
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
        localLizardBook: false,
        identificationStation: 1,
        luck: 0
    },
    coupons: 0,
    sssnekel: 0,
    sellMultiplier: 0.15,
    buyMultiplier: 1.5,
    expeditionMultipler: 1,
    allTimeStats: {
        "Total Lizards Caught": 0,
        "Total Identified Lizards": 0,
        "Total Sold Lizards": 0,
        "Unlucky": 0,
        "Lost Cats": 0
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
    let count;
    let i;

    //loops the amount of identificationStations that you have
    //each loops finds the next unidentified lizard (if there is one)
    count = currentSave.boughtItems.identificationStation;
    for (i = 0; i < count; i++) {
        nextLizard = findUnidentifiedLizard();
        //if there are no lizards, it skips the identification
        //break statement prevents spamming of multiple fixes issue #2
        if (nextLizard === "No lizards to identify") {
            alert(nextLizard);
            break;
        } else {
            nextLizard.identified = true;
            //console.log(nextLizard);

            //increments several counters
            currentSave.lizards["Unidentified Lizards"] -= 1;
            currentSave.lizards["Identified Lizards"] += 1;
            currentSave.lizards[nextLizard.species] += 1;
            //change current lizard page to the last element in the identifed lizards
            currentPage = currentSave.lizards["Identified Lizards"] - 1;
            currentSave.allTimeStats["Total Identified Lizards"] += 1;
            loadLizardPage();
        }
    }
}

//Function to search lizardArray for the next unidentified lizard
function findUnidentifiedLizard() {
    let i;

    //loops through the lizardArray. If the current Lizard is unidentified,
    //load the lizard page and return the current member of the lizard Array
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

//filters out to only display certain lizards based on species selected from the drop down
//currently hard-coded, need to figure out way to do this more programatically
function speciesSwitcher() {
    let species;
    let i;

    switch (speciesSelector.value) {
        case "skink":
            species = "Skinks";
            break;
        case "anole":
            species = "Anole";
            break;
        case "grassLizard":
            species = "Grass Lizards";
            break;
        case "brownBasilisk":
            species = "Brown Basilisk";
            break;
        case "rainbowRockLizard":
            species = "Rainbow Rock Lizard";
            break;
        case "iguana":
            species = "Iguana";
            break;
        case "beardedDragon":
            species = "Bearded Dragon";
            break;
        case "uromastyx":
            species = "Uromastyx";
            break;
        case "chameleon":
            species = "Chameleon";
            break;
        case "giantPlatedLizard":
            species = "Giant Plated Lizard";
            break;
        case "leglessLizard":
            species = "Legless Lizard";
            break;
        case "keeledLizard":
            species = "Keeled Lizard";
            break;
        case "frilledDragon":
            species = "Frilled Dragons";
            break;
        case "gecko":
            species = "Gecko";
            break;
        default:
            species = "All Species";
            break;
        }

    for (i = 0; i < currentSave.lizardArray.length; i++) {
        console.log(currentSave.lizardArray[i].species);
    }
}

//Loads and displays the currently selected Lizard
function loadLizardPage() {
    let displayLizard;

    //if there's no identified lizards, empty the lizard displays and return
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
    //uses style.color to change the display color to the lizard Color then
    //displays the Name Species Color and Sex
    lizardDisplayDiv.style.color = "rgb(" + displayLizard.color + ")";
    lizardDisplayDiv.innerHTML = "<p>Name: \t" + displayLizard.name;
    lizardDisplayDiv.innerHTML += "Species: \t" + displayLizard.species;
    lizardDisplayDiv.innerHTML += "<br />Color: \t" + displayLizard.color;
    lizardDisplayDiv.innerHTML += "<br/ >Sex: \t" + displayLizard.sex + "</p>";

    //if advanced identify has been bought, shows breed, birthday, trait and
    //stats if advanced identified has been bought.
    // TODO: implement advanced identify
    if (currentSave.advancedIdentify) {
        lizardDisplayDiv.innerHTML += "<p>Breed: \t" + displayLizard.breed;
        lizardDisplayDiv.innerHTML += "<br />Birthday: \t" + displayLizard.birthday;
        lizardDisplayDiv.innerHTML += "<br />Trait: \t" + displayLizard.trait;
        lizardDisplayDiv.innerHTML += "<br />Stats: \t" + displayLizard.stats; //TODO: determine how to actually show stats
    }

    //displays the lizard name in the store
    shopLizardDisplayDiv.style.color = "rgb(" + displayLizard.color + ")";
    shopLizardDisplayDiv.innerHTML = "<p>Name: " + displayLizard.name + "<br />Species: "
            + displayLizard.species + "</p>";
}

//Checks for unlock conditions of new tabs, then calls unlockTab(tab) to insert tab into UI
function checkForUnlock() {
    //if you have more than one lizard, unlocks the lizard tab for ya
    //also adds the relavant event listeners in hope to save some memory before they're needed
    if (!runtime.tabLizards && (currentSave.allTimeStats["Total Lizards Caught"] > 0)) {
        unlockTab("lizards");
        runtime.tabLizards = true;
        lizardButton.addEventListener("click", identifyLizard);
        nextLizard.addEventListener("click", nextLizardPage);
        previousLizard.addEventListener("click", previousLizardPage);
        speciesSelector.addEventListener("click", speciesSwitcher);
    }

    //unlocks the shop when you have at least 1 identified lizard
    //also adds event listeners for shop Buttons, and sets the price for the
    //advanced stats and local lizard book because they're a static price (I think)
    if (!runtime.tabShop && (currentSave.allTimeStats["Total Identified Lizards"] > 0)) {
        unlockTab("shop");
        runtime.tabShop = true;
        sellLizardButton.addEventListener("click", sellLizard);
        nextShopLizard.addEventListener("click", nextLizardPage);
        previousShopLizard.addEventListener("click", previousLizardPage);
        buyCatButton.addEventListener("click", buyCat);
        advancedStatsButton.addEventListener("click", buyAdvancedStats);
        statsPrice.innerHTML = Shop.getStatsPrice(currentSave.buyMultiplier).toFixed(2);
        identificationStationButton.addEventListener("click", buyIdentificationStation);
        //if you bought the local lizard book previously, don't display anything
        if (!currentSave.boughtItems.localLizardBook) {
            localBookButton.addEventListener("click", buyLocalBook);
            localBookPrice.innerHTML = Shop.getLocalBookPrice(currentSave.buyMultiplier).toFixed(2);
        } else {
            localBookButton.innerHTML = "";
            localBookPrice.innerHTML = "";
        }
    }

    //if you bought advancedStats, unlock the stats tab, and removes the event
    //listener for the advanced stats tab, as well as clearing the stats stuff
    if (!runtime.tabStats && currentSave.boughtItems.advancedStats) {
        unlockTab("Stats");
        runtime.tabStats = true;
        advancedStatsButton.removeEventListener("click", buyAdvancedStats);
        statsPrice.innerHTML = "";
        advancedStatsButton.innerHTML = "";
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

    //when lizardArray[currentPage] is undefined, which happens when you splice
    //the array with no other elemnents in it, pops and alert then loads loadLizardPage
    //which should clear the display
    soldLizard = currentSave.lizardArray[currentPage];
    if (soldLizard === undefined){
        alert("You have no lizards!");
        loadLizardPage();
        return;
    }

    //If you have unidentified lizards and try to sell one, alert user that
    //you must identfiy lizards before you can sell them
    if (!soldLizard.identified) {
        alert("Please identify lizards before selling them");
        return;
    }

    //actually get around to selling the lizard. use Shop to determine how much
    //the lizard will sell for, decrement identified lizards and the speices
    //that you sold one from. splice the array to remove the selected element
    //increment the alltimestats for sold lizards
    currentSave.coupons += Shop.sellLizard(soldLizard, currentSave.sellMultiplier);
    currentSave.lizards["Identified Lizards"] -= 1;
    currentSave.lizards[soldLizard.species] -= 1;
    currentSave.lizardArray.splice(currentPage, 1);
    currentSave.allTimeStats["Total Sold Lizards"] += 1;
    nextLizardPage();
}

//Buys a cat
function buyCat() {
    let catPrice;

    //figure out the price of the cats, then if you have enough coupons,
    //buy the cat. return if you cannot afford the cat
    catPrice = Shop.getCatPrice(currentSave.cats, currentSave.buyMultiplier);
    if (currentSave.coupons > catPrice) {
        currentSave.cats += 1;
        currentSave.coupons -= catPrice;
    } else {
    return;
    }
}

//buys the advanced stats to unlock stats tab
function buyAdvancedStats() {
    //get the price of the advanced stats
    //if you don't have the coupons to buy the advanced price, return, otherwise
    //buy the advanced stats
    let advancedStatsPrice = Shop.getStatsPrice(currentSave.buyMultiplier);
    if (currentSave.coupons < advancedStatsPrice) {
        return;
    }
    currentSave.coupons -= advancedStatsPrice;
    currentSave.boughtItems.advancedStats = true;
}

//buys the book that unlocks the list of the exact measure of lizards you have
function buyLocalBook() {
    let bookPrice = Shop.getLocalBookPrice(currentSave.buyMultiplier);

    //if you can't afford the book, return
    if (currentSave.coupons <= bookPrice) {
        return;
    }

    //actually buy the book
    currentSave.coupons -= bookPrice;
    currentSave.boughtItems.localLizardBook = true;
    localBookPrice.innerHTML = "";
    localBookButton.innerHTML = "";
}

//buys an extra identification station
function buyIdentificationStation() {
    let stationPrice;

    //check the price of the station, then if you can't afford it return
    stationPrice = Shop.getIdentificationStationPrice(currentSave.boughtItems.identificationStation, currentSave.buyMultiplier);
    if (currentSave.coupons <= stationPrice) {
        return;
    }

    //actually do the buying
    currentSave.coupons -= stationPrice;
    currentSave.boughtItems.identificationStation += 1;
}

//sends cats on an expedition
function lizardExpedition() {
    let counter;
    let lizardProduct;
    let currentLizard;
    let chance;
    lizardProduct = 0;

    //commented out for testing, because it can be annoying
    //blockForSeconds(5);

    //lizard Product = 1 * multipliers
    lizardProduct += 1 * currentSave.lizardMultiplier * currentSave.cats * currentSave.expeditionMultipler;

    //pull a random number between 0 and 1000, check this number against
    //some math to determine if you get an unlucky event. Either cats not
    //getting any lizards (about an 11 in 1000 chance at first, reduced by luck items)
    //or some cats dont find lizards (about a 1/10 chance). both increment the unlucky stat
    chance = Lizard.getRandomInt(0, 1000);
    if (chance <= (11 / (currentSave.boughtItems.luck + 1))) {
        lizardProduct = 0;
        console.log("super unlucky!");
        alert("Your cats failed to find any lizards");
        currentSave.allTimeStats["Unlucky"] += 1;
    } else if (chance <= (100 - currentSave.boughtItems.luck)) {
        console.log("no luck here");
        lizardProduct -= (Lizard.getRandomInt(1, currentSave.cats));
        alert("One or more cats failed to find any lizards");
        currentSave.allTimeStats["Unlucky"] += 1;
    }

    //chance to lose a kitty :c only happens if you have more than 1, because we
    //dont want a soft lock. the chance is like 1/500, but reduces drastically
    //with luck items. increments lost cats and unlucky stats
    if (chance >= (550 + currentSave.boughtItems.luck) && chance <= (555 + currentSave.cats) && currentSave.cats > 1) {
        currentSave.cats -= 1;
        alert("A cat didn't come back from the expedition");
        currentSave.allTimeStats["Unlucky"] += 1;
        currentSave.allTimeStats["Lost Cats"] += 1;
    }

    //actually do the lizard catching. increment lizard catches, and unidentifed
    //lizards. Then creates a new object for the generated lizard, constructs it
    //using the methods of the class, and pushes it to the lizard array
    currentSave.allTimeStats["Total Lizards Caught"] += lizardProduct;
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
    // TODO: turn this into an HTML table
    let catPriceDiv = document.getElementById("catPrice");
    let lizardDiv = document.getElementById("lizards");

    //displays unidentified and identified lizards
    lizardDiv.innerHTML = "Unidentifed Lizards: "
        + currentSave.lizards["Unidentified Lizards"] + "<br />Identified Lizards: "
        + currentSave.lizards["Identified Lizards"];
    //displays cat number
    document.getElementById("cats").innerHTML = "Cats: " + currentSave.cats;

    //if you have more than 0 coupons, display the number of coupons
    if (currentSave.coupons > 0) {
        document.getElementById("storeCoupons").innerHTML = "Store Coupons: "
        + currentSave.coupons.toFixed(2);
    }

    //if you've bought the lizard book, display all the kinds of lizards and their count
    if (currentSave.boughtItems.localLizardBook) {
        lizardDiv.innerHTML += "<br />Skinks: " + currentSave.lizards["Skinks"];
        lizardDiv.innerHTML += "<br />Anoles: " + currentSave.lizards["Anole"];
        lizardDiv.innerHTML += "<br />Grass Lizards: " + currentSave.lizards["Grass Lizards"];
        lizardDiv.innerHTML += "<br />Brown Basilisks: " + currentSave.lizards["Brown Basilisk"];
        lizardDiv.innerHTML += "<br />Rainbow Rock Lizards: " + currentSave.lizards["Rainbow Rock Lizard"];
        lizardDiv.innerHTML += "<br />Iguanas: " + currentSave.lizards["Iguana"];
        lizardDiv.innerHTML += "<br />Bearded Dragons: " + currentSave.lizards["Bearded Dragon"];
        lizardDiv.innerHTML += "<br />Uromastyx: " + currentSave.lizards["Uromastyx"];
        lizardDiv.innerHTML += "<br />Chameleons: " + currentSave.lizards["Chameleon"];
        lizardDiv.innerHTML += "<br />Giant Plated Lizards: " + currentSave.lizards["Giant Plated Lizard"];
        lizardDiv.innerHTML += "<br />Legless Lizards: " + currentSave.lizards["Legless Lizard"];
        lizardDiv.innerHTML += "<br />Keeled Lizards: " + currentSave.lizards["Keeled Lizard"];
        lizardDiv.innerHTML += "<br />Frilled Dragons: " + currentSave.lizards["Frilled Dragons"];
        lizardDiv.innerHTML += "<br />Geckos: " + currentSave.lizards["Gecko"];
    }

    //if you have more than one identification station show it on the lizards page
    if (currentSave.boughtItems.identificationStation > 1) {
        identificationStationDiv.innerHTML = "Identification Stations: " + currentSave.boughtItems.identificationStation;
    }

    //list price of shop and identification station prices
    catPriceDiv.innerHTML = Shop.getCatPrice(currentSave.cats, currentSave.buyMultiplier).toFixed(2);
    identificationStationPrice.innerHTML = Shop.getIdentificationStationPrice(currentSave.boughtItems.identificationStation, currentSave.buyMultiplier).toFixed(2);
}

//updates the stats so that you can view them anytime you please
function updateStats() {
    statsDiv.innerHTML = "<p>Total Lizards Caught: " + currentSave.allTimeStats["Total Lizards Caught"];
    statsDiv.innerHTML += "Total Identified Lizards: " + currentSave.allTimeStats["Total Identified Lizards"];
    statsDiv.innerHTML += "<br />Total Sold Lizards: " + currentSave.allTimeStats["Total Sold Lizards"];
    statsDiv.innerHTML += "<br />Times you were unlucky: " + currentSave.allTimeStats["Unlucky"];
    statsDiv.innerHTML += "<br />Cats that were lost: " + currentSave.allTimeStats["Lost Cats"] + "</p>";
}

//Blocks the use of the "send cat on expedition" button for lengthOfBlock blockForSeconds
//by running disableButton(), waiting the amount of time, then running enableButton()
//magic number is to convert from seconds to miliseconds
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
    loadLizardPage();
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
    updateStats();
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
