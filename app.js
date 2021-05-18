//book constructor
function Book(title, author, isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;

}

function UI() {}
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;
  list.appendChild(row);
}

UI.prototype.showAlert = function(message, className){
  const divEl = document.createElement('div');
  divEl.className=`alert ${className}`;
  divEl.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(divEl,form);

  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 3000);
}

UI.prototype.clearFields=function(){
  document.getElementById('title').value = "";
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function(target){
    target.parentElement.parentElement.remove();
}

//event listeners
document.getElementById("book-form").addEventListener('submit',
  function(e){
    const title = document.getElementById('title').value,
    author=document.getElementById('author').value,
    isbn=document.getElementById('isbn').value;
    const book = new Book(title,author,isbn);

    console.log(book);
    const ui = new UI();
    if(title === '' || author === '' || isbn === ''){
      ui.showAlert("Please fill in all fields.","error");
    } else {
      ui.addBookToList(book);
      ui.showAlert('Book added!','success');
      ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById("book-list").addEventListener('click',function(e){
  const ui = new UI();
  if(e.target.className === 'delete'){
    ui.deleteBook(e.target);
    ui.showAlert('Book deleted!','success');
  }
  e.preventDefault();
});
