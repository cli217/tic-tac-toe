import React from 'react'
import Gameboard from './Gameboard'

export default class tickTacToe extends React.Component {
  constructor() {
    super()
    this.state = {
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      player1: 'O',
      player2: 'X',
      computer: 'X',
      p1Turn: true,
      numOfPlayer: 1,
    }
    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handlePlayerChange = this.handlePlayerChange.bind(this)
    this.aiSelfPlay = this.aiSelfPlay.bind(this)
    this.handleClearBoard = this.handleClearBoard.bind(this)
  }

  findOBestMove() {
    let bestMove = {
      row: 0,
      col: 0,
    }
    const board = this.state.board
    const player = this.state.player1
    let bestVal = 500
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          board[row][col] = player
          const moveVal = this.minimax(board, 0, true);
          board[row][col] = null

          if (moveVal < bestVal) {
            bestMove.row = row
            bestMove.col = col
            bestMove.value = moveVal
            bestVal = moveVal
          }
        }
      }
    }
    return bestMove
  }

  findXBestMove() {
    let bestMove = {
      row: 0,
      col: 0,
    }
    const board = this.state.board
    const computer = this.state.computer
    let bestVal = -500
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          board[row][col] = computer
          const moveVal = this.minimax(board, 0, false);
          board[row][col] = null

          if (moveVal > bestVal) {
            bestMove.row = row
            bestMove.col = col
            bestMove.value = moveVal
            bestVal = moveVal
          }
        }
      }
    }
    return bestMove
  }

  minimax(board, depth, isMax) {
    const computer = this.state.computer
    const player = this.state.player1
    const score = this.eval(board)
    if (score === 10 || score === -10) return score - depth
    if (this.gameOver(board)) return 0

    if (isMax) {
      let bestVal = -500
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            board[row][col] = computer
            bestVal = Math.max(bestVal, this.minimax(board, depth + 1, !isMax));
            board[row][col] = null
          }
        }
      }
      return bestVal
    }

    else {
      let bestVal = 500
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            board[row][col] = player
            bestVal = Math.min(bestVal, this.minimax(board, depth + 1, !isMax));
            board[row][col] = null
          }
        }
      }
      return bestVal
    }
  }

  eval(board) {
    const computer = this.state.computer
    const player = this.state.player1
    //[X, X, X]
    //[_, _, _]
    //[_, _, _]
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === board[row][1] && board[row][2] === board[row][1]) {
        if (board[row][0] === computer) {
          return 10
        }
        else if (board[row][0] === player) {
          return -10
        }
      }
    }

    //[X, _, _]
    //[X, _, _]
    //[X, _, _]
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === board[1][col] && board[2][col] === board[1][col]) {
        if (board[0][col] === computer) {
          return 10
        }
        else if (board[0][col] === player) {
          return -10
        }
      }
    }

    //[X, _, _]
    //[_, X, _]
    //[_, _, X]
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (board[0][0] === computer) {
        return 10
      }
      else if (board[0][0] === player) {
        return -10
      }
    }

    //[_, _, X]
    //[_, X, _]
    //[X, _, _]
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (board[0][2] === computer) {
        return 10
      }
      else if (board[0][2] === player) {
        return -10
      }
    }
    return 0
  }

  gameOver(board) {
    if (this.eval(board) === 10 || this.eval(board) === -10) {
      return true
    }

    for (let row = 0; row < 3; row++) {
      if (board[row].includes(null)) {
        return false
      }
    }

    return true
  }

  boardEmpty(board) {
    for (let row = 0; row < 3; row++) {
      if (board[row].includes('X') || board[row].includes('O')) {
        return false
      }
    }
    return true
  }

  handleClearBoard() {
    clearInterval(this.aiPlay)
    this.setState({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    })
  }

  handlePlayerChange(event) {
    if (this.boardEmpty(this.state.board) || this.gameOver(this.state.board)) {
      this.setState({ numOfPlayer: event.target.value })
    }
  }

  handleBoardChange(event) {
    let newboard = this.state.board
    const row = event.target.attributes['row'].value
    const col = event.target.attributes['col'].value
    if (Number(this.state.numOfPlayer) === 2) {
      if (newboard[row][col] === null) {
        if (this.state.p1Turn) {
          newboard[row][col] = this.state.player1
          this.setState({ board: newboard, p1Turn: !this.state.p1Turn })
        }
        else {
          newboard[row][col] = this.state.player2
          this.setState({ board: newboard, p1Turn: !this.state.p1Turn })
        }
      }
    }

    if (Number(this.state.numOfPlayer) === 1) {
      if (newboard[row][col] === null) {
        newboard[row][col] = this.state.player1
        this.setState({ board: newboard })
        if (!this.boardEmpty(this.state.board)) {
          const compMove = this.findXBestMove()
          newboard[compMove.row][compMove.col] = this.state.computer
          this.setState({ board: newboard })
        }
      }
    }
  }

  aiSelfPlay() {
    const newboard = this.state.board
    this.aiPlay = setInterval(() => {
      if (!this.gameOver(this.state.board)) {
        const comp1Move = this.findOBestMove()
        newboard[comp1Move.row][comp1Move.col] = this.state.player1
        this.setState({ board: newboard })
        if (!this.gameOver(this.state.board)) {
          const comp2Move = this.findXBestMove()
          newboard[comp2Move.row][comp2Move.col] = this.state.computer
          this.setState({ board: newboard })
        }
      }
    }, 500);
  }

  render() {
    return (
      <div id='tic tac toe'>
        <h1>Tic Tac Toe</h1>
        <div>
          <button id='Clear Board' onClick={this.handleClearBoard}>Clear Board</button>
          <label>Number of Players:</label>
          <select value={this.state.numOfPlayer} onChange={this.handlePlayerChange}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          {Number(this.state.numOfPlayer) === 0 &&
            <button id='Ai Start' onClick={this.aiSelfPlay}>Start</button>}
        </div>
        {Number(this.state.numOfPlayer) === 0 ?
          <h1>Ai vs Ai</h1> :
          (this.state.p1Turn ? <h1>Player 1's Turn</h1> : <h1>Player 2's Turn</h1>)
        }

        <table>
          <tbody>
            <Gameboard board={this.state.board} handleBoardChange={this.handleBoardChange} />
          </tbody>
        </table>
        {this.eval(this.state.board) === -10 && <h1>GameOver, player1 has won!!!</h1>}
        {Number(this.state.numOfPlayer) === 2 ?
          (this.eval(this.state.board) === 10 && <h1>GameOver, player2 has won!!!</h1>)
          :
          (this.eval(this.state.board) === 10 && <h1>GameOver, computer has won!!!</h1>)}
        {this.eval(this.state.board) === 0 && (this.gameOver(this.state.board) === true && <h1>GameOver, it is a tie!!</h1>)}
      </div>
    )
  }
}

module.exports = tickTacToe


