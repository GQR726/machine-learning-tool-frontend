import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
class CreateData extends Component {
  constructor() {
    super();
    this.state = {
        Name: '',
        Samples:'',
        Features:'',
        Timepoint:''
    };
  }

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
      .post('http://localhost:8082/api/datas', data)
      .then(res => {
        this.setState({
          Name: '',
          Samples:'',
          Features:'',
          Timepoint:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Createdata!");
      })
  };

  render() {
    return (
          <div className="Createdata">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/home/datat " className="btn btn-outline-warning float-left">
                      Show data List
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Add data</h1>
                  <p className="lead text-center">
                      Create new data
                  </p>
    
                  <form noValidate onSubmit={this.onSubmit}>
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
                        placeholder='Describe this data'
                        name='Timepoint'
                        className='form-control'
                        value={this.state.Timepoint}
                        onChange={this.onChange}
                      />
                    </div>
                    <input
                        type="submit"
                        value={"submit"}
                        className="btn btn-outline-warning btn-block mt-4"
                    />
                  </form>
              </div>
              </div>
            </div>
          </div>
        );
    }
}

export default CreateData;