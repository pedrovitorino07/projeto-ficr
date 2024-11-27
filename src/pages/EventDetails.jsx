import React from "react";
import EventDetails from "../components/EventDetails";
import Header from "../components/Header";
import Footer from "../components/Footer";

function EventDetailsPage() {
  return (
    <div className="App">
        <Header />
         <EventDetails /> 
        <Footer />  
    </div>
  );
}

export default EventDetailsPage;
