document.getElementById("mainTitle").innerText = "Point and Click adventure game";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//State of the gamer gang
let gameState = {
    "inventory": [],
    "luigiPickedUp": false,
    "keyPickedUp": false
}

if (Storage) {
    if(localStorage.gameState){
        gameState = JSON.parse(localStorage.gameState);
    }
    else {
        //saves the stringy save state
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}


//Inventory
let inventory = [];
const inventoryList = document.getElementById("inventoryList");
//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;
const tree1 = document.getElementById("squareTree");

//speeches
const playerTalk = document.getElementById("heroSpeech");
const otherTalk = document.getElementById("counterSpeech");

const luigiHead = document.getElementById("luigiAvatar");

//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

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
                showMessage(playerTalk, "Oh wow, i found a key", heroAudio);
                gameState.keyPickedUp = true;
                saveGameState(gameState);
            }
            else {
                showMessage(playerTalk, "Oh wow, i found nothing", heroAudio);
            }
            
            break;
        case "well":
            if (gameState.luigiPickedUp == false){
                showLuigi();
                showMessage(otherTalk, "Luigi time", counterAudio);
                setTimeout(showMessage, 4000, playerTalk, "Why hello Luigi. Why are you in a pit? hold on i'll put you in my pocket.", heroAudio)
                setTimeout(showMessage, 8000 , otherTalk, "Here we go!", counterAudio);
                setTimeout(showLuigi, 8000);
                changeInventory("Luigi", "add");
                gameState.luigiPickedUp = true;
                saveGameState(gameState);
            }
            else {
                showMessage(playerTalk, "No more Luigi's to be found.", heroAudio);
            }
            
            break;
        case "doorWizardHut":
            if (checkItem("Rusty key")) {
                showMessage(playerTalk, "I opened the door", heroAudio);
            } else if (checkItem("Luigi")) {
                showLuigi();
                showMessage(otherTalk, "Aaaaaaahhhhhh!", counterAudio);
                changeInventory("Luigi", "delete", "inv-Luigi");
                setTimeout(showMessage, 4000, playerTalk, "Ah shit, Luigi fucking died trying to open the door.", heroAudio)
                saveGameState(gameState);
            } else {
                showMessage(playerTalk, "A mystery door, standing in the middle of nowhere... welp i know what i'm doing with my time.", heroAudio);
            }
            break;
        case "statue":
            if (checkItem("Luigi")){
                showMessage(playerTalk, "Luigi what are you doing!", heroAudio);
            }
            else{
                showMessage(playerTalk, "*you inspect the statue... and yes it is in fact a statue.*", heroAudio);
            }
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

function showLuigi(){
    luigiHead.style.opacity = 1;
    setTimeout(hideLuigi,4000,luigiHead);
}

function hideLuigi(){
    luigiHead.style.opacity = 0;
}

/**
 * 
 * @param {getElementById} targetBubble 
 * @param {string} message 
 * @param {getElementById} targetSound 
 */
function showMessage(targetBubble, message, targetSound){
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage,4000,targetBubble);
}


function hideMessage(targetBubble, targetSound){
    targetBubble.style.opacity = 0;
}

/**
 * 
 * @param {Object} gameState 
 */
function saveGameState(gameState){
    localStorage.gameState = JSON.stringify(gameState);
}

updateInventory(gameState.inventory, inventoryList);

function resety(){//so you better not forgetti that i make the best spagetti, just as long as i don't forgetti the tometti and if you resetti, i will you regretti. this might be an indi game but it's not five nights at fretti.
    gameState.inventory = [];
    gameState.keyPickedUp = false;
    gameState.luigiPickedUp = false;
    updateInventory(gameState.inventory, inventoryList);
    saveGameState(gameState);
}
