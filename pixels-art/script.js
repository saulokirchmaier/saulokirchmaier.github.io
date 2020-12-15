window.onload = function () {
  let pixelsMatrix = 5;
  let colorsPaletteQuantity = 5;
  let boardLines;
  const colorPalette = document.getElementById('color-palette');
  const buttonClear = document.getElementById('clear-board');
  let pixelBoard = document.getElementById('pixel-board');
  const boardSizeInput = document.getElementById('board-size');
  const buttonGenerateBoard = document.getElementById('generate-board');
  let selectedColor = 'black';

  // Checa o tamanho do board
  function checkSizeBoard(pixelsComparation) {
    if (pixelsComparation > 50) return 50;
    if (pixelsComparation < 5) return 5;
    return pixelsComparation;
  }

  // Cria linhas para preencher com pixels
  function createLines(linesQuantity) {
    for (let index = 0; index < linesQuantity; index += 1) {
      const newLine = document.createElement('div');
      newLine.className = 'board-line';
      pixelBoard.appendChild(newLine);
    }
  }

  // Preenche o quadro
  function fillPixelBoard(boardColumns) {
    for (let index = 0; index < boardColumns.length; index += 1) {
      fillPixelBoardLine(boardColumns[index]);
    }
  }

  // Cria o quadro
  function createBoard(linesQuantity) {
    createLines(linesQuantity);
    boardLines = document.querySelectorAll('.board-line');
    fillPixelBoard(boardLines);
  }

  // Cria  pixel
  function createPixel() {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.backgroundColor = 'white';
    return pixel;
  }

  // Preenche a linha do quadro
  function fillPixelBoardLine(lineToFill) {
    for (let index = 0; index < pixelsMatrix; index += 1) {
      const pixel = createPixel('pixel');
      lineToFill.appendChild(pixel);
    }
  }

  // Seleciona a cor dentro da paleta de cores
  function selectColor() {
    colorPalette.addEventListener('click', function (event) {
      const lastSelected = document.querySelector('.selected');
      const newSelection = event.target;
      if (event.target.className === 'color') {
        lastSelected.classList.remove('selected');
        newSelection.classList.add('selected');
        selectedColor = newSelection.style.backgroundColor;
      }
    });
  }

  // Pinta o pixel com a cor selecionada
  function paintPixelWithColorSelected() {
    pixelBoard.addEventListener('click', function (event) {
      if (event.target.className === 'pixel') {
        event.target.style.backgroundColor = selectedColor;
      }
    });
  }

  // Limpa o quadro
  function clearBoard() {
    buttonClear.addEventListener('click', function () {
      const allPixels = document.querySelectorAll('.pixel');
      for (let index = 0; index < allPixels.length; index += 1) {
        allPixels[index].style.backgroundColor = 'white';
      }
    });
  }

  // Destroi o quadro para criar outro
  function destructBoard() {
    pixelBoard = document.getElementById('pixel-board');
    boardLines = document.querySelectorAll('.board-line');
    for (let index = 0; index < boardLines.length; index += 1) {
      pixelBoard.removeChild(boardLines[index]);
    }
  }

  // Alerta de valor invalido no input
  function alertEmptyInput() {
    alert('Board inválido!');
  }

  // Gera o board
  function generateBoardNxN() {
      if (!boardSizeInput.value) alertEmptyInput();
      else {
        destructBoard();
        pixelsMatrix = checkSizeBoard(boardSizeInput.value);
        createBoard(pixelsMatrix);
      }
      boardSizeInput.value = '';
  }

  function listenerBordGenerate() {    
    buttonGenerateBoard.addEventListener('click', generateBoardNxN);
    boardSizeInput.addEventListener('keyup', function(event) {
      if (event.keyCode === 13 && boardSizeInput.value) {
        generateBoardNxN();
        boardSizeInput.value = '';
      }
    });

  }

  // Gera cor randomica
  // Fonte externa para a função https://css-tricks.com/snippets/javascript/random-hex-color/
  function generateRandonColor() {
    let randonColor = Math.floor(Math.random()*16777215).toString(16);
    randonColor = '#' + randonColor;
    return randonColor;
  }

  // Cria paleta de cores
  function createColorsPalette(quantity) {
    
    for (let index = 0; index < quantity; index += 1) {
      const nowPaletteQuantity = document.querySelectorAll('.color');
      const color = document.createElement('div');
      color.classList.add('color');
      if (nowPaletteQuantity.length < 30) {
        if (nowPaletteQuantity.length === 0) {
          color.style.backgroundColor = 'rgb(0,0,0)';
          color.classList.add('selected');
          selectedColor = 'rgb(0,0,0)';
        } else if (nowPaletteQuantity.length === 1) {
          color.style.backgroundColor = 'rgb(255,255,255)';
        } else color.style.backgroundColor = generateRandonColor();
        if(!color.style.backgroundColor) color.style.backgroundColor = generateRandonColor();
        colorPalette.appendChild(color);
      }
    }
  }

  // Gerar nova paleta de cores
  function newColorsPalette() {
    const paletteQauntity = document.querySelector('#palette-quantity');
    if (paletteQauntity.value ) createColorsPalette(paletteQauntity.value);
    paletteQauntity.value = '';
  }
  
  function listenerNewColorsPalette() {
    const buttonGererateNewColors = document.getElementById('add-colors');
    const paletteQauntity = document.querySelector('#palette-quantity');

    buttonGererateNewColors.addEventListener('click', newColorsPalette);
    paletteQauntity.addEventListener('keyup', function(event) {
      if (event.keyCode === 13 && paletteQauntity.value) {
        newColorsPalette();
      }
    })
  }

  function destructColorsPalette() {
    const palette = document.querySelector('#color-palette');
    const paletteQauntity = document.querySelectorAll('.color');
    for (let index = 0; index < paletteQauntity.length; index += 1) {
      palette.removeChild(paletteQauntity[index]);
    }
  };

  function generateNewColorsPalette() {
    const newColors = document.querySelector('#new-colors');
    
    newColors.addEventListener('click', function() {
      const paletteQauntity = document.querySelectorAll('.color');
      destructColorsPalette();
      createColorsPalette(paletteQauntity.length);
    });
  }

  checkSizeBoard();
  createBoard(pixelsMatrix);
  selectColor();
  paintPixelWithColorSelected();
  clearBoard();
  createColorsPalette(colorsPaletteQuantity);
  newColorsPalette();
  listenerBordGenerate();
  listenerNewColorsPalette();
  generateNewColorsPalette();
};
