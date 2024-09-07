import React, { useState } from 'react';
import styled from 'styled-components';

function Pin({ urls, description }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper onClick={handleImageClick}>
        <Container>
          <img src={urls?.regular} alt="pin" />
        </Container>
      </Wrapper>

    </>
  );
}

export default Pin;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 8px;
  cursor: zoom-in;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.15);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 236px;
  height: 236px;
  background-color: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;