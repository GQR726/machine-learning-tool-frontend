import withRouter from './withRouter';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Space, Button,Tooltip,Select,Divider,Card, Col, Row } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from "./styles/personal.module.css"
import '../App.css';
import axios from 'axios';
import * as Highcharts from 'highcharts';
const text1 = <span>prompt text(Model Name)</span>;
const text2 = <span>prompt text(Treatment strategy?)</span>;
const text3 = <span>prompt text(Validation)</span>;
const text4 = <span>prompt text(K?)</span>;

class UpdateBookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      title: '',
      isbn: '',
      author: '',
      description: '',
      published_date: '',
      publisher: ''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/books/'+this.props.params.id)
      .then(res => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          book: res.data,
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher
        })
      })
      .catch(err => {
        console.log("Error from UpdateBookInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher
    };

    axios
      .put('http://localhost:8082/api/books/'+this.props.params.id, data)
      .then(res => {
        this.props.history.push('/show-book/'+this.props.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/books/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };


  render() {
    const book = this.state.book;
    return(
      <div className="model">
          <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
          <div className="site-card-wrapper">
              <Row gutter={16}>
              <Col span={7}>
                  <Card bordered={false}>
                  <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
                  <Space size="middle">
                      Model Name:
                      <Tooltip placement="bottomLeft" title={text1}>
                          <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                      </Tooltip>
                        <input
                          type='text'
                          placeholder='Model Name'
                          name='title'
                          className='form-control'
                          value={this.state.title}
                          onChange={this.onChange}
                        />
                  </Space>
                  <Space size="middle">
                      Strategy:
                      <Tooltip placement="bottomLeft" title={text2}>
                          <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                      </Tooltip>
                      <Select
                      defaultValue="Early Fusion"
                      style={{ width: 120 }}
                      // onChange={handleChange}
                      options={[
                          {
                          value: '1',
                          label: 'Early Fusion',
                          },
                          {
                          value: '2',
                          label: 'Late Fusion',
                          }
                      ]}
                      />
                  </Space>
                  </Space>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card bordered={false}>
                  <div className={styles.modelBox} style={{ padding: 20, minHeight: 220,maxWidth:410}}>
                      <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
                          <h1>Model</h1>
                          <input
                            type='text'
                            placeholder='Classifier'
                            name='isbn'
                            className='form-control'
                            value={this.state.isbn}
                            onChange={this.onChange}
                          />
                          <input
                            type='number'
                            placeholder='n_neighbours'
                            name='author'
                            className='form-control'
                            value={this.state.author}
                            onChange={this.onChange}
                          />
                          <input
                            type='text'
                            placeholder='neighbours_type'
                            name='description'
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChange}
                          />
                          <input
                            type='text'
                            placeholder='publisfeature_weights'
                            name='published_date'
                            className='form-control'
                            value={this.state.published_date}
                            onChange={this.onChange}
                          />
                          <p>voting_type:</p>
                      </Space>
                  </div>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card bordered={false}>
                  <Space direction="vertical" size="middle" style={{ display: 'flex',padding: 20 }}>
                      <Space size="middle">
                      Validation:
                          <Tooltip placement="bottomLeft" title={text3}>
                              <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                          </Tooltip>
                          <Select
                          defaultValue="K-Fold"
                          style={{ width: 120 }}
                          // onChange={handleChange}
                          options={[
                              {
                              value: '1',
                              label: 'K-Fold',
                              }
                          ]}
                          />
                      </Space>
                      <Space size="middle">
                          K:
                          <Tooltip placement="bottomLeft" title={text4}>
                              <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                          </Tooltip>
                          <input
                            type='number'
                            placeholder=''
                            name='publisher'
                            className='form-control'
                            value={this.state.publisher}
                            onChange={this.onChange}
                          />
                      </Space>
                      <form noValidate onSubmit={this.onSubmit}>
                      <Space size="middle">
                          {/* <Button type="primary">Save</Button>
                          // <Button type="primary">Train</Button> */}
                          <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update</button>
                          <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,book._id)}>
                            <Link to="/home/model" style={{color:"red"}}>Delete</Link></button>
                      </Space>
                      </form>
                      <Button type="primary" onClick={()=>{
                                    // this.setState({
                                    //   train:parseInt(this.state.author)
                                    // })
                                    var num1 = parseInt(this.state.author);
                                    var num2 = parseInt(this.state.publisher);
                                    Highcharts.chart('main', {
                                      chart: {
                                        type: 'bar'
                                      },
                                      title: {
                                        text: 'Top Features'
                                      },
                                      xAxis: {
                                        categories: ['caarms_08', 'panss_neg', 'IDREK', 'hippocamp', 'smoking_his','familial_his']
                                      },
                                      yAxis: {
                                        min: 0,
                                        title: {
                                          text: ''
                                        }
                                      },
                                      legend: {
                                        reversed: true
                                      },
                                      plotOptions: {
                                        series: {
                                          stacking: 'normal',
                                          dataLabels: {
                                            enabled: true
                                          }
                                        }
                                      },
                                      series: [
                                      {
                                        name: 'Importance',
                                        data: [90+num1+num2, 80+num1+num2, 70+num1+num2, 50+num1+num2, 40+num1+num2,20+num1+num2]
                                      }]
                                    });
                                    Highcharts.chart('main2', {
                                      chart: {
                                        type: 'bar'
                                      },
                                      title: {
                                        text: 'Metrics'
                                      },
                                      xAxis: {
                                        categories: ['Accuracy', 'MCC', 'AUC', 'F1 Score']
                                      },
                                      yAxis: {
                                        min: 0,
                                        title: {
                                          text: ''
                                        }
                                      },
                                      legend: {
                                        reversed: true
                                      },
                                      plotOptions: {
                                        series: {
                                          stacking: 'normal',
                                          dataLabels: {
                                            enabled: true
                                          }
                                        }
                                      },
                                      series: [
                                      {
                                        name: '% ',
                                        data: [90-num1-num2, 80-num1-num2, 80-num1-num2, 90-num1-num2]
                                      }]
                                    });
                                    function getPointCategoryName(point, dimension) {
                                      var series = point.series,
                                          isY = dimension === 'y',
                                          axis = series[isY ? 'yAxis' : 'xAxis'];
                                      return axis.categories[point[isY ? 'y' : 'x']];
                                  }
                                  require ( 'highcharts/modules/map' ) ( Highcharts ) ;
                                  Highcharts.chart('main3', {
                                  
                                      chart: {
                                          type: 'heatmap',
                                          marginTop: 40,
                                          marginBottom: 80,
                                          plotBorderWidth: 1
                                      },
                                  
                                  
                                      title: {
                                          text: 'Confusion Matrix'
                                      },
                                  
                                      xAxis: {
                                          categories: ['Control', 'UHR', 'Remit', 'Convert']
                                      },
                                  
                                      yAxis: {
                                          categories: ['Control', 'UHR', 'Remit', 'Convert'],
                                          title: null,
                                          reversed: true
                                      },
                                  
                                      accessibility: {
                                          point: {
                                              descriptionFormatter: function (point) {
                                                  var ix = point.index + 1,
                                                      xName = getPointCategoryName(point, 'x'),
                                                      yName = getPointCategoryName(point, 'y'),
                                                      val = point.value;
                                                  return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
                                              }
                                          }
                                      },
                                  
                                      colorAxis: {
                                          min: 0,
                                          minColor: '#FFFFFF',
                                          maxColor: Highcharts.getOptions().colors[0]
                                      },
                                  
                                      legend: {
                                          align: 'right',
                                          layout: 'vertical',
                                          margin: 0,
                                          verticalAlign: 'top',
                                          y: 25,
                                          symbolHeight: 280
                                      },
                                  
                                      tooltip: {
                                          formatter: function () {
                                              return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
                                                  this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
                                          }
                                      },
                                  
                                      series: [{
                                          name: 'Sales per employee',
                                          borderWidth: 1,
                                          data: [[0, 0, 61+num1+num2], [0, 1, 3+num1+num2], [0, 2, 8+num1+num2], [0, 3, 1+num1+num2], 
                                          [1, 0, 6+num1+num2],[1, 1, 32+num1+num2], [1, 2, 1+num1+num2], [1, 3, 5+num1+num2], 
                                          [2, 0, 2+num1+num2], [2, 1, 9+num1+num2], [2, 2, 31+num1+num2], [2, 3, 2+num1+num2], 
                                          [3, 0, 6+num1+num2], [3, 1, 0+num1+num2], [3, 2, 12+num1+num2], [3, 3, 15+num1+num2]],
                                          dataLabels: {
                                              enabled: true,
                                              color: '#000000'
                                          }
                                      }],
                                  
                                      responsive: {
                                          rules: [{
                                              condition: {
                                                  maxWidth: 500
                                              },
                                              chartOptions: {
                                                  yAxis: {
                                                      labels: {
                                                          formatter: function () {
                                                              return this.value.charAt(0);
                                                          }
                                                      }
                                                  }
                                              }
                                          }]
                                      }
                                  
                                  });
                                }}>Train</Button>
                  </Space>
                  </Card>
              </Col>
              </Row>
          </div>
          </Space>
          <Divider orientation="left">Analytics</Divider>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div className="site-card-wrapper">
              <Row gutter={16}>
              <Col span={8}>
                  <Card bordered={false}>
                  <div id="main2" style={{heigh:"400px"}}></div>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card bordered={false}>
                  <div id="main3" style={{heigh:"400px"}}></div>
                  </Card>
              </Col>
              <Col span={8}>
                  <Card bordered={false}>
                  <div id="main" style={{heigh:"400px"}}></div>
                  </Card>
              </Col>
              </Row>
          </div>
          </Space>
      </div>
  )
  }
}

export default withRouter(UpdateBookInfo);