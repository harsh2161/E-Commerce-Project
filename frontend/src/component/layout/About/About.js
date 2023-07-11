import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LaunchIcon from '@mui/icons-material/Launch';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import GitHubIcon from '@mui/icons-material/GitHub';

const About = () => {
    return (
        <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
            <Typography component="h1">About Us</Typography>
            <div>
            <div>
                <Avatar
                    style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                    src={"https://res.cloudinary.com/dvhg81vjl/image/upload/v1687843991/gagpuautyqkix9tqandn.jpg"}
                    alt="Founder"
                />
                <Typography>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <div>
                            Harsh Pandey
                        </div>
                        <a
                            href="https://harshpandey9079.wixsite.com/harshpandey"
                            target="blank">
                            <LaunchIcon className="LinkedInSvgIcon" />
                        </a>
                    </div>
                </Typography>
                <br/>
                <br/>
                <span>
                    This Is A Sample Wesbite Made By Harsh Pandey. 
                    <br/>
                    <br/>
                    <u>Only With The Purpose To Showcase My Skills To The <b>RECRUITERS</b></u>
                    <br/>
                    <br/>
                    Call & Whatsapp : +91-7891676144
                    <br/>
                    Email: harshpandey9079@gmail.com
                </span>
            </div>
            <div className="aboutSectionContainer2">
                <Typography component="h2">View My Social Handles</Typography>
                <a
                    href="https://www.linkedin.com/in/harsh-pandey-2161hp/"
                    target="blank">
                    <LinkedInIcon className="LinkedInSvgIcon" />
                </a>
                <a
                    href="https://twitter.com/harshpandey2121"
                    target="blank">
                    <TwitterIcon className="twitterSvgIcon" />
                </a>
                <a
                    href="https://github.com/harsh2161"
                    target="blank">
                    <GitHubIcon />
                </a>
                <a
                    href="https://www.youtube.com/@harsh-qr3tt"
                    target="blank">
                    <YouTubeIcon className="youtubeSvgIcon" />
                </a>
                <a
                    href="https://7cfe3e8d-7616-4b44-a80b-553252000f90.filesusr.com/ugd/b65dd2_a7823f8a7e3c49a79023e212ef5932a5.pdf"
                    target="blank">
                    <DocumentScannerIcon />
                </a>
            </div>
            </div>
        </div>
        </div>
    );
};

export default About;