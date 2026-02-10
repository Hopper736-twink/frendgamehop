const screen=document.getElementById("screen");

function openMode(m){
if(m==="truth")truthMode();
if(m==="spy")spyMode();
if(m==="mafia")mafiaMode();
}

function openSettings(){
screen.innerHTML=`<div class="card">
<h2>Настройки</h2>
<p>Demon Mode 😈 (скоро)</p>
</div>`;
}