import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function Menu() {
  return (
    <div sx={{ m: 0 }}>
      <AppBar sx={{ background: "cadetblue" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{marginLeft:400}}>
          <Link style={{marginRight:30 , color:"white", textDecoration:"none", fontSize:20}} to="/" color="white">
            Home
            </Link>
            <Link style={{marginRight:30 , color:"white", textDecoration:"none", fontSize:20}} to="/listForms" color="white">
              View Forms
            </Link>
            <Link style={{marginRight:30 , color:"white", textDecoration:"none", fontSize:20}} to="/listPages" color="inherit">
              View Pages
            </Link>
            <Link style={{marginRight:30 , color:"white", textDecoration:"none", fontSize:20}} to="/form" color="inherit">
              Add Forms
            </Link>
            <Link style={{marginRight:30 , color:"white", textDecoration:"none", fontSize:20}} to="/pages" color="inherit">
              Add Pages
            </Link>
            <Link style={{marginRight:30 , color:"white", textDecoration:"none", fontSize:20}} to="/listSubmission" color="inherit">
              User's Submission
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Menu;
