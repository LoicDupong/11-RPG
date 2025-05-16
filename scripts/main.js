const inputName = document.getElementById('name');
const inputStr = document.getElementById('str');
const inputSp= document.getElementById('sp');

const messageHTML = document.querySelector('.message');
const heroesContainerHTML = document.querySelector('.heroes__container');
const bgContainerHTML = document.getElementById('bg-container');
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
        target.hp -= this.strength;
    }
    magicAttack(target){
        if (this.mana > 20) {
            target.hp -= this.spellPower;
            this.mana -= 20;
        }
    }
    getDamage(damage){
        this.hp -= damage:
    }
    usePotion(){
        if (this.potions > 0) {
            this.hp = Math.min(this.hp + 30, 100);
            this.potions--;
        }
    }
    isDead(){
        return this.hp <= 0 ? true : false;
    }
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
    if (selectHero.value && selectEnemy.value && selectEnemy.value !== selectHero.value) {
        messageHTML.textContent = "";

        const hero = heroesTab.find(h => h.name === selectHero.value);
        const enemy = heroesTab.find(h => h.name === selectEnemy.value);

        const bgContainer = document.createElement('div');
        bgContainer.className = "battleground__container";

        bgContainer.innerHTML = `
            <div class="hero hero--bg hero--bg-1">
                <div class="hero__info">
                    <h2>${hero.name}</h2>
                    <p>⚔ ${hero.strength} 🔮 ${hero.spellPower}</p>
                </div>
                <div class="hp-bar"></div>
            </div>
            <div class="hero hero--bg hero--bg-2">
                <div class="hero__info">
                    <h2>${enemy.name}</h2>
                    <p>⚔ ${enemy.strength} 🔮 ${enemy.spellPower}</p>
                </div>
                <div class="hp-bar"></div>
            </div>
        `;

        bgContainerHTML.innerHTML = ""; // optional: clear previous display
        bgContainerHTML.append(bgContainer);
    } else {
        messageHTML.textContent = "❌ Please choose heroes to start the battle.";
    }
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
btnStartBattle.addEventListener('click', (e) => {
    e.preventDefault();
    displayBg();
})