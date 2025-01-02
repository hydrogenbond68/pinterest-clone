import React, { useState } from "react";
import styled from "styled-components";
import InsightsIcon from '@mui/icons-material/Insights';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search"; 
import NotificationIcon from "@mui/icons-material/Notifications";
import TextsmsIcon from "@mui/icons-material/Textsms";
import FaceIcon from "@mui/icons-material/Face";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from 'react-router-dom';
import { InputBase, Paper } from '@mui/material';

function Navbar(props) {
  const [input, setInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/logout');
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <InsightsIcon />
      </LogoWrapper>
      <HomePageButton>
        <Link to="/">Home</Link>
      </HomePageButton>
      <FollowingButton>
        <Link to="/following">Following</Link>
      </FollowingButton>
      <SearchWrapper>
        <SearchBarWrapper component="form" onSubmit={onSearchSubmit}>
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </SearchBarWrapper>
      </SearchWrapper>
      <IconsWrapper>
        <IconButton>
          <Link to="/Notifications">
            <NotificationIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link to="/Messages">
            <TextsmsIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link to="/profile">
            <FaceIcon />
          </Link>
        </IconButton>
        <IconButton onClick={toggleDropdown}>
          <KeyboardArrowDownIcon />
        </IconButton>
        {isDropdownOpen && (
          <DropdownMenu>
            {isLoggedIn ? (
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            ) : (
              <DropdownItem onClick={handleLogin}>Login</DropdownItem>
            )}
          </DropdownMenu>
        )}
      </IconsWrapper>
    </Wrapper>
  );
}

export default Navbar;

// Define all your styled components here:
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px 2px 2px 10px;
  background-color:white;
  color: black;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color:black;
    font-size: 50px;
    cursor: pointer;
    height: 30px;
    width: 10px;
    min-width: 123px;
  }
`;

const HomeButtons = styled.div`
  display: flex;
  height: 40px;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  cursor: pointer;
`;

const HomePageButton = styled(HomeButtons)`
  background-color: rgb(17, 17, 17);

  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
`;

const FollowingButton = styled(HomeButtons)`
  display: flex;
  height: 40px;
  min-width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  cursor: pointer;
  
  background-color: white;

  a {
    text-decoration: none;
    color: black;
    font-weight: 700;
  }

  :hover {
    background-color: #e1e1e1;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
`;

const SearchBarWrapper = styled(Paper)`
  display: flex;
  align-items: center;
  height: 40px;
  width: 95%;
  border-radius: 1000px;
  padding: 0 10px;
  background-color: grey;

  .MuiInputBase-root {
    color: inherit;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;