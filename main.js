const listOfMovies = [
    'Władca much (1990)',
    'Władca Pierścieni (1978)',
    'Milczenie owiec (1991)',
    'Moja dziewczyna (1991)',
    'Dziewczyna z tatuażem (2011)',
    'Jestem Bogiem (2011)',
    'Jestem legendą (2007)',
    'Matrix (1999)',
    'Zielona mila (1999)',
    '8 Mila (2002)',
    'Uciekająca panna młoda (1999)',
    'Gnijąca panna młoda (2005)',
    'Dzień świra (2002)',
    'Dzień Niepodległości (1996)',
    'Dzień świstaka (1993)',
    'Lista Schindlera (1993)',
    'Czarna lista Hollywood (1991)',
    'Lista klientów (2012)',
    'Teraz albo nigdy (2018)',
    'Niech będzie teraz (2012)',
    'Zabójcze maszyny (2018)',
    'Zabójcza broń (1987)',
    'Znaki (2002)',
    'Znaki na drodze (1969)',
    'Wodne znaki (2013)',
    'Znaki dymne (1998)',
    'Jeden dzień (2011)',
    'Dzień próby (2001)',
    'Dzień z życia blondynki (2014)',
    'Panna Nikt (1996)',
    'Panna Meadows (2014)',
    'Panna Nikt (2010)',
    'Panna Julia (1951)'
]

const body = document.body;

function titlesList(list) {

    const titlesList = list.map(value => value.slice(0, -7));
    return titlesList;
}

function premiereYearList(list) {

    const yearList = list.map(value => value.slice(-5, -1));
    return yearList;
}

let moviesTitles = titlesList(listOfMovies);
let yearList = premiereYearList(listOfMovies);

yearList = [...yearList];

// CREATING TILES

const displayList = document.getElementById('displayList');


function createTiles(el1, el2) {
    for (let i = 0; i < el1.length; i++) {
        const divItem = document.createElement('div');
        divItem.setAttribute('id', i + 1);
        const h2Item = document.createElement('h2');
        h2Item.textContent = el1[i];
        const h3Item = document.createElement('h3');
        h3Item.textContent = el2[i];
        divItem.appendChild(h2Item);
        divItem.appendChild(h3Item);

        displayList.appendChild(divItem);

        if (divItem.id % 2 == 0) {
            divItem.setAttribute('class', 'even');
        } else {

            divItem.setAttribute('class', 'odd');
        }

    }

    //NIGHT MODE

    let evens = document.querySelectorAll('.even');
    let odds = document.querySelectorAll('.odd');
    let evensArr = [...evens];
    let oddsArr = [...odds];


    if (body.className == 'night') {
        evensArr.map(value => value.className = 'even-night')
        oddsArr.map(value => value.className = 'odd-night')
    }
};


createTiles(moviesTitles, yearList);

//AMOUNT OF MOVIES
function amountOfMovies(list) {

    const amountMovies = document.getElementById('amountMovies');
    amountMovies.textContent = `Liczba filmów w Filmotece: ${list.length}`;
}
amountOfMovies(listOfMovies);

//SWITCH

const switchMode = document.getElementById('switch');

switchMode.onclick = function () {

    body.classList.toggle('night');
    displayList.textContent = '';
    createTiles(moviesTitles, yearList);


}

//OPTION LIST

function createOptions(list) {


    for (let i = 0; i < list.length; i++) {

        const option = document.createElement('option')

        option.text = list[i]
        option.value = list[i]
        const select = document.getElementById('filter');
        select.appendChild(option)
    }
}

//REMOVING DUPLICATED YEARS

let yearsOptions = [...new Set(yearList)];
createOptions(yearsOptions);

//SEARCHING BY YEAR

function searchByYear() {
    let years = document.querySelectorAll('option');

    years.forEach(changed)

    function changed() {
        let selectList = document.getElementById('filter');
        selectList.onchange = function () {
            let yearValue = this.value;
            const tiles = Array.from(document.querySelectorAll("#displayList div"));
            tiles.forEach(item => {
                const tileYear = item.querySelector('h3').textContent;
                if (tileYear === yearValue) {
                    item.style.display = "grid";

                } else {
                    item.style.display = "none";
                }

            });
        }
    }
}

searchByYear()

//BUTTON DISPLAYING ALL MOVIES

const allMoviesBtn = document.getElementById('allMovies');

allMoviesBtn.onclick = () => {
    const $tiles = Array.from(document.querySelectorAll("#displayList div"));
    $tiles.map(value => value.style.display = 'grid');
}

//ADDING FORM

document.forms.createNewMovie.onsubmit = function (e) {
    e.preventDefault();

    let now = new Date();
    let currentYear = now.getFullYear()

    if ((this.createTitle.value) && (this.createYear.value)) {


        if (!isNaN(createYear.value) && (createYear.value <= currentYear && createYear.value >= 1888)) {
            moviesTitles.push(this.createTitle.value)
            yearList.push(`${this.createYear.value}`)
            displayList.textContent = '';
            let selectList = document.getElementById('filter');
            selectList.textContent = '';
            let updatedOptions = [...new Set(yearList)];
            updatedOptions = updatedOptions.sort((a, b) => b - a);
            createOptions(updatedOptions);
            createTiles(moviesTitles, yearList);
            let message = document.getElementById('message')
            message.textContent = `Film został dodany pomyślnie!`
            message.style.opacity = '1';
            document.getElementById('error').textContent = '';
            amountOfMovies(moviesTitles);

            let fade = function () {
                setTimeout(function () {
                    message.style.opacity = '1';
                    message.style.opacity = '0';
                }, 2000);
            }

            fade()
            clearTimeout(fade);
        } else {
            message.textContent = '';
            let error = document.getElementById('error');
            error.textContent = 'Podaj poprawny rok.';

        }
    }
    this.reset()
    this.createTitle.focus()

    return false
}