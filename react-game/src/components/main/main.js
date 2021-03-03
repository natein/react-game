import React, { Component } from 'react';
import './mainc.scss';

// import { MessagePanel } from '../message/messagePanel';

const cellsClassNames = [
  { fieldSize: 3, className: 'field-size-3' },
  { fieldSize: 4, className: 'field-size-4' },
  { fieldSize: 5, className: 'field-size-5' }
];

const cellContent = [
  { cellValue: -1, content: '' },
  { cellValue: 0, content: 'O' },
  { cellValue: 1, content: 'X' },
];

export class Main extends Component {
  constructor(props) {
    super(props);

    this.isComputer = false;    
    this.state = {
      showMessage: false,
    };
  }
  
  clickCell(evt) {
    const clickedCell = evt.target.dataset.cell;
    const { gameField, changeFinished, setCellValue, setWinnedCells } = this.props;
    const value = (this.isComputer) ? 0 : 1;
    
    if(gameField[clickedCell] === -1) {
      setCellValue(clickedCell, value);
      
      const winCell = checkWin(gameField, value);
      if(winCell.length) {
        setWinnedCells(winCell);
        changeFinished(true);
        
      } else {
        if(returnFreeCell(gameField).length) {
          this.isComputer = true;
          setTimeout(this.computerAnswer.bind(this), 200);
        }
      }      
    }
  }

  computerAnswer() {
    const { gameField, changeFinished, setCellValue, setWinnedCells } = this.props;
    const freeCells = returnFreeCell(gameField);
    if(freeCells.length) {
      const value = (this.isComputer) ? 0 : 1;
      
      const num = getRandom(0, freeCells.length - 1);
      setCellValue(freeCells[num], value);
      
      const winCell = checkWin(gameField, value);
      if(winCell.length) {
        setWinnedCells(winCell);
        changeFinished(true);
      }
      this.isComputer = false;
    } else {
      
    }
  }

  render() {
    const {fieldSize, gameField, winnedCells, isTexture, isFinished} = this.props;

    const fieldClassName = (isTexture)
      ? "game-field game-field-textured"
      : "game-field";

    const sizeClass = cellsClassNames
      .filter(elem => elem.fieldSize === fieldSize)[0].className;

    let cellClassName = (isTexture) 
      ? `game-cell ${sizeClass} game-cell-textured`
      : `game-cell ${sizeClass}`;

    const cells = gameField.map((elem, idx) => {
      const content = cellContent
        .filter(item => item.cellValue === elem)[0].content;
        
      const resultClassName = (winnedCells[idx] === 1) 
        ? cellClassName + ' winned' : cellClassName;
        
      const onClickCommand = (isFinished) ? () => {} : this.clickCell.bind(this);
      
      return <div
          className={resultClassName}
          key={idx.toString()}
          data-cell={idx}
          onClick={onClickCommand}
        >
        <span>{content}</span></div>
    });

    return (
      <main className="main">
        <div className="container">
          <div className={fieldClassName}>
            {cells}
          </div>
        </div>
      </main>
      
    );
  }
}

function returnFreeCell(arr) {
  return arr.reduce((acc, item, idx) => {
    if (item === -1) acc.push(idx);
    return acc;
  }, []);
}

function checkWin(arr, value) {
  const fieldSize = Math.sqrt(arr.length);

// check horizontal lines
  for(let i = 0; i < arr.length; i += fieldSize) {
    const horz = arr.slice(i, i + fieldSize);
    if (horz.every(item => item === value)) 
      return Array.from({length: fieldSize}, (v, k) => k + i);
  }

// check diagonal lines
  let diag1 = [];
  for(let i = 0; i < arr.length; i = i + fieldSize + 1) {
    if(arr[i] === value) diag1.push(i);
  }
  if (diag1.length === fieldSize) return diag1;

  let diag2 = [];
  for(let i = 0; i < arr.length; i += 1) {
    const row = (i - i % fieldSize)/fieldSize;
    if (i === fieldSize * row + fieldSize - row - 1 && arr[i] === value)
      diag2.push(i);
  }
  if (diag2.length === fieldSize) return diag2;

// check vertical lines
  let vert = [];
  for(let i = 0; i < fieldSize; i++) {
    for(let j = 0; j < arr.length; j++) {
      const row = (j - j % fieldSize)/fieldSize;
      if(fieldSize * row + i === j && arr[j] === value) vert.push(j);
    }
    if(vert.length === fieldSize) return vert;
    else vert = [];
  }
  return [];
}

function getRandom(fromNumber, toNumber) {
  const difference = toNumber - fromNumber;
  const rand = Math.ceil(Math.random() * (difference + 1)) + fromNumber;
  return rand - 1;
}
