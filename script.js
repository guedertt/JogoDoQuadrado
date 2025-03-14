const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;
let personagem;
let obstaculo;

function iniciarJogo() {
    personagem = new Personagem(100, canvas.height - 50, 50, 50);
    obstaculo = new Obstaculo(canvas.width, canvas.height - 70, 50, 70, 3);
    gameOver = false;
    loop();
}

function reiniciarJogo() {
    setTimeout(() => {
        iniciarJogo();
    }, 100); // Pequeno delay para evitar problemas com o alert
}

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.saltar();
    }
});

class Entidade {
    #gravidade;
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }

    get gravidade() {
        return this.#gravidade;
    }

    desenhar(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #pulando;
    #velocidadeY;
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#pulando = false;
        this.#velocidadeY = 0;
    }
    saltar() {
        this.#velocidadeY = 15;
        this.#pulando = true;
    }
    get pulando() {
        return this.#pulando;
    }
    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadeY -= this.gravidade;
            this.y -= this.#velocidadeY;
            if (this.y >= canvas.height - 50) {
                this.#velocidadeY = 0;
                this.#pulando = false;
                this.y = canvas.height - 50;
            }
        }
    }
    verificarColisao() {
        let margem = 5;
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
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidadeX) {
        super(x, y, largura, altura);
        this.velocidadeX = velocidadeX;
    }
    atualizarObstaculo() {
        this.x -= this.velocidadeX;
        if (this.x <= -this.largura) {
            this.x = canvas.width;
            this.velocidadeX = Math.min(this.velocidadeX + 4, 10);

            let nova_altura = Math.random() * 50 + 100;
            this.altura = nova_altura;
            this.y = canvas.height - nova_altura;
        }
    }
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar('black');
        personagem.atualizarPersonagem();
        obstaculo.desenhar('red');
        obstaculo.atualizarObstaculo();
        personagem.verificarColisao();
        requestAnimationFrame(loop);
    }
}

iniciarJogo();
