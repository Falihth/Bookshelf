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

// Simpan data buku dalam array
let books = [];

// Ambil elemen dari DOM
const bookForm = document.getElementById('bookForm');
const searchBookForm = document.getElementById('searchBook');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');

// Fungsi untuk menampilkan buku
function displayBooks() {
  // Kosongkan daftar buku terlebih dahulu
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  // Tampilkan buku yang belum selesai dibaca
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

// Fungsi untuk menambahkan buku
bookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const newBook = {
    id: Date.now(), // Menggunakan timestamp sebagai ID unik
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  displayBooks();
  bookForm.reset(); // Reset form setelah menambahkan buku
});

// Fungsi untuk mengubah status buku
function toggleComplete(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    displayBooks();
  }
}

// Fungsi untuk menghapus buku
function deleteBook(bookId) {
  books = books.filter(b => b.id !== bookId);
  displayBooks();
}

// Fungsi untuk mengedit buku
function editBook(bookId) {
  const book = books.find(b => b.id === bookId);
  if (book) {
    document.getElementById('bookFormTitle').value = book.title;
    document.getElementById('bookFormAuthor').value = book.author;
    document.getElementById('bookFormYear').value = book.year;
    document.getElementById('bookFormIsComplete').checked = book.isComplete;
    
    // Hapus buku yang sedang diedit dari daftar
    deleteBook(bookId);
  }
}

// Fungsi untuk mencari buku
searchBookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  
  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));
  
  // Kosongkan daftar dan tampilkan hasil pencarian
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
