import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCharacterDetails as middlewareFetchCharacterDetails } from '../../store/character';

import {
  getCharacterId,
  getCharacterDetailsData,
} from '../../store/character/selectors';

// Components
import Loader from '../../components/Loader';
import CardList from '../../components/CardList';

function capitalizeFirstLetter(string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

function CharacterDetail({
  id,
  type,
  // Store
  storeId,
  details,
  // Middleware
  fetchCharacterDetails,
}) {
  const detail = details[type];
  const {
    data,
    loading,
  } = detail;
  const loaded = id === storeId && data !== undefined;

  useEffect(() => {
    if (loaded) {
      return;
    }

    fetchCharacterDetails(id, type);
  }, [id, type, loaded, fetchCharacterDetails]);

  // Digest characters data to be displayed inside cards
  function getThumbnailSrc(thumbnail) {
    if (!thumbnail) {
      return '';
    }

    return `${thumbnail.path}.${thumbnail.extension}`;
  }

  function dataForCard() {
    if (!data) {
      return [];
    }

    return data.map((det) => ({
      ...det,
      figure: {
        src: getThumbnailSrc(det.thumbnail),
        alt: `${type} ${det.title} thumbnail`,
      },
    }));
  }

  function handleCardClick(clickedId) {
    const clickedDetail = dataForCard().find(({ detailId }) => detailId === clickedId);

    const { urls } = clickedDetail;
    if (!urls || !urls.length) {
      return;
    }

    window.open(urls[0].url, '_blank');
  }

  // JSX
  return (
    <DetailContainer loading>
      <h3>{capitalizeFirstLetter(type)}</h3>
      {loading
        ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )
        : (
          <CardList
            data={dataForCard()}
            justifyContent="start"
            flexWrap="nowrap"
            onCardClick={handleCardClick}
          />
        )}
    </DetailContainer>
  );
}

// -- Styles
const LoaderContainer = styled.div`
  svg {
    margin: 30px 50%;
  }
`;

const DetailContainer = styled.div`
  width: 100%;

  >h3 {
    font-family: 'Roboto Black';
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.3rem;
    padding: 5px 2px;
    border-bottom: 2px solid #E62B29;
  }
`;

// -- PropTypes
const detailsShape = PropTypes.shape({
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      thumbnail: PropTypes.object,
      urls: PropTypes.array,
    }),
  ),
  loading: PropTypes.bool,
  error: PropTypes.bool,
});

CharacterDetail.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['comics', 'events', 'series', 'stories']).isRequired,
  // Store
  storeId: PropTypes.number,
  details: PropTypes.shape({
    comics: detailsShape,
    events: detailsShape,
    series: detailsShape,
    stories: detailsShape,
  }).isRequired,
  // Middleware
  fetchCharacterDetails: PropTypes.func.isRequired,
};

CharacterDetail.defaultProps = {
  storeId: null,
};

// -- Redux
const mapStateToProps = (state) => ({
  storeId: getCharacterId(state),
  details: getCharacterDetailsData(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { fetchCharacterDetails: middlewareFetchCharacterDetails },
  dispatch,
);

// -----
export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);
