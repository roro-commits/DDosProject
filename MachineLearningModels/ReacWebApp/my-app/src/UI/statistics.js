/* eslint-disable no-use-before-define */
import React,{useEffect,useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import FighterData from '../DATA/fighterDataset.json'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import {clearCache} from "clear-cache"

// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Chip from '@material-ui/core/Chip';





      // abstract Grid

     const Grids = (props) => <Grid container {...props} />
     const GridCol = (props) => <Grid container direction ='column'{...props} />
     const GridRow = (props) => <Grid container direction ='row'{...props} />
     const Item = (props) => <Grid item {...props} />




const useStyle = theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
    [theme.breakpoints.down("xs")]:{
      marginBottom: "1.5em",

    },
  },
  logo: {
    // height:"100px",
    width: "16em",
    [theme.breakpoints.down("md")]:{
      height: "5em",
      width: "17em",
    },
    [theme.breakpoints.down("xs")]:{
      height: "5.5em",
      width: "19em",

    },

  },
  paper:{
     display: "flex",
    flexWrap: "wrap",
    "& > *": {
       marginTop:theme.spacing(200),
      margin: theme.spacing(30),
      width: theme.spacing(300),
      height: theme.spacing(16)
    }
  },
   root: {
      backgroundColor: '#FAFAFA',
    minWidth: 200,
     minHeight:300,
  },
  Win: {
      backgroundColor: '#BCE6DA',
    minWidth: 200,
     minHeight:300,
  },
 Loss: {
  backgroundColor:'#F0A89C',
minWidth: 200,
 minHeight:300,
},
    draw:{
        backgroundColor: '#F0E79C',
        minWidth: 200,
        minHeight:300,

    },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


class Statistics extends React.PureComponent {
constructor(props){
    super(props)
    this.state = {
      selectOptionsNames : [],
      height: [],
      DOB:[],
      SApM:[],
      SLpM:[],
      REACH:this.props.stats[3],
      STANCE:[],
      WEIGHT:[],
      strikeAccuracy:[],
      strDef:[],
      tdAcc:[],
      subAvg:[],
      tdDef:[],
      tdAvg:[],
      FighterA:[],
      FighterB:[],
      Response:false,
      Response1:false,
      Favourite: '',
      UnderDog: '',
      favWin:false,
      undWin:false,
      draw:false,
      // new 
      subject :["hello","dello"],
      Correct :[0,0,90,0,0,0,0,0,0,0],
      Incorrect :[1],
      fullMark :[],
      chart:[],
      charttwo:[],
      radarB:false,

      // fixedOptions:["hello"],
      // value:[...this.fixedOptions, this.FighterA]
    }
    this.getFighterA = this.getFighterA.bind(this);


  }




  async getOptions(){
    const res = await axios.get('/static/satistics.json')
    // const res = await axios.get('http://127.0.0.1:5000/static/satistics.json')

    const data = res.data
    const subject =[]
    const Incorrect =[]
    const Correct =[]
    const fullMark =[]

    console.log("The Data", data)


    for(let i =0; i< res.data.length ;i++){
      // console.log("Data data",data.subject)

      console.log(data[i]["subject"])
      console.log()
      
      if (data[i]["subject"] !== undefined) {

        subject.push(data[i]["subject"]);
        Incorrect.push(data[i]["Incorrect"] );
        Correct.push(Number(data[i]["Correct"]));
        fullMark.push(data[i]["fullMark"]);
      }


    }


      this.setState({ subject: subject});
      this.setState({ Incorrect: Incorrect});
      this.setState({ Correct: Correct });
      this.setState({ fullMark: fullMark });
   

  }
    componentDidMount(){
      this.getOptions()
  }





