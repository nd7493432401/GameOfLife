let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = int(width / resolution);
  rows = int(height / resolution);

  cur_state  = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      cur_state[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if (cur_state[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
  next_state = stepLife(cur_state);
  cur_state = next_state;
}

function make2DArray(rows,cols) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function stepLife(cur_state) {
  next_state  = make2DArray(rows, cols);
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
      
      state = cur_state[i][j];

      //Update state according to rule
      if(state === 0 && n === 3) {
        next_state[i][j] = 1;
      } else if(state === 1 && (n < 2 || n > 3)) {
        next_state[i][j] = 0;
      } else {
        next_state[i][j] = state;
      }
    }
  }
  return next_state;
}