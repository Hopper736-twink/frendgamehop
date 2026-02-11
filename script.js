let currentGame = '';
let spyTopic = '';
let spyRoleShown = false;

// ----------------- Запуск игры -----------------
function startGame(mode){
    currentGame = mode;
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('game-title').innerText = 
        mode === 'truth' ? 'Правда или действие' : 
        mode === 'spy' ? 'Шпион' : 'Мафия';
    document.getElementById('game-content').innerHTML = '';

    if(mode==='truth') setupTruth();
    if(mode==='spy') setupSpy();
    if(mode==='mafia') setupMafia();
}

// ----------------- Назад в меню -----------------
function backToMenu(){
    document.getElementById('game-container').style.display='none';
    document.getElementById('main-menu').style.display='block';
}

// ----------------- Правда или действие -----------------
async function setupTruth(){
    const tasks = await loadJSON('tasks.json');
    const truths = tasks.truth;
    const dares = tasks.dare;
    const content = document.getElementById('game-content');
    content.innerHTML = `
        <button onclick="getTruth(truths)">Правда</button>
        <button onclick="getDare(dares)">Действие</button>
        <div id="truth-dare-result" style="margin-top:20px;"></div>
    `;
    window.truths = truths;
    window.dares = dares;
}

function getTruth(arr){
    const txt = arr[Math.floor(Math.random()*arr.length)];
    document.getElementById('truth-dare-result').innerText = txt;
}

function getDare(arr){
    const txt = arr[Math.floor(Math.random()*arr.length)];
    document.getElementById('truth-dare-result').innerText = txt;
}

// ----------------- Шпион -----------------
async function setupSpy(){
    const spyQuestions = await loadJSON('spy_words.json');
    const randomWord = spyQuestions[Math.floor(Math.random()*spyQuestions.length)];
    spyTopic = randomWord.word;

    const content = document.getElementById('game-content');
    content.innerHTML = `
        <button id="spy-role-btn" onclick="toggleSpyRole()">Показать роль</button>
        <div style="margin-top:20px;" id="spy-role-text"></div>
        <button onclick="nextPlayer()">Следующий игрок</button>
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

function nextPlayer(){
    spyRoleShown = false;
    document.getElementById('spy-role-text').innerText='';
    alert('Передайте телефон следующему игроку');
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
async function loadJSON(url){
    try{
        const res = await fetch(url);
        return await res.json();
    } catch(e){
        alert('Ошибка загрузки '+url);
        return [];
    }
}
