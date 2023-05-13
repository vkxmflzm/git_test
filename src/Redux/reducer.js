import { combineReducers } from 'redux';
import * as names from './actionType';

//{type: '문자열}, payload: 변경될 값
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case names.YOUTUBE.start:
			// case "YOUTUBE_START"
			return state;
		case names.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case names.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;
