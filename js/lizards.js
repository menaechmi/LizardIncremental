class Lizard {
    constructor() {
    this.name = null;
    this.color = null;
    this.species = [];
    this.breed = null;
    this.sex = null;
    this.parents = [];
    this.trait = null;
    this.personality = null;
    this.birthdate = null;
    this.stats = []
    }

    randomName() {
        return;
    }

    randomSpecies() {
        for (key in Lizard.lizardProbability) {
            key.value = "penis";
        }
    }

    randomBreed(species) {

    }

    randomName() {

    }

    randomTrait() {

    }

    randomPersonality() {

    }

    randomStats(species) {

    }

    randomSex(){

    }

    lizardProbability = {
        "Anole": 20,
        "Grass Lizards": 14,
        "Brown Basilisk": 10,
        "Rainbow Rock Lizard": 10,
        "Iguana": 10,
        "Bearded Dragon": 9,
        "Skink": 8,
        "Uromastyx": 7,
        "Chameleon": 4,
        "Giant Plated Lizard": 4,
        "Legless Lizard": 2,
        "Keeled Lizard": 1,
        "Frilled Dragons": 1
    }

//Array to contain all first names in the game
    firstNames = [
        "Newton",
        "Freddie",
        "Elyza",
        "Elyse",
        "Joshua",
        "Mildred",
        "Gabriel",
        "Franklin",
        "Michael",
        "Karen",
        "Wayne",
        "Mark",
        "Greg",
        "Alyssa",
        "Jenna",
        "Ollie",
        "Holly",
        "Hollison",
        "Allie",
        "Nikolas",
        "Nicholas",
        "Thor",
        "Nikki",
        "Theodore",
        "Kassee",
        "Kasie",
        "Kasey",
        "Iris",
        "Kelly",
        "Elle",
        "Abbie",
        "Abbi",
        "Abby",
        "Abbey",
        "Ted",
        "Moris",
        "William",
        "Will",
        "Bill",
        "Ronald",
        "Ronnie",
        "Ron",
        "Tim",
        "Timothy",
        "Jeff",
        "Geoff",
        "Jeffery",
        "Larry",
        "Jess",
        "Jessica",
        "Dayquon",
        "Daiquon",
        "Lynette",
        "Bobbie",
        "Bobby",
        "Bob",
        "Bobbi",
        "Lynette",
        "Jo",
        "Joe",
        "Ro",
        "Elijah",
        "Talia",
        "Akasha",
        "Levi",
        "Darion",
        "Gary",
        "Claudia",
        "Clawdia",
        "Marcus",
        "Marco",
        "Bug",
        "Purrsephone",
        "Persphone",
        "Lilyanna",
        "Lilianna",
        "David",
        "Emily",
        "Chef",
        "Forrest",
        "Chief",
        "Circee",
        "menaechmi",
        "Latoya",
        "Racheal",
        "Rachel",
        "Raquel",
        "Maria",
        "Katherine",
        "Christina",
        "Kristina",
        "Josephina",
        "Manny",
        "Omar",
        "Lamar",
        "Kiesawn",
        "Keyshawn",
        "Shaun",
        "Shawn",
        "Theresa",
        "TJ",
        "Tyrone",
        "Anthony",
        "Antoni",
        "Hope",
        "Nelly",
        "Nelli",
        "Raven",
        "Clark",
        "John",
        "Alexa",
        "Lexi",
        "Alex",
        "Queenie",
        "Josh",
        "Drake",
        "Brock",
        "Gregory",
        "Alex",
        "Alexander",
        "Loren",
        "Loran",
        "Kenyotta",
        "Kenya",
        "Ken",
        "Trica",
        "Tree",
        "Frankie",
        "Bryce",
        "Trenton",
        "Trent",
        "Missy",
        "Melissa",
        "Randy",
        "Maruo",
        "Daniel",
        "Rochelle",
        "Andre",
        "Sea",
        "Sky",
        "Skai",
        "Brandi",
        "Dan",
        "Karina",
        "Monroy",
        "Ivette",
        "Bayze",
        "Meghan",
        "Baby",
        "Hank",
        "Tamine",
        "Tulsa",
        "Martine",
        "Angie",
        "Don",
        "Donald",
        "Heather",
        "Dawn",
        "Rachel",
        "Arnold",
        "Summer",
        "Autumn",
        "Kitty",
        "Gauge",
        "Gage",
        "Tracy",
        "Tina",
        "Jada",
        "Jadia",
        "Jaida",
        "Juan",
        "Zoria",
        "Zorro",
        "Joseph",
        "Joe",
        "Yahiar",
        "Keena",
        "Quine",
        "Quinn",
        "Danny",
        "Dani",
        "Daniella",
        "Milo",
        "Pinto",
        "Friday",
        "Saturday",
        "Foozy",
        "Foozie",
        "Scrabble",
        "Pants",
        "Spaghetti",
        "Beans",
        "Beanz",
        "Bo",
        "Bow",
        "Mermista",
        "Glimmer",
        "Adora",
        "George",
        "Dooby",
        "Doobie",
        "Montero",
        "Halsey",
        "Monty",
        "Montie",
        "Luke",
        "Leia",
        "Phil",
        "Annikin",
        "Obi",
        "Claire",
        "Jay",
        "James",
        "Gloria",
        "Cameron",
        "Mitchel",
        "Gay",
        "Gae",
        "Kieran",
        "Mike",
        "Fatty",
        "Chalk",
        "Chonk",
        "Spike",
        "Toothless",
        "Faux",
        "Bun",
        "Honey",
        "Jaquard",
        "Ord",
        "Madison",
        "Cassie",
        "Cassy",
        "Zach",
        "Wheezy",
        "Sunshine",
        "Tazzy",
        "Taz",
        "Starry",
        "Star",
        "Moon",
        "Lord Hubbington",
        "Wolf",
        "Wolfie",
        "Edmonton",
        "Hank",
        "Penis",
        "No-name",
        "Duckie",
        "Ducky",
        "Noel",
        "Megan",
        "Conrad",
        "Tan"
    ]

//Array to contain all possible last names for use in game
    lastNames = [
        "Schaal",
        "Wright",
        "Granich",
        "Zapata",
        "Kelleher",
        "Keller",
        "Ritz",
        "Carlton",
        "Ritz-Carlton",
        "Noel",
        "Mankovecky",
        "Givens",
        "Hay",
        "Angulo",
        "Freeman",
        "Johnson",
        "Chagerben",
        "Robinson",
        "Arnold",
        "Howard",
        "Arrona",
        "Massimilla",
        "Michelle",
        "Parks",
        "Parkes",
        "the Death-Bringer",
        "the Cat-Eater",
        "of the wind",
        "Walden",
        "Rodriguez",
        "Jimenez",
        "Newell",
        "Gonzales",
        "Swanson",
        "Almeida",
        "Rowe",
        "Dubrow",
        "Goyanes",
        "Edie",
        "Greco",
        "The Feirce One",
        "Erichsen",
        "Hannides",
        "Mantegna",
        "Figueroa",
        "Rosen",
        "Kubatov",
        "Igleesias",
        "Poral",
        "Jaschke",
        "Wekseth",
        "Wekworth",
        "Weckworth",
        "Rowbotham",
        "Sadorf",
        "Waldorf",
        "Aseria",
        "Gan",
        "Meade",
        "Suarez",
        "Poindexter",
        "Flannary",
        "Bobula",
        "Baez",
        "Lane",
        "Roberts",
        "Diaz",
        "Martinez",
        "Stromlund",
        "Murphey",
        "Weidner",
        "Marcano",
        "Keating",
        "Keaton",
        "Henson",
        "Hanson",
        "Leslie",
        "Cambell",
        "Duke",
        "Earl",
        "Earl of Lizards",
        "Earl of Cats",
        "Earl of Snakes",
        "Duke of Pembrooke",
        "Duke of Chicago",
        "The Whore of Charlottesville",
        "of the Kentucky Derbershires",
        "Ricketts",
        "Trendall",
        "Mcilwaine",
        "Clark",
        "Bee",
        "Beeeater",
        "Carlos",
        "Better Known as \"That Bitch\"",
        "Sze",
        "Windsor",
        "King",
        "Queen",
        "Lawrence",
        "Austin",
        "Kadishman",
        "Watson",
        "Wattson",
        "the Stormbringer",
        "the Firemaker",
        "Conrad-Elway",
        "Conrad",
        "Elway",
        "Evers",
        "Rosewood",
        "Derenzo",
        "Gold",
        "Greene",
        "Green",
        "Black",
        "the Iridenscent",
        "the Illuminated",
        "The Dark One",
        "Olmsted",
        "Olmstred",
        "Fink",
        "the Skink",
        "Coombes",
        "Narravo",
        "Sozer",
        "Sosa",
        "Kortesis",
        "Bharti",
        "White",
        "McCafferty",
        "Cohen",
        "Bitar",
        "the Metal One",
        "Macias",
        "Barone",
        "Bogdan",
        "Bogden",
        "Epstein",
        "Lahiri",
        "Ghersi",
        "Ronan",
        "Sethuramen",
        "Hernandez",
        "Hernandez-Rey",
        "Demesmin",
        "Nayak",
        "Bassett",
        "Sincropi",
        "Glashow",
        "the Glassbreaker",
        "Pruzansky",
        "Gleiber",
        "Heil",
        "Vassar",
        "Dickerman",
        "Christ",
        "Christ Superstar",
        "Dornic",
        "Chen",
        "Chang",
        "Zhao",
        "Tolkin",
        "Tolkein",
        "Tolkeine",
        "Storey",
        "Lang",
        "Long",
        "Peterson",
        "Peterson-Albandoz",
        "Albondez",
        "Keehnen",
        "Kheen",
        "Kheehnen",
        "Janzu",
        "Broermann",
        "Broman",
        "the Brogrammer",
        "Tan",
        "France",
        "the Pixie-hunter",
        "the Fariy-hunter",
        "Fairysbane",
        "Wolfsbane",
        "the Scourge of the Seven Seas"
    ]
}
export default Lizard;
