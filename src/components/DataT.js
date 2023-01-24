import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataCard from './DataTypeCard';

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      backdata:[]
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/datas')
      .then(res => {
        this.setState({
          datas: res.data,
          backdata: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowdataList');
      })
  }0;
  handleInput = (event) => {
    console.log("input",event.target.value)

    var newList = this.state.backdata.filter(item=>
       (item.Name.toUpperCase().includes(event.target.value.toUpperCase())))

    this.setState({
      datas:newList
    })
  }

  render() {
    const datas = this.state.datas;
    console.log("Printdata: " + datas);
    let dataList;

    if(!datas) {
      dataList = "there is no data record!";
    } else {
      dataList = datas.map((data, k) =>
        <DataCard data={data} key={k} />
      );
    }

    return (
      <div >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center"></h2>
            </div>

            <div className="col-md-11">
              <Link to="/home/create-data" className="btn btn-outline-warning float-right">
                + Add New data type
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
          <div className="list2">
            {dataList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;