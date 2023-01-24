import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = (props) => {
    const  book  = props.book;

    return(
        <div className="card-container" style={{height:"40px",marginTop:"0px",width:"800px"}}>
            <div className="desc">
                <h2>
                    <Link to={`/home/edit-book/${book._id}`}>
                        Name:{book.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n_neighbours:{book.author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;K:{book.publisher}
                    </Link>
                </h2>
            </div>
        </div>
    )
};

export default BookCard;