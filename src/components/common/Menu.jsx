import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';

const Menu = forwardRef((props, ref) => {
	const active = { color: 'aqua' };
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});
	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: -270, opacity: 0 }}
					animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
					exit={{ x: -270, opacity: 0, transition: { duration: 0.5 } }}
				>
					<h1 onClick={() => setOpen(false)}>
						<Link to='/'>Logo</Link>
					</h1>

					<ul id='gnbMo' onClick={() => setOpen(false)}>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								Location
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeStyle={active}>
								Members
							</NavLink>
						</li>
					</ul>

					<ul className='brands' onClick={() => setOpen(false)}>
						<li>
							<FontAwesomeIcon icon={faTwitter} />
						</li>
						<li>
							<FontAwesomeIcon icon={faYoutube} />
						</li>
						<li>
							<FontAwesomeIcon icon={faSpotify} />
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
