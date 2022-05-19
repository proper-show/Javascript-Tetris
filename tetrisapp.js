
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
        [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3, 2],
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
    console.log(cellArray)
    renderGrid()
    
    let rotation = 0
    let shapeIndex = ''
    let currentposition = ''
    let shape= []


    function createShape() { 
        currentposition = Math.floor(Math.random() * 6) + 3
        shapeIndex = Math.floor(Math.random() * 6)
        shape = shapeArray[shapeIndex][rotation]
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

        const rightBoundry = shape.some((index) => {if((currentposition + index) % GRID_WIDTH === GRID_WIDTH - 1) {return true}})  // creates the right boundry by looking through the shape for a number / 15 with a remainder of the width
        if(!rightBoundry) {
            currentposition++
        }
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('blue')
        })
    }

    function moveLeft() {
        removeClasses()
        const leftBoundry = shape.some((index) => {if((currentposition + index) % GRID_WIDTH === 0){return true}})
        if(!leftBoundry) {
            currentposition--
        }
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('blue')
        })
    }

    function moveDown() {
                removeClasses()
                currentposition = currentposition + GRID_WIDTH
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
        const cascadeInterval = setInterval(() => {
        const bottomBoundry = shape.some((index) => {
            if((currentposition + index) >= GRID_TOTAL - GRID_WIDTH || cellArray[currentposition + index + GRID_WIDTH].classList.contains('dead')){
                return true
            }}) 
            if(!bottomBoundry) {
                moveDown()
            } else { 
                clearInterval(cascadeInterval)
                terminateShape()
            }
        }, 700)
      
    }

    function terminateShape() {
        removeClasses()
        shape.forEach((index) => {
            cellArray[currentposition + index].classList.add('dead')
        })
        createShape()
    }
    
    document.addEventListener('keypress', (event) => {
        switch(event.code) {
            case 'KeyD':
                moveRight()
                break;
            case 'KeyA':
                let shapeToLeft = shape.some((index) => {if(cellArray[(currentposition + index) - 1].classList.contains('dead')){return true}})
                if(!shapeToLeft) { 
                moveLeft()
                }
                break;
            case 'KeyW':
                rotateShape()
            case 'KeyS':
                moveDown()
        }
    })

    document.querySelector('.start-button').addEventListener('click', () => {
        createShape()
    })
