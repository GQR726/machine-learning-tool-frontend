import React, { Component } from 'react';
import withRouter from './withRouter';
import axios from 'axios';
import { Space, Button,Tooltip,Card, Col, Row } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from "./styles/personal.module.css";
import * as Highcharts from 'highcharts';
const text1 = <span>prompt text(Patient_ID)</span>;
const text2 = <span>prompt text(Time)</span>;
const text3 = <span>prompt text(Feature)</span>;

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      ID: '',
      TimeColumn:'',
      Numerical:'',
      Categorical:'',
      Text:'',
      Feature:'',
      Distinct:'',
      Imputed:'',
      Mean:'',
      Maximun:'',
      Minimun:'',
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      Name: this.props.Name,
      ID: this.state.ID,
      TimeColumn:this.state.TimeColumn,
      Numerical:this.state.Numerical,
      Categorical:this.state.Categorical,
      Text:this.state.Text,
      Feature:this.state.Feature,
      Distinct:this.state.Distinct,
      Imputed:this.state.Imputed,
      Mean:this.state.Mean,
      Maximun:this.state.Maximun,
      Minimun:this.state.Minimun
    };

    axios
      .post('http://localhost:8082/api/articles', data)
      .then(res => {
        this.setState({
            ID: '',
            TimeColumn:'',
            Numerical:'',
            Categorical:'',
            Text:'',
            Feature:'',
            Distinct:'',
            Imputed:'',
            Mean:'',
            Maximun:'',
            Minimun:'',
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Createdata!");
      })

      window.location.reload();
  };

  handleChange1 = (value) => {
    console.log(`selected ${value}`);
    this.setState({
        TimeColumn:value
    })
  };

  render() {

    return (
        <div className="data">
        <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
            <Space size="middle" className={styles.DBBox}>
            </Space>
            <div className="site-card-wrapper">
            <h3>{this.props.Name}</h3>
                <Row gutter={16}>
                <Col span={9}>
                    <Card bordered={false}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
                    <Space size="middle">
                        ID Column:
                        <Tooltip placement="bottomLeft" title={text1}>
                            <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                        </Tooltip>
                        <input
                          type='text'
                          placeholder='Patient_ID'
                          name='ID'
                          className='form-control'
                          value={this.state.ID}
                          onChange={this.onChange}
                        />
                    </Space>
                    <Space size="middle">
                        Time Column(Optional):
                        <Tooltip placement="bottomLeft" title={text2}>
                            <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                        </Tooltip>
                        <input
                          type='text'
                          placeholder='TimeColumn'
                          name='TimeColumn'
                          className='form-control'
                          value={this.state.TimeColumn}
                          onChange={this.onChange}
                        />
                    </Space>
                    </Space>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                    <div className={styles.DVBox} style={{ padding: 2, minHeight: 120,maxWidth:410}}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
                            <h1>Variable Types</h1>
                            <input
                            type='number'
                            placeholder='Numerical'
                            name='Numerical'
                            className='form-control'
                            value={this.state.Numerical}
                            onChange={this.onChange}
                          />
                            <input
                            type='number'
                            placeholder='Categorical'
                            name='Categorical'
                            className='form-control'
                            value={this.state.Categorical}
                            onChange={this.onChange}
                          />
                            <input
                            type='number'
                            placeholder='Text'
                            name='Text'
                            className='form-control'
                            value={this.state.Text}
                            onChange={this.onChange}
                          />
                        </Space>
                    </div>
                    </Card>
                </Col>
                </Row>
            </div>
        </Space>
        <div className={styles.DVBox} style={{ padding: 20}}>
            <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false}>
                    <Space size="middle">
                        Choose Feature:
                        <Tooltip placement="bottomLeft" title={text3}>
                            <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                        </Tooltip>
                        <input
                            type='text'
                            placeholder='Feature'
                            name='Feature'
                            className='form-control'
                            value={this.state.Feature}
                            onChange={this.onChange}
                          /></Space>
                          <Space size="middle">
                        <Button type="primary" onClick={()=>{
                                    var num1 = parseInt(this.state.Numerical);
                                    var num2 = parseInt(this.state.Categorical);
                                    Highcharts.chart('main01', {
                                            title: {
                                              text: this.state.Feature
                                          },
                                      
                                          subtitle: {
                                              text: ''
                                          },
                                      
                                          yAxis: {
                                              title: {
                                                  text: ''
                                              }
                                          },
                                      
                                          xAxis: {
                                            categories: ['Timepoint 1', 'Timepoint 2', 'Timepoint 3', 'Timepoint 4'],
                                              accessibility: {
                                                  rangeDescription: ''
                                              }
                                          },
                                      
                                          legend: {
                                              layout: 'vertical',
                                              align: 'right',
                                              verticalAlign: 'middle'
                                          },
                                      
                                          plotOptions: {
                                              series: {
                                                  label: {
                                                      connectorAllowed: false
                                                  }
                                              }
                                          },
                                      
                                          series: [{
                                              name: 'Control',
                                              data: [4-num1+num2, 2-num1+num2, 4-num1+num2, 5-num1+num2]
                                          }, {
                                              name: 'UHR',
                                              data: [2-num1+num2,2-num1+num2,3-num1+num2,1-num1+num2]
                                          }, {
                                              name: 'Remit',
                                              data: [2-num1+num2,4-num1+num2,2-num1+num2,3-num1+num2]
                                          }, {
                                              name: 'Convert',
                                              data: [1-num1+num2,1-num1+num2,5-num1+num2,4-num1+num2]
                                          }],
                                      
                                          responsive: {
                                              rules: [{
                                                  condition: {
                                                      maxWidth: 500
                                                  },
                                                  chartOptions: {
                                                      legend: {
                                                          layout: 'horizontal',
                                                          align: 'center',
                                                          verticalAlign: 'bottom'
                                                      }
                                                  }
                                              }]
                                          }
                                        })
                                        ;
                                }}>Train</Button></Space>
                                <form noValidate onSubmit={this.onSubmit}>
                                <Space size="middle">
                                    <input
                                        type="submit"
                                        value="submit"
                                        className="btn btn-outline-warning btn-block mt-4"
                                    />
                                </Space>
                                </form>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                    Distinct:<input
                            type='number    '
                            placeholder='Distinct'
                            name='Distinct'
                            className='form-control'
                            value={this.state.Distinct}
                            onChange={this.onChange}
                          />
                    Imputed:<input
                            type='number'
                            placeholder='Imputed'
                            name='Imputed'
                            className='form-control'
                            value={this.state.Imputed}
                            onChange={this.onChange}
                          />
                    Mean:<input
                            type='number'
                            placeholder='Mean'
                            name='Mean'
                            className='form-control'
                            value={this.state.Mean}
                            onChange={this.onChange}
                          />
                    Maximun:<input
                            type='number'
                            placeholder='Maximun'
                            name='Maximun'
                            className='form-control'
                            value={this.state.Maximun}
                            onChange={this.onChange}
                          />
                    Minimun:<input
                            type='number'
                            placeholder='Minimun'
                            name='Minimun'
                            className='form-control'
                            value={this.state.Minimun}
                            onChange={this.onChange}
                          />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                    <div id="main01" style={{heigh:"400px"}}>
                                    
                    </div>
                    </Card>
                </Col>
                </Row>
            </div>
            </Space>
        </div>        
    </div>)
  }
}

export default withRouter(Data);