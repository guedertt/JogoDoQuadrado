const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;


document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.saltar()
    }
});

class Entidade{
    #gravidade
    constructor(x,y, largura, altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }

    get gravidade(){
        return this.#gravidade
    }

    desenhar = function(cor){
        ctx.fillStyle = cor;
        ctx.fillRect(this.x,this.y,this.largura,this.altura);
    }
}

class Personagem extends Entidade{
    #pulando
    #velocidadeY
    constructor (x,y,largura, altura){
        super(x,y,altura, largura)
        this.#pulando = false
        this.#velocidadeY = 0
    }
    saltar = function(){
        this.#velocidadeY = 12;
        this.#pulando = true;
    }
    get pulando() {
        return this.#pulando
    }
    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadeY -= this.gravidade;
            this.y -= this.#velocidadeY 
            if (this.y >= canvas.height - 50) {
                this.#velocidadeY = 0
                this.#pulando = false
                this.y = canvas.height-50
            }
        }
    }
}


class Obstaculo extends Entidade{
    constructor (x,y,largura, altura,velocidadeX, gravidade){
        super(x,y, altura, largura, gravidade)
        this.velocidadeX = velocidadeX
    }
    atualizarObstaculo() {
        this.x -= this.velocidadeX;    
        if (this.x <= -this.largura) {
            this.x = canvas.width;
            this.velocidadeX = Math.min(this.velocidadeX + 1, 10);
    
            let nova_altura = Math.random() * 50 + 100;
            this.altura = nova_altura;
            this.y = canvas.height - nova_altura;
        }
    }
}

const obstaculo = new Obstaculo(
    canvas.width, // Começa no lado direito da tela
    canvas.height - 50, // No chão
    30, // Largura do obstáculo
    50, // Altura do obstáculo
    3 // Velocidade
)

const personagem = new Personagem
(
    100,
    canvas.height - 50,
    50,
    50,
)

function loop() {
    if (gameOver == false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar('black')
        personagem.atualizarPersonagem()
        obstaculo.desenhar('red')
        obstaculo.atualizarObstaculo()
        requestAnimationFrame(loop);       
    }
}

loop()