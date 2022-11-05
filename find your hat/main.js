const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldState){
    this.fieldState = fieldState;
    this.xpos = 0;
    this.ypos = 0;
    this.sizey = fieldState.legnth;
    this.sizex = fieldState[0].length;
  }
  print(){
    let raw = "";
    this.fieldState.forEach(function (item, index){
      raw += item.join("") + '\n';
    })
    console.log(raw);
  }
  main(){
    while (true) {
      let input = prompt("move in what diriction? u/d/r/l: ");
      if (input === "u"){
        this.ypos -= 1;
      }
      if (input === "d"){
        this.ypos += 1;
      }
      if (input === "l"){
        this.xpos -= 1;
      }
      if (input === "r"){
        this.xpos += 1;
      }
      if (this.ypos < 0 || this.ypos > this.sizey - 1 || this.xpos < 0 || this.xpos> this.sizex -1){
        console.log("out of bounds");
        return 0;
      }
      let character = this.fieldState[this.ypos][this.xpos];
      if (character === hole){
        console.log("fell in hole, you lose");
        return 0;
      }
      if (character === hat){
        console.log("got hat, you win");
        return 1;
      }
      this.fieldState[this.ypos][this.xpos] = pathCharacter;
      this.print();
    }
  }
  static generateField(h, w, p){
    //i guess this could theoritcally generate an impossible field but i dont care
    let field = [];
    let row = [];
    for (let i = 0; i < h; i++){
      for (let j = 0; j < w; j++){
        if (Math.random() < p){
          row.push(hole);
        }else{
          row.push(fieldCharacter);
        }
      }
      field.push(row);
      row = []
    }
    let hatx = 0
    let haty = 0
    while (hatx+haty === 0){
      hatx = Math.floor(Math.random()*w);
      haty = Math.floor(Math.random()*h);
    }
    field[haty][hatx] = hat;
    field[0][0] = pathCharacter;
    return field;
  }
}


const myField = new Field(Field.generateField(6, 6, .2));
myField.print();
myField.main();