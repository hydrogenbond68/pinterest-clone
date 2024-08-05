import React, { useState } from "react";
import styled from "styled-components";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationIcon from "@mui/icons-material/Notifications";
import TextsmsIcon from "@mui/icons-material/Textsms";
import FaceIcon from "@mui/icons-material/Face";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const [input, setInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
    setIsDropdownOpen(false);
    navigate('/login'); // Navigate to the login page
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/logout'); // Navigate to the logout page
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <AssuredWorkloadIcon />
      </LogoWrapper>
      <HomePageButton>
        <Link to="/">Home</Link>
      </HomePageButton>
      <FollowingButton>
        <Link to="/following">Following</Link>
      </FollowingButton>
      <SearchWrapper>
        <SearchBarWrapper>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <form onSubmit={onSearchSubmit}>
            <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder="Search..." />
            <button type="submit"></button>
          </form>
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

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 20px 4px 4px 20px;
  background-color: white;
  color: black;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: #e60023;
    font-size: 50px;
    cursor: pointer;
    height: 48px;
    width: 120px;
    min-width: 123px;
  }
`;

const HomeButtons = styled.div`
  display: flex;
  height: 30px;
  min-width: 150px;
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

const SearchBarWrapper = styled.div`
  background-color:grey;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100px;
  border-radius: 1000px;
  padding: 0 10px;

  form {
    display: flex;
    flex: 1;
  }

  form > input {
    background-color: transparent;
    border: none;
    width: 100%;
    margin-right: 5px;
    font-size: 16px;
  }

  form > button {
    display: none;
  }

  input:focus {
    outline: none;
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
