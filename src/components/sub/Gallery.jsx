import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import Modal from '../common/Modal';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const modal = useRef(null);
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [Index, setIndex] = useState(0);

	const getFlickr = async (opt) => {
		const baseURL =
			'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&privacy_filter=1';
		const key = 'ae5dbef0587895ed38171fcda4afb648';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 500;
		let url = '';

		//인수로 전달되는 opt객체의 type값에 따라 요청 url 분기처리
		if (opt.type === 'interest')
			url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		if (result.data.photos.photo.length === 0) {
			setLoading(false);
			frame.current.classList.add('on');
			return alert('해당 검색어의 결과 이미지 없습니다.');
		}
		setItems(result.data.photos.photo);

		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');
		}, 1000);
	};

	const showInterest = () => {
		getFlickr({ type: 'interest' });
		setLoading(true);
		frame.current.classList.remove('on');
	};
	const showUser = (name) => {
		getFlickr({ type: 'user', user: name });
		setLoading(true);
		frame.current.classList.remove('on');
	};
	const showSearch = () => {
		const result = input.current.value.trim();
		if (result === '') return alert('검색어를 입력해주세요.');
		getFlickr({ type: 'search', tags: result });
		setLoading(true);
		frame.current.classList.remove('on');
		input.current.value = '';
	};

	//컴포넌트 마운트시 데이터호출 함수 실행
	useEffect(() => showUser('164021883@N04'), []);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='controls'>
					<div className='searchBox'>
						<input
							type='text'
							placeholder='검색어를 입력하세요.'
							ref={input}
							onKeyPress={(e) => e.key === 'Enter' && showSearch()}
						/>
						<button onClick={showSearch}>Search</button>
					</div>

					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={() => showUser('164021883@N04')}>My Gallery</button>
					</nav>
				</div>

				{Loading && (
					<img
						className='loader'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
						alt='loading bar'
					/>
				)}

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												modal.current.open();
												setIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>

										<h2>{item.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={(e) => showUser(e.target.innerText)}>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Modal ref={modal}>
				<img
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
