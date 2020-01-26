import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke,Icon, Style} from 'ol/style';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tanqweb';

 items1: MenuItem[];

    items2: MenuItem[];

    activeItem: MenuItem;

    results: string[];
lat = 51.678418;
  lng = 7.809007;
text: string;


    ngOnInit() {
      var view = new View({
  center: [0, 0],
  zoom: 2
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: view
});

var geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: view.getProjection()
});

function el(id) {
  return document.getElementById(id);
}


  geolocation.setTracking(true);


// update the HTML page when the position changes.
geolocation.on('change', function() {
  el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
  el('altitude').innerText = geolocation.getAltitude() + ' [m]';
  el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
  el('heading').innerText = geolocation.getHeading() + ' [rad]';
  el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
  alert(geolocation.getPosition());
});

// handle geolocation error.
geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new Feature();
positionFeature.setStyle(new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#3399CC'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
    new Point([8926004.123217335,1464466.3246681928]) : null);
});


var fill = new Fill({
    color: 'red'
});

var circle = new CircleStyle({
    radius: 1,
    fill: fill
});



var marker = new Feature({
    geometry: new Point([8928004.123217335,1464466.3246681928]) // dont worry about coordinate type 0,0 will be in west coast of africa
}); 

marker.setStyle(
    new Style({
        image: new Icon(/** @type {olx.style.IconOptions} */ ({
            
            anchorOrigin: 'bottom-left',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: './assets/mapmarker.jfif',
            width:2,
            height:2
        }))
}));


var markerData = new Feature({
    geometry: new Point([8927004.123217335,1464466.3246681928]) // dont worry about coordinate type 0,0 will be in west coast of africa
}); 

markerData.setStyle(
    new Style({
        image: new Icon(/** @type {olx.style.IconOptions} */ ({
            
            anchorOrigin: 'bottom-left',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: './assets/mapmarker.jfif',
            width:2,
            height:2
        }))
}));

const markerSource = new VectorSource();
  markerSource.addFeature(accuracyFeature);
  markerSource.addFeature(positionFeature);
    markerSource.addFeature(marker);
        markerSource.addFeature(markerData);





var v1 = new VectorLayer({
  map: map,
  source: markerSource
});

   

        this.results = [
            'Hard Disk', 'Comfort' , 'Threptin'

        ];
        this.items2 = [
            {label: 'SuperMarket', icon: 'fa fa-shopping-basket'},
            {label: 'Pharmacy', icon: 'fa fa-medkit'},
            {label: 'Computer', icon: 'fa fa-laptop'},
            
        ];

        this.activeItem = this.items2[0];
       
    }
ngAfterViewInit() {
    
  }
    closeItem(event, index) {
        
        event.preventDefault();
    }
}

