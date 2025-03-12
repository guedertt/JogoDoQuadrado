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
    constructor (x,y,altura, largura){
        super(x,y,altura, largura)
        this.#pulando = false
        this.#velocidadeY = 0
    }
    saltar = function(){
        personagem.#velocidadeY = 12;
        personagem.#pulando = true;
    }
    get pulando() {
        return this.#pulando
    }
}

class Obstaculo extends Entidade{
    constructor (x,y,altura, largura,velocidadeX){
        super(x,y, altura, largura)
        this.velocidadeX = velocidadeX
    }
}

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
        //atualizarPersonagem();
        //desenharObstaculo();
        //atualizarObstaculo();
        //verificarColisao(); // Checa colisão a cada frame
        requestAnimationFrame(loop);
    }
}

loop()