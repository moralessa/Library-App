let myLibrary = [];
const btnAdd = document.getElementById('add');
const logTbc = document.getElementById('tbc');
const logTr = document.getElementById('tr');
const logTnr = document.getElementById('tnr');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageInput = document.getElementById('numPages');
const readInput = document.getElementById('read');
const coverInput = document.getElementById('cover');
const cardContainer = document.querySelector('.cardContainer');
const form = document.getElementById('addNew');
const formContainer = document.getElementById('formContainer')
const overLay = document.getElementById('overLay');
const submit = document.getElementById('submit');
let readButtons = document.querySelectorAll('.readButton');

//Book constructor function
function Book(title, author, pageCount, read, cover){
    this.Title = title;
    this.Author = author;
    this.Pages = pageCount;
    this.Read = read;
    this.Url = cover;
}

Book.prototype.beInserted = function(arr){
    this.BookId = 'bookId-'+arr.length;
    arr.push(this);
}


function upDateLogAndButtons(){
    let totalReadCount = myLibrary.filter(function(item){
        return item.Read === true;
    })
    
    let totalNotReadCount = myLibrary.filter(function(item){
        return item.Read === false;
    })
    logTbc.textContent = myLibrary.length;
    logTr.textContent = totalReadCount.length;
    logTnr.textContent = totalNotReadCount.length;
    readButtons = document.querySelectorAll('.readButton');
}

function createBook(){
    console.log(readInput.checked)
   if(coverInput.validity.valid === true){
       if(readInput.checked){
           let newBook = new Book(titleInput.value, authorInput.value, pageInput.value, true, coverInput.value);
           return newBook;
       }else{
            let newBook = new Book(titleInput.value, authorInput.value, pageInput.value, false, coverInput.value);
            return newBook;
       }
   }else{
    if(readInput.checked){
        let newBook = new Book(titleInput.value, authorInput.value, pageInput.value, true, '');
        return newBook;
    }else{
         let newBook = new Book(titleInput.value, authorInput.value, pageInput.value, false, '');
         return newBook;
    }
   }
}

btnAdd.addEventListener('click', () =>{
    overLay.style.display = 'block';
    formContainer.style.display ='flex';
})


overLay.addEventListener('click', () =>{
    overLay.style.display = 'none';
    formContainer.style.display ='none';
})

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    let b = createBook();
    addBookToLibrary(b);
    overLay.style.display = 'none';
    formContainer.style.display ='none';
})


function addBookToLibrary(book){
    let createdDiv = document.createElement('div');
    createdDiv.classList.add('card');
    let cover = document.createElement('img');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let readToggle = document.createElement('button');

    title.textContent = `Title: ${book.Title}`;
    author.textContent = `Author: ${book.Author}`;
    pages.textContent = `Pages: ${book.Pages}`;

    if(book.Read){
        readToggle.textContent = 'Read';
        readToggle.classList.add('readToggleR');
        readToggle.classList.add('readButton');


    }else{
        readToggle.textContent = "Not Read";
        readToggle.classList.add('readToggleNR');
        readToggle.classList.add('readButton');
    }

    if(book.Url != ''){
        cover.src = book.Url;
        cover.classList.add('cardImage')
    }else{
        cover.src = "images/mediamodifier-kML003ksO_0-unsplash.jpg";
        cover.classList.add('cardImage')

    }

    book.beInserted(myLibrary);
    createdDiv.setAttribute("id", `${book.BookId}`);
    createdDiv.appendChild(cover);
    createdDiv.appendChild(title);
    createdDiv.appendChild(author);
    createdDiv.appendChild(pages);
    createdDiv.appendChild(readToggle);
    cardContainer.appendChild(createdDiv);
    upDateLogAndButtons();
}

let greenEggs = new Book('Green Eggs & Ham', 'Dr.Seuss', 62, true, 'images/712nTmzFFRL.jpg')
addBookToLibrary(greenEggs);

readButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        let bookCard = btn.parentElement;
        myLibrary.forEach(book => {
            if(book.BookId == bookCard.id && book.Read == true){
                book.Read = false;
                btn.classList.add('readToggleNR');
                btn.classList.remove('readToggleR');
                btn.textContent = 'Not Read';
                upDateLogAndButtons();
            }else if(book.BookId == bookCard.id && book.Read == false){
                book.Read = true;
                btn.classList.add('readToggleR');
                btn.classList.remove('readToggleNR');
                btn.textContent = 'Read';
                upDateLogAndButtons();
            }
        })
    })
});
