import PropTypes from 'prop-types';

import Left from './left';
import Mid from './mid';
import Right from './right';

const Banner = props => (
  <div className={`banner${props.show ? '' : ' bannerClosed'}`}>
    <Left onClickSee={props.onClose} />
    <Mid />
    <Right />

    <style jsx>
      {`
        .banner {
          width: 100vw;
          height: 100vh;
          display: flex;
          padding: 2em 5em;
          border-radius: 50px;
          border-style: solid;
          border-width: 1px;
          transition: 0.7s;
        }
        .bannerClosed {
          opacity: 0;
          width: 0;
          height: 0;
          padding: 0;
        }
      `}
    </style>
  </div>
);

Banner.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

Banner.defaultProps = {
  onClose: () => {}
};

export default Banner;
