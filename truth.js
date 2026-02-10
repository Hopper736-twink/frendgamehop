let players=[];
let fatigue={};
let turn=0;

function truthMode(){
screen.innerHTML=`<div class="card">
<h2>Правда или действие</h2>
<input id="name" placeholder="Имя игрока">
<button onclick="addPlayer()">Добавить</button>
<p id="list"></p>
<button onclick="startTruth()">Начать</button>
</div>`;
}

function addPlayer(){
const n=document.getElementById("name").value;
if(!n)return;
players.push(n);
fatigue[n]=0;
document.getElementById("list").innerText=players.join(", ");
}

function startTruth(){
if(players.length<2)return;
nextTruth();
}

function nextTruth(extra=false){
const name=players[turn];
const type=Math.random()<.5?"truth":"dare";
const task=TASKS[type][Math.floor(Math.random()*TASKS[type].length)];

screen.innerHTML=`<div class="card">
<h2>${name}</h2>
<p>${type==="truth"?"🤔 Правда":"🔥 Действие"}</p>
<p>${task}</p>
<button onclick="done()">Выполнено</button>
<button onclick="skip()">Отказ</button>
</div>`;

if(!extra)turn=(turn+1)%players.length;
}

function done(){nextTruth()}

function skip(){
const name=players[(turn-1+players.length)%players.length];
fatigue[name]++;
if(fatigue[name]>=2){
fatigue[name]=0;
nextTruth(true);
}else nextTruth();
}