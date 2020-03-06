import { combineReducers } from 'redux';

import characters from './characters-list';
import character from './character';

export default combineReducers({ characters, character /* place future reducers here */ });
