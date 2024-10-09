import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { Button } from "@mui/material";
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "./SearchBox";
function Header() {
  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">


        <div className=" row d-flex align-items-center w-100">

          <div className="col-sm-2 part1">
            <Link to={"/"}>
              <img src={Logo} alt="logo" className="logo" />
            </Link>
          </div>

          {/* <div className="col-sm-3 d-flex align-items-center part2 pl-4">
            <Button className="rounded-circle mr-3">
              <MdMenuOpen />
            </Button>
            <SearchBox></SearchBox>
          </div> */}

        </div>

      </div>
    </header>
  );
}

export default Header;
