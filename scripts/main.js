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
const btnPotionHTML = document.querySelector('.btn--potion');


const selectHero = document.getElementById('select__hero');
const selectEnemy = document.getElementById('select__enemy');

const heroesTab = [];
const battleTab = [];

// === Class Hero ===
class Hero {
    constructor(name, strength, spellPower, heroClass) {
        this.name = name;
        this.strength = strength;
        this.spellPower = spellPower;
        this.hp = 100;
        this.mana = 50;
        this.potions = 2;

        if (strength >= 25) {
            this.heroClass = "warrior";
        } else if (strength >= 10 && strength < 20 && spellPower >= 10) {
            this.heroClass = "hunter";
        } else if (spellPower >= 20) {
            this.heroClass = "mage";
            this.mana = 80;
        } else if (strength >= 20) {
            this.heroClass = "rogue";
        } else {
            this.heroClass = "novice";
        }
    }
    shout(){
        return `I'm the mighty ${this.heroClass} ${this.name} and I'm ready to die!`;
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
        this.hp -= damage;
    }
    usePotion(){
        if (this.potions > 0) {
            this.hp = Math.min(this.hp + 30, 100);
            this.potions--;
        }
    }
    hpStatus() {
        return `<div class="hp-bar"><div class="hp-bar__inner" style="width: ${this.hp}%"></div></div>`;
        }

    isDead() {
        return this.hp <= 0;
    }
}

// === Create new Hero ===
function newHero() {
    heroesTab.push(new Hero(inputName.value, inputStr.value, inputSp.value));
    let option = document.createElement('option');
    option.id = option.value = inputName.value; // === A CORRIGER PLUS TARD MERCI LUCAS 💀💀💀💀
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
        <h3 class="hero--name">${hero.name} | <span class="hero--class hero--class-${hero.heroClass}">${hero.heroClass}</span></h3>
        <img src="img/${hero.heroClass}.png" alt="${hero.heroClass}" class="hero--idle">
        <p class="hero--str">⚔ Strength : ${hero.strength}</p>
        <p class="hero--sp">🔮 SpellPower : ${hero.spellPower}</p>
        <p class="hero--hp">🧡 HP : ${hero.hp}</p>
        <p class="hero--mana">💙 Mana : ${hero.mana}</p>
        <p class="hero--potions">🧪 Potions : ${hero.potions}</p>
        ${hero.hpStatus()}
        `
        heroesContainerHTML.append(div);
    })
}
displayTab();

// === Display Battleground ===
function displayBg() {
    bgContainerHTML.innerHTML = "";
    if (selectHero.value && selectEnemy.value && selectEnemy.value !== selectHero.value) {
        messageHTML.textContent = "";

        const hero = heroesTab.find(h => h.name === selectHero.value);
        const enemy = heroesTab.find(h => h.name === selectEnemy.value);
        battleTab.push(hero);
        battleTab.push(enemy);
        console.log(battleTab);
        

        const bgContainer = document.createElement('div');
        bgContainer.className = "battleground__container";

        const messageContainer = document.createElement('div');
        messageContainer.className = "message__container";

        const btnContainer = document.createElement('div');
        btnContainer.className = "btn__container";

        const btnAttackHTML = document.createElement('div');
        btnAttackHTML.className = "btn btn--attack";
        btnAttackHTML.textContent = 'Attack';
        const btnMagicHTML = document.createElement('div');
        btnMagicHTML.className = "btn btn--magic";
        btnMagicHTML.textContent = 'Spellcast';
        const btnPotionHTML = document.createElement('div');
        btnPotionHTML.className = "btn btn--potion";
        btnPotionHTML.textContent = `Use potion (${hero.potions})`;
        
        bgContainer.innerHTML = `
            <div class="hero hero--bg hero--bg-1">
                <div class="hero__info">
                    <img src="img/${hero.heroClass}.png" alt="${hero.heroClass}" class="hero--idle">
                    <h2>${hero.name}</h2>
                    <p>⚔ ${hero.strength} 🔮 ${hero.spellPower}</p>
                </div>
                ${hero.hpStatus()}
            </div>
            <div class="hero hero--bg hero--bg-2">
                <div class="hero__info">
                    <img src="img/${enemy.heroClass}.png" alt="${enemy.heroClass}" class="hero--idle">
                    <h2>${enemy.name}</h2>
                    <p>⚔ ${enemy.strength} 🔮 ${enemy.spellPower}</p>
                </div>
                ${enemy.hpStatus()}
            </div>
        `;

        messageContainer.innerHTML = hero.shout();
        bgContainerHTML.append(bgContainer);
        bgContainer.append(messageContainer, btnContainer);
        btnContainer.append(btnAttackHTML, btnMagicHTML, btnPotionHTML);
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

bgContainerHTML.addEventListener('click', (e) => {
    const messageContainer = bgContainerHTML.querySelector('.message__container');
    // == Physical Attack
    if (e.target.classList.contains('btn--attack')) {
        battleTab[0].attack(battleTab[1]);
        if (!battleTab[1].isDead()) {
        messageContainer.innerHTML += `<p>${battleTab[0].name} strikes ${battleTab[1].name} for ${battleTab[0].strength} damage!</p>`;
        
        displayBg();
        } else {
        messageContainer.innerHTML += `<p>${battleTab[1].name} is defeated!</p>`;
        displayBg();
    }
}

    // == Magical Attack
    if (e.target.classList.contains('btn--magic')) {
        battleTab[0].magicAttack(battleTab[1]);
        if (!battleTab[1].isDead()) {
        messageContainer.innerHTML += `<p>${battleTab[0].name} casts a spell on ${battleTab[1].name}, dealing ${battleTab[0].spellPower} damage!</p>`;
        messageContainer.innerHTML += `<p>${battleTab[0].name} has ${battleTab[0].mana} mana left</p>`;
        displayBg();
        } else {
            messageContainer.innerHTML += `<p>${battleTab[1].name} is defeated!</p>`;
        }
    }

    // == Use Potion
    if (e.target.classList.contains('btn--potion')) {
        battleTab[0].usePotion();
        messageContainer.innerHTML += `<p>${battleTab[0].name} drinks a potion and recovers 30 HP! (${battleTab[0].potions} left)</p>`;
        e.target.textContent = `Use potion (${battleTab[0].potions})`;
        displayBg();
    }
});