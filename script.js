// class Jogador {
    constructor(nome, forma) {
        this.nome = nome;
        this.forma = forma;
    }
}

class Jogadas {
    constructor(jogo) {
        this.jogo = jogo;
    }

    setaCelula(cel, pos) {
        if (this.jogo.tabuleiro[pos] === undefined) {
            cel.innerHTML = this.jogo.jogadorAtual.forma;
            this.jogo.tabuleiro[pos] = this.jogo.jogadorAtual.forma;

            if (this.verificarVitoria()) {
                return;
            }

            this.jogo.jogadorAtual = this.jogo.jogadorAtual === this.jogo.jogador1 ? this.jogo.jogador2 : this.jogo.jogador1;
            this.jogo.setaJogadorAtual();
        } else {
            alert('Ops. Já marcado!');
        }

        if (this.tabuleiroIsFilled()) {
            alert('Ninguém ganhou! :(. Tente novamente');
            this.jogo.reset();
        }
    }

    verificarVitoria() {
        const linhas = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of linhas) {
            if (this.jogo.tabuleiro[a] && this.jogo.tabuleiro[a] === this.jogo.tabuleiro[b] && this.jogo.tabuleiro[a] === this.jogo.tabuleiro[c]) {
                alert(`${this.jogo.tabuleiro[a]} ganhou`);
                this.jogo.reset();
                return true;
            }
        }
        return false;
    }

    tabuleiroIsFilled() {
        return this.jogo.tabuleiro.every(cell => cell !== undefined);
    }
}

class Jogo {
    constructor() {
        this.jogador1 = null;
        this.jogador2 = null;
        this.jogadorAtual = null;
        this.tabuleiro = new Array(9).fill(undefined);
        this.formas = ['X', 'O'];
        this.jogadas = new Jogadas(this);
    }

    inicioDoJogo() {
        let nomeJogador1 = document.querySelector('#nomeJogador1').value;
        let nomeJogador2 = document.querySelector('#nomeJogador2').value;
        this.jogador1 = new Jogador(nomeJogador1, 'X');
        this.jogador2 = new Jogador(nomeJogador2, 'O');
        this.jogadorAtual = this.jogador1;
        document.querySelector('#jogadorAtual').innerHTML = `Jogador Atual: ${this.jogadorAtual.nome}`;

        // Exibe o tabuleiro
        document.getElementById('game').style.visibility = 'visible';

        this.setaJogadorAtual();
    }

    setaJogadorAtual() {
        let jogadorDaVez = document.querySelector('#jogadorAtual');
        jogadorDaVez.innerHTML = `Jogador Atual: ${this.jogadorAtual.nome}`;
    }

    reset() {
        window.location.reload();
    }
}

const jogo = new Jogo();
window.onload = function() {
    const startButton = document.getElementById('startButton');
    const inputs = document.querySelectorAll('#nomeJogador1, #nomeJogador2');

    inputs.forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                startButton.click();
            }
        });
    });
};
function validarNomes() {
    const nomeJogador1 = document.getElementById('nomeJogador1').value.trim();
    const nomeJogador2 = document.getElementById('nomeJogador2').value.trim();
    
    if (nomeJogador1 === '' || nomeJogador2 === '') {
        alert('Os nomes dos jogadores não podem estar vazios.');
        return false;
    }
    
    if (nomeJogador1.toLowerCase() === nomeJogador2.toLowerCase()) {
        alert('Os nomes dos jogadores não podem ser iguais.');
        return false;
    }
    
    return true;
}

window.onload = function() {
    console.log('Conteudo carregado');

    const startButton = document.getElementById('startButton');
    console.log('Botão Start:', startButton);

    startButton.addEventListener('click', function(event) {
        console.log('Botão Start clicado');
        if (!validarNomes()) {
            event.preventDefault();
            console.log('Validação falhou');
        }
    });
}; //

// Classe Jogador
class Jogador {
    constructor(nome, simbolo) {
      this.nome = nome;
      this.simbolo = simbolo;
    }
  }

  // Classe Jogada
  class Jogada {
    constructor(jogador, linha, coluna) {
      this.jogador = jogador;
      this.linha = linha;
      this.coluna = coluna;
    }
  }

  // Classe Jogo
  class Jogo {
    constructor(jogador1, jogador2) {
      this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
      this.jogador1 = jogador1;
      this.jogador2 = jogador2;
      this.jogadorAtual = jogador1;
      this.jogoAtivo = true;
    }

    inicializarJogo() {
      this.tabuleiro = Array.from({ length: 3 }, () => Array(3).fill(' '));
      this.jogadorAtual = this.jogador1;
      this.jogoAtivo = true;
      atualizarTabuleiro();
    }

    realizarJogada(jogada) {
      if (this.tabuleiro[jogada.linha][jogada.coluna] === ' ' && this.jogoAtivo) {
        this.tabuleiro[jogada.linha][jogada.coluna] = jogada.jogador.simbolo;
        atualizarTabuleiro();
        if (this.verificarVencedor()) {
          alert(`O jogador ${jogada.jogador.nome} venceu!`);
          this.jogoAtivo = false;
        } else {
          this.alternarJogador();
        }
      } else {
        alert("Jogada inválida!");
      }
    }

    verificarVencedor() {
      const simbolo = this.jogadorAtual.simbolo;
      const linhas = this.tabuleiro.some(linha => linha.every(celula => celula === simbolo));
      const colunas = [0, 1, 2].some(col => this.tabuleiro.every(linha => linha[col] === simbolo));
      const diagonais =
        [0, 1, 2].every(i => this.tabuleiro[i][i] === simbolo) ||
        [0, 1, 2].every(i => this.tabuleiro[i][2 - i] === simbolo);

      return linhas || colunas || diagonais;
    }

    alternarJogador() {
      this.jogadorAtual = this.jogadorAtual === this.jogador1 ? this.jogador2 : this.jogador1;
    }
  }

  const jogador1 = new Jogador("Alice", "X");
  const jogador2 = new Jogador("Bob", "O");
  const jogo = new Jogo(jogador1, jogador2);

  function atualizarTabuleiro() {
    const tabuleiroDiv = document.getElementById("tabuleiro");
    tabuleiroDiv.innerHTML = '';
    jogo.tabuleiro.forEach((linha, i) => {
      linha.forEach((celula, j) => {
        const celulaDiv = document.createElement("div");
        celulaDiv.className = "celula";
        celulaDiv.innerText = celula;
        celulaDiv.onclick = () => jogo.realizarJogada(new Jogada(jogo.jogadorAtual, i, j));
        tabuleiroDiv.appendChild(celulaDiv);
      });
    });
  }

  function reiniciarJogo() {
    jogo.inicializarJogo();
  }

  window.onload = () => {
    jogo.inicializarJogo();
  };
