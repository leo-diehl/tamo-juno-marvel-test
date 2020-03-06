import CharactersList from '../containers/CharactersList';
import Character from '../containers/Character';

export default [
  {
    name: 'CharactersList',
    path: '/characters',
    exact: true,
    component: CharactersList,
  },
  {
    name: 'Character',
    path: '/characters/:id',
    exact: true,
    component: Character,
  },
  // Add new routes here
];
