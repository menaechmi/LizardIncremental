import Probabilities from '../data/probabilities.js';
import { firstNames, lastNames } from '../data/names.js';
class Lizard {
    constructor() {
    this.name = null;
    this.color = null;
    this.species = null;
    this.breed = null;
    this.sex = null;
    this.parents = [];
    this.trait = null;
    this.personality = null;
    this.birthdate = null;
    this.stats = []
    }

//returns a random species from the weighted Array in Probabilities.js
    randomSpecies() {
        return this.ranWeightedArray(Probabilities.lizardProbability);
    }

//needs to be tested then documented
    randomBreed() {
        return this.ranWeightedArray(Probabilities.breeds);
        }

//returns a random first and last name as "First Last"
    randomName() {
        let firstName;
        let lastName;
        firstName = Math.floor(this.mulberry32() * (firstNames.length + 1));
        lastName = Math.floor(this.mulberry32(5389) * (lastNames.length + 1)); //seed chosen randomly
        return firstName + " " + lastName;
    }

    randomTrait() {
        return this.ranWeightedArray(Probabilities.traits);
    }

    randomPersonality() {

    }

    randomStats(species) {
        let stats;
        let speedMinMax;
        let strengthMinMax;
        let iqMinMax;

        stats = {
            speed: 0,
            stength: 0,
            iq: 0
        };
        switch (this.trait) {
            case "Skittish":
                stats.speed += 2;
                stats.strength -= 1;
                stats.iq -= 1;
            case "Introverted":
                stats.iq += 1;
            case "Extraverted":
                stats.strength += 1;
            case "Joyful":
                stats.iq += 1;
                stats.strength += 1;
                stats.speed += 1;
            case "Playful":
                stats.iq += 1;
                stats.strength += 1;
                stats.speed += 1;
            case "Religious":
                stats.iq += 3;
                stats.strength -= 1;
                stats.speed -= 1;
            case "Hungry":
                stats.iq -= 1;
                stats.strength -= 1;
                stats.speed -= 1;
            case "Demure":
                stats.iq += 1;
                stats.strength -= 1;
            case "Loud":
                stats.speed -= 2;
                stats.strength += 2;
            case "Angry":
                stats.strength += 2;
                stats.iq -= 1;
                stats.speed -= 1;
            case "Relaxed":
                stats.iq += 1;
                stats. speed -= 1;
            case "Anxious":
                stats.speed += 2;
                stats.iq -= 1;
            case "Excited":
                stats.iq -= 1;
                stats.strength += 1;
                stats.speed += 1;
            case "Calm":
                stats.iq += 2;
                stats.speed += 1;
            case "Ashamed":
                stats.iq -= 1;
                stats.strength -= 1;
            case "Curious":
                stats.iq += 2;
                stats.speed += 1;
            case "Strong":
                stats.strength += 4;
            case "Weak":
                stats.strength -= 4;
            case "Stupid":
                stats.iq -= 4;
            case "Smart":
                stats.iq += 4;
            case "Loving":
                stats.iq += 2;
                stats.strenth -= 2;
            case "Quick":
                stats.speed += 4;
            case "Slow":
                stats.speed += 4;

            speedMinMax = Probabilities.getSpeed(species);
            strengthMinMax = Probabilites.getStrength(species);
            iqMinMax = Probabilites.getIq(species);
        }

    }

    randomSex() {

    }

//Mulberry32bit randomizer from https://github.com/bryc/code/blob/master/jshash/PRNGs.md
    mulberry32(seed = 0) {
        return function() {
            let t;

            seed = seed + 0x6D2B79F5 | 0;
            t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }

//the core of this function is from developer.mozilla.org's Math.random() page,
//and gernerates a seed using Math.random(), which isn't super random,
//but this is then used as the seed for the mulberry32 randomizer
     getRandomInt(min, max) {
        let seed;
        min = Math.ceil(min);
        max = Math.floor(max);
        seed = Math.floor(Math.random() * (max - min + 1) + min); //both are inclusive
        return Math.floor(this.mulberry32(seed) * (max - min + 1) + min);
    }

//Gets a random number between 1 and the length of the array of arrays using the getRandomInt function
//Then crawls through the array of arrays (like those stored in Probabilities.js)
//adding the values of the weight to the total. Once total > ranNumber, you've found your answer
    ranWeightedArray(arrayOfArrays) {
        let total;
        let ranNum;
        let i;

        total = 0;
        for (i = 0; i < arrayOfArrays.length; i++) {
            total += arrayOfArrays[i][1];
        }

        ranNum = this.getRandomInt(1, total);
        total = 0;
// TODO: make sure this is actually working
        for (i = 0; i < arrayOfArrays.length; i++) {
            total += arrayOfArrays[i][1];

            if (total >= ranNum) {
                return arrayOfArrays[i][0];
            }
        }
    }
}
export default Lizard;
