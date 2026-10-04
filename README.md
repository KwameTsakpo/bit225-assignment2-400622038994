# BlueLib Catalogue — BIT225 Assignment 2

A responsive single-page library catalogue built with semantic HTML5, external CSS3, and vanilla JavaScript. It follows the assignment requirement not to use frameworks or libraries.

## Features

- Displays eight sample book records from a JavaScript array.
- Renders each book as a card using JavaScript DOM manipulation.
- Searches book titles as the user types.
- Filters books by IT, Business, Science, or Arts.
- Adds books without reloading the page.
- Validates required fields and requires copies available to be a whole number of zero or more.
- Includes a Borrow button that decreases available copies.
- Disables the Borrow button and shows “Out of stock” when copies reach zero.
- Uses CSS custom properties, hover effects, and responsive layouts: three columns on desktop, two on tablet, and one below 600px.
- Uses semantic HTML landmarks and accessible form labels/messages.

## Project structure

```text
bit225-assignment2/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    └── app.js
```

## How to run

1. Extract the ZIP file.
2. Open `index.html` in a modern web browser.
3. Search for a book, choose a category, borrow available books, and use the Add a New Book form to test validation.

No installation or build step is needed.

## Notes

Book data is stored only in memory in the JavaScript array. Refreshing the page restores the sample data. This is expected for this front-end-only assignment; no database or API was requested.
