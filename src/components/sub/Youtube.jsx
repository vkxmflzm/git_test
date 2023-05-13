import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyAGpWq7AF0NYZp55xSg6n3WzYimiqnbLzo';
		const playlistId = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=10&playlistId=${playlistId}`;

		axios.get(url).then((data) => {
			setVids(data.data.items);
		});
	}, []);

	return (
		//미션1. 썸네일 클릭시 모달창 보이고, 모달창의 닫기버튼 클릭시 제거
		//미션2. 모달창 생성시 스크롤제거, 모달창 제거시 다시 스크롤 생성
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					return (
						<article key={vid.id}>
							<h2>
								{vid.snippet.title.length > 50
									? vid.snippet.title.substr(0, 50) + '...'
									: vid.snippet.title}
							</h2>

							<div className='txt'>
								<p>
									{vid.snippet.description.length > 200
										? vid.snippet.description.substr(0, 200) + '...'
										: vid.snippet.description}
								</p>
								<span>{vid.snippet.publishedAt.split('T')[0]}</span>
							</div>

							<div
								className='pic'
								onClick={() => {
									modal.current.open();
									setIndex(idx);
								}}
							>
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>

			{/* Modal내부적으로 Open 스테이트값에 의해서 컨텐츠가 보이고 안보이는 것 뿐이고 실제 부모요소안에서 Modal 컴포넌트 자체는 계속 마운트 되어 있는 상태 */}
			<Modal ref={modal}>
				<iframe
					title={Vids[Index]?.id}
					src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
