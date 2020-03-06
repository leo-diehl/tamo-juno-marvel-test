import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';

function CardList({
  id,
  title,
  figure,
  onClick,
}) {
  function handleClick() {
    if (onClick === null) {
      return;
    }

    onClick(id);
  }

  const emptyFigure = !figure || !figure.src || figure.src.includes('image_not_available');

  return (
    <CardContainer
      clickable={onClick !== null}
      onClick={handleClick}
      className="card-container"
      title={title}
    >
      {emptyFigure ? (
        <EmptyFigureContainer>
          <ImageIcon />
        </EmptyFigureContainer>
      ) : (
        <figure>
          <img src={figure.src} alt={figure.alt} />
        </figure>
      )}
      <div>
        <h3>{title}</h3>
      </div>
    </CardContainer>
  );
}

// -- Styles
const CardContainer = styled.div`
  width: 182px;
  height: 270px;
  margin: 8px;

  background: #151515;
  border-bottom: 4px solid #E62B29;
  border-radius: 3px;

  transition: all .3s ease-in-out;

  /* Set cursor to pointer if card has click behavior */
  ${({ clickable }) => clickable && 'cursor: pointer;'}

  figure {
    width: 182px;
    height: 210px;
    margin: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  img {
    width: 100%;
    object-fit: cover;
    transition: transform .2s ease;
  }

  svg {
    transition: width .2s ease;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
    svg {
      width: 90%;
    }
  }

  div {
    padding: .6rem;
  }

  h3 {
    margin: 0;

    font-size: 0.95rem;
    color: #fff;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 35px;
  }
`;

const EmptyFigureContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  height: 210px;
  width: 182px;

  background: rgba(0,0,0,0.9);

  svg {
    width: 80%;
    fill: rgba(255,255,255,0.06);
  }
`;

// -- Props
CardList.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  figure: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
};

CardList.defaultProps = {
  figure: null,
  onClick: null,
};

export default CardList;
