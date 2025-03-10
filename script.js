const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.5;
let jogoAtivo = true; // Controla o loop do jogo

const personagem = {
    x: 100,
    y: canvas.height - 65,
    altura: 70,
    largura: 70,
    velocidadey: 0,
    pulando: false,
    imagem_src: 'image.png',
    imagem: new Image(70,70)
};
personagem.imagem.src=personagem.imagem_src


document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.velocidadey = 12;
        personagem.pulando = true;
    }
});


function desenharPersonagem() {
    ctx.drawImage(
        personagem.imagem,
        personagem.x,personagem.y,
        personagem.largura,
        personagem.altura)   
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidadey;
        personagem.velocidadey -= gravidade;

        if (personagem.y >= canvas.height - personagem.altura) {
            personagem.y = Math.max(canvas.height - personagem.altura, personagem.y);
            personagem.velocidadey = 0;
            personagem.pulando = false;
        }
    }
}

const obstaculo = {
    largura: 50,
    altura: 100,
    x: canvas.width - 50,
    y: canvas.height - 100,
    velocidadex: 3
};

function desenharObstaculo() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    
    if (obstaculo.x <= -obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex = Math.min(obstaculo.velocidadex + 1, 10);

        let nova_altura = Math.random() * 50 + 100;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - nova_altura;
    }
}

// Função de colisão
function verificarColisao() {
    let margem = 2; // Ajuste fino para evitar falsa borda

    if (
        personagem.x < obstaculo.x + obstaculo.largura - margem && 
        personagem.x + personagem.largura - margem > obstaculo.x && 
        personagem.y < obstaculo.y + obstaculo.altura - margem && 
        personagem.y + personagem.altura - margem > obstaculo.y
    ) {
        jogoAtivo = false;
        alert("Game Over!");
    }
}


function loop() {
    if (jogoAtivo) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem();
        atualizarPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        verificarColisao(); // Checa colisão a cada frame
        requestAnimationFrame(loop);
    }
}

loop();
