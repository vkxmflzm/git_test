import { Route, Switch } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as names from './redux/actionType';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';
import Parent from './Parent';

import './scss/style.scss';

function App() {
	//Menu에서 forwarding되는 값을 참조객체에 담음
	const menu = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: names.YOUTUBE.start });
	}, [dispatch]);

	return (
		<>
			<Switch>
				{/* 각 메인, 서브페이지의 Header컴포넌트에 props로 전달 */}
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/members' component={Members} />
			<Route path='/parent' component={Parent} />
			<Footer />
			{/* 메뉴 패널을 메인, 서브페이지 상관없이 호출되도록 최상위 컴포넌트인 App에 호출 */}
			<Menu ref={menu} />
		</>
	);
}

export default App;
