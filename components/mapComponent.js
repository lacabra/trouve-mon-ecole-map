import React, { useRef, useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup, ZoomControl } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { renderToString } from 'react-dom/server'


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
				}
			}
			onStyleLoad={(map, loadEvent) => {
                props.schools.map(school => {
                    let htmlTable=`<div><table>
                        <tr>
                            <td><b>Date:</b></td>
                            <td>${school.timestamp}</td>
                        </tr>
                        <tr>
                            <td><b>Code d'école:</b></td>
                            <td>${school.code}</td>
                        </tr>
                        <tr>
                            <td><b>Coordonnées:&nbsp;&nbsp;</b></td>
                            <td><a href="https://www.google.com/maps/place/${school.lat}+${school.lng}/@${school.lat},${school.lng},456m/data=!3m1!1e3" target="_blank">
                                    [${school.lat},${school.lng}]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td><b>Électricité:</b></td>
                            <td>${school.electricity=='Yes'?'Oui':'Non'}</td>
                        </tr>
                        <tr>
                            <td><b>Internet:</b></td>
                            <td>${school.internet=='Yes'?'Oui':'Non'}</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                            <img alt='static Mapbox map of this location' src='https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${school.lng},${school.lat},16,0.00,0.00/200x200@2x?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}' >
                    </table></div>`
                    var table = document.createElement('table')
                    table.innerHTML = htmlTable;
                    var popup = new mapboxgl.Popup({ offset: 25, maxWidth: 'none' }).setDOMContent(table);

                    var el = document.createElement('div');
                    el.id = 'marker';
                    new mapboxgl.Marker(el)
                        .setLngLat([parseFloat(school.lng), parseFloat(school.lat)])
                        .setPopup(popup)
                        .addTo(map)
                })
            }}
        >
			<ZoomControl/>
		</Map>
	);
}