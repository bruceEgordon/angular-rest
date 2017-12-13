import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Book }    from '../model/book';

import { DataService } from '../services/data.service';

@Component({
  selector: 'bookList',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  isLoading = true;

  book = {};
  isEditing = false;

  addBookForm: FormGroup;
  isbn = new FormControl('', Validators.required);
  title = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);

  constructor(private dataService: DataService,
			  private formBuilder: FormBuilder)  {  }
              

  ngOnInit() {
    this.getBooks();

    this.addBookForm = this.formBuilder.group({
      isbn: this.isbn,
      title: this.title,
      price: this.price
    });    
  }

  getBooks() {
    this.dataService.getBooks().subscribe(
      data => this.books = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addBook() {
    this.dataService.addEditBook(this.addBookForm.value).subscribe(
      res => {
        let newBook = this.addBookForm.value;
        this.books.push(newBook);
        this.addBookForm.reset();
      },
      error => console.log(error)
    );
  }  
  
  enableEditing(book: Book) {
    this.isEditing = true;
    this.book = book;
  }

  cancelEditing() {
    this.isEditing = false;
    this.book = {};
    // reload the books to reset the editing
    this.getBooks();
  }

  editBook(book: Book) {
    this.dataService.addEditBook(book).subscribe(
      resp => {
        this.isEditing = false;
        this.book = {};
      },
      error => console.log(error)
    );
  }
  
  deleteBook(book: Book) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteBook(book).subscribe(
        res => {
          let index = this.books.map(elem => { return elem.isbn; }).indexOf(book.isbn);
		  this.books.splice(index, 1);
        },
        error => console.log(error)
      );
    }
  }

}