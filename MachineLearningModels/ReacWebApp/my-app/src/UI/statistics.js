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
      REACH:[],
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
      chart:[],
      charttwo:[],
      radarB:false,

      // fixedOptions:["hello"],
      // value:[...this.fixedOptions, this.FighterA]
    }
    this.getFighterA = this.getFighterA.bind(this);

  }


  async getOptions(){
    const res = await axios.get('/static/fighterDataset2.json')
    const data = res.data
    const nameData =[]
    const heightData =[]
    const StrikeAcc =[]
    const DOB =[]
    const SApM =[]
    const SLpM =[]
    const REACH =[]
    const STANCE =[]
    const WEIGHT =[]
    const strDef =[]
    const tdAcc =[]
    const subAvg =[]
    const tdDef =[]
    const tdAvg =[]


    for(let i =0; i< 6000 ;i++){
      // console.log(FighterData.Name[i])
      if (FighterData.Name[i] !== undefined){
        nameData.push({ "Name" : FighterData.Name[i]})
        heightData.push({"Height": FighterData.HEIGHT[i]})
        StrikeAcc.push({"StrAcc": FighterData["Str. Acc.."][i]})
        DOB.push({"DOB":FighterData.DOB[i]})
        SApM.push({"SApM":FighterData.SApM[i]})
        SLpM.push({"SLpM":FighterData.SLpM[i]})
        REACH.push({"REACH":FighterData.REACH[i]})
        STANCE.push({"STANCE":FighterData.STANCE[i]})
        WEIGHT.push({"WEIGHT":FighterData.WEIGHT[i]})
        strDef.push({"strDef":FighterData["Str. Def"][i]})
        tdAcc.push({"tdAcc":FighterData["TD Acc"][i]})
        subAvg.push({"subAvg":FighterData["Sub. Avg"][i]})
        tdDef.push({"tdDef":FighterData["TD Def."][i]})
        tdAvg.push({"tdAvg":FighterData["TD Avg"][i]})


      }
    }

    this.setState({selectOptionsNames: nameData})
    this.setState({height: heightData})
    this.setState({strikeAccuracy: StrikeAcc})
    this.setState({DOB: DOB})
    this.setState({SLpM: SLpM})
    this.setState({REACH: REACH})
    this.setState({STANCE: STANCE})
    this.setState({WEIGHT: WEIGHT})
    this.setState({strDef: strDef})
    this.setState({tdAcc: tdAcc})
    this.setState({subAvg: subAvg})
    this.setState({tdDef: tdDef})
    this.setState({tdAvg: tdAvg})
    this.setState({SApM: SApM})

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


  render(){
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    const data = [
  {
    subject: 'HEIGHT',
    A: this.state.chart[0],
    B: this.state.charttwo[0],
    fullMark: 20,
  },

  {
    subject: 'REACH',
    A: this.state.chart[1],
    B: this.state.charttwo[1],
    fullMark: 10,
  },
  {
    subject: 'Strike Landed Per Min',
    A: this.state.chart[2],
    B: this.state.charttwo[2],
    fullMark: 10,
  },
  {
    subject: 'Strike Acc',
    A: this.state.chart[3],
    B: this.state.charttwo[3],
    fullMark: 10,
  },
  {
    subject: 'Strike Absorbed Per Min',
    A: this.state.chart[4],
    B: this.state.charttwo[4],
    fullMark: 10,
  },
 {
    subject: 'Strike Def',
    A: this.state.chart[5],
    B: this.state.charttwo[5],
    fullMark: 10,
  },
 {
    subject: 'Takedown Avg',
    A: this.state.chart[6],
    B: this.state.charttwo[6],
    fullMark: 10,
  }, {
    subject: 'Takedown Acc',
    A: this.state.chart[7],
    B: this.state.charttwo[7],
    fullMark: 10,
  }, {
    subject: 'Takedown Def',
    A: this.state.chart[8],
    B: this.state.charttwo[8],
    fullMark: 10,
  },
  //       {
  //   subject: 'Submission Avg',
  //   A: this.state.chart[8],
  //   B: 0,
  //   fullMark: 10,
  // },

];

    return (

    <React.Fragment>
       <Box p={5}>
           <GridRow>
               <GridRow  >

                      <GridRow spacing={10}>

                                <GridRow xs={6} justify="flex-end" alignItems="center">
                                    <Item styles={{marginLeft:2000}}>


                                      <Box p={1.5}>
                                          <Paper  styles={classes.paper}>

                                             <Autocomplete
                                              id="FighterA"
                                              options={this.state.selectOptionsNames}
                                              getOptionLabel={(option) => option.Name}
                                              style={{ width: 500 }}
                                              onChange={(event, value) => this.getFighterA(value)} // sends Index of selected Item Fighter A
                                              renderInput={(params ) => <TextField {...params}  label="Fighters" variant="outlined" />}
                                            />

                                        </Paper>
                                      </Box>
                                    </Item>
                                </GridRow>


                                <GridRow xs={6}  justify="flex-start" alignItems="center" >
                                    <Item >


                                          <Box p={1.5}>
                                              <Paper  styles={classes.paper}>

                                                 <Autocomplete
                                                  id="FighterB"
                                                  options={this.state.selectOptionsNames}
                                                  getOptionLabel={(option) => option.Name}
                                                  style={{ width: 500 }}
                                                  onChange={(event, value) => this.getFighterB(value)} // sends Index of selected Item Fighter A
                                                  renderInput={(params ) => <TextField {...params}  label="Fighters" variant="outlined" />}
                                                />

                                            </Paper>
                                          </Box>
                                    </Item>
                                </GridRow>
                      </GridRow>
                </GridRow>
           </GridRow>

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
                                                  <Radar name={this.state.FighterA[0]} dataKey="A" stroke="#fc9992" fill="#fc9992" fillOpacity={0.6} />
                                                  <Radar  name={this.state.FighterB[0]} dataKey="B" stroke="#a3eef0" fill="#a3eef0" fillOpacity={0.6} />
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
                                                  width={500}
                                                  height={300}
                                                  data={data}
                                                  stackOffset="sign"
                                                  margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                  }}
                                                >
                                                  <CartesianGrid strokeDasharray="3 3" />
                                                  <XAxis dataKey="subject" />
                                                  <YAxis />
                                                  <Tooltip />
                                                  <Legend />
                                                  <ReferenceLine y={0} stroke="#000" />
                                                   <Bar dataKey="A" stackId="a" fill="#8884d8" />
                                                   <Bar dataKey="B" stackId="a" fill="#82ca9d" />
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

