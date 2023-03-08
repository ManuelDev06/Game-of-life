let rows = 80;
let columns = 80
let side = 15

let reproduce = false

let picture = []

document.addEventListener("keydown",(e)=>{ //take keyboard control
    e.preventDefault() // Avoid scroll movement
    switch(e.key){
        case 'ArrowRight':
            nextState()
            break;
        case ' ':
            changeReproduction();
            break;
        case 'Backspace':
            clean();
            break

        default:
            break;
    }
})

setInterval(() => {
    if(reproduce){
        nextState()
    }
}, 200)

function changeReproduction(){
    reproduce = !reproduce
    if(reproduce){
        document.body.style.background = "white"
    }else{
        console.log("entro")
        document.body.style.background = "#f0f0ff"
    }
}

generateTable()

function generateTable(){
    let html = 
          "<table cellpadding=0 cellspacing=0 id='board'>"
    for(let y = 0; y < rows; y++){
        html += "<tr>"
        for(let x = 0; x < columns; x++){
            html += `<td id="cell-${x+"-"+y}" onmouseup="changeState(${x},${y})">`
            html += "</td>"
        }
        html += "</tr>"
    }
    html += "<table/>"
    const container = document.getElementById("container-table")
    container.innerHTML = html
    const board = document.getElementById("board");
    board.style.width = side * columns + "px";
    board.style.height = side * rows + "px" 
}

function changeState(x,y){
    const cell = document.getElementById(`cell-${x+'-'+y}`)
    if(cell.style.background != "black"){
        cell.style.background = "black"
    } else {
        cell.style.background = ""
    }
}

function clean(){
    for(let x = 0; x < columns; x++){
        picture.push([]);
        for(let y = 0; y < columns; y++){
            const cell = document.getElementById(`cell-${x+'-'+y}`)
            cell.style.background = ""
        }
    }
}

function takePicture() {
    picture = []
    for(let x = 0; x < columns; x++){
        picture.push([]);
        for(let y = 0; y < columns; y++){
            const cell = document.getElementById(`cell-${x+'-'+y}`)
            picture[x][y] = cell.style.background == "black"
        }
    }
}

function countLives(x,y) {
    let lives = 0;
    for (let i = -1; i <= 1; i++){
        for (let j = -1; j <= 1; j++){
            if(i == 0 && j == 0)
                continue
            try{
                if(picture[x+i][y+j]){
                    lives++
                }
            } catch(error){}
            if(lives > 3){
                return lives
            }
        }
    }
    return lives
}

function nextState() {
    takePicture();
    for (let x = 0; x< columns; x++){
        for(let y = 0; y < columns; y++){
            const lives = countLives(x,y);
            const cell = document.getElementById(`cell-${x+'-'+y}`)
            if(picture[x][y]){ //cell is alive
                if(lives<2 || lives > 3)
                    cell.style.background = "" //Die by overpopulation or lonelines
            }else{//cell is death
                if(lives == 3){
                    cell.style.background = "black"
                }
            }
        }
    }
}