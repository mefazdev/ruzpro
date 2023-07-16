import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link, Paper } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export default function BottomNav() {
  const [value, setValue] = React.useState("recents");
  const [menu, setMenu] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      className="md:hidden "
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      style={{ zIndex: "100" }}
    >
      <BottomNavigation
        className="relative"
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          // label="Home"
          value="home"
          icon={
            <Link style={{ color: "inherit" }} href="/">
              <HomeIcon />
            </Link>
          }
        />
        <BottomNavigationAction
          value="upload"
          icon={
            <Link style={{ color: "inherit" }} href="/upload/BasicInfo">
              <button
              style={{  fontFamily: "Montserrat, sans-serif",fontSize:'14px'}}
              className="bg-green-800 text-white p-1 rounded-xl  pr-3 pl-3 shadow-md">UPLOAD</button>
            </Link>
          }
        />
        <BottomNavigationAction
          onClick={() => setMenu(!menu)}
          value="menu"
          icon={<MoreVertIcon />}
        />
        {menu ? (
          <Paper className="absolute right-5  bottom-14 text-sm ">
            <Link href="/About" className="text-inherit decoration-white">
              <div className="border-b-2 border-blue-100 p-3 pb-2 pt-2">
                <p>About</p>
              </div>
            </Link>
            <Link
              href="/legal/Privacy"
              className="text-inherit decoration-white"
            >
              <div className="border-b-2 border-blue-100 p-3 pb-2 pt-2">
                <p>Privacy</p>
              </div>
            </Link>
            <Link href="/legal/Terms" className="text-inherit decoration-white">
              <div className="border-b-2 border-blue-100 p-3 pb-2 pt-2">
                <p>Terms of use</p>
              </div>
            </Link>
            <Link href="/Contact" className="text-inherit decoration-white">
              <div className="border-b-2 border-blue-100 p-3 pb-2 pt-2">
                <p>Contact</p>
              </div>
            </Link>
          </Paper>
        ) : (
          ""
        )}
      </BottomNavigation>
    </Paper>
  );
}
