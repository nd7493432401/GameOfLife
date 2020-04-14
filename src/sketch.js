function make2DArray(rows,cols) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function stepLife(next_state, cur_state) {
  //Loop over all cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      //Count neighbors
      let n = 0
      for(let dx=-1; dx<=1; ++dx) {
        for(let dy=-1; dy<=1; ++dy) {
          if(dx === 0 && dy === 0) {
            continue
          }
          n += cur_state[(cols+i+dx)%cols][(rows+j+dy)%rows];
        }
      }
      
      //Update state according to rule
      if(n === 3 || n === 3 + cur_state[i][j]) {
        next_state[i][j] = 1;
      } else {
        next_state[i][j] = 0;
      }
    }
  }
}

let grid;
let cols;
let rows;
let resolution = 5;

function setup() {
  createCanvas(600,500);
  cols = width / resolution;
  rows = height / resolution;

  state  = make2DArray(rows, cols);
  next_state  = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      state[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if (state[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  stepLife(next_state,state);
  state = next_state;
}