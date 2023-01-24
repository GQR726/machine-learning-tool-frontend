import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DataDetailCard = (props) => {
    const  data  = props.data;

    return(
        <div className="card-container" style={{height:"40px",marginTop:"0px",width:"800px"}}>
            <div className="desc">
                <h2>
                    <Link to={`/home/edit-data_detail/${data._id}`}>
                        Patient_ID:{data.ID}
                    </Link>
                </h2>
            </div>
        </div>
    )
};

export default DataDetailCard;