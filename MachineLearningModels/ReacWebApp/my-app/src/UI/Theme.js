import { orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const silkwhite ="#FFFFFF";
const arcOrange = "#FFBA60";
const arcGrey = "#868686"

export default createMuiTheme({
    palette:{
        common:{
            arcBlue: `${silkwhite}`,
            arcOrange: `${arcOrange}`,
            black: "black",
            orange:"orange"
        },
        primary:{
            main: `${silkwhite}`
        },
        secondary:{
            main: `${arcOrange}`

        }
    },
    typography:{
        tab:{
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight:700,
            fontSize: "1rem",
         
        },
        estimate: {
            fontFamily:"Pacifico",
            fontSize:"1rem",
            textTransform:"none",
        },
        h2:{
            fontFamily:"Raleway",
            fontWeight: 700,
            fontSize: "2.5rem",
            color:`${silkwhite}`,
            lineHeight: 1.5

        },
        h3:{
            fontFamily:"Pacifico",
            fontSize: "2.5rem",
            color:`${silkwhite}`,
        },
        h4:{
            fontFamily:"Raleway",
            fontWeight: 700,
            fontSize: "1.75rem",
            color:`${silkwhite}`,
        },
        subtitle1:{
            fontFamily:"Raleway",
            fontWeight: 400,
            fontSize: "1.25rem",
            color:`${arcGrey}`,
        },
    }
    
})
