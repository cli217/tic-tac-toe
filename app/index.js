import React from 'react';
import ReactDOM from 'react-dom';

import TicTacToe from './components/TickTacToe'

ReactDOM.render(
  <div>
  <TicTacToe />
  </div>,
  document.getElementById('main') // make sure this is the same as the id of the div in your index.html
);
