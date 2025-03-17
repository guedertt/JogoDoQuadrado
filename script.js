const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;
let pontuacao = 0;
let personagem;
let obstaculos = [];

function iniciarJogo() {
    personagem = new Personagem(100, canvas.height - 50, 90, 90);
    obstaculos = [new Obstaculo(canvas.width, canvas.height - 70, 50, 70, 3)];
    gameOver = false;
    pontuacao = 0;
    loop();
    iniciarGeracaoDeObstaculos();
}


function reiniciarJogo() {
    setTimeout(() => {
        iniciarJogo();
    }, 100);
}

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && personagem.noChao) {
        personagem.saltar();
    }
});

class Entidade {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    desenhar(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    constructor(x, y, largura, altura, image) {
        super(x, y, largura, altura);
        this.velocidadeY = 0;
        this.gravidade = 0.6;
        this.puloForca = -16.5;
        this.image = new Image(90,90)
        this.image.src = "./imgs/imagemPersonagem.png"
    }

    desenhar() {
        ctx.drawImage(this.image,this.x,this.y,this.largura,this.altura)
    }

    get noChao() {
        return this.y >= canvas.height - this.altura;
    }

    saltar() {
        if (this.noChao) {
            this.velocidadeY = this.puloForca;
        }
    }

    atualizarPersonagem() {
        this.velocidadeY += this.gravidade;
        this.y += this.velocidadeY;

        if (this.noChao) {
            this.y = canvas.height - this.altura;
            this.velocidadeY = 0;
        }
    }

    verificarColisao() {
        let margem = 30;
        obstaculos.forEach((obstaculo) => {
            if (
                this.x < obstaculo.x + obstaculo.largura - margem &&
                this.x + this.largura - margem >= obstaculo.x &&
                this.y < obstaculo.y + obstaculo.altura - margem &&
                this.y + this.altura - margem >= obstaculo.y
            ) {
                gameOver = true;
                alert("Game Over!");
                reiniciarJogo();
            }
        });
    }
}

function corAleatoria() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidadeX) {
        super(x, y, largura, altura);
        this.velocidadeX = velocidadeX;
        this.cor = corAleatoria();
        this.image = new Image(this.y,this.x)
        this.image.src = "./imgs/imagemObstaculo.png"
    }
    desenhar() {
        ctx.drawImage(this.image,this.x,this.y,this.largura,this.altura)
    }

    atualizarObstaculo() {
        this.x -= this.velocidadeX;

        if (this.x <= -this.largura) {
            this.x = canvas.width;
            this.largura = Math.random() * 20 + 50;
            this.altura = Math.random() * 50 + 100;
            this.y = canvas.height - this.altura;
            this.velocidadeX = Math.min(this.velocidadeX + 1, 10);
            this.cor = corAleatoria();
            pontuacao++;
        }
    }
}

function adicionarObstaculo() {
    if (obstaculos.length < 2) {
        let espacamento = Math.random() * 150 + 200;
        let novoObstaculo = new Obstaculo(canvas.width + espacamento, canvas.height - 70, 50, 70, 3);
        obstaculos.push(novoObstaculo);
    }
}

function iniciarGeracaoDeObstaculos() {
    setInterval(() => {
        adicionarObstaculo();
    }, 3000);
}

function desenharPontuacao() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Pontuação: ' + pontuacao, 20, 30);
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar();
        personagem.atualizarPersonagem();

        obstaculos.forEach((obstaculo) => {
            obstaculo.desenhar(obstaculo.cor);
            obstaculo.atualizarObstaculo();
        });

        personagem.verificarColisao();
        desenharPontuacao();

        requestAnimationFrame(loop);
    }
}

iniciarJogo();
