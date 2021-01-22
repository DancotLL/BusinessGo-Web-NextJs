
const Footer = () => {
    return (
        <div className="social">
            <span className="menu">
                <h3>About Us </h3>
                <h5>Client </h5>
                <h5>Galery </h5>
                <h5>Contact </h5>
            </span>
            <span className="menu">
                <h3>About Us </h3>
                <h5>Client </h5>
                <h5>Galery </h5>
                <h5>Contact </h5>
            </span>
            <span className="menu">
                <h3>About Us </h3>
                <h5>Client </h5>
                <h5>Galery </h5>
                <h5>Contact </h5>
            </span>
    <style jsx>{`


    .social{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 50vh;
        background-image:linear-gradient(to left,hsla(0, 0%, 0%, 0.897), hsla(0, 0%, 0%, 0.897)), url(/images/featured-2.jpg);
        background-position:0;
        background-size: cover;
        background-repeat: no-repeat;
        color:white;
    }
    .menu{
        flex:1;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow:column;
    }
    .h3{
        flex:1;
        padding:.5em;
    }
    // ========================================
    @media(max-width:430px){
        .social{
            height: 100vh;
            flex-flow:column;

        }
    }

    `}</style>
        </div>
    )
}

export default Footer;
