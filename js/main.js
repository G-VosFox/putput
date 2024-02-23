document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");


//State of the gamer gang
gameState = {
    "inventory": [],
    "luigiPickedUp": false,
    "keyPickedUp": false
}

//Inventory
let inventory = [];
console.log(inventory);
const inventoryList = document.getElementById("inventoryList");
//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;
const tree1 = document.getElementById("squareTree");
const playerTalk = document.getElementById("heroSpeech");
const otherTalk = document.getElementById("counterSpeech");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: calc offset based on character size
    //TODO: making dialog functionality

    if (e.target.id !== "heroImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    switch (e.target.id) {
        case "key":
            if (gameState.keyPickedUp == false) {
                changeInventory("Rusty key", "add");
                console.log("Oh wow, You found a key!")
                gameState.keyPickedUp = true;
            }
            else {
                console.log("Oh wow, You found nothing!")
            }
            
            break;
        case "well":
            if (gameState.luigiPickedUp == false){
                console.log("It's Luigi time.")
                changeInventory("Luigi", "add");
                gameState.luigiPickedUp = true;
            }
            else {
                console.log("you only get 1 luigi >:(")
            }
            
            break;
        case "doorWizardHut":
            if (checkItem("Rusty key")) {
                console.log("I opened the door. Yeah!");
            } else if (checkItem("Luigi")) {
                changeInventory("Luigi", "delete", "inv-Luigi")
                console.log("Oh no I lost the luigi and it didn't open the door.. Feel kinda stupid..");
            } else {
                console.log("Fuck this door is locked and I don't have a key. boohoo :(");
            }
            break;
        case "statue":
            console.log("hey you.. wanna know where the key is? It's by the graves.");
            break;

        default:
            break;

    }
}

/**
 * add remove item inventory
 * @param {string} itemName 
 * @param {string} action 
 * @param {string} itemId
 */
function changeInventory(itemName, action, itemId){
    if(itemName == null || action == null){
        console.error("wrong paramater change inventoy");
        return;
    }
    switch(action){
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'delete':
            gameState.inventory = inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById(itemId).remove();
            break;
    }
    updateInventory(gameState.inventory, inventoryList)
}


function updateInventory(inventory, inventoryList){
    inventoryList.innerHTML = '';
    inventory.forEach(function(item){
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}
/**
     * This returns string value if it exist within the array
     * @param {string} itemName 
     * @returns 
     */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}
