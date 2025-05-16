const inputName = document.getElementById('name');
const inputStr = document.getElementById('str');
const inputSp= document.getElementById('sp');

const messageHTML = document.querySelector('.message');
const heroesContainerHTML = document.querySelector('.heroes__container');
const heroHTML = document.querySelector('.hero');

const btnGenerate = document.querySelector('.btn');
const btnStartBattle = document.querySelector('.btn--fight');
const btnDelete = document.querySelector('.btn--delete');


const selectHero = document.getElementById('select__hero');
const selectEnemy = document.getElementById('select__enemy');

const heroesTab = [];

// === Class Hero ===
class Hero {
    constructor(name, strength, spellPower) {
        this.name = name;
        this.strength = strength;
        this.spellPower = spellPower;
        this.hp = 100;
        this.mana = 50;
        this.potions = 2;
    }
    shout(){
        return `I'm the mighty ${this.name} and I'm ready to die!`;
    }
    attack(target){
        
    }
    magicAttack(){}
    getDamage(){}
    usePotion(){}
    isDead(){}
}

// === Create new Hero ===
function newHero() {
    heroesTab.push(new Hero(inputName.value, inputStr.value, inputSp.value));
    let option = document.createElement('option');
    option.id = option.value = inputName.value;
    option.textContent = `${inputName.value} | ⚔ ${inputStr.value} 🔮 ${inputSp.value}`

    selectHero.append(option.cloneNode(true));
    selectEnemy.append(option);
}

// === Reset input === 
function resetInput() {
    inputStr.value = inputName.value = inputSp.value = "";
    inputName.focus();
}

// === Display in HTML ===
function displayTab() {
    heroesContainerHTML.innerHTML = "";
    
    heroesTab.forEach(hero => {
        let div = document.createElement('div');
        div.className = `${hero.name} hero`;
        div.setAttribute("data-index", `${heroesTab.indexOf(hero)}`);
        div.innerHTML += `
        <h3 class="hero--name">${hero.name}</h3>
        <p class="hero--str">⚔ Strength : ${hero.strength}</p>
        <p class="hero--sp">🔮 SpellPower : ${hero.spellPower}</p>
        <p class="hero--hp">🧡 HP : ${hero.hp}</p>
        <p class="hero--mana">💙 Mana : ${hero.mana}</p>
        <p class="hero--potions">🧪 Potions : ${hero.potions}</p>
        <div class="hp-bar"></div>
        `
        heroesContainerHTML.append(div);
    })
}
displayTab();

// === Display Battleground ===
function displayBg() {
    
}

// === Event Listner btn ===

// == Add
btnGenerate.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputName.value && !isNaN(inputSp.value) && !isNaN(inputStr.value)) {
        messageHTML.textContent = "";
        newHero();
        displayTab();
        resetInput();
    } else {
       messageHTML.textContent = "❌ Please fill in all your heroe's data."
    }  
})

// == Start Battle
btnGenerate.addEventListener('click', (e) => {
    e.preventDefault();
    if (selectHero.value && selectEnemy.value && selectEnemy.value != selectHero.value) {
        messageHTML.textContent = "";

    } else {
       messageHTML.textContent = "❌ Please fill in all your heroe's data."
    }  
})