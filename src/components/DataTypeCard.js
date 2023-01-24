import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DataCard = (props) => {
    const  data  = props.data;

    return(
        <div className="card-container" style={{height:"100px",marginTop:"0px",width:"200px"}}>
            <div className="desc">
                <h2>
                    <Link to={`/home/edit-data/${data._id}`}>
                        <h2>{data.Name}</h2>
                        <p>Samples:{data.Samples}<br/>
                        Features:{data.Features}<br/>
                        Timepoint:{data.Timepoint}</p>
                    </Link>
                </h2>
            </div>
        </div>
    )
};

export default DataCard;