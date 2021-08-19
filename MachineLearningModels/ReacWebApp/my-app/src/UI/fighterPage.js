/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import FighterData from "../DATA/fighterDataset.json";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
} from "recharts";

// abstract Grid

const Grids = (props) => <Grid container {...props} />;
const GridCol = (props) => <Grid container direction="column" {...props} />;
const GridRow = (props) => <Grid container direction="row" {...props} />;
const Item = (props) => <Grid item {...props} />;

const useStyle = (theme) => ({
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
      height: theme.spacing(16),
    },
  },
  root: {
    backgroundColor: "#FAFAFA",
    minWidth: 1750,
    minHeight: 500,
  },
  Win: {
    backgroundColor: "#47ff63",
    minWidth: 1750,
    minHeight: 500,
  },
  Loss: {
    backgroundColor: "#F0A89C",
    minWidth: 1750,
    minHeight: 500,
  },
  draw: {
    backgroundColor: "#F0E79C",
    minWidth: 1750,
    minHeight: 500,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
    super(props);
    this.state = {
      //Data from Backend
      data_test:1000,
      data_test2:[100],
      IPV4_SRC_ADDR : [],
      L4_SRC_PORT : [],
      IPV4_DST_ADDR : [],
      L4_DST_PORT : [],
      PROTOCOL : [],
      L7_PROTO : [],
      IN_BYTES : [],
      OUT_BYTES : [],
      IN_PKTS : [],
      OUT_PKTS : [],
      TCP_FLAGS : [],
      FLOW_DURATION_MILLISECONDS : [200],
      Label : [],
      Attack : [],
      //data for graph and backend
      simulationData:[],
      graph:[],
      simulation_sample:['2','10','100','200'],
      selected_quanltity:1,
      //old
      FighterA: [],
      FighterB: [],
      Response: false,
      Response1: false,
      Favourite: "",
      UnderDog: "",
      favWin: false,
      undWin: false,
      draw: false,
    };
    this.getQuantity = this.getQuantity.bind(this);
    this.getFighterB = this.getFighterB.bind(this);
    this.postData = this.postData.bind(this);
    this.setGraph = this.setGraph.bind(this);
    this.multi_simulation = this.multi_simulation.bind(this);
    // this.inputElement = this.inputElement.bind(this);

    
    
  }

  // Pulls data from the back end and store in React Compnent prod env
  async getOptions() {
    // const res = await axios.get(
    //   "/static/csvjson.json"
    // );

  // Dev Env
    const res = await axios.get('http://127.0.0.1:5000//static/csvjson.json')

    const data = res.data;

    console.log(data.FLOW_DURATION_MILLISECONDS);

    const IPV4_SRC_ADDR = [];
    const L4_SRC_PORT = [];
    const IPV4_DST_ADDR = [];
    const L4_DST_PORT = [];
    const PROTOCOL = [];
    const L7_PROTO = [];
    const IN_BYTES = [];
    const OUT_BYTES = [];
    const IN_PKTS = [];
    const OUT_PKTS = [];
    const TCP_FLAGS = [];
    const FLOW_DURATION_MILLISECONDS = [];
    const Label = [];
    const Attack = [];

    // for (let i = 0; i < 6000; i++) {
    //   // console.log(FighterData.Name[i])
    //   if (FighterData.Name[i] !== undefined) {
    //     nameData.push({ Name: FighterData.Name[i] });
    //     heightData.push({ Height: FighterData.HEIGHT[i] });
    //     StrikeAcc.push({ StrAcc: FighterData["Str. Acc.."][i] });
    //     DOB.push({ DOB: FighterData.DOB[i] });
    //     SApM.push({ SApM: FighterData.SApM[i] });
    //     SLpM.push({ SLpM: FighterData.SLpM[i] });
    //     REACH.push({ REACH: FighterData.REACH[i] });
    //     STANCE.push({ STANCE: FighterData.STANCE[i] });
    //     WEIGHT.push({ WEIGHT: FighterData.WEIGHT[i] });
    //     strDef.push({ strDef: FighterData["Str. Def"][i] });
    //     tdAcc.push({ tdAcc: FighterData["TD Acc"][i] });
    //     subAvg.push({ subAvg: FighterData["Sub. Avg"][i] });
    //     tdDef.push({ tdDef: FighterData["TD Def."][i] });
    //     tdAvg.push({ tdAvg: FighterData["TD Avg"][i] });
    //   }
    // }

    for (let i = 0; i < res.data.length; i++) {
      // console.log(data[i]["IPV4_SRC_ADDR"])
      if (data[i]["IPV4_SRC_ADDR"] !== undefined) {
        // IPV4_SRC_ADDR.push(data["IPV4_SRC_ADDR"][i]);
        IPV4_SRC_ADDR.push({ IPV4_SRC_ADDR:data[i]["IPV4_SRC_ADDR"] });
        L4_SRC_PORT.push({ L4_SRC_PORT:data[i]["L4_SRC_PORT"] });
        IPV4_DST_ADDR.push({ IPV4_DST_ADDR:data[i]["IPV4_DST_ADDR"] });
        L4_DST_PORT.push({ L4_DST_PORT:data[i]["L4_DST_PORT"] });
        PROTOCOL.push({ PROTOCOL:data[i]["PROTOCOL"] });
        L7_PROTO.push({ L7_PROTO:data[i]["L7_PROTO"] });
        IN_BYTES.push({ IN_BYTES:data[i]["IN_BYTES"] });
        OUT_BYTES.push({ OUT_BYTES:data[i]["OUT_BYTES"] });
        IN_PKTS.push({ IN_PKTS:data[i]["IN_PKTS"] });
        OUT_PKTS.push({ OUT_PKTS:data[i]["OUT_PKTS"] });
        TCP_FLAGS.push({ TCP_FLAGS:data[i]["TCP_FLAGS"] });
        FLOW_DURATION_MILLISECONDS.push({ FLOW_DURATION_MILLISECONDS:data[i]["FLOW_DURATION_MILLISECONDS"] });
        Label.push({ Label:data[i]["Label"] });
        Attack.push({ Attack:data[i]["Attack"] });

        // console.log({ L4_SRC_PORT })
        // console.log({ IPV4_SRC_ADDR })
        // console.log({FLOW_DURATION_MILLISECONDS})



      }
      

      
    }

    this.setState({ IPV4_SRC_ADDR: IPV4_SRC_ADDR });
    this.setState({ L4_SRC_PORT: L4_SRC_PORT });
    this.setState({ IPV4_DST_ADDR: IPV4_DST_ADDR });
    this.setState({ L4_DST_PORT: L4_DST_PORT });
    this.setState({ PROTOCOL: PROTOCOL });
    this.setState({ L7_PROTO: L7_PROTO });
    this.setState({ IN_BYTES: IN_BYTES });
    this.setState({ OUT_BYTES: OUT_BYTES });
    this.setState({ IN_PKTS: IN_PKTS });
    this.setState({ OUT_PKTS: OUT_PKTS });
    this.setState({ TCP_FLAGS: TCP_FLAGS });
    this.setState({ FLOW_DURATION_MILLISECONDS: FLOW_DURATION_MILLISECONDS });
    this.setState({ Label: Label });
    this.setState({ Attack: Attack });
  
  }

  // pull the data when the compenent loads
  componentDidMount() {
    this.getOptions();
  }

  handleChange(e) {
    this.setState({ name: e.label });
  }

  getQuantity(param) {
    const qauntity = Number(param)
    console.log("quantity selected", qauntity)
    this.setState({ selected_quanltity: qauntity });
  }

  setGraph(i) 
  {
    const graph = [];
    const simulationData=[];
    const binary_result =[];
    const type_result = []; 
    const min = 0;
    const max = 15000;
    let rand = min + Math.random() * (max - min)
     rand = rand.toFixed();
  

    
    
    graph.push(this.state.FLOW_DURATION_MILLISECONDS[rand].FLOW_DURATION_MILLISECONDS);
    graph.push(this.state.OUT_PKTS[rand].OUT_PKTS);
    graph.push(this.state.IN_PKTS[rand].IN_PKTS);
    graph.push(this.state.OUT_BYTES[rand].OUT_BYTES);
    graph.push(this.state.IN_BYTES[rand].IN_BYTES);
    graph.push(this.state.TCP_FLAGS[rand].TCP_FLAGS);
    graph.push(this.state.L7_PROTO[rand].L7_PROTO);



   

    // ["IPV4_SRC_ADDR","L4_SRC_PORT","IPV4_DST_ADDR","L4_DST_PORT","PROTOCOL","L7_PROTO",
    //                    "IN_BYTES","OUT_BYTES","IN_PKTS","OUT_PKTS","TCP_FLAGS","FLOW_DURATION_MILLISECONDS"
    //                     ]

    simulationData.push(this.state.IPV4_SRC_ADDR[rand].IPV4_SRC_ADDR);
    simulationData.push(this.state.L4_SRC_PORT[rand].L4_SRC_PORT);
    simulationData.push(this.state.IPV4_DST_ADDR[rand].IPV4_DST_ADDR);
    simulationData.push(this.state.L4_DST_PORT[rand].L4_DST_PORT);
    simulationData.push(this.state.PROTOCOL[rand].PROTOCOL);
    simulationData.push(this.state.L7_PROTO[rand].L7_PROTO);
    simulationData.push(this.state.IN_BYTES[rand].IN_BYTES);
    simulationData.push(this.state.OUT_BYTES[rand].OUT_BYTES);
    simulationData.push(this.state.IN_PKTS[rand].IN_PKTS);
    simulationData.push(this.state.OUT_PKTS[rand].OUT_PKTS);
    simulationData.push(this.state.TCP_FLAGS[rand].TCP_FLAGS);
    simulationData.push(this.state.FLOW_DURATION_MILLISECONDS[rand].FLOW_DURATION_MILLISECONDS);



 

     setTimeout(() => {
      console.log("rand:"+rand);

      console.log("simulation data: ", i);

        
        this.setState({simulationData:simulationData});
        console.log("Simulation data!!!!!!!!!!"+ simulationData);

        this.postData(simulationData)


        this.setState({graph:graph});
        console.log("graph!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+graph)

        console.log("Binary Result", binary_result, "  type of attack", type_result);



       
      }, 2000)

  
      



    binary_result.push(this.state.Label[rand].Label);
    type_result.push(this.state.Attack[rand].Attack);

    // console.log("Result Data !!!!!!!!!");
    
    
    
    // this.postData()
    // console.log("posted !!!!!!!!!");


  }

  getFighterB(param) {
    const indexB = this.state.selectOptionsNames.indexOf(param);
    const FighterB = [];
    if (indexB !== -1) {
      // this.setState({FighterB:[]}) // reset array before setting new data
      FighterB.push(this.state.selectOptionsNames[indexB].Name);
      FighterB.push(this.state.height[indexB].Height);
      FighterB.push(this.state.WEIGHT[indexB].WEIGHT);
      FighterB.push(this.state.REACH[indexB].REACH);
      FighterB.push(this.state.STANCE[indexB].STANCE);
      FighterB.push(this.state.DOB[indexB].DOB);
      FighterB.push(this.state.SLpM[indexB].SLpM);
      FighterB.push(this.state.strikeAccuracy[indexB].StrAcc);
      FighterB.push(this.state.SApM[indexB].SApM);
      FighterB.push(this.state.strDef[indexB].strDef);
      FighterB.push(this.state.tdAvg[indexB].tdAvg);
      FighterB.push(this.state.tdAcc[indexB].tdAcc);
      FighterB.push(this.state.tdDef[indexB].tdDef);
      FighterB.push(this.state.subAvg[indexB].subAvg);
    }
    this.setState({ FighterB: FighterB });
    this.setState({ Response1: false });
    this.setState({ undWin: "" });
    this.setState({ draw: "" });
  }

  async postData(data) {
    setTimeout(() => {

      let predictData;

    // if (this.state.FighterA.length > 0 && this.state.FighterB.length > 0) {
    //   predictData = this.state.FighterA.concat(this.state.FighterB);
    // }



    predictData = this.state.simulationData;

    const axios = require("axios");

    // axios.post('http://localhost:5000/predict', predictData)
    //   .then(function (response) {
    //     console.log(response);
    //   })

    const res = axios({
      //prod env
      // url: "/api/react_api",
      //dev env
      url: "http://127.0.0.1:5000//api/react_api",
      method: "POST",
      data: data,
      // `headers` are custom headers to be sent
      headers: { form: "form" },
    })
      .then((response) => {
        let fighterA = '';
        let fighterB = '';
        predictData = this.state.simulationData;


    // this.setState({graph:[]});
    // this.setState({simulationDatsa:[]});



        console.log("Result",response.data);
        console.log("File has been sent to the server ");
        this.setState({ Response: true });
        this.setState({ Response1: true });

        let main_predicition = response.data.MAIN_BINARY;
        let random_forest_prediction = response.data.RAND_PREDICTIOB;
        let skorch_prediction = response.data.SKORCH_PREDICTION;


        if (random_forest_prediction !== "Draw" && skorch_prediction !== "Draw") {
          fighterA = Number(random_forest_prediction);
          fighterB = Number(skorch_prediction);

          if (fighterA > fighterB) {
            this.setState({ favWin: true });
            this.setState({ undWin: false });
          } else {
            this.setState({ undWin: true });
            this.setState({ favWin: false });
          }
        } else {
          this.setState({ draw: true });
        }

        this.setState({ Favourite: fighterA });
        this.setState({ UnderDog: fighterB });
      })
      .catch(() => {
        console.log("internal Server Error");
      });

    console.log("Prediction Data: ",data);
    }, 1000)

    

    // console.log(res)
  }


  
// multiple simulation
   multi_simulation() {
    console.log("I work");
   
    let index = this.state.selected_quanltity
    
   while(index >0)
   {
    if(index != 0)
    {
      
      // this.myButton.click()
      this.setGraph(index);


    }
    // this.postData()
    // setTimeout(() => {
    //   this.postData();

    // }, 1000)


    index--;

   }
   

    
  }

  // const Grids = (props) => <Grid container {...props} />
  // const GridCol = (props) => <Grid container direction ='column'{...props} />
  // const GridRow = (props) => <Grid container direction ='row'{...props} />
  // const Item = (props) => <Grid item {...props} />

  render() {
    const data = [
      {
        name: "FLOW_DURATION",
        uv: 0,
        pv:  this.state.graph[0],
        amt: this.state.graph[0],
      },
      {
        name: "OUT_PKTS",
        uv: 0,
        pv:  this.state.graph[1],
        amt: this.state.graph[1],
      },
      {
        name: "IN_PKTS",
        uv: 0,
        pv:  this.state.graph[2],
        amt: this.state.graph[2],
      },
      {
        name: "OUT_BYTES",
        uv: 0,
        pv:  this.state.graph[3],
        amt: this.state.graph[3],
      },
      {
        name: "IN_BYTES",
        uv: 0,
        pv:  this.state.graph[4],
        amt: this.state.graph[4],
      },
      {
        name: "TCP_FLAGS",
        uv: 0,
        pv:  this.state.graph[5],
        amt: this.state.graph[5],
      },
      {
        name: "L7_PROTO",
        uv: 0,
        pv:  this.state.graph[6],
        amt: this.state.graph[6],
      },
    ];

    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <React.Fragment>
        <Box p={5}>
          <GridRow>
            <Item xs={12}>
              <GridRow spacing={10}>
                <Item xs={12} lg={6}>
                  <Card
                    elevation={6}
                    className={
                      this.state.Response
                        ? this.state.draw
                          ? classes.draw
                          : this.state.favWin
                          ? classes.Win
                          : classes.Loss
                        : classes.root
                    }
                  >
                    <CardActionArea>
                      <CardActions>
                      
                        <GridRow justify="center" alignItems="center">
                        <Typography variant="h7" component="h1">
                            DATA 
                          </Typography>
                          <Item xs={12}>
                            <ResponsiveContainer width={1200} height={500}>
                              <ComposedChart
                                layout="vertical"
                                width={600}
                                height={400}
                                data={data}
                                margin={{
                                  top: 20,
                                  right: 100,
                                  bottom: 20,
                                  left: 100,
                                }}
                              >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis type="number" />
                                <YAxis
                                  dataKey="name"
                                  type="category"
                                  scale="band"
                                />
                                <Tooltip />
                                <Legend />
                                <Area
                                  dataKey="amt"
                                  fill="#8884d8"
                                  stroke="#8884d8"
                                />
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
                    <Item>
                      <Box p={1.5}>
                        <Paper styles={classes.paper}>
                          <Autocomplete
                            id="FighterA"
                            options={this.state.simulation_sample}
                            // getOptionLabel={(option) => option.Name}
                            style={{ width: 500 }}
                            onChange={(event, value) => this.getQuantity(value)} // sends Index of selected Item Fighter A
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Simulation Quantity"
                                variant="outlined"
                              />
                            )}
                          />
                        </Paper>
                      </Box>

                      <Item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                      >
                        <label htmlFor="contained-button-file">
                          <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.postData}
                            component="span"
                          >
                            Simulate
                          </Button>
                          <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.setGraph}
                            component="span"
                            ref={(ref) => { this.myButton = ref; }}
                          >
                            Graph test
                          </Button>
                          <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={this.multi_simulation}
                            component="span"
                          >
                            Multiple simulation
                          </Button>

                          
                        </label>
                        <h1>{/*{this.state.Response}*/}</h1>
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
export default withStyles(useStyle)(ProfessorMMA);
