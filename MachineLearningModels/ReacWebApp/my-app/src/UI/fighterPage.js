/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
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
import Box from '@material-ui/core/Box';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';





// abstract Grid

const Grids = (props) => <Grid container {...props} />
const GridCol = (props) => <Grid container direction='column'{...props} />
const GridRow = (props) => <Grid container direction='row'{...props} />
const Item = (props) => <Grid item {...props} />




const useStyle = theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.5em",

    },
  },
  logo: {
    // height:"100px",
    width: "16em",
    [theme.breakpoints.down("md")]: {
      height: "5em",
      width: "17em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
      width: "19em",

    },

  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(200),
      margin: theme.spacing(30),
      width: theme.spacing(300),
      height: theme.spacing(16)
    }
  },
  root: {
    backgroundColor: '#FAFAFA',
    minWidth: 1750,
    minHeight: 500,
  },
  Win: {
    backgroundColor: '#47ff63',
    minWidth: 200,
    minHeight: 300,
  },
  Loss: {
    backgroundColor: '#F0A89C',
    minWidth: 200,
    minHeight: 300,
  },
  draw: {
    backgroundColor: '#F0E79C',
    minWidth: 200,
    minHeight: 300,

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









class ProfessorMMA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectOptionsNames: [],
      height: [],
      DOB: [],
      SApM: [],
      SLpM: [],
      REACH: [],
      STANCE: [],
      WEIGHT: [],
      strikeAccuracy: [],
      strDef: [],
      tdAcc: [],
      subAvg: [],
      tdDef: [],
      tdAvg: [],
      FighterA: [],
      FighterB: [],
      Response: false,
      Response1: false,
      Favourite: '',
      UnderDog: '',
      favWin: false,
      undWin: false,
      draw: false,
    }
    this.getFighterA = this.getFighterA.bind(this);
    this.getFighterB = this.getFighterB.bind(this);
    this.postData = this.postData.bind(this);

  }




  // Pulls data from the back end and store in React Compnent 
  async getOptions() {
    const res = await axios.get('http://127.0.0.1:5000/static/fighterDataset2.json')
    const data = res.data
    const nameData = []
    const heightData = []
    const StrikeAcc = []
    const DOB = []
    const SApM = []
    const SLpM = []
    const REACH = []
    const STANCE = []
    const WEIGHT = []
    const strDef = []
    const tdAcc = []
    const subAvg = []
    const tdDef = []
    const tdAvg = []


    for (let i = 0; i < 6000; i++) {
      // console.log(FighterData.Name[i])
      if (FighterData.Name[i] !== undefined) {
        nameData.push({ "Name": FighterData.Name[i] })
        heightData.push({ "Height": FighterData.HEIGHT[i] })
        StrikeAcc.push({ "StrAcc": FighterData["Str. Acc.."][i] })
        DOB.push({ "DOB": FighterData.DOB[i] })
        SApM.push({ "SApM": FighterData.SApM[i] })
        SLpM.push({ "SLpM": FighterData.SLpM[i] })
        REACH.push({ "REACH": FighterData.REACH[i] })
        STANCE.push({ "STANCE": FighterData.STANCE[i] })
        WEIGHT.push({ "WEIGHT": FighterData.WEIGHT[i] })
        strDef.push({ "strDef": FighterData["Str. Def"][i] })
        tdAcc.push({ "tdAcc": FighterData["TD Acc"][i] })
        subAvg.push({ "subAvg": FighterData["Sub. Avg"][i] })
        tdDef.push({ "tdDef": FighterData["TD Def."][i] })
        tdAvg.push({ "tdAvg": FighterData["TD Avg"][i] })


      }
    }

    this.setState({ selectOptionsNames: nameData })
    this.setState({ height: heightData })
    this.setState({ strikeAccuracy: StrikeAcc })
    this.setState({ DOB: DOB })
    this.setState({ SLpM: SLpM })
    this.setState({ REACH: REACH })
    this.setState({ STANCE: STANCE })
    this.setState({ WEIGHT: WEIGHT })
    this.setState({ strDef: strDef })
    this.setState({ tdAcc: tdAcc })
    this.setState({ subAvg: subAvg })
    this.setState({ tdDef: tdDef })
    this.setState({ tdAvg: tdAvg })
    this.setState({ SApM: SApM })




  }
  componentDidMount() {
    this.getOptions()
  }

  handleChange(e) {
    this.setState({ name: e.label })
  }


  getFighterA(param) {
    const indexA = this.state.selectOptionsNames.indexOf(param);
    const FighterA = []


    if (indexA !== -1) {
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
    }
    this.setState({ FighterA: FighterA })
    this.setState({ Response: false });
    this.setState({ favWin: false });
    this.setState({ undWin: false });
    this.setState({ draw: false });



  }

  getFighterB(param) {
    const indexB = this.state.selectOptionsNames.indexOf(param);
    const FighterB = []
    if (indexB !== -1) {
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

    }
    this.setState({ FighterB: FighterB });
    this.setState({ Response1: false });
    this.setState({ undWin: '' });
    this.setState({ draw: '' });

  }


  async postData() {
    let predictData;


    if (this.state.FighterA.length > 0 && this.state.FighterB.length > 0) {
      predictData = this.state.FighterA.concat(this.state.FighterB);
    }

    const axios = require('axios')

    // axios.post('http://localhost:5000/predict', predictData)
    //   .then(function (response) {
    //     console.log(response);
    //   })

    const res = axios({
      url: '/api/react_api ',
      method: 'POST',
      data: predictData,
      // `headers` are custom headers to be sent
      headers: { 'form': 'form' },
    })
      .then((response) => {

        // let fighterA = '';
        // let fighterB = '';

        console.log(response.data)
        console.log("File has been sent to the server ")
        this.setState({ Response: true })
        this.setState({ Response1: true })


        let fighterA = response.data.FAVOURITE;
        let fighterB = response.data.UNDERDOG;

        if (fighterA !== 'Draw' && fighterB !== 'Draw') {
          fighterA = Number(fighterA)
          fighterB = Number(fighterB)

          if (fighterA > fighterB) {
            this.setState({ favWin: true });
            this.setState({ undWin: false });
          } else {
            this.setState({ undWin: true });
            this.setState({ favWin: false });
          }
        } else {
          this.setState({ draw: true })
        }

        this.setState({ Favourite: fighterA })
        this.setState({ UnderDog: fighterB })


      })
      .catch(() => {
        console.log("internal Server Error")
      });;


    console.log(predictData);

    // console.log(res)


  }


  // const Grids = (props) => <Grid container {...props} />
  // const GridCol = (props) => <Grid container direction ='column'{...props} />
  // const GridRow = (props) => <Grid container direction ='row'{...props} />
  // const Item = (props) => <Grid item {...props} />


  render() {
    const data = [
      {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
      },
      {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
      },
      {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
      },
      {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228,
      },
      {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100,
      },
      {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700,
      },
    ];



    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (

      <React.Fragment>
        <Box p={5}>
          <GridRow >
            <Item xs={12}>
              <GridRow spacing={10}>

                <Item xs={12} lg={6}>
                  <Card elevation={6} className={this.state.Response ? this.state.draw ? classes.draw : this.state.favWin ? classes.Win : classes.Loss : classes.root}>
                    <CardActionArea>
                      <CardActions>
                        <CardContent>
                          <Typography variant="h7" component="h1">
                            Favourite : {this.state.FighterA[0]}
                          </Typography>
                          <Typography variant="h2" component="h1">
                            {/*{this.state.Response ? this.state.Favourite + 'Percent' : '' }*/}
                            {this.state.Response ? this.state.draw ? this.state.Favourite : this.state.Favourite + 'Percent' : ''}

                          </Typography>
                        </CardContent>
                        <GridRow justify="center" alignItems="center">
                          <Item xs={12}>
                            <ResponsiveContainer width={1200} height={500}>
                              <ComposedChart
                                layout="vertical"
                                width={500}
                                height={400}
                                data={data}
                                margin={{
                                  top: 20,
                                  right: 20,
                                  bottom: 20,
                                  left: 20,
                                }}
                              >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" scale="band" />
                                <Tooltip />
                                <Legend />
                                <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                <Line dataKey="uv" stroke="#ff7300" />
                              </ComposedChart>
                            </ResponsiveContainer>
                          </Item>
                        </GridRow>

                      </CardActions>




                    </CardActionArea>




                  </Card>
                  <GridRow>

                    <Item >
                      <Box p={1.5}>
                        <Paper styles={classes.paper}>

                          <Autocomplete
                            id="FighterA"
                            options={this.state.selectOptionsNames}
                            getOptionLabel={(option) => option.Name}
                            style={{ width: 500 }}
                            onChange={(event, value) => this.getFighterA(value)} // sends Index of selected Item Fighter A
                            renderInput={(params) => <TextField {...params} label="Simulation Quantity" variant="outlined" />}
                          />
                        </Paper>
                      </Box>

                      <Item container
                        direction="row"
                        justify="center"
                        alignItems="center">

                        <label htmlFor="contained-button-file">
                          <Button size='large' variant="contained" color="primary" onClick={this.postData} component="span" >
                            Simulate
                          </Button>
                        </label>
                        <h1>
                          {/*{this.state.Response}*/}
                        </h1>
                      </Item>
                    </Item>

                  </GridRow>


                </Item>






              </GridRow>
            </Item>
          </GridRow>

        </Box>

      </React.Fragment>

    );
  }
}


// export default class ComboBox
export default withStyles(useStyle)(ProfessorMMA)
