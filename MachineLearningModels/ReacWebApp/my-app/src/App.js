import React,{useState} from 'react'
import Header from "./UI/Header"
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter,Route,Switch}  from 'react-router-dom'
import  theme from "./UI/Theme"
import ProfessorMMA from "./UI/fighterPage";
import Statistics from "./UI/statistics";


function App() {
  const [value, setValue] = useState(0);

  return (
   <ThemeProvider theme ={theme}>
     <BrowserRouter>
     <Header value={value} setValue={setValue}  />
      <Switch>
      {/* <LandingPage /> */}
        <Route exact path="/" component={()=> <div style={{height: "2000px"}} >Landing page</div>}/>
        <Route exact path="/Project" component={ProfessorMMA }/>
        <Route exact path="/chart" component={Statistics}/>
        <Route exact path="/contact" component={()=> <div style={{height: "2000px"}} >contact</div> }/>
      </Switch>
     </BrowserRouter>
   </ThemeProvider>
      
    
  
  );
}

export default App;
