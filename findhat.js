const prompt = require("prompt-sync")({ sigint: true });

//Field class
class Field {
  //constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.playerPosition = { x: 0, y: 0 };
    this.message = "";
    this.isGameOver = false;
    this.field = this.generateField(height, width);
  }
  //generateField
  generateField(height, width) {
    let field = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill("░"));

    field[this.playerPosition.y][this.playerPosition.x] = "*";

    let hatplaced = false;
    while (!hatplaced) {
      let hatPosition = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
      };
      if (hatPosition.y != 0 || hatPosition.x != 0) {
        field[hatPosition.y][hatPosition.x] = "^";
        hatplaced = true;
      }
    }

    for (let i = 0; i < (width * height) / 5; i++) {
      let holeplaced = false;
      while (!holeplaced) {
        let holePosition = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
        };

        if (
          (holePosition.x != 0 || holePosition.y != 0) &&
          field[holePosition.y][holePosition.x] != "^"
        ) {
          field[holePosition.y][holePosition.x] = "O";
          holeplaced = true;
        }
      }
    }

    return field;
  }
  print() {
    process.stdout.write("\x1B[2J\x1B[0f");
    console.log(this.message);
    for (let row of this.field) {
      console.log(row.join(" "));
    }
    console.log("...............");
  }

  move(direction) {
    let oldY = this.playerPosition.y;
    let oldX = this.playerPosition.x;
    switch (direction) {
      case "d":
        if (oldY < this.height - 1) {
          this.playerPosition.y += 1;
          this.message = "";
        } else {
          this.message = "cant move";
        }
        break;
      case "u":
        if (oldY > 0) {
          this.playerPosition.y -= 1;
          this.message = "";
        } else {
          this.message = "cant move,try again";
        }
        break;
      case "r":
        if (oldX < this.width - 1) {
          this.playerPosition.x += 1;
          this.message = "";
        } else {
          this.message = "cant move,try again";
        }
        break;
      case "l":
        if (oldX > 0) {
          this.playerPosition.x -= 1;
          this.message = "";
        } else {
          this.message = "cant move,try again";
        }
        break;
    }
    let newY = this.playerPosition.y;
    let newX = this.playerPosition.x;
    this.field[oldY][oldX] = "░";
    if (this.field[newY][newX] === "O") {
      this.message = "You die!";
      this.field[newY][newX] = "X";
      this.isGameOver = true;
    } else if (this.field[newY][newX] === "^") {
      this.message = "You win!";
      this.field[newY][newX] = "W";
      this.isGameOver = true;
    } else {
      this.field[newY][newX] = "*";
    }
  }
}
const myField = new Field(6, 7);

function theGame(field) {
  while (!field.isGameOver) {
    field.print();

    const direction = prompt("Which way?");
    field.move(direction);
  }
  if (field.isGameOver) {
    field.print();
    console.log('Game is over!');
  }
}
theGame(myField);
