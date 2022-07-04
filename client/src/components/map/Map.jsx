import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import style from './Map.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';

export const Map = ({onPlaceChanged, defaultMarker}) => {
  const [map, setMap] = useState()
  const [currentPlace, setCurrentPlace] = useState()

  const mapLoaded = (google) => {
    const defaultCoor = defaultMarker ? defaultMarker : {
      lat: 1.289440,
      lng: 103.849980
    }
    const mapOptions = {
      center: defaultCoor,
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      clickableIcons: false
    };
    const autoCompleteOptions = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: [],
    };
    setMap(google);
    
    const input = document.getElementById("pac-input");
    const card = document.getElementById("pac-card");

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
    
    const autocomplete = new google.maps.places.Autocomplete(input, autoCompleteOptions);
    autocomplete.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content")

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    if (defaultMarker) {
      marker.setPosition(defaultCoor)
    }

    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            setTimeout(() => {
              map.setZoom(17);
            }, 1);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        const formatPlace = JSON.parse(JSON.stringify(place))
        setCurrentPlace(formatPlace);
        onPlaceChanged(formatPlace);

        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = place.formatted_address
        infowindow.open(map, marker);
    });

  }

  const loadMap = () => {
    const loader = new Loader({
      apiKey: "AIzaSyAIhwmm0SiYnQmZ5cvxFOW0-Q2riuTneFo",
      version: "weekly",
      libraries: ["places"]
    });
    loader.load()
      .then((google) => {
        mapLoaded(google)
      })
      .catch(e => {
        console.log(e)
      });
  }

  useEffect(()=> loadMap(), [])

  return (
    <>
      <div className={`${style.map__autocomplete} ${(defaultMarker ? style.map__hide : '')}`} id="pac-card">
          <div className="map__search">
            <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <input id="pac-input" type="text" placeholder="Enter a location" />
          </div>
      </div>
      <div id="infowindow-content" className={!currentPlace ? style.map__infoinactive : ''}>
        <span id="place-name" className="title"></span><br />
        <span id="place-address"></span>
      </div>
      <div id='map' className={style.map}>
      </div>
    </>
  )
}