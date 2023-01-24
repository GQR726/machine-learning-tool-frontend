import React, { Component } from 'react';
// import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

import { Input, Space, Button,Tooltip,Select,Divider,Card, Col, Row } from 'antd';
import { RedoOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import styles from "./styles/personal.module.css";

import * as Highcharts from 'highcharts';
const text = <span>prompt text(Treatment strategy?)</span>;

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      backbook:[]
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/books')
      .then(res => {
        this.setState({
          books: res.data,
          backbook: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
      })
  }0;
  handleInput = (event) => {
    console.log("input",event.target.value)

    var newList = this.state.backbook.filter(item=>
       (item.title.toUpperCase().includes(event.target.value.toUpperCase())))

    /* console.log(newList) */

    this.setState({
      books:newList
    })
  }

  render() {
    const books = this.state.books;
    console.log("PrintBook: " + books);
    let bookList;

    if(!books) {
      bookList = "there is no book record!";
    } else {
      bookList = books.map((book, k) =>
        <BookCard book={book} key={k} />
      );
    }

    return (
      <div >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Model List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/home/create-book" className="btn btn-outline-warning float-right">
                + Add New Model
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>
          <div >
           <input className='form-control' onInput={this.handleInput} onChange={(evt)=>{
              this.setState({
                text:evt.target.value
              }) 
            }}/>
          </div>
          <div className="list">
            {bookList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;