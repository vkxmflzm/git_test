/*
  takeLatest(제일 마지막에 들어온 api 요청만 수행), takeEvery(들어오는 모든 api요청을 수행)
  put (saga에서 생성된 action객체를 리듀서에 전달, saga전용으로 쓰이는 dispatch함수라고 봐도 무방)
  call (saga에서 api관련 함수를 가져와서 호출할때 쓰는 함수, 두번째 인수 전달 가능)
  fork (saga관련 명령어를 실행하는 함수)
  all (fork함수를 동시에 여려개 호출할때 필요한 함수)
  작업흐름
  1- 컴포넌트로부터 전달된 YOUTUBE_START라는 액션 요청을 리듀서함수를 통해서 전달 받으면 fetchYoutube를 호출하는 함수를 정의
  2- 유튜브 데이터 값이 반환되면 해당 값으로 새로 액션객체를 생성해서 리듀서로 전달하는 함수를 정의
  3- 위의 정의된 함수를 최종적으로 호출하는 함수를 만든뒤 export
  컴포넌트에서 최초 액션 요청을 리듀서에 전달, 리듀서는 해당 액션 요청에 따라 saga를 호출
  saga는 해당 요청을 받아서 새롭게 액션 객체를 생성한뒤 다시 리듀서에 전달
*/
import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube } from './api';
import * as names from './actionType';

//1- 컴포넌트에서 리듀서를 통해 들어온 YOUTUBE_START라는 액션요청을 전달받아 returnYoutube를 호출하는 함수
function* callYoutube() {
	yield takeLatest(names.YOUTUBE.start, returnYoutube);
}

//2- 유튜브 데이터를 호출한 뒤, 결과값으로 새롭게 액션객체를 만들어서 리듀서로 전달해주는 함수
function* returnYoutube() {
	console.log('returnYoutube');
	try {
		//데이터 응답에 성공했을때
		const response = yield call(fetchYoutube);
		put({ type: names.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		//데이터 응답에 실패했을때
		yield put({ type: names.YOUTUBE.fail, payload: err });
	}
}

//3- 최종적으로 callYoutube를 호출해주는 함수를 외부로 export
export default function* rootSaga() {
	yield all([fork(callYoutube)]);
}
