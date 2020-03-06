import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCharacter as middlewareFetchCharacter } from '../../store/character';

import {
  getCharacterId,
  getCharacterData,
  getCharacterLoading,
} from '../../store/character/selectors';

// Assets
import { ReactComponent as ImageIcon } from '../../assets/icons/image.svg';

// Components
import Loader from '../../components/Loader/Loader';

function getThumbnailSrc(thumbnail) {
  if (!thumbnail) {
    return '';
  }

  return `${thumbnail.path}.${thumbnail.extension}`;
}

function CharacterData({
  // Store
  id,
  storeId,
  data,
  loading,
  // Middleware
  fetchCharacter,
}) {
  useEffect(() => {
    if (id !== storeId) {
      fetchCharacter(id);
    }
  }, [storeId, fetchCharacter, id]);

  const {
    name,
    description,
    thumbnail,
  } = data;

  if (loading) {
    return <Loader />;
  }

  const thumbnailSrc = thumbnail
    ? `${thumbnail.path}.${thumbnail.extension}`
    : null;
  const emptyFigure = !thumbnailSrc || thumbnailSrc.includes('image_not_available');

  return (
    <CharacterDataContainer>
      {
        emptyFigure
          ? (
            <EmptyFigureContainer>
              <ImageIcon />
            </EmptyFigureContainer>
          )
          : (
            <StyledFigure>
              <img src={getThumbnailSrc(thumbnail)} alt={`Marvel's character ${name} thumbnail`} />
            </StyledFigure>
          )

      }
      <DescriptionContainer>
        <h1>{name}</h1>
        <p>{description || <i>No description available</i>}</p>
      </DescriptionContainer>
    </CharacterDataContainer>
  );
}

// -- Styles
const CharacterDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  width: 100%;
  padding: 26px 12px;
  margin: 0 -32px;
  border-bottom: 8px solid #E62B29;

  background: #151515;

  @media (max-width: 883px) {
    width: auto;
  }
`;

const EmptyFigureContainer = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 10px solid white;

  svg {
    width: 50%;
    fill: rgba(255,255,255,0.06);
  }
`;

const StyledFigure = styled.figure`
  margin: 0;

  img {
    width: 380px;
    height: 380px;
    object-fit: none;
    border-radius: 50%;
    border: 10px solid white;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-width: 300px;
  max-width: 420px;

  h1 {
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-family: 'Roboto Black';
    letter-spacing: 2px;
  }

  p {
    text-align: justify;
    padding: 4px 16px;
    line-height: 1.3;

    color: rgba(255, 255, 255, 0.7);
  }

  @media (min-width: 882px) {
    h1, p {
      text-align: left;
    }

    p {
      padding-left: 0;
    }
  }
`;

// -- Props
CharacterData.propTypes = {
  // Store
  id: PropTypes.number.isRequired,
  storeId: PropTypes.number,
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.object,
  }).isRequired,
  loading: PropTypes.bool,
  // Middleware
  fetchCharacter: PropTypes.func.isRequired,
  // Route
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

CharacterData.defaultProps = {
  storeId: null,
  loading: false,
};

// -- Redux
const mapStateToProps = (state) => ({
  storeId: getCharacterId(state),
  data: getCharacterData(state),
  loading: getCharacterLoading(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { fetchCharacter: middlewareFetchCharacter },
  dispatch,
);

// -----
export default connect(mapStateToProps, mapDispatchToProps)(CharacterData);
