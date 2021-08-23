import React,{useState} from 'react'
import Header from "./UI/Header"
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter,Route,Switch}  from 'react-router-dom'
import  theme from "./UI/Theme"
import ProfessorMMA from "./UI/fighterPage";
import Statistics from "./UI/statistics";


function App() {
  const [value, setValue] = useState(0);
  const [stats, setStats] = useState([]);

  console.log("2nd order components", stats[3])
  console.log("2nd order value", value)


  // let props = {
  //   stats ,
  //   setStats,
  // }

  return (
   <ThemeProvider theme ={theme}>
     <BrowserRouter>
     <Header value={value} setValue={setValue} stats={stats} setStats={setStats}/>
      <Switch>
      {/* <LandingPage /> */}
        <Route exact path="/" component={()=> <div style={{height: "2000px"}} >Landing page</div>}/>
        <Route exact path="/Project" render={() => (
          <ProfessorMMA stats={stats} setStats={setStats} />
        ) }/>
        <Route exact path="/chart" render={()=>(<Statistics  stats={stats}/>)}/>
        <Route exact path="/contact" component={()=> <div style={{height: "2000px"}} >contact</div> }/>
      </Switch>
     </BrowserRouter>
   </ThemeProvider>
      
    
  
  );
}

export default App;
