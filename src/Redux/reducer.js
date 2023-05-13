import { combineReducers } from 'redux';
// import {YOUTUBE, FLICKR} from './actionType';
import * as names from './actionType';

//{type: '문자열}, payload: 변경될 값
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		// case "YOUTUBE_START"
		case names.YOUTUBE.start:
			return state;
		// case "YOUTUBE_SUCCESS"
		case names.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		// case YOUTUBE_FAIL
		case names.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;
