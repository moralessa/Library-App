/* eslint-disable no-param-reassign */
/* eslint linebreak-style: ["error", "windows"] */
let library = {};
let coverSrc;
const btnAdd = document.getElementById('add');
const logTbc = document.getElementById('tbc');
const logTr = document.getElementById('tr');
const logTnr = document.getElementById('tnr');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageInput = document.getElementById('numPages');
const readInput = document.getElementById('read');
const coverInput = document.getElementById('cover');
const coverLabel = document.querySelector('label[for="cover"]');
const cardContainer = document.querySelector('.cardContainer');
const form = document.getElementById('addNew');
const formContainer = document.getElementById('formContainer');
const overLay = document.getElementById('overLay');

class Book { // Book Constructor
  constructor(title, author, pageCount, read, cover, id) {
    this.Title = title;
    this.Author = author;
    this.Pages = pageCount;
    this.Read = read;
    this.Url = cover;
    this.id = id;
  }
}

btnAdd.addEventListener('click', () => { // Form toggle event listener
  overLay.style.display = 'block';
  formContainer.style.display = 'flex';
});

overLay.addEventListener('click', () => { // overlay click event listener
  overLay.style.display = 'none';
  formContainer.style.display = 'none';
});

coverInput.addEventListener('change', () => {
  if (coverInput.validity.valid == true) {
    coverLabel.style.backgroundColor = '';
    coverLabel.style.color = '';
    coverLabel.textContent = 'Cover Inserted!';
    const reader = new FileReader();
    reader.readAsDataURL(coverInput.files[0]);

    reader.addEventListener('load', () => {
      coverSrc = reader.result;
    });
  }
});

function updateLocaleStorage() { // function to update data from locale storage
  const data = JSON.stringify(library);
  localStorage.setItem('library', data);
}

function loadLocaleStorage() { // function to load data from locale storage
  return localStorage.getItem('library');
}

function upDateLogAndButtons() { // function to updata log ui
  let readCount = 0;
  let notReadCount = 0;
  const total = Object.keys(library).length - 1;
  for (book in library) {
    if (book !== 'book-count') {
      if (library[book].Read) {
        readCount++;
      } else {
        notReadCount++;
      }
    }
  }
  logTbc.textContent = total;
  logTr.textContent = readCount;
  logTnr.textContent = notReadCount;
}

function populateSingleBook(book) { // function to populate single book ui
  const createdCard = document.createElement('div');
  createdCard.classList.add('card');
  const cover = document.createElement('img');
  const remove = document.createElement('p');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readToggle = document.createElement('button');

  title.textContent = `Title: ${book.Title}`;
  author.textContent = `Author: ${book.Author}`;
  pages.textContent = `Pages: ${book.Pages}`;
  remove.textContent = 'X';
  remove.classList.add('remove');

  if (book.Read) {
    readToggle.classList.add('readButton');
    readToggle.textContent = 'Read';
    readToggle.classList.add('readToggleR');
  } else {
    readToggle.classList.add('readButton');
    readToggle.textContent = 'Not Read';
    readToggle.classList.add('readToggleNR');
  }

  if (book.Url) {
    cover.src = book.Url;
    cover.classList.add('cardImage');
  } else {
    cover.src = 'images/mediamodifier-kML003ksO_0-unsplash.jpg';
    cover.classList.add('cardImage');
  }

  createdCard.setAttribute('id', `book-id-${book.id}`);
  createdCard.append(cover, title, author, pages, readToggle, remove);
  cardContainer.append(createdCard);
  readToggle.addEventListener('click', (e) => {
    if (e.target.classList.contains('readToggleR')) {
      book.Read = false;
      e.target.classList.remove('readToggleR');
      e.target.classList.add('readToggleNR');
      readToggle.textContent = 'Not Read';
      upDateLogAndButtons();
      updateLocaleStorage();
    } else {
      book.Read = true;
      e.target.classList.remove('readToggleNR');
      e.target.classList.add('readToggleR');
      readToggle.textContent = 'Read';
      upDateLogAndButtons();
      updateLocaleStorage();
    }
  });

  remove.addEventListener('click', () => {
    delete library[book.id];
    createdCard.remove();
    updateLocaleStorage();
    upDateLogAndButtons();
  });
}

function insertBook(title, input, pageCount, read, cover, id) { // function to insert book to libary
  const newBook = new Book(title, input, pageCount, read, cover, id);
  library[newBook.id] = newBook;
  library['book-count'] += library['book-count'];
  upDateLogAndButtons();
  updateLocaleStorage();
  populateSingleBook(newBook);
}

form.addEventListener('submit', (e) => { // Form submission event listener
  e.preventDefault();
  insertBook(titleInput.value, authorInput.value, pageInput.value, readInput.checked, coverSrc, `book-id-${library['book-count']}`);
  overLay.style.display = 'none';
  formContainer.style.display = 'none';
  e.target.reset();
});

function populateLibrary() { // Function to populate library ui
  for (book in library) {
    if (book !== 'book-count') {
      populateSingleBook(library[book]);
    }
  }
}

if (loadLocaleStorage()) {
  const data = JSON.parse(loadLocaleStorage());
  library = data;
  populateLibrary();
  upDateLogAndButtons();
} else {
  insertBook('Green Eggs & Ham', 'Dr.Seuss', 62, true, 'images/712nTmzFFRL.jpg', 'book-id-0');
  insertBook('Harry Potter and the Sorcerer\'s Stone', 'J.K Rowling', 233, false, 'images/harry potter.jpg', 'book-id-1');
  insertBook('The Hunger Games', 'Suzanne Collins', 384, true, 'images/9450-orig.jpg', 'book-id-2');
  library['book-count'] = 3;
  upDateLogAndButtons();
}
