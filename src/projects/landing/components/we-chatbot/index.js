import Link from 'next/link';

const WEChatbot = () => (
  <div className="we-chatbot">
    <div className="left" />
    <div className="right">
      <h2>
        NUESTRO NUEVO <br /> SERVICIO DE CHATBOT
      </h2>
      <p>
        En We Build Webz, desarrollamos la nueva funcionalidad: <b>ChatBot</b>, permite que tus comunicaciones
        sean <b>administradas automáticamente</b>, cuando no dispongas de tiempo.
      </p>

      <button>
        <Link href="https://www.chatbot.webuildwebz.com" target="_blank">
          <a>Visitar</a>
        </Link>
      </button>
    </div>

    <style jsx>
      {`
        .we-chatbot {
          width: 100vw;
          height: 100%;
          padding: 1em;
          margin: 2em 0;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
        }
        // ======================================
        .left {
          width: 500px;
          height: 500px;
        }

        .right {
          width: 500px;
          height: 100%;
        }

        // ==================
        .left {
          background-image: url(/images/chatbot.jpg);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        // =============================

        h2 {
          margin: 1.5em 0 0 0;
          padding: 0;
          font-size: 3em;
          background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
        p {
          width: 50%;
          margin: 1em 0;
          font-style: italic;
          font-size: 1.5em;
        }
        b {
          background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }

        button {
          background: #1c1c1c;
          border: none;
          outline: none;
          padding: 1em 2em;
          border-radius: 0.5em;
          cursor: pointer;
          margin: 1em 0;
        }
        a {
          color: white;
          font-weight: bold;
        }
        // =============MEDIA QUERYS========================

        @media (max-width: 455px) {
          p {
            width: 100%;
          }
        }
      `}
    </style>
  </div>
);

export default WEChatbot;
