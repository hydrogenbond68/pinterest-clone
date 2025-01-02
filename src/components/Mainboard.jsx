import React from "react";
import styled from "styled-components";
import Pin from "./Pin";

function Mainboard(props) {
  let { pins } = props;

  return (
    <Wrapper>
      <Container className="Mainboard_container">
        {pins.map((pin, index) => {
          let { urls } = pin;
          return <Pin key={index} urls={urls} />;
        })}
      </Container>
    </Wrapper>
  );
}

export default Mainboard;

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 100px;
  justify-content: center;  
`;

const Container = styled.div`
  margin: 0 auto;
  width: 80%; // Default for larger screens
  background-color: white;
  display: flex;
  flex-wrap: wrap; // Allows items to wrap to the next line
  justify-content: center;
  align-items: center;
  padding: 20px; // To avoid content touching the edge on smaller screens

  @media (max-width: 768px) {
    width: 100%; // Full width on mobile
    padding: 10px; // Less padding for smaller screens
  }

  @media (min-width: 769px) {
    // Desktop-specific adjustments here if needed
    padding: 20px 0; // More vertical padding for desktops
  }
`;