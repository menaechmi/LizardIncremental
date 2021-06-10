import Probabilities from '../data/probabilities.js';
import {firstNames, lastNames} from '../data/names.js';
class Lizard {
    constructor() {
    this.name = null;
    this.color = null;
    this.species = null;
    this.breed = null;
    this.sex = null;
    this.parents = [];
    this.trait = null;
    this.personality = {};
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

        firstName = this.getRandomInt(0, firstNames.length);
        lastName = this.getRandomInt(0, lastNames.length); //seed chosen randomly
        firstName = firstNames[firstName];
        lastName = lastNames[lastName];
        return firstName + " " + lastName;
    }

//returns a random trait from probabilies.js (all are weighted the same)
    randomTrait() {
        return this.ranWeightedArray(Probabilities.traits);
    }

//Personality traits are from https://www.ashami.com/rpg/
//This function returns an object that contains keys of the personality trait,
//with a value of how much they are that personality
    randomPersonality() {
        let optimistPessimist;
        let conscientiousUnscrupulous;
        let controlledSpontaneous;
        let intrepidCautious;
        let agreeableDisagreeable;
        let engagingReserved;
        let conventionalHeterodox
        let personalityObject = {};

        optimistPessimist = this.getRandomInt(-1, 1);
        conscientiousUnscrupulous = this.getRandomInt(-1, 1);
        controlledSpontaneous = this.getRandomInt(-1, 1);
        intrepidCautious = this.getRandomInt(-1, 1);
        agreeableDisagreeable = this.getRandomInt(-1, 1);
        engagingReserved = this.getRandomInt(-1, 1);
        conventionalHeterodox = this.getRandomInt(-1, 1);

        if (optimistPessimist <= 0) {
            personalityObject["Optimist"] =
            Math.abs(optimistPessimist.toFixed(2) * 100);
        } else if (optimistPessimist > 0) {
            personalityObject["Pessimist"] =
            Math.abs(optimistPessimist.toFixed(2) * 100);
        }

        if (conscientiousUnscrupulous <= 0) {
            personalityObject["Conscientious"] =
            Math.abs(conscientiousUnscrupulous.toFixed(2) * 100);
        } else if (conscientiousUnscrupulous > 0) {
            personalityObject["Unscrupulous"] =
            Math.abs(conscientiousUnscrupulous.toFixed(2) * 100);
        }

        if (intrepidCautious <= 0) {
            personalityObject["Intrepid"] =
            Math.abs(intrepidCautious.toFixed(2) * 100);
        } else if (intrepidCautious > 0) {
            personalityObject["Cautious"] =
            Math.abs(intrepidCautious.toFixed(2) * 100);
        }

        if (agreeableDisagreeable <= 0) {
            personalityObject["Agreeable"] =
            Math.abs(agreeableDisagreeable.toFixed(2) * 100);
        } else if (intrepidCautious > 0) {
            personalityObject["Disagreeable"] =
            Math.abs(agreeableDisagreeable.toFixed(2) * 100);
        }

        if (engagingReserved <= 0) {
            personalityObject["Engaging"] =
            Math.abs(engagingReserved.toFixed(2) * 100);
        } else if (engagingReserved > 0) {
            personalityObject["Reserved"] =
            Math.abs(engagingReserved.toFixed(2) * 100);
        }

        if (conventionalHeterodox <= 0) {
            personalityObject["Conventional"] =
            Math.abs(conventionalHeterodox.toFixed(2) * 100);
        } else if (conventionalHeterodox > 0) {
            personalityObject["Heterodox"] =
            Math.abs(conventionalHeterodox.toFixed(2) * 100);
        }
        return personalityObject;
    }
//returns a random statblock based on species and trait
    randomStats(species) {
        let stats;
        let speedMinMax;
        let strengthMinMax;
        let iqMinMax;

        stats = {
            speed: 0,
            strength: 0,
            iq: 0
        };
        console.log(stats.speed);
        switch (this.trait) {
            case "Skittish":
                stats.speed += 2;
                stats.strength -= 1;
                stats.iq -= 1;
                break;
            case "Introverted":
                stats.iq += 1;
                break;
            case "Extraverted":
                stats.strength += 1;
                break;
            case "Joyful":
                stats.iq += 1;
                stats.strength += 1;
                stats.speed += 1;
                break;
            case "Playful":
                stats.iq += 1;
                stats.strength += 1;
                stats.speed += 1;
                break;
            case "Religious":
                stats.iq += 3;
                stats.strength -= 1;
                stats.speed -= 1;
                break;
            case "Hungry":
                stats.iq -= 1;
                stats.strength -= 1;
                stats.speed -= 1;
                break;
            case "Demure":
                stats.iq += 1;
                stats.strength -= 1;
            case "Loud":
                stats.speed -= 2;
                stats.strength += 2;
                break;
            case "Angry":
                stats.strength += 2;
                stats.iq -= 1;
                stats.speed -= 1;
                break;
            case "Relaxed":
                stats.iq += 1;
                stats. speed -= 1;
                break;
            case "Anxious":
                stats.speed += 2;
                stats.iq -= 1;
                break;
            case "Excited":
                stats.iq -= 1;
                stats.strength += 1;
                stats.speed += 1;
                break;
            case "Calm":
                stats.iq += 2;
                stats.speed += 1;
                break;
            case "Ashamed":
                stats.iq -= 1;
                stats.strength -= 1;
                break;
            case "Curious":
                stats.iq += 2;
                stats.speed += 1;
                break;
            case "Strong":
                stats.strength += 4
                break;
            case "Weak":
                stats.strength -= 4;
                break;
            case "Stupid":
                stats.iq -= 4;
                break;
            case "Smart":
                stats.iq += 4;
                break;
            case "Loving":
                stats.iq += 2;
                stats.strength -= 2;
                break;
            case "Quick":
                stats.speed += 4;
                break;
            case "Slow":
                stats.speed += 4;
                break;
            }
            speedMinMax = Probabilities.getSpeed(species);
            strengthMinMax = Probabilities.getStrength(species);
            iqMinMax = Probabilities.getIq(species);
            stats.speed += this.getRandomInt(speedMinMax[0], speedMinMax[1]);
            stats.strength += this.getRandomInt(strengthMinMax[0], strengthMinMax[1]);
            stats.iq += this.getRandomInt(iqMinMax[0], iqMinMax[1]);
            return stats;
        }


//returns a random sex for the lizard
    randomSex() {
        return this.ranWeightedArray(Probabilities.sex);
    }

//Mulberry32bit randomizer from https://github.com/bryc/code/blob/master/jshash/PRNGs.md
    mulberry32(seed) {
            let t;

            seed = seed + 0x6D2B79F5 | 0;
            t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
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
