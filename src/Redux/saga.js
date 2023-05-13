import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube } from './api';
import * as names from './actionType';

function* callYoutube() {
	//순서3 - 리듀서로부터 start액션타입을 전달받아 fetching함수 호출
	yield takeLatest(names.YOUTUBE.start, returnYoutube);
}

function* returnYoutube() {
	console.log('returnYoutube');
	try {
		//순서4 - api.js에 있는 fetching함수를 호출해서 반환된 데이터를 다시 액션객체에 담아 reducer로 전달
		const response = yield call(fetchYoutube);
		yield put({ type: names.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: names.YOUTUBE.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callYoutube)]);
}
