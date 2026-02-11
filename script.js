let currentGame = '';
let spyTopic = '';
let spyRoleShown = false;
let truths = [];
let dares = [];
let spyQuestions = [];

// Запуск игры
function startGame(mode){
    currentGame = mode;
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('game-title').innerText = mode === 'truth' ? 'Правда или действие' : mode === 'spy' ? 'Шпион' : 'Мафия';
    document.getElementById('game-content').innerHTML = '';
    
    if(mode==='truth') setupTruth();
    if(mode==='spy') setupSpy();
    if(mode==='mafia') setupMafia();
}

// Назад в меню
function backToMenu(){
    document.getElementById('game-container').style.display='none';
    document.getElementById('main-menu').style.display='block';
}

// ----------------- Правда или действие -----------------
async function setupTruth(){
    await loadJSON('truth.json', truths);
    await loadJSON('dare.json', dares);
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <button onclick="getTruth()">Правда</button>
        <button onclick="getDare()">Действие</button>
        <div id="truth-dare-result" style="margin-top:20px;"></div>
    `;
}

function getTruth(){
    const txt = truths[Math.floor(Math.random()*truths.length)];
    document.getElementById('truth-dare-result').innerText = txt;
}

function getDare(){
    const txt = dares[Math.floor(Math.random()*dares.length)];
    document.getElementById('truth-dare-result').innerText = txt;
}

// ----------------- Шпион -----------------
async function setupSpy(){
    await loadJSON('spy.json', spyQuestions);
    // Выбираем случайную тему
    const randomWord = spyQuestions[Math.floor(Math.random()*spyQuestions.length)];
    spyTopic = randomWord.word;
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <button id="spy-role-btn" onclick="toggleSpyRole()">Показать роль</button>
        <div style="margin-top:20px;" id="spy-role-text"></div>
        <h3>Вопросы для всех:</h3>
        <ul id="spy-questions"></ul>
    `;
    const ul = document.getElementById('spy-questions');
    spyQuestions.forEach(q=>{
        if(q.word===spyTopic) ul.innerHTML+=`<li>${q.question}</li>`;
    });
}

function toggleSpyRole(){
    const el = document.getElementById('spy-role-text');
    if(!spyRoleShown){
        el.innerText = "Твоя роль: Шпион?";
        spyRoleShown = true;
    } else {
        el.innerText = "";
        spyRoleShown = false;
    }
}

// ----------------- Мафия -----------------
function setupMafia(){
    const players = prompt('Сколько игроков?', 5);
    const numPlayers = Math.max(3,parseInt(players)||5);
    let roles = ['Мафия','Доктор','Шериф'];
    while(roles.length<numPlayers) roles.push('Мирный');
    roles = roles.sort(()=>Math.random()-0.5);
    const content = document.getElementById('game-content');
    content.innerHTML = `<h3>Роли игроков:</h3>`;
    roles.forEach((r,i)=>{
        content.innerHTML+=`<p>Игрок ${i+1}: ${r}</p>`;
    });
}

// ----------------- Загрузка JSON -----------------
async function loadJSON(url,target){
    try{
        const res = await fetch(url);
        const data = await res.json();
        target.length = 0;
        target.push(...data);
    } catch(e){
        alert('Ошибка загрузки '+url);
    }
}
