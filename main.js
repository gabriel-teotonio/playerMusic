
const musicas = [
    {
        titulo: 'Ninguém ensinou',
        artista: 'Lagum',
        src: 'musics/Lagum - NINGUÉM ME ENSINOU.mp3',
        img: 'images/lagum.jpg'
    }, 
    {
        titulo: 'Ela partiu',
        artista: 'Tim maia',
        src: 'musics/Tim Maia – Ela Partiu.mp3',
        img: 'images/Tim Maia.jpg'
    },
    {
        titulo: "toms Dinner",
        artista: 'Suzanne Vega',
        src: 'musics/Suzanne Vega, DNA - Toms Diner.mp3',
        img: "images/Tom's Dinner.jpg"
    },
    {
        titulo: "Running up that Hill",
        artista: 'Kate Bush',
        src: 'musics/Kate Bush - Running up that Hill.mp3',
        img: "images/Kate-bush.jpg"
    }
];


const musica = document.querySelector('audio');
const btnPlay = document.querySelector('.btn-play');
const btnPause = document.querySelector('.btn-pause');
let indexMusica = 0;


const imagem = document.querySelector('img');
const nomeMusica = document.querySelector('.descricao h2');
const nomeArtista = document.querySelector('.descricao i');
const duracaoMusica = document.querySelector('.fim');

redenrizarMusica(indexMusica)



btnPlay.addEventListener('click', tocarMusic)
btnPause.addEventListener('click', pauseMusic)
musica.addEventListener('timeupdate', atualizarBarra)

document.querySelector('.back').addEventListener('click', () => {
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';
    indexMusica --;
    if(indexMusica < 0){

        indexMusica = musicas.length -1
        
    }
    redenrizarMusica(indexMusica)
});
document.querySelector('.next').addEventListener('click', () => {
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';
    indexMusica ++;
    if(indexMusica > musicas.length -1) 
        indexMusica = 0
    redenrizarMusica(indexMusica)
});


function redenrizarMusica(index) {
    musica.setAttribute('src', musicas[index].src)
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo
        nomeArtista.textContent = musicas[index].artista
        imagem.src = musicas[index].img
        duracaoMusica.textContent = formatarTempo(Math.floor(musica.duration))
    });
}



function tocarMusic() {
    musica.play()
    btnPause.style.display = 'block';
    btnPlay.style.display = 'none';
}

function pauseMusic() { 
    musica.pause()
    btnPause.style.display = 'none';
    btnPlay.style.display = 'block';
}

function formatarTempo (tempo){
    let min = Math.floor(tempo / 60)
    let seg = Math.floor(tempo % 60)

    if(seg < 10){
        seg = '0' + seg
    }

    return min+':'+seg;
}

function atualizarBarra(){
    const barra = document.querySelector('progress');

    totalTimeMusic = musica.duration
    atualTimeMusic = musica.currentTime
    porcentagemMusic = Math.floor((atualTimeMusic / totalTimeMusic) * 100) + '%'
    barra.style.width = porcentagemMusic;

    const tempoDecorrido = document.querySelector('.inicio');
    const tempoFinal = document.querySelector('.fim');

    tempoDecorrido.textContent = formatarTempo(Math.floor(atualTimeMusic));
    tempoFinal.textContent = formatarTempo(Math.floor(totalTimeMusic))
}