  getFighterA(param){
    const indexA = this.state.selectOptionsNames.indexOf(param);
    const FighterA=[]
    let radar_one = []


         const convertRange =( value, min , max) => {

                for (let i = 0; i < value[0].length; i++)
                {
                    if(max - min === 0) return 1;
                    value[0][i] = (value[0][i] - min) / (max - min);

                }
                return value[0];
            };


    if(indexA !== -1 ){
      // this.setState({FighterA:[]}) // reset array before setting new data
      FighterA.push(this.state.selectOptionsNames[indexA].Name)
      FighterA.push(this.state.height[indexA].Height)
      FighterA.push(this.state.WEIGHT[indexA].WEIGHT)
      FighterA.push(this.state.REACH[indexA].REACH)
      FighterA.push(this.state.STANCE[indexA].STANCE)
      FighterA.push(this.state.DOB[indexA].DOB)
      FighterA.push(this.state.SLpM[indexA].SLpM)
      FighterA.push(this.state.strikeAccuracy[indexA].StrAcc)
      FighterA.push(this.state.SApM[indexA].SApM)
      FighterA.push(this.state.strDef[indexA].strDef)
      FighterA.push(this.state.tdAvg[indexA].tdAvg)
      FighterA.push(this.state.tdAcc[indexA].tdAcc)
      FighterA.push(this.state.tdDef[indexA].tdDef)
      FighterA.push(this.state.subAvg[indexA].subAvg)

       radar_one.push(FighterA.slice(1,2).concat(FighterA.slice(3 ,4)).concat(FighterA.slice(6,13)));
        console.log("radarone " ,radar_one)
        radar_one[0][0] = radar_one[0][0] * 30
        radar_one[0][2] = radar_one[0][2] * 10
        radar_one[0][4] = radar_one[0][4] * 10
        radar_one[0][6] = radar_one[0][6] * 10

            let chart = convertRange(radar_one ,2 ,10)
            this.setState({chart:chart});


    }else{
            this.setState({chart:radar_one});
            this.setState({FighterB:FighterA});
    }

    // console.log("Chart",chart)
    this.setState({FighterA:FighterA})
    this.setState({Response:false});
    this.setState({undWin:false});
    this.setState({draw:false});
  }

    getFighterB(param){
    const indexB = this.state.selectOptionsNames.indexOf(param);
    const FighterB=[]
    let radar_two = []

     const convertRange =( value, min , max) => {

            for (let i = 0; i < value[0].length; i++)
            {
                if(max - min === 0) return 1;
                value[0][i] = (value[0][i] - min) / (max - min);

            }
            return value[0];
        };

    if(indexB!== -1 ){
      // this.setState({FighterB:[]}) // reset array before setting new data
      FighterB.push(this.state.selectOptionsNames[indexB].Name)
      FighterB.push(this.state.height[indexB].Height)
      FighterB.push(this.state.WEIGHT[indexB].WEIGHT)
      FighterB.push(this.state.REACH[indexB].REACH)
      FighterB.push(this.state.STANCE[indexB].STANCE)
      FighterB.push(this.state.DOB[indexB].DOB)
      FighterB.push(this.state.SLpM[indexB].SLpM)
      FighterB.push(this.state.strikeAccuracy[indexB].StrAcc)
      FighterB.push(this.state.SApM[indexB].SApM)
      FighterB.push(this.state.strDef[indexB].strDef)
      FighterB.push(this.state.tdAvg[indexB].tdAvg)
      FighterB.push(this.state.tdAcc[indexB].tdAcc)
      FighterB.push(this.state.tdDef[indexB].tdDef)
      FighterB.push(this.state.subAvg[indexB].subAvg)


        radar_two.push(FighterB.slice(1,2).concat(FighterB.slice(3 ,4)).concat(FighterB.slice(6,13)));
        console.log("Radar Two " ,radar_two)
        radar_two[0][0] = radar_two[0][0] * 30
        radar_two[0][2] = radar_two[0][2] * 10
        radar_two[0][4] = radar_two[0][4] * 10
        radar_two[0][6] = radar_two[0][6] * 10

            let chart = convertRange(radar_two ,2 ,10)
            this.setState({charttwo:chart});

    }
    else{
            this.setState({charttwo:radar_two});
            this.setState({FighterB:FighterB});
    }

        this.setState({FighterB:FighterB});


  }


     // const Grids = (props) => <Grid container {...props} />
     // const GridCol = (props) => <Grid container direction ='column'{...props} />
     // const GridRow = (props) => <Grid container direction ='row'{...props} />
     // const Item = (props) => <Grid item {...props} />

    //  const data = res.data
    //  const subject =[]
    //  const Incorrect =[]
    //  const Correct =[]
    //  const fullMark =[]
 

