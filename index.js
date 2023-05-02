const { userInfo } = require("os");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

let defaultText = "\033[39m";
let greenText = "\033[32m";
let yellowText = "\033[0;33m";
let redText = "\033[91m";
let blueText = "\033[94m";
let grayText = "\033[90m";

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let currentRoom = "car"

//state machine
const pathways = {
  car: ["barn"],
  barn: ["cellar", "loft"],
  loft: ["barn"],
  cellar: ["barn"],
};



//========================================================classes=======================================================================

class Room {
  constructor(name, description, items) {
    this.name = name
    this.description = description;
    this.items = items
  }

  printSentence() {
   console.log(` ${this.name}! ${this.description}. You look around for ${this.printInventory} here.`)
  }

  printInventory() {
    return this.items.map((item) => item.name).join(", ")
  }
}

class Item {
  constructor(name) {
    this.name = name;
  }
}

//========================================================================================================================================

                  //this.name    //this.description of the room                    //this.items in the room
const car = new Room("car", "You are in your car, you can go into the barn", [ "flashlight", "code", "umbrella",])


                        //this.name       //this.description of the room
const barn = new Room('barn','You peel back the large door to the rickety barn', [
  //this.items in the room
  new Item('glass bottle'),
  new Item('crowbar'),
  new Item('mousetrap'),
])

                          //this.name       //this.description of the room
const cellar = new Room("cellar", "looks pretty scary down there", [
    //this.items in the room
  new Item("Rope"),
  new Item("Polaroid"),
  new Item("Knife"),
])


                         //this.name       //this.description of the room
const loft = new Room("loft","its dusty up here!", [
    //this.items in the room
  new Item("Broom"),
  new Item("Hay"),
  new Item("Axe"),
]);


//Room lookup table here
let roomLookup = {
  car: car,
  barn: barn,
  cellar: cellar,
  loft: loft,
};

//commandLookup table
let commandLookup = {
  inventory: ["i", "inventory"],
  use: ["use"],
  pickup: ["pickup"],
  help: ["help"],
  drop: ["drop"],
  move: ["move"],
}

let sign = {
  description: "INSTRUCTIONS: To Move: enter 'move' and 'room name' Commands: 'i' or 'inventory' to view inventory. Item Commands: enter 'use', 'pickup', 'drop' followed by 'item name' ",
  read: () => {
    return this.description
  }
}


function useItem(item) {
  //print the description of the item
console.log(`you use the ${item}`)
}

function pickupItem(item) {
  //when you pick up an item youll just add it to the player inventory
  console.log(`you picked up the ${item}`)
  }
//list items in your inventory
function openInventory(item) {
  console.log(`Heres what ive got: ${item} `)
}
//should add the item to your inventory
function pickupItem(item) {
  console.log(`You picked up the ${item} its now in your inventory`)
}
//should remove the item from your inventory and give it back to the room
function dropItem(item) {
  console.log(`You dropped the ${item}`)
}



//moving to new rooms/ new state function
function transition(newRoom) {
  const validTransitions = pathways[currentRoom]
  
  if (!validTransitions.includes(newRoom)) {
    console.log("We cant go this way, lets try somewhere else")
  } else {                                      
    console.log(`You walk to the ${newRoom}`)
    currentRoom = newRoom
    
  }
  
}


async function start() {
  const welcomeMessage = `Its dark and raining. Youre driving down the road when suddenly you smell something burning,
you pull off onto a dirt road and notice smoke start to barrel out of the hood of your car. You need to get away from there!
You notice an abandoned barn up ahead...maybe you can take cover there?`
  console.log(`${redText}${welcomeMessage}${defaultText}`)
  console.log(sign.description)
  while (true) {
    let answer = await ask(`${greenText}Where to now? You are currently in the: ${yellowText}${currentRoom}${defaultText}`);
    console.log(answer);
    let inputArray = answer.split(" ")
    let command = inputArray[0]
    let thing = inputArray[1]
    
    console.log(commandLookup.move.includes(command))
    if (commandLookup.move.includes(command)) {
      transition(thing)

    } else if (commandLookup.inventory.includes(command)) {
      openInventory(thing)
      console.log(openInventory)
      
    } else if (commandLookup.use.includes(command)) {
      useItem(thing)

    } else if (commandLookup.pickup.includes(command)) {
      pickupItem(thing)

    } else if(commandLookup.help.includes(command)) {
      console.log(sign.description)

    } else if(commandLookup.drop.includes(command)) {
      dropItem(item)
    }
  }
}

start()


//---------makeup items to use----------
//crowbar
//knife
//rope
//mousetrap
//glass bottle
//polaroid
//note
//padlock
//lantern
//code to unlock 8907
//flashlight

