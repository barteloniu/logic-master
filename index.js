const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
const colors = ["green", "blue", "red", "yellow", "brown", "orange"]

let isPicking = false;
let target = []
let pinsPos = []
let guesses = [
     [null, null, null, null]
]
let mousePos = {
     x: 0,
     y: 0
}


for(let i = 0; i < 4; i++){
  let r
  do{
    r = Math.floor(Math.random() * colors.length)
  }
  while(target.includes(colors[r]))
  target.push(colors[r])
}

function checkGuess(guess) {
  let r = []
  guess.forEach((item, index) => {
    if(target.indexOf(item) == index){
      r.push(2)
    }
    else if(target.indexOf(item) != -1){
      r.push(1)
    }
    else{
      r.push(0)
    }
  })
  console.log(r)
  return r
}

function drawCircle(x, y, r) {
  ctx.beginPath()
  ctx.arc(x + r, y + r, r, 0, 2*Math.PI)
  ctx.fill()
}

function drawRow(y){
     ctx.fillStyle = "#fff"
     ctx.fillRect(0, y + 5, 320, 60)
     ctx.fillStyle = "orange"
     for(let i = 0; i < 4; i++){
          pinsPos.push({x: 10 + 60 * i, y: y + 10})
          drawCircle(pinsPos[pinsPos.length - 1].x, pinsPos[pinsPos.length - 1].y, 25)
     }
     ctx.fillStyle = "#999"
     ctx.fillRect(260, y + 10, 50, 50)
     ctx.fillStyle = "#fff"
     drawCircle(263, y + 13, 10)
     drawCircle(287, y + 13, 10)
     drawCircle(263, y + 37, 10)
     drawCircle(287, y + 37, 10)
}

function drawBottomMenu() {
     ctx.fillStyle = "#999"
     ctx.fillRect(0, 420, 320, 60)
}

function drawBoard() {
  ctx.clearRect(0, 0, 320, 480)
  pinsPos = []
  for (let i = 0; i < 6; i++) {
    drawRow(70 * i)
  }
  drawBottomMenu()
  console.log(pinsPos);
}

function colorPicker(item){
     drawBoard()
     ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
     ctx.fillRect(0, 0, 320, 480)
     ctx.fillStyle = "#fff"
     ctx.fillRect(mousePos.x, mousePos.y, 100, 100)
     console.log(item)
}

canvas.addEventListener("mousemove", (e) => {
     let rect = canvas.getBoundingClientRect()
     mousePos.x = e.clientX - rect.left
     mousePos.y = e.clientY - rect.top
})

canvas.addEventListener("click", () => {
     pinsPos.forEach((item) => {
          let a = mousePos.x - item.x - 25
          let b = mousePos.y - item.y - 25
          let c = Math.sqrt(a*a + b*b)
          if(c <= 25){
               colorPicker(item)
          }
     })
})

console.log(target)
drawBoard()
