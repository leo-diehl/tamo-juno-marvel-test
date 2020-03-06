import React from 'react';
import styled from 'styled-components';

import CharacterData from './CharacterData';
import CharacterDetail from './CharacterDetail';

function Character({ match }) {
  const id = parseInt(match.params.id, 10);

  return (
    <CharacterContainer>
      <CharacterData id={id} />
      <CharacterDetail id={id} type="comics" />
      <CharacterDetail id={id} type="series" />
      <CharacterDetail id={id} type="events" />
      <CharacterDetail id={id} type="stories" />
    </CharacterContainer>
  );
}

// -- Styles
const CharacterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: -20px;
`;

// -----
export default Character;
