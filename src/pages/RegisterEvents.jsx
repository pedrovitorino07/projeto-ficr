'use client'
import { useEffect, useState } from 'react';
import '../styles/registerEvent.css';
import { createEvent } from '../services/eventService';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateEvent from "../components/CreateEvent";
import MainEvent from '../components/MainEvent';
function RegisterEvent() {

  return (
    <div className="App">
      <Header />
      <CreateEvent />
      <Footer />
    </div>
  );
}

export default RegisterEvent;