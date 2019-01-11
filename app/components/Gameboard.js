import React from 'react'
import GameRow from './GameRow'

const gameboard = (props) => {
  const board = props.board
  let rowIdx = -1
  return (
    board.map(row => {
      rowIdx++;
      return (
        <tr key={board.indexOf(row)}>
          <GameRow {...props} row={row} rowIdx={rowIdx} />
        </tr>
      )
    })
  )
}

export default gameboard

