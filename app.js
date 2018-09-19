class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.innerText = message;
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><a href="#" class="delete">X</a></td>
              `;
    list.appendChild(row);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  deleteBook(target) {
    console.log(target.className);
    if (target.className == "delete") {
      console.log(target.parentElement.parentElement);
      target.parentElement.parentElement.remove();
    }
  }
}

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", handlerSubmit);

function handlerSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const book = new Book(title, author, isbn);
  const ui = new UI();
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert(" Fileds should not be empty");
  } else {
    ui.addBookToList(book);
    ui.clearFields();
  }
}

document.getElementById("book-list").addEventListener("click", function(e) {
  ui = new UI();
  console.log(e.target);
  ui.deleteBook(e.target);

  e.preventDefault();
});
