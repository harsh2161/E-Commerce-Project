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
                <a href="http://instagram.com/harshpandey">Instagram</a>
                <a href="http://twitter.com/harshpandey">Twitter</a>
                <a href="http://linkedin.com/harshpandey">LinkedIn</a>
            </div>
        </footer>
    </>
  );
}

export default Footer;
