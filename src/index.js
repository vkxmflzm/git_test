import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('root')
);

/*
	actionType.js : 각 데이터 카테고리별로 사용될 액션타입명을 변수처럼 모아놓은 객체형태
	reducer.js : 전역 state데이터르르 변경해주는 함수
	api.js : 외부 비동기 데이터 호출 함수를 외부 파일로 따로 관리
	saga.js : reducer에 추가 기능 확장을 위한 미들웨어 (외부 api함수를 reducer에 연결)
	store.js :  state가 저장될 저장공간을 생성 (saga미들웨어를 적용 설정)
*/
