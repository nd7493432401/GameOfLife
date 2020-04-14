let grid;
let cols;
let rows;
let x_offset = 0;
let y_offset = 50;
let resolution;
var bgColor = [0, 0, 0];
// GUI Object
let gui;
let resetButton;
let resolutionSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the GUI
  gui = createGui();
  resetButton = createButton("Reset", 10,10)
  resolutionSlider = createSlider("Resolution", 200, 10, 400, 32, 3, 40);

  resolution = resolutionSlider.val;

  resetState();
}

function draw() {
  // Set Background Color
  background(bgColor);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * resolution + x_offset;
      let y = j * resolution + y_offset;
      if (cur_state[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  noFill();
  stroke(255);
  rect(x_offset, y_offset, cols * resolution - 1, rows * resolution - 1);

  next_state = stepLife(cur_state);
  cur_state = next_state;
  drawGui();

  if(resetButton.isPressed) {
    print(resetButton.label + " is pressed.");
    resetState();
  }

  if(resolutionSlider.isChanged) {
    print(resolutionSlider.label + " = " + resolutionSlider.val );
    resetState();
    resolution = resolutionSlider.val;
  }
}

function resetState() {

  cols = int((width - x_offset)/ resolution);
  rows = int((height - y_offset) / resolution);
  
  // resolution = resolutionSlider.val - 5;

  cur_state  = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      cur_state[i][j] = floor(random(2));
    }
  }
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


// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}