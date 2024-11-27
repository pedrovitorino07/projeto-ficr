import React from "react";
import '../styles/registerEvent.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpdateEvent from "../components/UpdateEvent";

function UpdateEvents() {
    return (
        <div>
            <Header />
            <UpdateEvent />
            <Footer />
        </div>
    )
}

export default UpdateEvents;