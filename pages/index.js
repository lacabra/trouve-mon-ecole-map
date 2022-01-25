import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import GSheetReader from 'g-sheets-api';

export default function Home() {

  const [schools, setSchools] = useState([]);

  const options = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    sheetId: process.env.NEXT_PUBLIC_SHEET,
    sheetNumber: 1,
    returnAllResults: true,
  }

  useEffect(() => {
    GSheetReader(options, results => {
      setSchools(results);
    });
  }, []);

  const MapComponent = dynamic(import('../components/mapComponent'),{
    ssr: false
  })

  function handleChange(event){
    switch(event.target.id){
      case 'giga':
        setGigaChecked(!gigaChecked);
        setGigaCountries([])
    }
  }

  return (
    <div className="main">
      <MapComponent 
        lon="8" 
        lat="15.5" 
        schools={schools}
      />  
      <div id="summary">
        <h2>Trouve Mon École</h2>
        <b>Nombre d'écoles:</b> {schools.length}
      </div>
    </div>
  )
}
