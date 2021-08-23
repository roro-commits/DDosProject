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
      //Result binary  Check 
      Binary_result:[],
      Binary_prediction:[],
      Binary_total_correct: 0,
      Binary_total_wrong: 0,

      //Graph staticis page 
      // #[5 rows x 13 columns]
      // #0 injection     468539
      // #1 ddos          326345
      // #2 Benign        270279 free from virus
      // #3 password      156299
      // #4 xss            99944
      // #5 scanning       21467
      // #6 Dos            17717
      // #7 backdoor       17247
      // #8 mitm            1295
      // #9 ransomware       142

      injection_correct:0,
      injection_incorrect:0,
      dos_correct:0,
      dos_Incorrect:0,
      Benign_correct:0,
      Benign_incorrect:0,
      password_correct:0,
      password_incorrect:0,
      xss_correct:0,
      xss_incorrect:0,
      scanning_correct:0,
      scanning_incorrect:0,
      ddos_correct:0,
      ddos_incorrect:0,
      backdoor_correct:0,
      backdoor_incorrect:0,
      mitm_correct:0,
      mitm_incorrect:0,
      ransomware_correct:0,
      ransomware_incorrect:0,
      //type result 
      type_result:[],
      // skorch
      skorch_result:[],
      skorch_prediction:[],
      skorch_total_correct: 0,
      skorch_total_wrong: 0,
      // Random Forest
      Random_result:[],
      Random_prediction:[],
      Random_total_correct: 0,
      Random_total_wrong: 0,
      //
      index:0,
      //data for graph and backend
      simulationData:[],
      graph:[],
      simulation_sample:['2','4','10','20','40','50','60','80','90','100','200','500','1000'],
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
    this.saveData = this.saveData.bind(this);
    // this.inputElement = this.inputElement.bind(this);

    
    
  }

  // Pulls data from the back end and store in React Compnent prod env
  async getOptions() {
    const res = await axios.get(
      "/static/csvjson.json"
    );

  // Dev Env
    // const res = await axios.get('http://127.0.0.1:5000//static/csvjson.json')

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

     this.setState({Response:false});

    

  

    
    
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



 

 

  
      



    binary_result.push(this.state.Label[rand].Label);

    this.setState(prevState => ({
      Binary_result: [...prevState.Binary_result, binary_result[0]]
    }))


    type_result.push(this.state.Attack[rand].Attack);

    this.setState(prevState => ({
      type_result: [...prevState.type_result, type_result[0]]
    }))





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



  async saveData() {



      setTimeout(() => {

      let data = [
        {
          "subject": "injection",
          "Correct": this.state.injection_correct,
          "Incorrect": this.state.injection_incorrect,
          'fullMark': 20,
        },
      
        {
          "subject": "ddos",
          "Correct": this.state.ddos_correct,
          "Incorrect":this.state.ddos_incorrect,
          "fullMark": 10,
        },
        {
          "subject": "Benign",
          "Correct": this.state.Benign_correct,
          "Incorrect": this.state.Benign_incorrect,
          "fullMark": 10,
        },
        {
          "subject": "password",
          "Correct": this.state.password_correct,
          "Incorrect": this.state.password_incorrect,
          "fullMark": 10,
        },
        {
          "subject": "xss",
          "Correct": this.state.xss_incorrect,
          "Incorrect": this.state.xss_incorrect,
          "fullMark": 10,
        },
        {
          "subject": "Scanning",
          "Correct": this.state.scanning_correct,
          "Incorrect":  this.state.scanning_incorrect,
          "fullMark": 10,
        },
        {
          "subject": "Dos",
          "Correct": this.state.dos_correct,
          "Incorrect": this.state.dos_Incorrect,
          "fullMark": 10,
        }, {
          "subject": "backdoor",
          "Correct": this.state.backdoor_correct,
          "Incorrect": this.state.backdoor_incorrect,
          "fullMark": 10,
        }, {
          "subject": "mitm",
          "Correct": this.state.mitm_correct,
          "Incorrect": this.state.mitm_incorrect,
          "fullMark": 10,
        },
              {
          "subject": "ransom",
          "Correct": this.state.ransomware_correct,
          "Incorrect": this.state.ransomware_incorrect,
          "fullMark": 10,
        },
        {
          "subject": "Binary_ML",
          "Correct": this.state.Binary_total_correct,
          "Incorrect": this.state.Binary_total_wrong,
          "fullMark": 10,
            },
            {
              "subject": "Random Forest",
              "Correct": this.state.Random_total_correct,
              "Incorrect": this.state.Random_total_wrong,
              "fullMark": 10,
          },
          {
            "subject": "Skorch",
            "Correct": this.state.skorch_total_correct,
            "Incorrect": this.state.skorch_total_wrong,
            "fullMark": 10,
          },
              
      
    ];



    console.log("Total correct :  " ,this.state.Random_total_correct,this.state.skorch_total_correct, this.state.Binary_total_correct)




    

    // if (this.state.FighterA.length > 0 && this.state.FighterB.length > 0) {
    //   predictData = this.state.FighterA.concat(this.state.FighterB);
    // }



    const axios = require("axios");

    // axios.post('http://localhost:5000/predict', predictData)
    //   .then(function (response) {
    //     console.log(response);
    //   })

    const res = axios({
      //prod env
      url: "/api/saveData",
      //dev env
      // url: "http://127.0.0.1:5000//api/saveData",
      method: "POST",
      data: data,
      // `headers` are custom headers to be sent
      headers: { form: "form" },
    })
      .then((response) => {

        this.setState({Random_total_correct:0});
        this.setState({Random_total_wrong:0});
        this.setState({skorch_total_correct:0});
        this.setState({skorch_total_wrong:0});
        this.setState({binary_total_correct:0});
        this.setState({binary_total_wrong:0});
        this.setState({injection_correct : 0})
        this.setState({injection_incorrectcorrect : 0})
        this.setState({ddos_correct : 0})
        this.setState({ddos_incorrect : 0})
        this.setState({Benign_correct : 0})
        this.setState({Benign_incorrect : 0})
        this.setState({password_correct : 0})
        this.setState({password_incorrect : 0})
        this.setState({xss_correct :0})
        this.setState({xss_incorrect : 0})
        this.setState({scanning_correct : 0})
        this.setState({scanning_incorrect : 0})
        this.setState({injection_correct : 0})
        this.setState({injection_incorrect : 0})
        this.setState({dos_correct :0})
        this.setState({dos_Incorrect : 0})
        this.setState({mitm_correct : 0})
        this.setState({mitm_incorrect : 0})
        this.setState({ransomware_correct : 0})
        this.setState({ransomware_incorrect : 0})




      console.log("Saving data response : ", response.data)


      })
      .catch(() => {
        console.log("internal Server Error");
      });

    // console.log("Prediction Data: ",data);
    }, 1000)

    

    // console.log(res)
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
      url: "/api/react_api",
      //dev env
      // url: "http://127.0.0.1:5000//api/react_api",
      method: "POST",
      data: data,
      // `headers` are custom headers to be sent
      headers: { form: "form" },
    })
       .then((response) => {

        //result
        let binary_prediction = [];
        let rand_prediction =[];
        let skorch_nn_prediction =[];


        // this.setState({graph:[]});
        // this.setState({simulationDatsa:[]});
        // this.props.setStats(data)
        // this.props.setStats(data);
        // this.props.stats.push(data)
        // console.log("tetsing 2nd ", this.props.stats)



        console.log("ML predictions",response.data);
        this.setState({ Response: true });
        // this.setState({ Response1: true });

        let main_prediction = Number(response.data.MAIN_BINARY);
        let random_forest_prediction = response.data.RAND_PREDICTIOB;
        let skorch_prediction = response.data.SKORCH_PREDICTION;

        // console.log("20 error", random_forest_prediction,skorch_prediction, response.data)

        // #0 injection     468539
        // #1 ddos          326345
        // #2 Benign        270279 free from virus
        // #3 password      156299
        // #4 xss            99944
        // #5 scanning       21467
        // #6 Dos            17717
        // #7 backdoor       17247
        // #8 mitm            1295
        // #9 ransomware       142

        switch(random_forest_prediction) {
          case "0":
            random_forest_prediction = "injection";
            break;
          case "1":
            random_forest_prediction = "ddos";
            break;
          case "2":
            random_forest_prediction = "Benign";
            break;
          case "3":
            random_forest_prediction = "password";
            break;
          case "4":
            random_forest_prediction = "xss";
            break;
          case "5":
            random_forest_prediction = "scanning";
          break;
            case "6":
              random_forest_prediction = "injection";
            break;
          case "7":
            random_forest_prediction = "Dos";
            break;
          case "8":
            random_forest_prediction = "mitm";
            break;
          case "9":
            random_forest_prediction = "ransomware";
          break;
        }

        switch(skorch_prediction) {
          case "0":
            skorch_prediction = "injection";
            break;
          case "1":
            skorch_prediction = "ddos";
            break;
          case "2":
            skorch_prediction = "Benign";
            break;
          case "3":
            skorch_prediction = "password";
            break;
          case "4":
            skorch_prediction = "xss";
            break;
          case "5":
            skorch_prediction = "scanning";
          break;
            case "6":
              skorch_prediction = "injection";
            break;
          case "7":
            skorch_prediction = "Dos";
            break;
          case "8":
            skorch_prediction = "mitm";
            break;
          case "9":
            skorch_prediction = "ransomware";
            break;   
        }



        //setting for graphs 

        if(this.state.index != this.state.selected_quanltity)
        {
          // let rand_prediction =[];
          // let skorch_nn_prediction =[];
    
          
          console.log("number of result back", this.state.index+1);
          binary_prediction.push(main_prediction);
          rand_prediction.push(random_forest_prediction);
          skorch_nn_prediction.push(skorch_prediction);

          console.log("main binary prediciton", binary_prediction);


          this.setState(prevState => ({
            Binary_prediction: [...prevState.Binary_prediction, binary_prediction[0]]
          }))
          this.setState(prevState => ({
            Random_prediction: [...prevState.Random_prediction, rand_prediction[0]]
          }))

          // this.state.skorch_total_wrong
          this.setState(prevState => ({
            skorch_prediction: [...prevState.skorch_prediction, skorch_nn_prediction[0]]
          }))


          console.log("SKorch prediction", this.state.skorch_prediction);
          console.log("Rand prediction", this.state.Random_prediction);





          this.setState({index:this.state.index+1});
        }
        
        if(this.state.index == this.state.selected_quanltity)

        {
          

          console.log("Binary Actual", this.state.Binary_result,this.state.Binary_prediction);
          console.log("Binary type A", typeof( this.state.Binary_result[0]));


      
          console.log("SKorch Actual",this.state.type_result, this.state.skorch_prediction);
          console.log("Random Actual",this.state.type_result, this.state.Random_prediction);



          for(let i =0; i < this.state.selected_quanltity;  i++)
          {


            if (this.state.Binary_result[i] == this.state.Binary_prediction[i] && this.state.Binary_prediction[i] !== 'undefined')
            {
               

                this.setState({
                    Binary_total_correct : this.state.Binary_total_correct +1
                });

                // Sets Color to Gree for the right Prediction
                this.setState({favWin:true});
                this.setState({undWin:false});


              

            }

             else if (this.state.Binary_result[i] != this.state.Binary_prediction[i] && this.state.Binary_result[i]  !== 'undefined') 
            {

                this.setState({
                  Binary_total_wrong : this.state.Binary_total_wrong +1
                });

                // Sets Color to red for wrong prediciotn
                this.setState({undWin:true});
                this.setState({favWin:false});




              }

 


            if (this.state.type_result[i] == this.state.Random_prediction[i] && this.state.Random_prediction[i]  !== 'undefined')
            {
                this.setState({
                  Random_total_correct : this.state.Random_total_correct +1
                });
            }
            else  if (this.state.type_result[i] != this.state.Random_prediction[i] &&  this.state.Random_prediction[i] !== 'undefined')
            {
                this.setState({
                  Random_total_wrong : this.state.Random_total_wrong +1
                });
            }


             //skorch
              
             if (this.state.type_result[i] == this.state.skorch_prediction[i] && this.state.skorch_prediction[i] !== 'undefined')
             {
                 this.setState({
                   skorch_total_correct : this.state.skorch_total_correct +1
                 });
             }
              else if (this.state.type_result[i] != this.state.skorch_prediction[i] && this.state.skorch_prediction[i]  !== 'undefined')
             {

                 this.setState({
                   skorch_total_wrong : this.state.skorch_total_wrong +1
                 });
             }


             switch(this.state.type_result[i]) {
              case "injection":
                    if(this.state.skorch_prediction[i] == this.state.type_result[i] ||this.state.Random_prediction[i] == this.state.type_result[i]) 
                    {
                        this.setState({injection_correct : this.state.injection_correct+1})
                    }
                    else
                    {
                      this.setState({injection_incorrectcorrect : this.state.injection_incorrect+1})
                    }
                break;
              case "ddos":
                    if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                    {
                        this.setState({ddos_correct : this.state.ddos_correct+1})
                    }
                    else
                    {
                      this.setState({ddos_incorrect : this.state.ddos_incorrect+1})
                    }
                    break;
              case "Benign":
                    if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                    {
                        this.setState({Benign_correct : this.state.Benign_correct+1})
                    }
                    else
                    {
                      this.setState({Benign_incorrect : this.state.Benign_incorrect+1})
                    }
                break;
              case "password":
                    if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                    {
                        this.setState({password_correct : this.state.password_correct+1})
                    }
                    else
                    {
                      this.setState({password_incorrect : this.state.password_incorrect+1})
                    }
                break;
              case "xss":
                    if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                    {
                        this.setState({xss_correct : this.state.xss_incorrect+1})
                    }
                    else
                    {
                      this.setState({xss_incorrect : this.state.xss_incorrect+1})
                    }
               break;
              case "scanning":
                   if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                    {
                        this.setState({scanning_correct : this.state.scanning_correct+1})
                    }
                    else
                    {
                      this.setState({scanning_incorrect : this.state.scanning_correct+1})
                    }
              break;
                case "injection":
                  if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                  {
                      this.setState({injection_correct : this.state.injection_incorrect+1})
                  }
                  else
                  {
                    this.setState({injection_incorrect : this.state.injection_incorrect+1})
                  }
                break;
              case "Dos":
                if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                  {
                      this.setState({dos_correct : this.state.dos_correct+1})
                  }
                  else
                  {
                    this.setState({dos_Incorrect : this.state.dos_Incorrect+1})
                  }
                break;
              case "mitm":
                if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                {
                    this.setState({mitm_correct : this.state.mitm_correct+1})
                }
                else
                {
                  this.setState({mitm_incorrect : this.state.mitm_incorrect+1})
                }                break;
              case "ransomware":
                if(this.state.skorch_prediction[i] == this.state.type_result[i] || this.state.Random_prediction[i] == this.state.type_result[i])
                  {
                      this.setState({ransomware_correct : this.state.ransomware_correct+1})
                  }
                  else
                  {
                    this.setState({ransomware_incorrect : this.state.ransomware_incorrect+1})
                  }
                break;   
            }

          }

          this.setState({draw:true})




          console.log("Resetting")
          this.setState({
            Binary_result: []
          })
      
          this.setState({
            type_result: []
          })
          this.setState({
            Binary_prediction: []
          })
      
          this.setState({
            skorch_prediction: []
          })

          this.setState({
            Random_prediction: []
          })
      




          this.setState({index:0});
        }


      })
      .catch((e) => {
        console.log("PostData internal Server Error",e);
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
                      // classes.draw : classes.Win : classes.Loss : classes.root
                       this.state.favWin ?  classes.Win: this.state.undWin ? classes.Loss ? this.state.draw : classes.draw : classes.root
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
                            onClick={this.saveData}
                            component="span"
                          >
                            Save Data
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
