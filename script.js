//okay swuddas 


//thsi class has all the thingies associated with teh character at all times
class GameState {
    constructor() {
        // dictionary for ionventory
        //gonna have to make it update and stuff
        this.player = {
            level: 1,
            hp: 20,
            maxHp: 20,
            gold: 11,
            location: 'Hollis',
            inventory: ['Muha', 'Diet Coke']
        };
        
        this.locations = {
            //location data, this dictionary will be used for encounters or something
            'Hollis': {
                description: 'Alex stares at you.',
                exits: ['front door'],
                enemies: ['Fent Demon']
            },
        };
    }
}
//this is the constructor that initializes the player ^
//this also grabs the elements in the html
class Game {
    constructor() {
        this.state = new GameState();
        //this is how you get html elements, whateveryou want in java script
        this.textArea = document.getElementById('textArea');
        this.commandInput = document.getElementById('commandInput');
        this.setupEventListeners();
    }

    //need this for the commands in the command line
    // when you press enter itll clean whatever you type like remove spaces and stuff
    //also there are things called arrow functions in js, basically theyre not binded like normal functions are making us able to do things like this below
    //it makes it easier when using 'this' bc they dont have their own 'this' and normal functions do
    //so when ytoure adding to the code, you could do something like if the function is calling from the class so 'this' would be the game instance
    //and then when you want 'this' to be a callback to seomthing liek the eventlistener, 'this' inside of it will still be the game instance
    setupEventListeners() {
        this.commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(e.target.value.trim().toLowerCase());
                e.target.value = '';
            }
        });
    }

    //This is for making the text in html to display
    // it creates the tag and gives it the class name like if its a system message or a player message and colors it and whatnot
    addText(text, className = '') {
        const div = document.createElement('div');
        div.className = `text-line ${className}`;
        div.textContent = text;
        this.textArea.appendChild(div);
        this.textArea.scrollTop = this.textArea.scrollHeight; //scrolls to show whatever is newest in the terminal
    }

    //for doing all the commands
    processCommand(command) {
        if (!command) return; 
        //looks freaky but all it is, is splitting whatever the player typed by reading everything in the command prompt
        //then processes the command and uyses a switch statement to choose and decide what function to use
        this.addText(`> ${command}`, 'player-input');//reads the literal text from the command prompt text line html

        const [action, ...args] = command.split(' '); //this puts whatever was grabbed into an array so it can grab the command -> 'action'
                                                    //i figured this will make it easier probably for doing commands cuz the first one will always be the command right
                                                    //so iwas thinking we the next ones would be like whatever the other actions will be
                                                    //like attack phillyfentdemon, i think itll make it easier maybe idk
                                                    //unless yall wanna make it more like undertale where you pick the attacks that way instead of typing out the attack and enemy
        const target = args.join(' ');//built in js function to rejoi nthe string and display in the terminal

        //these are the actions i put so far, all they do is call their respective function below
        switch (action) {
            case 'help':
                this.showHelp();
                break;
            //also with switch statements apparently if theres no break then the statement will keep falling through
            //so when theres two in a row theyre the same thing, like the player can type out 'inventory' or 'inv' to access their inventory
            //thought that was cool
            case 'inventory': 
            case 'inv':
                this.showInventory();
                break;
            case 'stats':
                this.showStats();
                break;
            default:
                this.addText("I don't understand that command. Type 'help' for available commands.", 'error');
        }
    }

    //displays anything in this function when calling help
    showHelp() {
        this.addText("Available commands:", 'system');
        this.addText("- inventory: View your items");
        this.addText("- stats: View your character stats");
    }

    //displays the inventory
    showInventory() {
        this.addText("Your inventory:", 'system'); //makes the text have the system class to color it accordingly
        if (this.state.player.inventory.length === 0) { //if inv array is empty, has 0 items, then it outputs empty
            this.addText("- Empty");
        } else {
            this.state.player.inventory.forEach(item => { //else itll loop through the inv array with a for each loop
                this.addText(`- ${item}`); //also the $ basically trurns any variable into a string to do stuff like this its actually broken
            });
        }
    }

    //just displays everything in the player dictionary basically
    showStats() {
        this.addText("Character Stats:", 'system');
        this.addText(`Level: ${this.state.player.level}`);
        this.addText(`HP: ${this.state.player.hp}/${this.state.player.maxHp}`);
        this.addText(`Gold: ${this.state.player.gold}`);
        this.addText(`Location: ${this.state.player.location}`);
    }
}

//creates the game class
const game = new Game();

//this piece makes it so that the command input is always focused so you don t have to click on the text every time
document.addEventListener('click', () => {
    document.getElementById('commandInput').focus();
});