import React, { Component } from 'react';
import axios from 'axios';
import BetterScroll from 'better-scroll';
import { Space, Button,Tooltip,Select,Divider,Card, Col, Row } from 'antd';
import { RedoOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import styles from "./styles/personal.module.css";
import * as Highcharts from 'highcharts';
const text = <span>prompt text(Treatment strategy?)</span>;

class Data extends Component{
  constructor(props){
    super(props);
    this.state={
      datad: [],
      backdatad:[],
    }
 }
 componentDidMount() {
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
}0;
  render(){
      let {DataName} = this.props
      const datad = this.state.datad;
      console.log("Printdata: " + datad);
      let dataList;

      if(!datad) {
        dataList = "there is no data record!";
      } else {
        dataList = datad.map((data, k) =>
          <Button  type="primary" data={data} key={k} onClick={()=>{
            // console.log(data)
            this.props.onEvent(data.Numerical)
            this.props.onEvent2(data.Categorical)
        }}>{data.ID}</Button>
        );
      }
      return(
          <div className="articleitem" onClick={()=>{
              
          }}>
              <dl>
                  <dt>Name:{DataName}</dt>
                  <Button  type="primary" onClick={()=>{
                      // console.log(data)
                      var newList = this.state.backdatad.filter(item=>
                        (item.Name.toUpperCase().includes(DataName.toUpperCase())))
                
                    this.setState({
                        datad:newList
                    })
                  }}>{"data.ID"}</Button>
                  {dataList}
              </dl>
          </div>
      )
      
  }
}

class FilmItem extends Component{
  constructor(props){
    super(props);
    this.state={
      color:true,
      isShow:false,
      isShow2:true,
      isShow3:true
    }
 }
  render(){
      let {title,author,isbn,description,publisher,published_date,current3,current2} = this.props
      return(
          <div className="articleitem" style={{ color:(this.state.color==true&&current3==current2)? "white":"black" }} onClick={()=>{
              console.log(current2)
              console.log(current3)
              this.props.onEvent(title)
              this.props.onEvent2(author)
              this.props.onEvent3(isbn)
              this.props.onEvent4(published_date)
              this.props.onEvent5(description)
              this.props.onEvent6(publisher)
              if(current3!=current2){
                current2=current3
                this.props.onEvent7(current2)
              }else{
                this.setState({color:!this.state.color})
              }
              // this.setState({color:!this.state.color})
          }}>
              <dl>
                  <dt>Name:{title}</dt>
                  <dd>n_neighbours:{author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;K:{publisher} </dd>
              </dl>
          </div>
      )
      
  }
}
class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      backbook:[],
      datad: [],
      backdatad:[],
      datas: [],
      backdata:[],
      title: '',
      isbn: '',
      author: '',
      description: '',
      published_date: '',
      publisher: '',
      current:0,
      current2:1008611,
      current3:0,
      
      // DataName,
      DataName: 0,
      Numerical:0,
      Categorical: 0,
      Times: 0,
      Input: '',
      Data6: 0,
      number1:1,
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
        new BetterScroll(".modelBox")
      })
      .catch(err =>{
        console.log('Error from ShowBookList');
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
    // console.log("input",event.target.value)

    var newList = this.state.backbook.filter(item=>
       (item.title.toUpperCase().includes(event.target.value.toUpperCase())))

    this.setState({
      books:newList
    })
  }
  handleInput2 = (event) => {
    // console.log("input",event.target.value)
       
    var newList = this.state.backdatad.filter(item=>
      (item.Name.toUpperCase().includes(this.state.DataName.toUpperCase())))

    var newList2 = newList.filter(item=>
      (item.ID.toUpperCase().includes(event.target.value.toUpperCase())))
    this.setState({
      datad:newList2
    })
  }
  onChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      number1:value
    })
  };

  render() {
    const books = this.state.books;

    const datas = this.state.datas;
    console.log("Printdata: " + datas);
    let dataList;

    if(!datas) {
      dataList = "there is no data record!";
    } else {
      dataList = datas.map((data, k) =>
        // <DataCard data={data} key={k} />
        <Button type="primary" icon={<RedoOutlined />} key={k} onClick={()=>{
          console.log("input",this.state.Input)
          console.log(data)
          var newList = this.state.backdatad.filter(item=>
            (item.Name.toUpperCase().includes(data.Name.toUpperCase())))
            var newList2 = newList.filter(item=>
              (item.ID.toUpperCase().includes(this.state.Input.toUpperCase())))
            this.setState({
              datad:newList2,
              DataName:data.Name
            })
          if(this.state.current!=k){
            this.setState({
              current:k,
              Times:0,
            })}
            else if(this.state.current===k){
              this.setState({
                isShow:!this.state.isShow,
                isShow3:true,
                Input:''
              })
            }
        }}>{data.Name}</Button>
      );
    }

    const datad = this.state.datad;
      console.log("Printdata: " + datad);
      let dataList2;

      if(!datad) {
        dataList2 = "there is no data record!";
      } else {
        dataList2 = datad.map((data, k) =>
          <Button  type="primary" data={data} key={k} onClick={()=>{
            this.setState({
              Times:parseInt(this.state.Times)+1
            })
            console.log(this.state.Numerical)
            if(this.state.Times<1){
              this.setState({
                Numerical:parseInt(this.state.Numerical)+parseInt(data.Numerical),
                Categorical:parseInt(this.state.Categorical)+parseInt(data.Categorical)
              })
            }
            console.log(this.state.Numerical)
        }}>{data.ID}</Button>
        );
      }
    var num1 = parseInt(this.state.author);
    var num2 = parseInt(this.state.publisher);
    var num3 = parseInt(this.state.DataName);
    var num4 = parseInt(this.state.Numerical);
    var num5 = parseInt(this.state.Categorical);
    var num01 = num4+num5;
    var number01 = parseInt(this.state.number1);
    console.log(num01)
    return (
      <div className="personal">
            <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                <Col span={10}>
                    <Card bordered={false} >
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Space size="middle">
                                Model: 
                                <Button type="primary" icon={<RedoOutlined />} onClick={()=>{
                                  if(this.state.current!=1008611){
                                    this.setState({
                                      current:1008611
                                    })}
                                    else if(this.state.current===1008611){
                                      this.setState({
                                        isShow3:!this.state.isShow3,
                                        isShow:false,
                                      })
                                    }
                                }}>Model</Button>
                            </Space>
                            <Space size="middle">
                            <Space size={[8, 16]} wrap>
                                Patient Data: 
                                {dataList}
                            </Space>
                            </Space>
                            {this.state.isShow &&
                            <Space>
                              <Space size="middle">
                                {this.state.DataName}:
                                <input placeholder='Patient_ID'  onInput={this.handleInput2} onChange={(evt)=>{
                                        this.setState({
                                            Input:evt.target.value
                                        })
                                    }}/>
                              </Space>
                              <Space size="middle">
                                <Space size={[8, 16]} wrap>
                                {dataList2}
                                </Space>
                              </Space>
                            </Space>}
                            <Space size="middle">
                                Strategy:
                                <Tooltip placement="bottomLeft" title={text}>
                                    <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
                                </Tooltip>
                                <Select
                                defaultValue="Early Fusion"
                                style={{ width: 120 }}
                                onChange={this.onChange}
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
                            <div className={styles.PredictB}>
                            {/* <Button type="primary" >Predict</Button> */}
                            <Button type="primary" onClick={()=>{
                                    // this.setState({
                                    //   train:parseInt(this.state.author)
                                    // })
                                    // var num1 = parseInt(this.state.author);
                                    // var num2 = parseInt(this.state.publisher);
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
                                        data: [90*number01+num1+num2, 80*number01+num1+num2, 70*number01+num1+num2,
                                           50*number01+num1+num2, 40*number01+num1+num2,20*number01+num1+num2]
                                      }]
                                    });
                                    Highcharts.chart('main2', {
                                      title: {
                                        text: 'Profile'
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
                                      categories: ['IRDEK', 'HCETBI', 'LRES', 'NGISEDOIB'],
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
                                        data: [2.5*number01+num01, 4.5*number01+num01, 2*number01+num01, 3*number01+num01]
                                    }, {
                                        name: 'UHR',
                                        data: [2*number01+num01,2*number01+num01,3*number01+num01,6*number01+num01]
                                    }, {
                                        name: 'Remit',
                                        data: [1*number01+num01,5*number01+num01,3*number01+num01,2*number01+num01]
                                    }, {
                                        name: 'Convert',
                                        data: [5*number01+num01,6*number01+num01,5*number01+num01,4*number01+num01]
                                    }, {
                                        name: 'Sample',
                                        data: [4*number01+num01,2*number01+num01,4*number01+num01,5*number01+num01]
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
                                    });
                                    this.setState({
                                      isShow2:true,
                                    })
                                }}>Predict</Button>             
                            </div>
                        </Space>
                    </Card>
                </Col>
                <Col span={8}>
                {!this.state.isShow3 && <Card bordered={false}>
                    <div className={styles.modelBox} style={{padding: 20, minHeight: 220,maxWidth:410}}>
                      <h1>Model</h1>
                                <input placeholder='Model Name'  onInput={this.handleInput} onChange={(evt)=>{
                                    this.setState({
                                        text:evt.target.value
                                    })
                                }}/>
                    <div className='modelBox' style={{height:'215px', padding: 20, minHeight: 220,maxWidth:410,overflow:'hidden'}}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex'}}>
                                {
                                books.map((article, index)=>
                                        <FilmItem key ={index} {...article} current2={this.state.current2} current3={index}
                                        onEvent={(value)=>{
                                            
                                            this.setState({
                                                title:value
                                            })
                                        }}
                                        onEvent2={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                author:value
                                            })
                                        }}
                                        onEvent3={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                              isbn:value
                                            })
                                        }}
                                        onEvent4={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                                published_date:value
                                            })
                                        }}
                                        onEvent5={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                              description:value
                                            })
                                        }}
                                        onEvent6={(value)=>{
                                            // console.log("CtoP",value)
                                            this.setState({
                                              publisher:value
                                            })
                                        }}
                                        onEvent7={(value)=>{
                                          // console.log("CtoP",value)
                                          this.setState({
                                            current2:value
                                          })
                                      }}></FilmItem>
                                    )
                                }
                            </Space>
                        </div></div>
                    </Card>}
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
                    <div id="main2" style={{heigh:"400px"}}>
                                    
                    </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                    {this.state.isShow2&&<div>
                    <h3>Probability</h3>
                    Control:{(12+num01)*number01/10}<br/>
                    UHR:{(13+num01)*number01/10}<br/>
                    Remit:{(11+num01)*number01/10}<br/>
                    Convert:{(20+num01)*number01/10}</div>}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                    <div id="main" style={{heigh:"400px"}}>
                                    
                    </div>
                    </Card>
                </Col>
                </Row>
            </div>
            </Space>
        </div>
    );
  }
}

export default ShowBookList;