import Probabilities from '../data/probabilities.js';
let Shop = {
    sellLizard: function(soldLizard, storeMultiplier) {
        let lizardBreed;
        let coupons;
        let i;

        coupons = 0;
        lizardBreed = soldLizard.species;

        //console.log(lizardBreed);
        for (i = 0; i < Probabilities.lizardProbability.length; i++) {
            if (Probabilities.lizardProbability[i][0] == lizardBreed) {
                if (Probabilities.lizardProbability[i][1] >= 10) {
                    coupons += 5 * storeMultiplier;
                } else if (10 > Probabilities.lizardProbability[i][1] && Probabilities.lizardProbability[i][1] > 5) {
                    coupons += 9 * storeMultiplier;
                } else if (Probabilities.lizardProbability[i][1] <= 5) {
                    coupons += 14 * storeMultiplier;
                } else {
                    console.log("you fucked up the logic, dumbass");
                }
            }
        }

        coupons += soldLizard.stats.speed * storeMultiplier;
        coupons += soldLizard.stats.strength * storeMultiplier;
        coupons += soldLizard.stats.iq * storeMultiplier;

        return Number(coupons.toFixed(2));
    },

    getCatPrice: function(numCats, buyMultiplier) {
        return (5 * (numCats)) * buyMultiplier;
    },
    getLocalBookPrice: function(buyMultiplier) {
        const BOOK_PRICE = 75.00;
        return BOOK_PRICE * buyMultiplier;
    },
    getStatsPrice: function(buyMultiplier) {
        const STATS_PRICE = 50.00;
        return STATS_PRICE * buyMultiplier;
    },
}

export default Shop;
