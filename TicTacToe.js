
let map = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let w;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) rect(i * w, j * w, w, w);
}

let turn = -1;
let isWinner = false;

function mousePressed() {
  if (isWinner) return;
  turn *= -1;
  let i = int(mouseX / w);
  let j = int(mouseY / w);

  if (map[i][j] == 0) {
    map[i][j] = turn;

    if (turn == 1) {
      drawO(i, j);
    } else if (turn == -1) {
      drawX(i, j);
    }
  } else {
    turn *= -1;
  }

  let potentialWinner = checkForWinner();

  if (potentialWinner != 0) {
    isWinner = true;
    textSize(32);
    fill(200);
    if (potentialWinner == 1) text("Winner is O", width / 2 - w / 2, height / 2);
    else text("Winner is X", width / 2 - w / 2, height / 2);
  }
}

function checkForWinner() {
  for (let i = 0; i < 3; i++) {
    let player = map[i][0];
    let found = true;
    if (map[i][1] != player || map[i][2] != player) found = false;
    if (found) return player;
  }

  for (let i = 0; i < 3; i++) {
    let player = map[0][i];
    let found = true;
    if (map[1][i] != player || map[2][i] != player) found = false;
    if (found) return player;
  }

  let player = map[0][0];
  let found = true;
  if (map[1][1] != player || map[2][2] != player) found = false;
  if (found) return player;

  player = map[2][0];
  found = true;
  if (map[1][1] != player || map[0][2] != player) found = false;
  if (found) return player;

  return 0;
}

function drawO(i, j) {
  let centerX = i * w + w / 2;
  let centerY = j * w + w / 2;
  ellipse(centerX, centerY, w - 10, w - 10);
}

function drawX(i, j) {
  line(i * w, j * w, i * w + w, j * w + w );
  line(i * w, j * w + w, i * w + w, j * w);
}
