import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Pin({ urls, description, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (e) => {
    e?.stopPropagation(); // Prevent click from bubbling up
    setIsModalOpen(false);
  };

  // Add keyboard support for closing modal with Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  return (
    <>
      <Wrapper onClick={handleImageClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}>
        <Container>
          <img
            src={urls?.regular}
            alt={description || 'Pin image'}
            loading="lazy"
          />
        </Container>
      </Wrapper>

      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <EnlargedImage
              src={urls?.full || urls?.regular}
              alt={description || 'Enlarged pin image'}
              loading="lazy"
            />
            {description && (
              <Description>{description}</Description>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
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
    transform: scale(1.05); /* Slightly smaller scale for subtlety */
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 236px; /* Flexible width for responsiveness */
  aspect-ratio: 1 / 1.5; /* Maintain aspect ratio for masonry layout */
  background-color: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const EnlargedImage = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const Description = styled.p`
  padding: 15px;
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: center;
  background: #fff;
`;