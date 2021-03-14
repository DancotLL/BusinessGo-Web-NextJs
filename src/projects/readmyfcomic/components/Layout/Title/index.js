import Link from 'next/link';

const Title = () => (
  <div className="title">
    <Link href="/">
      <a>
        <div className="text">
          Read My F****** Comic<div className="exclamationMark">!</div>
        </div>
      </a>
    </Link>
    <style jsx>
      {`
        .title {
          position: relative;
          width: 100%;
          height: 80px;
          vertical-align: middle;
          text-align: center;
          background-color: #f2bea2;
        }
        .text {
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          width: 100%;
          vertical-align: middle;
          font-size: 48px;
          color: #38a4f1;
          text-shadow: 0 0 3px black;
        }
        .exclamationMark {
          display: inline-block;
          color: #f13838;
        }
        @media only screen and (max-width: 768px) {
          .text {
            font-size: 34px;
          }
        }
      `}
    </style>
  </div>
);

export default Title;
