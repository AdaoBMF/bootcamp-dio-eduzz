let order = [];
let showOrder = [];
let clickedOrder = [];
let score = 0;

/*
0 => green
1 => red
2 => yellow
3 => blue
*/

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//Cria ordem aleatória de cores
const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  console.log(colorOrder);
  order[order.length] = colorOrder;
  const col = showColor(colorOrder);
  console.log(col);
  showOrder.push(col);
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//acende a próxima cor
const lightColor = (element, number) => {
  let time = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, time - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  },1250); // adicionado tempo para melhorar a visualização/jogabilidade 
};

//checa se as cores foram clicadas estão na ordem correta
const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nivel!`);
    nextLevel();
  }
};

//função para o clique do usuário
const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  },250);

};

//função que retorna a cor
const createColorElement = (color) => {
  let res = "";
  switch (color) {
    case 0:
      res = green;
      break;
    case 1:
      res = red;
      break;
    case 2:
      res = yellow;
      break;
    case 3:
      res = blue;
      break;
  }
  return res;
};
//função que retorna a cor para ser mostrada ao usuário no fim do jogo
const showColor = (color) => {
  let res = "";
  switch (color) {
    case 0:
      res = "verde";
      break;
    case 1:
      res = "vermelho";
      break;
    case 2:
      res = "amarelo";
      break;
    case 3:
      res = "azul";
      break;
  }
  return res;
};

//função para próximo nível do jogo
const nextLevel = () => {
  score++;
  shuffleOrder();
}

//função para game over
const gameOver = () => {
  alert(`Pontuação: ${score}!\nVocê perdeu!\nSequência correta: ${showOrder}\nClique ok para reiniciar`);
  order = [];
  showOrder = [];
  clickedOrder = [];

  start();
}

const start = () => {
  alert(`Bem vindo ao Gênesis!\nIniciando novo Jogo!`);  
  
  nextLevel();
  score = 0;
}

green.onclick = () => (click(0));
red.onclick = () => (click(1));
yellow.onclick = () => (click(2));
blue.onclick = () => (click(3));

start();
