import React from 'react'

const GameRow = (props) => {
    let rowIdx = props.rowIdx
    let colIdx = -1
    return (
        props.row.map((col) => {
            colIdx++;
            return(
                <td key={rowIdx + ' ' + colIdx}
                    row={rowIdx}
                    col={colIdx}
                    onClick={props.handleBoardChange}
                > {props.board[rowIdx][colIdx] === 'X' && <h1> X</h1>}
                {props.board[rowIdx][colIdx] === 'O' && <h1>  O</h1>}
                </td>
            )
        }
        )
    )
}

export default GameRow
