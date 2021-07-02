// создаём поле, где наш котозмей будет гоняться за мышью

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for(let i=1; i<=100; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

// разобьём это поле на ячейки 10х10

let excel = document.getElementsByClassName('excel');
let x = 1, y = 10;

for (let i = 0; i<excel.length; i++) {
    if(x>10) {
        x=1;
        y--;
    }
    excel[i].setAttribute('positionX', x);
    excel[i].setAttribute('positionY', y);
    x++;
}

// отлично, теперь возьмёмся за нашего котозмея!

function generateCatSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}

let coord = generateCatSnake();

let catSnake = [
    document.querySelector('[positionX = "' + coord[0] + '"][positionY = "' + coord[1] + '"]'), 
    document.querySelector('[positionX = "' + (coord[0] - 1) + '"][positionY = "' + coord[1] + '"]'), 
    document.querySelector('[positionX = "' + (coord[0] - 2) + '"][positionY = "' + coord[1] + '"]')
];


catSnake[0].classList.add('catSnakeHead');

for (let i = 1; i < catSnake.length; i++) {
    catSnake[i].classList.add('catSnakeBody');
}


// мышь!!

let mouse;

function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10 - 1) + 1);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    let mouseCoord = generateMouse();
    mouse = document.querySelector('[positionX = "' + mouseCoord[0] + '"][positionY = "' + mouseCoord[1] + '"]');

    while (mouse.classList.contains('catSnake')) {
        let mouseCoord = generateMouse();
        mouse = document.querySelector('[positionX = "' + mouseCoord[0] + '"][positionY = "' + mouseCoord[1] + '"]');
    }

    mouse.classList.add('food');
}

createMouse();

// заставим котозмея бегать

let direction = 'right';

function move() {
    let snakeCoordinates = [catSnake[0].getAttribute('positionX'), catSnake[0].getAttribute('positionY')];
    catSnake[0].classList.remove('catSnakeHead');
    catSnake[catSnake.length-1].classList.remove('catSnakeBody');
    catSnake.pop();

    if (direction == 'right') {
        if(snakeCoordinates[0] < 10) {
            catSnake.unshift(document.querySelector('[positionX = "' + (+snakeCoordinates[0] + 1) + '"][positionY = "' + snakeCoordinates[1] + '"]'));
        } else {
            catSnake.unshift(document.querySelector('[positionX = "1"][positionY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left') {
        if(snakeCoordinates[0] > 1) {
            catSnake.unshift(document.querySelector('[positionX = "' + (+snakeCoordinates[0] - 1) + '"][positionY = "' + snakeCoordinates[1] + '"]'));
        } else {
            catSnake.unshift(document.querySelector('[positionX = "10"][positionY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'up') {
        if(snakeCoordinates[1] < 10) {
            catSnake.unshift(document.querySelector('[positionX = "' + snakeCoordinates[0] + '"][positionY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        } else {
            catSnake.unshift(document.querySelector('[positionX = "' + snakeCoordinates[0] + '"][positionY = "1"]'));
        }
    } else if (direction == 'down') {
        if(snakeCoordinates[1] > 1) {
            catSnake.unshift(document.querySelector('[positionX = "' + snakeCoordinates[0] + '"][positionY = "' + (+snakeCoordinates[1] - 1) + '"]'));
        } else {
            catSnake.unshift(document.querySelector('[positionX = "' + snakeCoordinates[0] + '"][positionY = "10"]'));
        }
    }

    
    catSnake[0].classList.add('catSnakeHead');

    for (let i = 1; i < catSnake.length; i++) {
        catSnake[i].classList.add('catSnakeBody');
    }
}

let interval = setInterval (move, 300);

// keyCode - устаревший метод, но аналога я не нашёл, так что оставим его :)

window.addEventListener('keydown', function(e){
    if (e.keyCode == 37 && direction != 'right') {
        direction = 'left';
    } else if (e.keyCode == 38 && direction != 'down') {
        direction = 'up';
    } else if (e.keyCode == 39 && direction != 'left') {
        direction = 'right';
    } else if (e.keyCode == 40 && direction != 'up') {
        direction = 'down';
    }
})
