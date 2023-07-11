import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
        <footer id="footer">
            <div className="leftFooter">
                <h4>Download our APP</h4>
                <p>Download App for Android and IOS Mobile Phone</p>
                <div className="imagefooter">
                    <img src={playStore} alt="playstore"/>
                    <img src={appStore} alt="Appstore"/>
                </div>
            </div>
            <div className="midFooter">
                <h2>Ecommerce</h2>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; MeHarshPandey</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.linkedin.com/in/harsh-pandey-2161hp/" target="blank">LinkedIn</a>
                <a href="https://twitter.com/harshpandey2121" target="blank">Twitter</a>
                <a href="https://harshpandey9079.wixsite.com/harshpandey" target="blank">My Portfolio</a>
            </div>
        </footer>
    </>
  );
}

export default Footer;
