const sliderImages = [
  'assests/1.jpg',
  'assests/2.jpg',
  'assests/3.jpg'
];
let currentIndex = 0;

function changeBackground() {
  document.body.style.backgroundImage = `url(${sliderImages[currentIndex]})`;
  currentIndex = (currentIndex + 1) % sliderImages.length;
}

setInterval(changeBackground, 6000);

let books = JSON.parse(localStorage.getItem('books')) || [];

const searchBookForm = document.getElementById('searchBook');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');
const bookForm = document.getElementById('bookForm');

function displayBooks() {
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete(${book.id})">
          ${book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca'}
        </button>
        <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">Hapus</button>
        <button data-testid="bookItemEditButton" onclick="editBook(${book.id})">Edit</button>
      </div>
    `;

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}

function saveToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

bookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const newBook = {
    id: Date.now(),
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  displayBooks();
  saveToLocalStorage();
  bookForm.reset();
});

function toggleComplete(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    displayBooks();
    saveToLocalStorage();
  }
}

function deleteBook(bookId) {
  books = books.filter(b => b.id !== bookId);
  displayBooks();
  saveToLocalStorage();
}

function editBook(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    document.getElementById('bookFormTitle').value = book.title;
    document.getElementById('bookFormAuthor').value = book.author;
    document.getElementById('bookFormYear').value = book.year;
    document.getElementById('bookFormIsComplete').checked = book.isComplete;
    
    deleteBook(bookId);
  }
}

searchBookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));
  
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';
  
  filteredBooks.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    bookItem.innerHTML = `
      <h3 data-testid="bookItemTitle">${book.title}</h3>
      <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
      <p data-testid="bookItemYear">Tahun: ${book.year}</p>
      <div>
        <button data-testid="bookItemIsCompleteButton" onclick="toggleComplete(${book.id})">
          ${book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca'}
        </button>
        <button data-testid="bookItemDeleteButton" onclick="deleteBook(${book.id})">Hapus</button>
        <button data-testid="bookItemEditButton" onclick="editBook(${book.id})">Edit</button>
      </div>
    `;

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
});

displayBooks();
