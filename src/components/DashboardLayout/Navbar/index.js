import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { setNavbarHeight } from '../../../shared/actions/navbarHeight';

import Title from './Title';
import LogoutButton from './LogoutButton';

const Navbar = props => {
  const dispatch = useDispatch();
  const sidebarWidth = useSelector(store => store.sidebarWidth);
  const navbarHeight = 50;

  dispatch(setNavbarHeight(navbarHeight));

  return (
    <div className="navbar">
      <h2>{props.pageTitle}</h2>
      {/* <Title breadcrumbItems={props.breadcrumbItems} /> */}
      <LogoutButton />
      <style jsx>
        {`
          .navbar {
            position: absolute;
            left: ${sidebarWidth}px;
            display: flex;
            width: calc(100% - ${sidebarWidth}px);
            height: ${navbarHeight}px;
            background-image: linear-gradient(to right, skyblue, #ebebeb);
            border-bottom-right-radius: 14px;
            transition: 0.7s;
          }
        `}
      </style>
    </div>
  );
};

Navbar.propTypes = {
  pageTitle: PropTypes.string
  // breadcrumbItems: PropTypes.any.isRequired
};

Navbar.defaultProps = {
  pageTitle: ''
};

export default Navbar;
