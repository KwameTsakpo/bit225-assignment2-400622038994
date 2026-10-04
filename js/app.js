/*
  BlueLib Catalogue - BIT225 Advanced Web Technologies assignment.
  This project was prepared with AI assistance; review and understand the code
  before submission, as required by the assignment's academic integrity note.
*/

// Sample catalogue data stored in a JavaScript array.
const books = [
  { id: 1, title: "JavaScript: The Definitive Guide", author: "David Flanagan", category: "IT", copies: 4 },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "IT", copies: 3 },
  { id: 3, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "IT", copies: 2 },
  { id: 4, title: "The Lean Startup", author: "Eric Ries", category: "Business", copies: 5 },
  { id: 5, title: "Good to Great", author: "Jim Collins", category: "Business", copies: 0 },
  { id: 6, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", copies: 2 },
  { id: 7, title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", copies: 1 },
  { id: 8, title: "Ways of Seeing", author: "John Berger", category: "Arts", copies: 3 }
];

const bookList = document.querySelector("#book-list");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#filter-category");
const bookCount = document.querySelector("#book-count");
const resultsMessage = document.querySelector("#results-message");
const emptyState = document.querySelector("#empty-state");
const addBookForm = document.querySelector("#add-book-form");
const formError = document.querySelector("#form-error");
const formSuccess = document.querySelector("#form-success");

const categoryInitials = {
  IT: "IT",
  Business: "B",
  Science: "S",
  Arts: "A"
};

// Render book cards from the array. The search and category filters are applied here.
function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const visibleBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  bookList.replaceChildren();

  visibleBooks.forEach((book) => {
    const card = document.createElement("article");
    card.className = "book-card";

    const cardTop = document.createElement("div");
    cardTop.className = "card-top";

    const icon = document.createElement("span");
    icon.className = "book-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = categoryInitials[book.category] || "B";

    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = book.category;

    cardTop.append(icon, category);

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "book-author";
    author.textContent = `by ${book.author}`;

    const cardBottom = document.createElement("div");
    cardBottom.className = "card-bottom";

    const copyStatus = document.createElement("span");
    copyStatus.className = "copy-status";

    const borrowButton = document.createElement("button");
    borrowButton.type = "button";
    borrowButton.className = "button borrow-button";
    borrowButton.textContent = book.copies > 0 ? "Borrow" : "Out of stock";
    borrowButton.disabled = book.copies === 0;
    borrowButton.setAttribute("aria-label", book.copies > 0
      ? `Borrow ${book.title}`
      : `${book.title} is out of stock`);

    if (book.copies > 0) {
      const copiesStrong = document.createElement("strong");
      copiesStrong.textContent = String(book.copies);
      copyStatus.append(copiesStrong, document.createTextNode(book.copies === 1 ? " copy left" : " copies left"));
    } else {
      copyStatus.classList.add("out-of-stock");
      copyStatus.textContent = "Out of stock";
    }

    // Borrowing reduces the available copy count by one.
    borrowButton.addEventListener("click", () => {
      if (book.copies > 0) {
        book.copies -= 1;
        renderBooks();
      }
    });

    cardBottom.append(copyStatus, borrowButton);
    card.append(cardTop, title, author, cardBottom);
    bookList.append(card);
  });

  bookCount.textContent = `${visibleBooks.length} ${visibleBooks.length === 1 ? "book" : "books"}`;
  resultsMessage.textContent = visibleBooks.length === books.length
    ? `Showing all ${books.length} books in the catalogue.`
    : `Showing ${visibleBooks.length} of ${books.length} books.`;
  emptyState.hidden = visibleBooks.length !== 0;
}

// Update results immediately as the user types or changes category.
searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

// Validate the form and add a new book without reloading the page.
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";
  formSuccess.textContent = "";

  const title = document.querySelector("#book-title").value.trim();
  const author = document.querySelector("#book-author").value.trim();
  const category = document.querySelector("#book-category").value;
  const copiesText = document.querySelector("#book-copies").value.trim();
  const copies = Number(copiesText);

  if (!title || !author || !category || copiesText === "") {
    formError.textContent = "Please complete all fields before adding the book.";
    return;
  }

  if (!["IT", "Business", "Science", "Arts"].includes(category)) {
    formError.textContent = "Please select a valid book category.";
    return;
  }

  if (!Number.isInteger(copies) || copies < 0) {
    formError.textContent = "Copies available must be a whole number of 0 or more.";
    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    category,
    copies
  };

  books.push(newBook);
  addBookForm.reset();

  // Reset filters so the newly added book is visible straight away.
  searchInput.value = "";
  categoryFilter.value = "All";
  renderBooks();

  formSuccess.textContent = `"${newBook.title}" was added to the catalogue successfully.`;
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth" });
});

// Show the initial catalogue on page load.
renderBooks();
