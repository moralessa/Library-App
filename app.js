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
}

function createBook(){
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
    upDateLogAndButtons();
    overLay.style.display = 'none';
    formContainer.style.display ='none';
    e.target.reset();
})


function addBookToLibrary(book){
    let createdDiv = document.createElement('div');
    createdDiv.classList.add('card');
    let cover = document.createElement('img');
    let remove = document.createElement('p');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let readToggle = document.createElement('button');

    title.textContent = `Title: ${book.Title}`;
    author.textContent = `Author: ${book.Author}`;
    pages.textContent = `Pages: ${book.Pages}`;
    remove.textContent = 'X';
    remove.classList.add('remove');

    if(book.Read){
        readToggle.classList.add('readButton');
        readToggle.textContent = 'Read';
        readToggle.classList.add('readToggleR');

    }else{
        readToggle.classList.add('readButton');
        readToggle.textContent = "Not Read";
        readToggle.classList.add('readToggleNR');
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
    createdDiv.appendChild(remove);
    cardContainer.appendChild(createdDiv);
    readToggle.addEventListener('click', function(){
        let bookCard = readToggle.parentElement;
        myLibrary.forEach(book => {
            if(book.BookId == bookCard.id && book.Read == true){
                book.Read = false;
                readToggle.classList.add('readToggleNR');
                readToggle.classList.remove('readToggleR');
                readToggle.textContent = 'Not Read';
                upDateLogAndButtons();
            }else if(book.BookId == bookCard.id && book.Read == false){
                book.Read = true;
                readToggle.classList.add('readToggleR');
                readToggle.classList.remove('readToggleNR');
                readToggle.textContent = 'Read';
                upDateLogAndButtons();
            }
        })
    })
    remove.addEventListener('click', function(){
        let bookCard = remove.parentElement;
        myLibrary.forEach(book =>{
            if(book.BookId == bookCard.id){
                bookCard.remove();
                let index = myLibrary.indexOf(book);
                myLibrary.splice(index, 1);
            }
        })
    })
}

let greenEggs = new Book('Green Eggs & Ham', 'Dr.Seuss', 62, true, 'images/712nTmzFFRL.jpg')
addBookToLibrary(greenEggs);
upDateLogAndButtons();

