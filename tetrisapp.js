
    const gridArea = document.getElementById('game-grid')
    const GRID_WIDTH = 15
    const GRID_HEIGHT = 20
    const GRID_TOTAL = GRID_WIDTH * GRID_HEIGHT
    
    

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
        [1, 2, 3, 4],
        [1, GRID_WIDTH + 1, (GRID_WIDTH * 2) + 1, (GRID_WIDTH * 3) + 1],
        [1, 2, 3, 4]
    ]

    const shapeArray = [sq, l, t, s, z, i]
    const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'white']
    const cellArray = createCellArray()

    
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
    
    let rotation = 0
    let shapeIndex  = Math.floor(Math.random() * 6)
    let currentposition = Math.floor(Math.random() * 16) + 2
    let shape= shapeArray[shapeIndex][rotation]

    function createShape() { 
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('blue')
        })
        cascade()
    }

    function removeClasses() {
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.remove('blue')
        })
    }

    function moveRight() {
        removeClasses()
        currentposition++
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('blue')
        })
    }

    function moveLeft() {
        removeClasses() 
        currentposition--
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('blue')
        })
    }

    function rotateShape() {
        removeClasses()  
        rotation++
       
        if (rotation == shape.length) {
            rotation = 0
        }
        shape = shapeArray[shapeIndex][rotation]
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('blue')
        }) 
    }

    function cascade() {
        let cascadeInterval = setInterval(() => {
            removeClasses()
            currentposition = currentposition + GRID_WIDTH
            
            shape.forEach((index) => {
                cellArray[currentposition + index].classList.add('blue')
                if(currentposition + index >= (GRID_TOTAL - GRID_WIDTH)) {
                    clearInterval(cascadeInterval)
                }
           })    
        }, 700)
    }
    
    document.addEventListener('keypress', (event) => {
        switch(event.code) {
            case 'KeyD':
                moveRight()
                break;
            case 'KeyA':
                moveLeft()
                break;
            case 'KeyW':
                rotateShape()
        }
    })

    document.querySelector('.start-button').addEventListener('click', () => {
        createShape()
    })


