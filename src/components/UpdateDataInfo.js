import withRouter from './withRouter';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Space, Button,Tooltip,Select,Divider,Card, Col, Row } from 'antd';
import '../App.css';
import axios from 'axios';
import DataCard from './DatadetailCard';
import CreateDataDetail from './CreateDataDetail'
class UpdateDataInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        datat: {},
        Name: '',
        Samples:'',
        Features:'',
        Timepoint:'',
        datad: [],
        backdatad:[],
        current:0,
        isShow:false,
        isShow2:false,
        update:false
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/datas/'+this.props.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          datat: res.data,
          Name: res.data.Name,
          Samples: res.data.Samples,
          Features: res.data.Features,
          Timepoint: res.data.Timepoint
        })
      })
      .catch(err => {
        console.log("Error from UpdateBookInfo");
      })
      axios
      .get('http://localhost:8082/api/articles')
      .then(res => {
        this.setState({
            datad: res.data,
            backdatad: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowdataList');
      })
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      Name: this.state.Name,
      Samples: this.state.Samples,
      Features: this.state.Features,
      Timepoint: this.state.Timepoint
    };
      axios
      .put('http://localhost:8082/api/datas/'+this.props.params.id, data)
      .then(res => {
        this.props.history.push('/datat/'+this.props.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/datas/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };


  render() {
    const datas = this.state.datad;
    const datat = this.state.datat;
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
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Space size="middle">
                  <Button type="primary" onClick={()=>{
                                  if(this.state.current===2||this.state.current===3||this.state.current===0){
                                    this.setState({
                                      current:1
                                    })}
                                    else if(this.state.current===1){
                                      this.setState({
                                        isShow:!this.state.isShow
                                      })
                                    }
                                }}>Add +</Button>
                                <Button type="primary" onClick={()=>{
                                    var newList = this.state.backdatad.filter(item=>
                                        (item.Name.toUpperCase().includes(this.state.Name.toUpperCase())))
                                 
                                     this.setState({
                                         datad:newList
                                     })
                                  if(this.state.current===1||this.state.current===3||this.state.current===0){
                                    this.setState({
                                      current:2
                                    })}
                                    else if(this.state.current===2){
                                      this.setState({
                                        isShow:!this.state.isShow
                                      })
                                    }
                                }}>Show Patient List</Button></Space></Space>
                  <br />
                  <br />
                  <hr />
                </div>
              </div>
              <div >
              {this.state.isShow &&this.state.current===1&& <CreateDataDetail Name={this.state.Name} isShow={this.state.isShow2}
              />}
              </div>
              {this.state.isShow &&this.state.current===2 && <div className="list">
              {dataList}
              </div>}
              <hr />
            </div>
            <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Name of the data'
                        name='Name'
                        className='form-control'
                        value={this.state.Name}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Samples'
                        name='Samples'
                        className='form-control'
                        value={this.state.Samples}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Features'
                        name='Features'
                        className='form-control'
                        value={this.state.Features}
                        onChange={this.onChange}
                      />
                    </div>
    
                    <div className='form-group'>
                      <input
                        type='text'
                        placeholder='Timepoint'
                        name='Timepoint'
                        className='form-control'
                        value={this.state.Timepoint}
                        onChange={this.onChange}
                      />
                    </div>
            <div>
            <form noValidate onSubmit={this.onSubmit}>
              <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update</button>
                                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,datat._id)}>
                                    <Link to="/home/datat" style={{color:"red"}}>Delete</Link></button></form>
              </div>
          </div>
        );
  }
}

export default withRouter(UpdateDataInfo);