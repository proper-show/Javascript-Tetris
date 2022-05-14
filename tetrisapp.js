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
        a: 1,
        b: 2,
        c: 11,
        d: 10,
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
            renderShape(gamePieces.sq)
            break;
        case 't':
            renderShape(gamePieces.t)
            break;
        case 'l':
            renderShape(gamePieces.l)
            break;
        case 'z':
            renderShape(gamePieces.z)
            break;
        case 's':
            renderShape(gamePieces.s)
            break;
        case 'i':
            renderShape(gamePieces.i)
            break;
    }
}


    const gridWidth = 10
    const gridHeight = 15
    const gridTotal = gridWidth * gridHeight
    const gridArea = document.getElementById('game-grid')
    const cellsArray = createCellArray()
    

    function createCellArray() {
        return new Array(gridTotal).fill(0).map(()=> {
                let cell = document.createElement('div')
                cell.setAttribute('class', 'cell')
                return cell     
        })
    }

    function render() {
        Object.assign(this, data)
        
            for(let i = 0; i < gridTotal; i++) {         // creates grid         
                gridArea.appendChild(cellsArray[i])
            }  
    
    
        function renderShape(data) {
           

            cellsArray[a].classList.add(id)
            cellsArray[b].classList.add(id)
            cellsArray[c].classList.add(id)
            cellsArray[d].classList.add(id)
            moveDown(a, b, c, d, id)
        }

        function moveDown(a, b, c, d, id) {
            let w = a
            let x = b
            let y = c
            let z = d

            const downInterval = setInterval(() => {
                cellsArray[w].classList.remove(id)
                cellsArray[x].classList.remove(id)
                cellsArray[y].classList.remove(id)
                cellsArray[z].classList.remove(id)

                w += 10
                x += 10
                y += 10
                z += 10

                modifyShapeLocation(w, x, y, z, id)

                if(z > 139) {
                    clearInterval(downInterval)
                    createNewPeice(gamePiecesArray)
                }

                return {
                    w
                }
            },700)
        }


        function modifyShapeLocation(w, x, y, z, id) {
            moveRight(w, x, y, z)
            // moveLeft(w, x, y, z)
            let e = w
            let f = x
            let g = y
            let h = z
            cellsArray[e].classList.add(id)
            cellsArray[f].classList.add(id)
            cellsArray[g].classList.add(id)
            cellsArray[h].classList.add(id)
        }
        
        function moveRight(w, x, y, z) {
            document.addEventListener('keypress', (event) => {
                if(event.code == 'KeyD') {
                    w++
                    x++
                    y++
                    z++
                    modifyShapeLocation(w, x, y, z)
                }
            })
            
        }

        // function moveLeft() {

        // }

    }

    function clearGrid() {
        while(gridArea.lastElementChild) {
            gridArea.removeChild(gridArea.lastElementChild)
        }
    }

document.querySelector('.start-button').addEventListener('click', () => {
     createNewPeice(gamePiecesArray)
     render()
    
})
