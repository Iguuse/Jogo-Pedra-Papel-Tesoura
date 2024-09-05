

//Variaveis e constantes
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, ties: 0, losses: 0 };
let htmlScore = document.querySelectorAll('.score');
let playerMove = document.querySelectorAll('.gameBtn');
let rulesWin = { pedra: 'tesoura', papel: 'pedra', tesoura: 'papel' }
let userMove, computer;
let imgArr ={papel: 'img\\paper-removebg-preview.png', tesoura: 'img\\scissor-removebg-preview.png', pedra:'img\\stone-removebg-preview.png'}

const prob = document.getElementById('prob');
const valor = document.getElementById('valor');
const resultScn = document.getElementById('result');
const wc = document.getElementById('wc');

const fundo = new Audio('sound/fundo.mp3');fundo.loop = true;
const btnSom = new Audio('sound/btn.mp3');
const restartSom = new Audio('sound/restart.mp3');


//Pega a jogada do Player e inicia a partida
playerMove.forEach(obj => {
    obj.addEventListener('click', () => {
        btnSom.currentTime = 0
        btnSom.play()
        computerMove(obj.dataset.value)
    })
});

// Altera a probabilidade da tela
prob.addEventListener('input', inputProbability);

function inputProbability() {
    valor.innerText = prob.value;
}


function computerMove(userMove) {

    if (Math.random() >= prob.value / prob.max) {
        //Define se o jogador perde ou empata
        computer = Object.keys(rulesWin).filter(move => move !== rulesWin[userMove]);
        computer = computer[Math.floor(Math.random() * computer.length)];

        //Caso empate
        if (computer == userMove) {
            updateScore('ties');
            rs('Empatou', imgArr[userMove], imgArr[computer])

        }
        //Caso perca
        else {
            updateScore('losses');
            rs('Perdeu', imgArr[userMove], imgArr[computer])
        }
    } else {
        //Define se o jogador ganha
        computer = rulesWin[userMove];
        updateScore('wins');
        rs('Ganhou', imgArr[userMove], imgArr[computer])
    }

}

//Reinicia o histórico do placar e altera o valor na tela
document.querySelector('#reset').addEventListener('click', () => {
    restartSom.play()
        fundo.volume = 0.7;
        setTimeout(function() {
           fundo.volume = 1;
        }, 1500);

 //Som ao clicar em reiniciar
    restartSom.play()
    if (window.confirm('Deseja reiniciar seu placar?')) {
        localStorage.removeItem('score');
        score = { wins: 0, ties: 0, losses: 0 };
        htmlScore.forEach(eachScore => eachScore.innerText = 0)
    }
});

//Atualiza Score 
function updateScore(numb) {
    if (numb) {
        score[numb] += 1;
        localStorage.setItem('score', JSON.stringify(score));
        document.getElementById(numb).innerText = score[numb];

    } else {
        for (let i = 0; i < Object.keys(score).length; i++) {
            htmlScore[i].innerText = Object.values(score)[i];
        }
    }
}


//carrega score local e alerta para iniciar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        document.querySelector('.wc-container2').innerText = '[ Clique para continuar ]'
    }, 2000)
    updateScore();
   
})


//tela de resultado
function rs(resultado, userMove, computer) {
    resultScn.style.display = 'flex';
    resultScn.children[0].innerHTML = `<img src='${userMove}'> Você ${resultado} <img src='${computer}'>`
    setTimeout(() => { resultScn.style.display = 'none' }, 1000)

}

//espera click do usaria para continuar
document.querySelector('#wc').addEventListener('click', ()=>{
    document.querySelector('#wc').style.display ='none';
    fundo.play()

})


