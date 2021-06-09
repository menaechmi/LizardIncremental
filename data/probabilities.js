let Probabilities = {
    lizardProbability: [
        ["Anole", 20],
        ["Grass Lizards", 14],
        ["Brown Basilisk", 10],
        ["Rainbow Rock Lizard", 10],
        ["Iguana", 10],
        ["Bearded Dragon", 9],
        ["Skink", 8],
        ["Uromastyx", 7],
        ["Chameleon", 4],
        ["Giant Plated Lizard", 4],
        ["Legless Lizard", 2],
        ["Keeled Lizard", 1],
        ["Frilled Dragons", 1],
        ["Gecko", 5]
    ],
    breeds: [
        ["Blue Bellied", 15],
        ["Tailless", 25],
        ["Spotted", 35],
        ["Potbellied", 4],
        ["Fire-breathing", 2],
        ["Flying", 7],
        ["Book-eater", 13],
        ["Nocturnal", 5],
        ["Crepuscular", 9],
        ["Cold", 23],
        ["Warm-blooded", 4],
        ["Striped", 35],
        ["Striated", 22],
        ["Two-tailed", 3],
        ["Oklahoma", 25],
        ["Water", 12],
        ["Common", 51],
        ["Panther", 6],
        ["Satanic", 3],
        ["Spiny-tailed", 23],
        ["Leopard", 10],
        ["Fat-tailed", 8],
        ["Argentine", 4],
        ["Argus", 14],
        ["Blue Tongue", 12],
        ["False", 6],
        ["Giant", 4],
        ["Neotropical", 8],
        ["True", 12],
        ["Citrus Tiger", 6],
        ["Painted", 4],
        ["Red Eyed", 21],
        ["Fat Tailed", 16],
        ["American", 27],
        ["House", 17],
        ["Crested", 13]
    ],
    //Any additions to traits must be added to the randomTraits
    //case statement in lizards.js
    traits: [
        ["Skittish", 1],
        ["Introverted", 1],
        ["Extraverted", 1],
        ["Joyful", 1],
        ["Playful", 1],
        ["Religious", 1],
        ["Hungry", 1],
        ["Demure", 1],
        ["Loud", 1],
        ["Angry", 1],
        ["Obstinate", 1],
        ["Relaxed", 1],
        ["Anxious", 1],
        ["Excited", 1],
        ["Calm", 1],
        ["Ashamed", 1],
        ["Curious", 1],
        ["Strong", 1],
        ["Weak", 1],
        ["Stupid", 1],
        ["Smart", 1],
        ["Loving", 1],
        ["Quick", 1],
        ["Slow", 1],
    ],
    sex: [
        ["Male", 45],
        ["Female", 50],
        ["Intersex", 5]
    ],
    getSpeed: function(species) {
        switch (species) {
            case "Anole":
                return [6, 10];
            case "Grass Lizards":
                return [7, 9];
            case "Brown Basilisk":
                return [6, 10];
            case "Rainbow Rock Lizard":
                return [7, 10];
            case "Iguana":
                return [5, 7];
            case "Bearded Dragon":
                return [3, 6];
            case "Skink":
                return [2, 5];
            case "Uromastyx":
                return [1, 3];
            case "Chameleon":
                return [4, 7];
            case "Giant Plated Lizard":
                return [2, 4];
            case "Legless Lizard":
                return [3, 6];
            case "Keeled Lizard":
                return [6, 8];
            case "Frilled Dragons":
                return [3, 5];
            case "Gecko":
                return [4, 6];
        }
    },
    getStrength: function(species) {
        switch (species) {
            case "Anole":
                return [1, 3];
            case "Grass Lizards":
                return [2, 4];
            case "Brown Basilisk":
                return [3, 6];
            case "Rainbow Rock Lizard":
                return [5, 8];
            case "Iguana":
                return [6, 8];
            case "Bearded Dragon":
                return [4, 7];
            case "Skink":
                return [1, 4];
            case "Uromastyx":
                return [7, 10];
            case "Chameleon":
                return [4, 7];
            case "Giant Plated Lizard":
                return [6, 9];
            case "Legless Lizard":
                return [1, 4];
            case "Keeled Lizard":
                return [1, 4];
            case "Frilled Dragons":
                return [5, 6];
            case "Gecko":
                return [3, 5];
        }
    },
    getIq: function(species) {
        switch (species) {
            case "Anole":
                return [5, 10];
            case "Grass Lizards":
                return [4, 7];
            case "Brown Basilisk":
                return [7, 9];
            case "Rainbow Rock Lizard":
                return [4, 9];
            case "Iguana":
                return [6, 8];
            case "Bearded Dragon":
                return [2, 5];
            case "Skink":
                return [4, 6];
            case "Uromastyx":
                return [3, 7];
            case "Chameleon":
                return [5, 6];
            case "Giant Plated Lizard":
                return [4, 6];
            case "Legless Lizard":
                return [3, 7];
            case "Keeled Lizard":
                return [3, 5];
            case "Frilled Dragons":
                return [6, 7];
            case "Gecko":
                return [3, 5];
        }
    }
}
export default Probabilities;
