const gamePieces = {
    sq: {
        id: 'sq',                              
        a: 0,
        b: 1,               
        c: 10,
        d: 11,              
        color: 'red'
    },
    t: {
        id: 't',
        a: 0,
        b: 1,
        c: 2,
        d: 11,
        color: 'blue'
    },
    l: {
        id: 'l',
        a: 0,
        b: 10,
        c: 20,
        d: 21,
        color: 'yellow'
    },
    z: {
        id: 'z',
        a: 0,
        b: 1,
        c: 11,
        d: 12,
        color: 'green'
    }, 
    s: {
        id: 's',
        a: 10,
        b: 11,
        c: 1,
        d: 2,
        color: 'orange'
    },
    i: {
        id: 'i',
        a: 0,
        b: 10,
        c: 20,
        d: 30,
        color: 'white'
    }
}

gamePiecesArray = ['sq', 't', 'l', 'z', 's', 'i']

function createNewPeice(data) {
    let randomNumber  = Math.floor(Math.random() * 6) 
    let gamePiecesArray = data
    let nextPiece = gamePiecesArray[randomNumber]
    switch (nextPiece) {
        case 'sq': 
            sq.renderShape()
            break;
        case 't':
            t.renderShape()
            break;
        case 'l':
            l.renderShape()
            break;
        case 'z':
            z.renderShape()
            break;
        case 's':
            s.renderShape()
            break;
        case 'i':
            i.renderShape()
            break;
    }
}

class Grid {
    constructor(data) {
        Object.assign(this, data)

        this.gridWidth = 10
        this.gridHeight = 15
        this.gridTotal = this.gridWidth * this.gridHeight
        this.gridArea = document.getElementById('game-grid')
        this.cellsArray = this.createCellArray()
    }

    createCellArray() {
        return new Array(this.gridTotal).fill(0).map(()=> {
                let cell = document.createElement('div')
                cell.setAttribute('class', 'cell')
                return cell     
        })
    }

    renderGrid() {
            for(let i = 0; i < this.gridTotal; i++) {         // creates grid         
                this.gridArea.appendChild(this.cellsArray[i])
            }  
    }

   
    renderShape() {
        let {id, a, b, c, d, cellsArray} = this
        this.clearGrid()
     
        cellsArray[a].classList.add(id)
        cellsArray[b].classList.add(id)
        cellsArray[c].classList.add(id)
        cellsArray[d].classList.add(id)
        
        this.renderGrid()
        this.moveDown()
    }

    moveDown() {
        let {a, b, c, d} = this
        
        setInterval(() => {
            a + 10
            b + 10
            c + 10
            d + 10
            console.log(a)
            this.renderShape()
        }, 700)
    }
    
    moveRight() {
        let {a, b, c, d, cellsArray} = this
        a++
        b++
        c++
        d++
        console.log(a)
        for(let i = 0; i < 4; i++) {
            const pieceIndexArray = [a, b, c, d]
            cellsArray[pieceIndexArray[i]].classList.add('dark')
        }

    }

    clearGrid() {
        while(this.gridArea.lastElementChild) {
            this.gridArea.removeChild(this.gridArea.lastElementChild)
        }
    }
}


const grid = new Grid()


document.querySelector('.start-button').addEventListener('click', () => {
     createNewPeice(gamePiecesArray)
    // grid.renderShape/()
})

document.addEventListener('keypress', (event) => {
    if(event.code == 'KeyD') {
        grid.moveRight()
        console.log('right')
    }
})


const sq = new Grid (gamePieces.sq)
const t = new Grid(gamePieces.t)
const l = new Grid(gamePieces.l)
const z = new Grid(gamePieces.z)
const s = new Grid(gamePieces.s)
const i = new Grid(gamePieces.i)

grid.renderGrid()


