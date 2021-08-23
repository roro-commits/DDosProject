import React, { useState, useEffect } from 'react'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
// import { Typography } from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles'
import logo from '../img/logo.svg'
import { Tabs, Tab } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Menu, MenuItem } from '@material-ui/core'
import {useMediaQuery}  from '@material-ui/core'
import {useTheme}  from '@material-ui/core'
import  {SwipeableDrawer} from  '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {IconButton} from '@material-ui/core'
import {List,ListItem,ListItemText} from '@material-ui/core'
import Slide from '@material-ui/core/Slide';




function HideOnScroll(props) {
  const { children} = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const useStyle = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2em",
    [theme.breakpoints.down("xs")]:{
      marginBottom: "1.5em",

    },
  },
  logo: {
    // height:"100px",
    width: "3em",
    [theme.breakpoints.down("md")]:{
      height: "3em",
      width: "7em",
    },
    [theme.breakpoints.down("xs")]:{
      height: "5.5em",
      width: "19em",

    },

  },
  tabContainer: {
    marginRight: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  futureLogo: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    color: "white"
  },
  logoContainer: {
    padding: 0,
    "&:hoover": {
      backgroundColor: "transparent"
    }
  },
  menu:{
    backgroundColor: theme.palette.common.arcBlue,
    color:"white",
  },
  MenuItem :{
    ...theme.typography.tab,
    color:'green',
    opacity:1,
    "&:hover":{
      opacity:1,
    }
  },
  drawerIcon:{
    height:"45px",
    width:"45px",
  },

  drawerIconContainer:{
    "&:hover":{
      backgroundColor:"transparent"
    },
    marginRight: "auto",
  },
  drawer: {
    backgroundColor: theme.palette.common.black,

  },
  drawerItem:{
    ...theme.typography.tab,
    color:"white",
    opacity: 0.7,
  },
  drawerItemSelected:{
    "& .MuiListItemText-root":{
          color:"green",
      opacity: 1}
  },
  drawerItemEstimate:{
    backgroundColor: theme.palette.common.arcOrange,

  },

}));


function Header(props) {
  const classes = useStyle();
  const theme  = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // use state explain
  const [openDrawer, setOpenDrawer] = useState(false)



  // Reload function & tracking

    const handleChange = (e ,value) => {
    props.setValue(value)
  }
  //gets the url and see if it matches
  switch(window.location.pathname){
    case "/":
      if (props.value !==0){
       props.setValue(0)
      }
      break;
    case "/Project":
      if (props.value !==1){
       props.setValue(1)

      }
    break;

    case "/chart":
      if (props.value !==2){
        props.setValue(2)

          clearCacheData();
      }

    break;
    case "/contact":
        if (props.value !==3){
       props.setValue(3)
      }
    break;

    default:
      break;

  }



  const tabs = (
    <React.Fragment>
      <Tabs value={ props.value} onChange={handleChange} className={classes.tabContainer} indicatorColor="secondary">
           <Tab  className={classes.tab} component={Link}   to="/" label="Home" />
           <Tab className={classes.tab} component={Link}  to="/Project" label="ProfessorM.M.A" />
           <Tab className={classes.tab} component={Link} to="/chart" label="Player Statistics" />
           <Tab className={classes.tab} component={Link} to="/contact" label="Contact" />
      </Tabs>
    </React.Fragment>

  )

  const drawer = (
    <React.Fragment>
        <SwipeableDrawer classes ={{paper: classes.drawer}} disableBackdropTransition={!iOS} disableDiscovery={iOS} open ={openDrawer} onClose={() => {setOpenDrawer(false);  props.setValue(0)}} onOpen ={() => setOpenDrawer(true)} >
          <div className={classes.toolbarMargin}/>
          <List disablePadding>
            <ListItem  key = { props.value} onClick={() =>{ setOpenDrawer(false);  props.setValue(0) }} divider button component= {Link} to ="/" selected = { props.value === 0} classes ={{selected: classes.drawerItemSelected}}>
              <ListItemText className = {classes.drawerItem} disableTypography>
                  Home
              </ListItemText>
            </ListItem>

            <ListItem  key = { props.value}  onClick={() => {setOpenDrawer(false);  props.setValue(1)}} divider button component= {Link} to ="/Project" selected = { props.value === 1} classes ={{selected: classes.drawerItemSelected}}>
              <ListItemText className = {classes.drawerItem} disableTypography>
                Professor M.M.A
              </ListItemText>
            </ListItem>

            <ListItem key = { props.value}  onClick={() => {setOpenDrawer(false);  props.setValue(2)}}  divider button component= {Link} to ="/chart" selected = { props.value === 2} classes ={{selected: classes.drawerItemSelected}}>
              <ListItemText className = {classes.drawerItem} disableTypography>
                Player Statistics
              </ListItemText>
            </ListItem>


            <ListItem key = { props.value}  onClick={() => {setOpenDrawer(false);  props.setValue(4)}}  divider button  component= {Link} to ="/contact" selected = { props.value === 3} classes ={{selected: classes.drawerItemSelected}}>
              <ListItemText className = {classes.drawerItem} disableTypography>
                  Contact
              </ListItemText>
            </ListItem>


          </List>

        </SwipeableDrawer>
        <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer (!openDrawer)} disableRipple>
            <MenuIcon className ={classes.drawerIcon}/>
        </IconButton>
    </React.Fragment>

  )

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar position="fixed" >
          <Toolbar disableGutters>

            {matches ? drawer : tabs}
            <Button component={Link} to="/" className={classes.logoContainer} onClick={() =>  props.setValue(0)} disableRipple>
              <img src={logo} alt="Logo" className={classes.logo} />
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
       <Toolbar />
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  )

}




export default Header;
