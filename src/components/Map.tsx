import React, { useEffect,  useRef, useState } from 'react';
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const test = () => {}
 const Map = () => {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<ol.Map>();
    const rasterLayer = new TileLayer(
		{
			source: new OSM(), // Using OpenStreetMap as source
		});

    useEffect(() => {
        if(mapRef.current) {
            let options = {
                view: new ol.View({ center: [0, 0],
                    zoom: 0 }),
                layers: [rasterLayer],
                controls: [],
                overlays: []
            };
            let mapObject = new ol.Map(options);
            mapObject.setTarget(mapRef.current);
            setMap(mapObject);
            return () => mapObject.setTarget(undefined);
        }
    }, [mapRef.current]) 

    useEffect(() => {
        if (!map) return;
        map.getView().setZoom(0);
    }, [0]);

    return (<div ref={mapRef} className="map"></div>) 
}



export default Map;
