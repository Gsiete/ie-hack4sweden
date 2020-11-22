import React, { useEffect, useRef, useState } from 'react';
import * as ol from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { MapBrowserEvent, Overlay } from 'ol';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import { getArea, getLength } from 'ol/sphere';
import Draw from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';
import OverlayPositioning from 'ol/OverlayPositioning';
import { event } from 'firebase-functions/lib/providers/analytics';
import { useFetchUserData, useUserDataSubmitter } from '../../utils/hooks';
import { Redirect } from 'react-router-dom';


const test = () => {
}

const mapPadding = [30, 30, 30, 30];

/**
 * Currently drawn feature.
 */
let sketch: Feature;

/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
let helpTooltipElement: HTMLElement;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
let helpTooltip: Overlay;

/**
 * The measure tooltip element.
 */
let measureTooltipElement: HTMLElement

/**
 * Overlay to show the measurement.
 */
let measureTooltip: Overlay;


/**
 * Message to show when the user is drawing a polygon.
 */
const continuePolygonMsg = 'Click to continue drawing the polygon';

/**
 * Message to show when the user is drawing a line.
 */
const continueLineMsg = 'Click to continue drawing the line';


const vectorSource = new VectorSource();

let draw: any; // global so we can remove it later

const Map = () => {
  const typeSelectRef = React.useRef<HTMLSelectElement>(null);
  const typeSelect = typeSelectRef.current;
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<ol.Map>();
  const [redirectHome, setRedirectHome] = useState(false);
  const [isSending, sendUserData] = useUserDataSubmitter();
  const userData = useFetchUserData();
  const submitPolygon = async (polygon: [lat: number, lat: number][]) => {
    await sendUserData({ polygon: polygon.map(([ lat, lng ]) => ({ lat, lng })) })
    setRedirectHome(true);
  }
  console.log('polygon', userData?.polygon);
  //#region Functions
  const pointerMoveHandler = (evt: any) => {
    if (evt.dragging) {
      return;
    }
    let helpMsg = 'Click to start drawing';

    if (sketch) {
      const geom = sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
  };

  const createVectorLayer = (): VectorLayer => new VectorLayer({
    source: vectorSource,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33',
        }),
      }),
    }),
    zIndex: 2,
  });

  /**
   * Format length output.
   * @param {LineString} line The line.
   * @return {string} The formatted length.
   */
  const formatLength = (line: any) => {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
  };

  /**
   * Format area output.
   * @param {Polygon} polygon The polygon.
   * @return {string} Formatted area.
   */
  const formatArea = (polygon: any) => {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };

  /**
   * Creates a new measure tooltip
   */
  const createMeasureTooltip = () => {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode?.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: OverlayPositioning.BOTTOM_CENTER,
    });

    if (map) {
      map.addOverlay(measureTooltip);
    }
  }


  /**
   * Creates a new help tooltip
   */
  const createHelpTooltip = () => {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode?.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: OverlayPositioning.CENTER_LEFT,
    });

    if (map) {
      map.addOverlay(helpTooltip);
    }
  }

  const addInteraction = () => {
    const type = typeSelect?.value == 'area' ? GeometryType.POLYGON : GeometryType.LINE_STRING;
    draw = new Draw({
      source: vectorSource,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      }),
    });

    if (map) {
      map.addInteraction(draw);
      createMeasureTooltip();
      createHelpTooltip();
    }

    var listener;
    draw.on('drawstart', (evt: any) => {
      // set sketch
      sketch = evt.feature;

      let tooltipCoord = evt.coordinate;
      const geometry = sketch.getGeometry();
      if (geometry) {
        listener = geometry.on('change', (evt: MapBrowserEvent) => {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output as string;
          measureTooltip.setPosition(tooltipCoord);
        });
      }
    });
  }

  /**
   * Let user change the geometry type.
   */

  const onTypeChange = () => {
    map?.removeInteraction(draw);
    addInteraction();
  };
  addInteraction();

  draw.on('drawend', (evt: any) => submitPolygon(evt.feature.getGeometry().getCoordinates()))

//#endregion

  const vectorLayer = createVectorLayer();
  const rasterLayer = new TileLayer({
    source: new OSM(), // Using OpenStreetMap as source
  });


  useEffect(() => {
    if (mapRef.current) {
      let options = {
        layers: [rasterLayer, vectorLayer],
        view: new ol.View({
          center: [-11000000, 4600000],
          zoom: 5,
        }),
      };
      let mapObject = new ol.Map(options);
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);

      return () => mapObject.setTarget(undefined);
    }
  }, [mapRef.current])

  useEffect(() => {
    if (map) {
      map.on('pointermove', pointerMoveHandler);
      map.getViewport().addEventListener('mouseout', function () {
        helpTooltipElement.classList.add('hidden');
      });
    }
  }, [map]);
  console.log('Map', map);

  if (!isSending && redirectHome) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div ref={mapRef} className="map"/>
      <form className="form-inline">
        <label>Measurement type &nbsp;</label>
        <select id="type" ref={typeSelectRef} onChange={onTypeChange}>
          <option value="length">Length (LineString)</option>
          <option value="area">Area (Polygon)</option>
        </select>
      </form>
    </>
  )
}

export default Map;
