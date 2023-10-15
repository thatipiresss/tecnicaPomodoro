const html = document.querySelector('html'); //aqui eu posso pegar sem o ALL, porque temos apenas 1 tag com esse nome
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll ('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const startPauseIcon = document.querySelector('.app__card-primary-button-icon');
const tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('/sons/luna-rise-part-one.mp3'); 
const play = new Audio('/sons/play.wav'); 
const pause = new Audio('/sons/pause.mp3'); 
const beep = new Audio('/sons/beep.mp3'); 


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;



musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
}) 
curtoBt.addEventListener('click', ()=>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')

})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto){
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
                break;
        case "descanso-curto":
            titulo.innerHTML =`
        Que tal dar uma respirada?<br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>
        `
                break;
        case "descanso-longo":
            titulo.innerHTML=`
        Hora de voltar à superficie.<br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>
        `       
                break;
        default:
                break;

    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos<=0){
        beep.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos-= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        pause.play()
        iniciarOuPausarBt.textContent = "Começar"
        startPauseIcon.setAttribute('src',`/imagens/play_arrow.png`)
        return
    }else{
        play.play()
        iniciarOuPausarBt.textContent = "Pausar"
        startPauseIcon.setAttribute('src',`/imagens/pause.png`)
        
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId)
    intervaloId =null
   
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos *1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()