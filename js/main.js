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

//speeches
const heroSpeech = document.getElementById("heroSpeech");
const counterSpeech = document.getElementById("counterSpeech");

//npc's
const luigiHead = document.getElementById("luigiAvatar");

//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const luigiNoises = document.getElementById("luigiNoises");
const luigiTime = document.getElementById("luigiTime");
const hereWeGo = document.getElementById("hereWeGo");
const yahoo = document.getElementById("yahoo");

//explosion
const explosion = document.getElementById("explosion");
const explosionAudio = document.getElementById("explosionAudio")

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
                showMessage(heroSpeech, "Oh wow, i found a key", heroAudio);
                gameState.keyPickedUp = true;
                saveGameState(gameState);
            }
            else {
                showMessage(heroSpeech, "Oh wow, i found nothing", heroAudio);
            }
            
            break;
        case "well":
            if (gameState.luigiPickedUp == false){
                showLuigi();
                showMessage(counterSpeech, "Luigi time", luigiTime);
                setTimeout(showMessage, 3000, heroSpeech, "Why hello Luigi. Why are you in a pit? hold on i'll put you in my pocket.", heroAudio)
                setTimeout(showMessage, 6000 , counterSpeech, "Here we go!", hereWeGo);
                setTimeout(showLuigi, 6000);
                changeInventory("Luigi", "add");
                gameState.luigiPickedUp = true;
                saveGameState(gameState);
            }
            else {
                showMessage(heroSpeech, "No more Luigi's to be found.", heroAudio);
            }
            
            break;
        case "doorWizardHut":
            if (checkItem("Rusty key")) {
                showMessage(heroSpeech, "I opened the door", heroAudio);
            } else {
                showMessage(heroSpeech, "A mystery door, standing in the middle of nowhere... welp i know what i'm doing with my time.", heroAudio);
            }
            break;
        case "statue":
            if (checkItem("Luigi")){
                showMessage(heroSpeech, "Luigi what are you doing!", heroAudio);
                setTimeout(showMessage, 3000, counterSpeech, "YAAAAHOOOOOOO!!", yahoo);
                setTimeout(showLuigi, 3000);
            }
            else{
                showMessage(heroSpeech, "*you inspect the statue... and yes it is in fact a statue.*", heroAudio);
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
    setTimeout(hideLuigi,3000,luigiHead);
}

function hideLuigi(){
    luigiHead.style.opacity = 0;
}

1700

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
    setTimeout(hideMessage,3000,targetBubble);
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
