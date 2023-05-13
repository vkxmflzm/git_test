import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyAGpWq7AF0NYZp55xSg6n3WzYimiqnbLzo';
	const playlistId = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=10&playlistId=${playlistId}`;

	return await axios.get(url);
};

/*
  순수함수 (Pure function)
  - 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작 가능한 함수
  - 동일한 인수를 넣었을때 동일한 값을 반환하는 함수
  - 컴포넌트 외부에서 동작되는 파일에는 컴포넌트의 기능을 활용하는 코드 사용불가
  부수효과 (Side Effect)
  - 기존 컴포넌트의 변경점을 야기시키는 효과
  - 컴포넌트외부에서 사용할 수 없는 기능
*/
