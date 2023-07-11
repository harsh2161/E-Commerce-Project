import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

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