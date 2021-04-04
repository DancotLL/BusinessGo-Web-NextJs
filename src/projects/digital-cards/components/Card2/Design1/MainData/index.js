import Link from 'next/link';

import { cardPropTypes } from '../../constants';

const MainData = props => {
  const { card } = props;
  const logo = card.profile_photo || card.logo;
  const name = card.business_or_company || `${card.name} ${card.surnames}`;

  return (
    <div className="mainData">
      <div className="dataContainer">
        <div className="logoContainer">
          <div className="logo" />
        </div>
        <div className="name">{name}</div>
        <div className="jobTitle">{card.job_title}</div>
        {card.website_url && (
          <Link href={card.website_url}>
            <a className="websiteUrl" target="blank">
              <div>{card.website_url}</div>
            </a>
          </Link>
        )}
      </div>
      <style jsx>
        {`
          * {
            color: #686464;
          }
          .mainData {
            display: flex;
            flex-direction: row;
            justify-content: center;
            z-index: 1;
          }
          .dataContainer {
            display: flex;
            flex-direction: column;
          }
          .logoContainer {
            transform: translate(0, -60px);
            margin-bottom: -60px;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          .logo {
            width: 120px;
            height: 120px;
            background-image: url(${logo});
            background-size: cover;
            border-radius: 50%;
            animation: logoAppear 1.5s ease;
          }
          .name {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-top: 4px;
          }
          .jobTitle {
            text-align: center;
          }
          .websiteUrl {
            font-weight: bold;
          }
          @keyframes logoAppear {
            0% {
              transform: scale(0) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

MainData.propTypes = cardPropTypes;

export default MainData;
