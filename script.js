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

let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 20px;
font-size: 30px;
display: block;
`;

let score = 0;
input.value = `У вас ${score} очков!`;

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

    if (catSnake[0].getAttribute('positionX') == mouse.getAttribute('positionX') 
    && catSnake[0].getAttribute('positionY') == mouse.getAttribute('positionY')) {
        mouse.classList.remove('food');
        let a = catSnake[catSnake.length-1].getAttribute('positionX');
        let b = catSnake[catSnake.length-1].getAttribute('positionY');
        catSnake.push(document.querySelector('[positionX = "'+ a + '"][positionY = "'+ b + '"]'))
        createMouse();
        score++;
        input.value = `Счёт: ${score}!`;
    }
    
    if(catSnake[0].classList.contains('catSnakeBody')) {
        clearInterval(interval);
        catSnake[0].style.background = 'url(images/sadCat.jpg) center no-repeat';
        catSnake[0].style.backgroundSize = 'cover';
        
        setTimeout(() => {
            alert(`Гейм Овер :( Счёт: ${score}.`)
        }, 200);
     
        
        
    }

    catSnake[0].classList.add('catSnakeHead');

    for (let i = 1; i < catSnake.length; i++) {
        catSnake[i].classList.add('catSnakeBody');
    }
    steps = true;
}

let interval = setInterval (move, 300);

// keyCode - устаревший метод, но аналога я не нашёл, так что оставим его :)

window.addEventListener('keydown', function(e){
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        } else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        } else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        } else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
})