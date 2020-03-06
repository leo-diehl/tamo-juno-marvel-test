import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Card from '../Card';

// -- Component
function CardList({
  data,
  onCardClick,
  justifyContent,
  flexWrap,
}) {
  return (
    <CardsContainer
      justifyContent={justifyContent}
      flexWrap={flexWrap}
    >
      {data.map((cardData) => (
        <Card
          key={cardData.id}
          id={cardData.id}
          title={cardData.title}
          figure={cardData.figure}
          onClick={onCardClick}
        />
      ))}
    </CardsContainer>
  );
}

// -- Styles
const cardWidthMediaQueries = (breakpoints) => `
  .card-container {
    width: calc(20% - 16px);
  }

  @media (max-width:${breakpoints.lg}px) {
    .card-container {
      width: calc(25% - 16px);
    }
  }

  @media (max-width:${breakpoints.md}px) {
    .card-container {
      width: calc(33% - 16px);
    }
  }

  @media (max-width:${breakpoints.sm}px) {
    .card-container {
      width: calc(50% - 16px);
    }
  }

  .card-container {
    > div, figure {
      width: 100%;
    }
  }

  .empty-figure-container {
    width: 100%;
  }
`;

const CardsContainer = styled.section`
  display: flex;
  flex-wrap: ${({ flexWrap }) => flexWrap};
  justify-content: ${({ justifyContent }) => justifyContent};

  ${({ theme, flexWrap }) => flexWrap === 'wrap' && cardWidthMediaQueries(theme.breakpoints)}

  overflow-x: ${({ flexWrap }) => (flexWrap === 'wrap' ? 'hidden' : 'auto')};
  overflow-y: hidden;
`;

// -- Props
CardList.propTypes = {
  // The validation of the array element's shape will be done inside Card,jsx
  data: PropTypes.array, // eslint-disable-line
  onCardClick: PropTypes.func,
  justifyContent: PropTypes.string,
  flexWrap: PropTypes.string,
};

CardList.defaultProps = {
  data: [],
  onCardClick() {
    return null;
  },
  justifyContent: 'center',
  flexWrap: 'wrap',
};

// -----
export default CardList;
