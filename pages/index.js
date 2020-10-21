import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import GSheetReader from 'g-sheets-api';

export default function Home() {

  const [schools, setSchools] = useState([]);

  const options = {
    sheetId: process.env.NEXT_PUBLIC_SHEET,
    sheetNumber: 1,
    returnAllResults: true,
  }

  function addSchools(results) {
    let schools;
    for(let i = 0; i < results.length; i++){
      console.log(results[i])
        // if( ! Object.keys(c).find( e => e == alpha3[results[i].country])) {
        //   c[alpha3[results[i].country]] = {}
        // }
        // c[alpha3[results[i].country]][label] = results[i];

        // l[alpha3[results[i].country]] = results[i];
    }
    
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