  render(){
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
// data[i]["Correct"]
    console.log("log testing",this.state.Correct)
    console.log("log testing",this.state.subject)


    const data = [
  {
    subject: this.state.subject[0],
    'Correct': this.state.Correct[0],
    'InCorrect': this.state.Incorrect[0],
    fullMark: 20,
  },

  {
    subject: this.state.subject[1],
    'Correct': this.state.Correct[1],
    'InCorrect': this.state.Incorrect[1],
    fullMark: 10,
  },
  {
    subject: this.state.subject[2],
    'Correct': this.state.Correct[2],
    'InCorrect': this.state.Incorrect[2],
    fullMark: 20,
  },
  {
    subject: this.state.subject[3],
    'Correct': this.state.Correct[3],
    'InCorrect': this.state.Incorrect[3],
    fullMark: 20,
  },
  {
    subject: this.state.subject[4],
    'Correct': this.state.Correct[4],
    'InCorrect': this.state.Incorrect[4],
    fullMark: 20,
  },
 {
    subject: this.state.subject[5],
    'Correct': this.state.Correct[5],
    'InCorrect': this.state.Incorrect[5],
    fullMark: 20,
  },
 {
    subject: this.state.subject[6],
    'Correct': this.state.Correct[6],
    'InCorrect': this.state.Incorrect[6],
    fullMark: 20,
  }, {
    subject: this.state.subject[7],
    'Correct': this.state.Correct[7],
    'InCorrect': this.state.Incorrect[7],
    fullMark: 20,
  }, {
    subject: this.state.subject[8],
    'Correct': this.state.Correct[8],
    'InCorrect': this.state.Incorrect[8],
    fullMark: 20,
  },
  {
    subject: this.state.subject[9],
    'Correct': this.state.Correct[9],
    'InCorrect': this.state.Incorrect[9],
    fullMark: 20,
  },
  {
    subject: this.state.subject[10],
    'Correct': this.state.Correct[10],
    'InCorrect': this.state.Incorrect[10],
    fullMark: 20,
  },
  {
    subject: this.state.subject[11],
    'Correct': this.state.Correct[11],
    'InCorrect': this.state.Incorrect[11],
    fullMark: 20,
  },
  {
    subject: this.state.subject[12],
    'Correct': this.state.Correct[12],
    'InCorrect': this.state.Incorrect[12],
    fullMark: 20,
  },

];

    return (

    <React.Fragment>
       <Box p={0}>
        

           <GridCol>

                  <Box p={15}>
                      <Item xs={12} lg={12}>
                               <GridCol  justify="center" alignItems="center">
                                   <Item>
                                        <Card elevation={3} className={this.state.Response1?  this.state.draw ?  classes.draw : this.state.undWin ? classes.Win: classes.Loss : classes.root}>
                                    <CardActionArea>
                                        <CardActions>
                                            <CardContent>
                                                <Typography variant="h7" component="h1">
                                                   Radar Chart
                                                 </Typography>

                                            </CardContent>
                                        </CardActions>
                                         <GridRow justify="center" alignItems="center">
                                        <Item xs={12}>
                                             <ResponsiveContainer width={1200} height={500}>
                                                <RadarChart cx="50%" cy="45%" outerRadius="85%" data={data}>
                                                  <PolarGrid />
                                                  <PolarAngleAxis dataKey="subject" />
                                                  <PolarRadiusAxis angle={40} domain={[0, 10]} />
                                                  <Radar name={this.state.FighterA[0]} dataKey='Correct' stroke="#fc9992" fill="#fc9992" fillOpacity={0.6} />
                                                  <Radar  name={this.state.FighterB[0]} dataKey='InCorrect' stroke="#a3eef0" fill="#a3eef0" fillOpacity={0.6} />
                                                  <Legend />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </Item>
                                     </GridRow>
                                    </CardActionArea>
                                </Card>
                                   </Item>

                               </GridCol>
                      </Item>
                  </Box>

                  <Box p={10}>
                      <Item xs={12} lg={12}>
                               <GridCol  justify="center" alignItems="center">
                                   <Item>
                                        <Card  elevation={3} className={this.state.Response1?  this.state.draw ?  classes.draw : this.state.undWin ? classes.Win: classes.Loss : classes.root}>
                                    <CardActionArea>
                                        <CardActions>
                                            <CardContent>
                                                <Typography variant="h7" component="h1">
                                                   Bar Chart
                                                 </Typography>

                                            </CardContent>
                                        </CardActions>
                                         <GridRow justify="center" alignItems="center">
                                        <Item xs={12}>
                                            <ResponsiveContainer width={1200} height={500}>
                                                <BarChart
                                                  width={900}
                                                  height={300}
                                                  data={data}
                                                  stackOffset="sign"
                                                  margin={{
                                                    top: 5,
                                                    right: 5,
                                                    left: 5,
                                                    bottom: 5,
                                                  }}
                                                >
                                                  <CartesianGrid strokeDasharray="1 1" />
                                                  <XAxis dataKey="subject" />
                                                  <YAxis />
                                                  <Tooltip />
                                                  <Legend />
                                                  <ReferenceLine y={0} stroke="#000" />
                                                   <Bar dataKey="Correct" stackId="a" fill="#8884d8" />
                                                   <Bar dataKey='InCorrect' stackId="a" fill="#82ca9d" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </Item>
                                     </GridRow>
                                    </CardActionArea>
                                </Card>
                                   </Item>

                               </GridCol>
                      </Item>
                  </Box>



            </GridCol>

       </Box>

    </React.Fragment>

  );
  }
}



// export default class ComboBox
export default withStyles(useStyle)(Statistics)

