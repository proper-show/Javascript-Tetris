document.addEventListener('DOMContentLoaded', function () {
    const gridArea = document.getElementById('game-grid')
    const GRID_WIDTH = 20
    const GRID_HEIGHT = 30
    const GRID_TOTAL = GRID_WIDTH * GRID_HEIGHT
    const cellArray = createCellArray()
    

    const sq = [
        [1, 2, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, 2, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, 2, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [1, 2, GRID_WIDTH + 1, GRID_WIDTH + 2]
    ]

    const l = [
        [1, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1, (GRID_WIDTH * 3) + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3, GRID_WIDTH + 4],
        [1, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1, (GRID_WIDTH * 3) + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3, GRID_WIDTH + 4]
    ]

    const t = [
        [1, 2, 3, GRID_WIDTH + 2],
        [1, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1, GRID_WIDTH + 2],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3, (GRID_WIDTH * 2) + 2],
        [2, GRID_WIDTH + 2, (GRID_WIDTH * 2) + 2, GRID_WIDTH + 1]
    ]

    const s = [
        [2, 3, GRID_WIDTH + 1, GRID_WIDTH + 2],
        [2, GRID_WIDTH + 2, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1],
        [GRID_WIDTH + 2, GRID_WIDTH + 3, (GRID_WIDTH * 2) + 1, (GRID_WIDTH * 2) + 2],
        [(GRID_WIDTH * 2) + 3, GRID_WIDTH + 3, GRID_WIDTH + 2, 2]
    ]

    const z = [
        [1, 2, GRID_WIDTH + 2, GRID_WIDTH + 3],
        [3, GRID_WIDTH + 3, GRID_WIDTH + 2, (GRID_WIDTH * 2) + 2],
        [(GRID_WIDTH * 2) + 3, (GRID_WIDTH * 2) + 2, GRID_WIDTH + 2, GRID_WIDTH + 1],
        [3, GRID_WIDTH + 3, GRID_WIDTH + 2, (GRID_WIDTH * 2) + 2],
    ]

    const i = [
        [1, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1, (GRID_WIDTH * 3) + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3, GRID_WIDTH + 4],
        [1, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1, (GRID_WIDTH * 3) + 1],
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3, GRID_WIDTH + 4]
    ]

    const shapeArray = [sq, l, t, s, z, i]
    const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'white']

    let startingPosition = 0
    let startingShape = 0
    let shape = shapeArray[startingShape][startingPosition]
    let color = ''
    

    function generateInitialNumbers() {
        startingPosition = Math.floor(Math.random() * 3) 
        startingShape = Math.floor(Math.random() * 6)
        color = colorArray[Math.floor(Math.random() * 6)]

        
    }
 
    function createShape() {
        for(let i = 0; i < shape.length; i++) {
            cellArray[shape[i]].classList.add('blue')
        }
        cascade()
    }

    function removeClasses() {
        for(let i = 0; i < shape.length; i++) {
            cellArray[shape[i]].classList.remove('blue')
        }
    }

    function moveRight() {
        removeClasses()
        for(let i = 0; i < shape.length; i++) {
            shape[i]++
            cellArray[shape[i]].classList.add('blue')
        }
    }

    function moveLeft() {
        removeClasses() 
        for(let i = 0; i < shape.length; i++) {
            shape[i]--
            cellArray[shape[i]].classList.add('blue')
        }
    }

    function cascade() {
        let cascadeInterval = setInterval(() => {
            removeClasses()
            
            for(let i = 0; i < shape.length; i++) {
                shape[i] = shape[i] + 20
                cellArray[shape[i]].classList.add('blue')
                
                if(shape[i] > 580) {
                    clearInterval(cascadeInterval)
                    generateInitialNumbers()
                    createShape()
                }
            }
        }, 700)
    }
    

    function createCellArray() {
        return new Array(GRID_TOTAL).fill(0).map(()=> {
                let cell = document.createElement('div')
                cell.setAttribute('class', 'cell')
                return cell     
        })
    }

    function renderGrid() {
        for(let i = 0; i <  GRID_TOTAL; i++) {
            gridArea.appendChild(cellArray[i])
        }
    }

    renderGrid()

    document.addEventListener('keypress', (event) => {
        switch(event.code) {
            case 'KeyD':
                moveRight()
                break;
            case 'KeyA':
                moveLeft()
                break;
        }
    })

    document.querySelector('.start-button').addEventListener('click', () => {
        generateInitialNumbers()
        createShape()
    })

})



