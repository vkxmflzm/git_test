import { combineReducers } from 'redux';
import * as names from './actionType';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		//순서2 - 해당 액션객체를 컴포넌트로부터 받아서 연결된 미들웨어인 saga로 전달
		case names.YOUTUBE.start:
			return state;
		//순서5- saga로 부터 최종 반환된 액션객체를 통해 전역 store데이터 변경
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
