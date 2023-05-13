import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);

	useEffect(() => {
		console.log(youtube);
	}, [youtube]);

	return (
		<section id='vids' className='myScroll'>
			<h1>Youtube</h1>
		</section>
	);
}

export default memo(Vids);
