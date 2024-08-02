import React, { useState } from "react";
import styled from "styled-components";
import HubIcon from "@mui/icons-material/Hub";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationIcon from "@mui/icons-material/Notifications";
import TextsmsIcon from "@mui/icons-material/Textsms";
import FaceIcon from "@mui/icons-material/Face";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header(props) {
  const [input, setInput] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input); // this will call the parent component's onSearchSubmit function and pass the input value as a parameter.
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <HubIcon />
      </LogoWrapper>

      <HomePageButton>
        <a href="/">Home</a>
      </HomePageButton>
      <FollowingButton>
        <a href="/following">Following</a>
      </FollowingButton>
      <SearchWrapper>
        <SearchBarWrapper>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <form>
            <input type="text" onChange={(e) => setInput(e.target.value)} />
            <button type="submit" onClick={onSearchSubmit}></button>
          </form>
        </SearchBarWrapper>
      </SearchWrapper>
      <IconsWrapper>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        <IconButton>
          <TextsmsIcon />
        </IconButton>
        <IconButton>
          <FaceIcon />
        </IconButton>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
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
background-color: white
color:black;
`;

const LogoWrapper = styled.div`
    .MuivgIcon-root {
    color: #e60023;
    font-size: 32px;
    cursor: pointer;
    `;
const HomeButtons = styled.div`
  display: flex;
  height: 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
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
  background-color: grey;
  display: flex;
  height: 48px;
  width: 1200px;
  border-radius: 50px;
  border: none;
  padding-left: 10px;

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

const IconsWrapper = styled.div``;

// Example usage:
