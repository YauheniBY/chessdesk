// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. 
// Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8,
//  столбцы – латинскими буквами A, B, C, D, E, F, G, H.
// 2. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К – король, Ф – ферзь и т.п., 
// причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.
// 3. *Заменить буквы, обозначающие фигуры, картинками.


window.addEventListener('load', () => {


    const chessDesk = document.getElementById('chessdesk');
    const fildsSize = 50;
    

    const chessFild = {
        width: 8,
        height: 8,
    };

    chessDesk.style.width = `${(chessFild.width + 2) * fildsSize}px`;
    chessDesk.style.height = `${(chessFild.height + 2) * fildsSize}px`;

    // create filds

    let quontity = 0;
    let rows = -1;
    
    

    while ( quontity < ( (chessFild.width + 2) * (chessFild.height + 2) ) ){
        let elem = addFild();
        chessDesk.appendChild( elem );
        elem.dataset.numberColumn = quontity % (chessFild.width + 2);
        if(elem.dataset.numberColumn === '0' ){
            rows++;
        }
        elem.dataset.numberRow = rows;
        quontity++;
    }

    //собираем все элементы в массив

    let allElems = document.querySelectorAll('[data-number-column]');
    console.log(allElems);

    // устанавливаем счетчики колонок и строк в начальное значение
    let firstColumnsNumbers = 1;
    let firstRowsNumbers = 1;
    let secondRowsNumbers = 1;

    // рисуем поле и ставим номера

    allElems.forEach((element) => {
        
        let numCol = Number(element.dataset.numberColumn);
        let numRow = Number(element.dataset.numberRow);

        let rest = (numCol + numRow) % 2;

        if (rest === 0 && numCol != 0 && numCol != 9){
            element.classList.add('white-item');
        } else if (rest === 1 && numCol != 0 && numCol != 9) {
            element.classList.add('black-item');
        }
        
        if (numCol === 0 && numRow != 0 && numRow != 9 ){
            element.innerText = `${Math.abs(firstColumnsNumbers - 9)}`;
            
            element.classList.add('letters-item');

        } else  if (numCol === 9 && numRow != 0 && numRow != 9 ) {
            element.innerText = `${Math.abs(firstColumnsNumbers - 9)}`;
            
            element.classList.add('letters-item');
            firstColumnsNumbers++;
        }

        if (numRow === 0 && numCol != 0 && numCol != 9 ){
            element.innerText = `${numberToLetter (firstRowsNumbers)}`;
            firstRowsNumbers++;
        }
        
        
        else if (numRow === 9 && numCol != 0 && numCol != 9 ) {
            element.innerText = `${numberToLetter (secondRowsNumbers)}`;
            secondRowsNumbers++;
        }

        if (Number(element.dataset.numberRow) === 9 || (Number(element.dataset.numberRow) === 0)) {
            element.classList.remove('black-item');
            element.classList.remove('white-item');
            
            element.classList.add('letters-item');
            
        }
    });

    // переворачиваем доску для удобства к пользователю и расставляем фигуры

    allElems.forEach((el) => {
        let numCol = Number(el.dataset.numberColumn);
        let numRow = Number(el.dataset.numberRow);

        el.dataset.numberRow = `${Math.abs(numRow - 9)}`;

        if (numCol != 9 && numRow != 0 && numRow != 9 ) {
            el.dataset.vertical = numberToLetter ( numCol );
        }
        if ( numRow === 2 && numCol != 0 && numCol != 9) {

            el.innerHTML = `<span class="white-figure">п</span>`;

        } else if ( numRow === 7 && numCol != 0 && numCol != 9 ){
            el.innerHTML = `<span class="black-figure">п</span>`;

        } else if ( (numRow === 8 || numRow === 1) && numCol != 0 && numCol != 9 ){

            let nesessaryStyle = (numRow === 8) ? 'black' : 'white';
            
            if( el.dataset.vertical && (el.dataset.vertical === 'B' || el.dataset.vertical === 'G') ) {
                el.innerHTML = `<span class="${nesessaryStyle}-figure">к</span>`;
            } else if( el.dataset.vertical && (el.dataset.vertical === 'C' || el.dataset.vertical === 'F') ) {
                el.innerHTML = `<span class="${nesessaryStyle}-figure">л</span>`;
            } else if( el.dataset.vertical && (el.dataset.vertical === 'A' || el.dataset.vertical === 'H') ) {
                el.innerHTML = `<span class="${nesessaryStyle}-figure">c</span>`;
            } else if( el.dataset.vertical && el.dataset.vertical === 'D') {
                el.innerHTML = `<span class="${nesessaryStyle}-figure">${(nesessaryStyle === 'black') ? 'кл' : 'кр'}</span>`;
            } else if( el.dataset.vertical && el.dataset.vertical === 'E') {
                el.innerHTML = `<span class="${nesessaryStyle}-figure">${(nesessaryStyle === 'black') ? 'кр' : 'кл'}</span>`;
            }
        }
    });

    // заменяем буквы на картинки

    allElems.forEach((elem) => {
        let numCol = Number(elem.dataset.numberColumn);
        let numRow = Number(elem.dataset.numberRow);
        let nesessaryStyle = (numRow > 4) ? 'black' : 'white';

        if ( numRow === 2 && numCol != 0 && numCol != 9) {

            elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/solder.png">`;

        } else if ( numRow === 7 && numCol != 0 && numCol != 9 ){
            elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/solder.png">`;

        } else if ( (numRow === 8 || numRow === 1) && numCol != 0 && numCol != 9 ){            
            
            if( elem.dataset.vertical === 'B' || elem.dataset.vertical === 'G' ) {
                elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/h.png">`;
            } else if( elem.dataset.vertical === 'C' || elem.dataset.vertical === 'F' ) {
                elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/lad.png">`;
            } else if( elem.dataset.vertical === 'A' || elem.dataset.vertical === 'H' ) {
                elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/slon.png">`;
            } else if( elem.dataset.vertical === 'D') {
                elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/${(nesessaryStyle === 'black') ? 'k' : 'q'}.png">`;
            } else if( elem.dataset.vertical === 'E') {
                elem.innerHTML = `<img class="img-figure" src="./img/${nesessaryStyle}Figure/${(nesessaryStyle === 'black') ? 'q' : 'k'}.png">`;
            }
        }
        
    });

    

   


    function addFild() {
        let elem = document.createElement('div');
        elem.style.width = `${fildsSize}px`;
        elem.style.height = `${fildsSize}px`;
        return elem;

    }

    function numberToLetter ( number) {

        switch (number) {
            case 1:
                return 'A';
                break;
            case 2:
                return 'B';
                break;
            case 3:
                return 'C';
                break;
            case 4:
                return 'D';
                break;
            case 5:
                return 'E';
                break;
            case 6:
                return 'F';
                break;
            case 7:
                return 'G';
                break;
            case 8:
                return 'H';
                break;
            default:
                return 'oh no!'
            

        }



    }








});
