const main = document.querySelector('.root')
const input = document.querySelector('input')

const API_KEY_URL = 'https://wolnelektury.pl/api/books'

let query = '';
let books = []

fetch(API_KEY_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

fetch(API_KEY_URL)
    .then(res => res.json())
    .then(data => {
        books = data.map(event => {
            return{
                author: event.author,
                title: event.title,
                image: event.simple_thumb,
                kind: event.kind,
                epoch: event.epoch,
                genre: event.genre
            }
        })
        generateBooks()
    })

function bookStructure(e){
    let div = document.createElement('div');

    let section = document.createElement('section');
    section.innerText = `${e.author} - "${e.title}"`;

    let img = document.createElement('img');
    img.src = e.image

    let kindDiv = document.createElement('div');
    let kind = document.createElement('h4');
    kindDiv.innerText = 'Typ: '
    if(e.kind != ''){
        kind.innerText = e.kind;
    }else{
        kind.innerText = 'brak';
    }
    kindDiv.appendChild(kind);

    let epochDiv = document.createElement('div');
    let epoch = document.createElement('h4');
    epochDiv.innerText = 'Epos: '
    if(e.epoch != ''){
        epoch.innerText = e.epoch;
    }else{
        epoch.innerText = 'brak';
    }
    epochDiv.appendChild(epoch);
    
    let genreDiv = document.createElement('div');
    let genre = document.createElement('h4');
    genreDiv.innerText = 'Gatunek: '
    if(e.genre != ''){
        genre.innerText = e.genre;
    }else{
        genre.innerText = 'brak';
    }
    genreDiv.appendChild(genre);

    main.appendChild(div);
    div.appendChild(img);
    div.appendChild(section);
    div.appendChild(kindDiv);
    div.appendChild(epochDiv);
    div.appendChild(genreDiv);
}

function generateBooks(){
    console.log(books)
    for (const book in books) {
        let allTitle = books[book].author + books[book].title
        if(allTitle.toLowerCase().includes(query)){
            bookStructure(books[book])
        }
    }
}

input.addEventListener('input', (e) => {
    query = e.target.value.toLowerCase().trim()
    main.innerHTML = "";
    generateBooks()
    console.log('change')
})