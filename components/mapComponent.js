import React, { useRef, useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup, ZoomControl } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

const zoomDefault = 6;

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  maxZoom: 20,
  minZoom: 0
});

export default function mapComponent(props) {

	const [zoom, setZoom] = useState(zoomDefault);
	const [lonLat, setLonLat] = useState([props.lon, props.lat]);
	const [lonLatMarker, setLonLatMarker] = useState([props.lon, props.lat]);

	// useEffect(() => {
	// 	setZoom(zoomDefault);
	// 	setLonLat([props.lon, props.lat]);
	// 	setLonLatMarker([props.lon, props.lat]);
	// }, [props.lon, props.lat]);

    console.log(props.schools)

	return (
		<Map
			style="mapbox://styles/lacabra00/ckfqtcdnj11ty19t3stjs11dq"
			center= {lonLat}
			zoom={[zoom]}
			containerStyle={{ width: '100%', height: '100%' }}
			movingMethod='jumpTo'
			logoPosition='bottom-right'
			onMoveEnd={(map) => {
					setZoom(map.getZoom());
					setLonLat([map.getCenter().lng, map.getCenter().lat]);
					console.log(map.getCenter().lng, map.getCenter().lat)
				}
			}
			onStyleLoad={(map, loadEvent) => {
                props.schools.map(school => {
                    console.log(school)
                    let html=`<table>
                        <tr>
                            <td><b>Date:</b></td>
                            <td>${school.timestamp}
                        <tr>
                            <td><b>Code d'école:</b></td>
                            <td>${school.code}</td>
                        </tr>
                        <tr>
                            <td><b>Coordonnées:&nbsp;&nbsp;</b></td>
                            <td>[${school.lat},${school.lng}]</td>
                        <tr>
                            <td><b>Électricité:</b></td>
                            <td>${school.electricity=='Yes'?'Oui':'Non'}</td>
                        </tr>
                        <tr>
                            <td><b>Internet:</b></td>
                            <td>${school.internet=='Yes'?'Oui':'Non'}</td>
                        </tr>
                    </table>`
                    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(html);

                    var el = document.createElement('div');
                    el.id = 'marker';
                    new mapboxgl.Marker(el)
                        .setLngLat([parseFloat(school.lng), parseFloat(school.lat)])
                        .setPopup(popup)
                        .addTo(map)
                })
            }}

            // <Marker
            //   key={school.id}
            //   anchor="bottom"
            //   coordinates={[parseFloat(school.lng), parseFloat(school.lat)] }
            //   onClick=
            // >
            //      <img src='/marker.svg' />
            // </Marker>

            // new mapboxgl.Popup()
            //     .
        //))}
        >
			<ZoomControl/>
		</Map>
	);
}