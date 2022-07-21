import '../styles/index.css'

// scripts
import Login from "./modules/login";
import SignUp from "./modules/signUp";
import BookList from "./modules/bookList";
import AddBook from "./modules/addBook";
import {redirect} from "./utils/redirect";
import BookInfo from "./modules/bookInfo";
import EditBook from "./modules/editBook";


window.addEventListener('DOMContentLoaded', () => {
  new Login().initialize()
  new SignUp().initialize()
  new BookList().initialize()
  new AddBook().initialize()
  new BookInfo().initialize()
  new EditBook().initialize()
  redirect()
})