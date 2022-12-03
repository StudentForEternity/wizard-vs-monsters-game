import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"]

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    wizard.getDiceHtml()
    monster.getDiceHtml()
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()
    
    if(wizard.dead){
        document.querySelector('#attack-button').disabled = true;
        endGame()
    }

    else if(monster.dead){
        document.querySelector('#attack-button').disabled = true;
        
            if(monstersArray.length > 0){
                setTimeout(() => {
                    monster = getNewMonster()
                    render()
                    document.querySelector('#attack-button').disabled = false;
                }, 1500); 
            }
            else{
                document.querySelector('#attack-button').disabled = true;
                endGame()
            }
        
    }
}

function endGame() {
    const endMessage = wizard.health === 0 && monster.health === 0 ?
            "No victors - all creatures are dead" :
            wizard.health > 0 ? "The Wizard Wins" :
                "The Orc is Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    
   setTimeout(() => {
            document.body.innerHTML = `
            <div class="end-game">
                <h2>Game Over</h2> 
                <h3>${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</p>
            </div>
            `
   }, 1500); 
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()