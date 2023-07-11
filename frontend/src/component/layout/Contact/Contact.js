import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LaunchIcon from '@mui/icons-material/Launch';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact = () => {
    return (
        <div className="contactContainer">
            <a className="mailBtn" href="mailto:harshpandey9079@gmail.com">
                <Button>
                    Email: harshpandey9079@gmail.com
                    <br/>
                    <br/>
                    Call & Whatsapp: +91-7891676144
                    <br/>
                    <br/>
                    SEE ABOUT PAGE FOR ALL MY SOCIAL HANDLES & PROJECTS
                </Button>
            </a>
        </div>
    );
};

export default Contact;