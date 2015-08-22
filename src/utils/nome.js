/*
**    ------------------------------------------------------------------------
**    Current Version 0.1.8
**    ------------------------------------------------------------------------
**    Created by: James Becker (http://www.james-becker.co.uk/)
**    Created on: 18-05-2014
**
**    For change log and updates see http://www.jamesbecker.co/
**
**    Bug reports to: me@jamesbecker.co

**    License Information:
**    -------------------------------------------------------------------------
**    Copyright (C) 2011 James Becker
**
**    This program is free software; you can redistribute it and/or modify it
**    under the terms of the GNU General Public License as published by the
**    Free Software Foundation; either version 2 of the License, or (at your
**    option) any later version.
**    
**    This program is distributed in the hope that it will be useful, but
**    WITHOUT ANY WARRANTY; without even the implied warranty of
**    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
**    General Public License for more details.
**    
**    You should have received a copy of the GNU General Public License along
**    with this program; if not, write to the Free Software Foundation, Inc.,
**    59 Temple Place, Suite 330, Boston, MA 02111-1307 USA or http://www.gnu.org/

**    What is Nome:
**    -------------------------------------------------------------------------
**
**    Nome was developed to allow for context driven websites, responsive web
**    is all the rage at the moment but to truly deliver an experience you need
**    to know more about the person visiting so that your website can deliver
**    information that is relevant to them.
**
**    Modifications and contributors:
**    -------------------------------------------------------------------------
**    I appreciate that I am not the best programmer in the world and as such
**    welcome additions to this framework. If you would like to be an official
**    contributor to this project, please email me at: me@jamesbecker.co
**
*/

/**
* Root object
*/
function nome(){this.init();};

/**
* Initiate prototype for object
*/
nome.prototype = {
  coords: '',
  xhr: '',
  geoEnabled: false,
  dataEnabled: false,
    weatherEnabled: false,
  foundLocationCallBack: '',
  lat: 0,
  lng: 0,
  accuracy: 0,
  json_data: '',
  onReady: null,
  isReady: false,
  temp_c: 0,
  temp_f: 0,
  dateObj: new Date(),
  homeLat: null,
  homeLng: null,
  /* vars for on board sensors */
  deviceOrientation: false,
  deviceMotion: false,
  oriBeta: null,
  oriGamma: null,
  oriAlpha: null,
  posAbs: false,
  accX: null,
  accY: null,
  accZ: null,
  accXg: null,
  accYg: null,
  accZg: null,
  rotBeta: null,
  rotGamma: null,
  rotAlpha: null,
  motionInterval: null,
  cnc: false,
  motionCallBack: null,
  orientationCallBack: null,
  
  init: function() {
    this.checkForGeo();
    this.checkForSensors();
  },
  
  /**
  * Check for navigator.geoloation API
  * If present, get location, user will need to allow it.
  */
  checkForGeo: function() {
    if(navigator.geolocation) {
      var that = this;

      var gLoc = (function( o ) {
        return function( pos ) {
          o.geoLocation.call(o, pos);
        }
      })(that);
      
      var gErr = (function( o ) {
        return function( err ) {
          o.geoError.call(o, err);
        }
      })(that);

      navigator.geolocation.getCurrentPosition(gLoc, gErr);
    } else {
      /* No support for geo location so we need to silently degrade. */
      this.loadWeatherData();
    }
  },

  /**
  * Check for device sensors for motion
  *
  */
  checkForSensors: function() {
    var that = this;
    
    if(('ondeviceorientation' in window)) {
      this.deviceOrientation = true;
      
      
      window.addEventListener('deviceorientation', function(that) {
        return function(e) { 
          that.oriBeta = e.beta;
          that.oriAlpha = e.alpha;
          that.oriGamma = e.gamma;
          that.posAbs = e.absolute ? true : false;

          if(typeof that.orientationCallBack === "function") {
            that.orientationCallBack();
          }
        };
      }(that));
    }

    if(('ondevicemotion' in window)) {
      this.deviceMotion = true;

      window.addEventListener('devicemotion', function(that) {
        return function( event ) { 
          that.accX = event.acceleration.x;
          that.accY = event.acceleration.y;
          that.accZ = event.acceleration.z;

          that.accXg = event.accelerationIncludingGravity.x;
          that.accYg = event.accelerationIncludingGravity.y;
          that.accZg = event.accelerationIncludingGravity.z;
          
          that.rotBeta = event.rotationRate.beta;
          that.rotGamma = event.rotationRate.gamma;
          that.rotAlpha = event.rotationRate.alpha;
          that.motionInterval = event.interval;

          if(typeof that.motionCallBack === "function") {
            that.motionCallBack();
          }
        };
      }(that));
    }

  },
  
  motionEnabled: function() {
    return this.deviceOrientation && this.deviceMotion;
  },
  
  addOrientationListener: function( fnc ) {
    this.orientationCallBack = fnc;
  },
  
  addMotionListener: function( fnc ) {
    this.motionCallBack = fnc;
  },
  
  getOrientation: function( unit ) {
    unit = unit.toUpperCase();
    var retval = 0;
    switch( unit ) {
      case "B":
        retval = this.oriBeta;
        break;
      case "G":
        retval = this.oriGamma;
        break;
      case "A":
        retval = this.oriAlpha;
        break;
    }
    
    return retval;
  },
  
  getAcceleration: function( unit ) {
    unit = unit.toUpperCase();
    var retval = 0;
    switch( unit ) {
      case "X":
        retval = this.accX;
        break;
      case "Y":
        retval = this.accY;
        break;
      case "Z":
        retval = this.accZ;
        break;
    }
    
    return retval;
  },

  getAccelerationGravity: function( unit ) {
    unit = unit.toUpperCase();
    var retval = 0;
    switch( unit ) {
      case "X":
        retval = this.accXg;
        break;
      case "Y":
        retval = this.accYg;
        break;
      case "Z":
        retval = this.accZg;
        break;
    }
    
    return retval;
  },

  getRotation: function( unit ) {
    unit = unit.toUpperCase();
    var retval = 0;
    switch( unit ) {
      case "B":
        retval = this.rotBeta;
        break;
      case "G":
        retval = this.rotGamma;
        break;
      case "A":
        retval = this.rotAlpha;
        break;
    }
    
    return retval;
  },

  onFoundLocation: function( callback ) {
    this.foundLocationCallBack = callback;
    return this;
  },
  
  ready: function( callback ) {
    if( callback === undefined ) {
      return this.isReady;
    } else {
      this.onReady = callback;
      return this;
    }
  },
  
  seconds: function() {
    return this.dateObj.getSeconds();
  },
  
  hours: function() {
    return this.dateObj.getHours();
  },
  
  minutes: function() {
    return this.dateObj.getMinutes();
  },
  
  setLocation: function( lat, lng ) {
    this.homeLat = lat;
    this.homeLng = lng;
  },

  getLongitude: function() {
    return this.lng;
  },
  
  getLatitude: function() {
    return this.lat;
  },

  getAccuracy: function() {
    if(this.geoEnabled) {
      return this.accuracy;
    } else {
      return -1;
    }
  },

  getCountry: function() {
    if(this.dataEnabled) {
      return this.json_data.location.country;
    } else {
      return -1;
    }
  },

  /**
  * set the local coords value to be the navigator.geolocation position
  */
  geoLocation: function( pos ) {
    this.coords = pos.coords;
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
    this.accuracy = pos.coords.accuracy;
    this.geoEnabled = true;
    this.loadWeatherData(this.lat,this.lng);
  
    if(typeof this.foundLocationCallBack == 'function')
        this.foundLocationCallBack.call(this);
  },
  
  /**
  * If we have error from geolocation API, deal with it.
  */
  geoError: function( err ) {
    this.loadWeatherData();
    console.warn('ERROR(' + err.code + '): ' + err.message);
  },
  
  loadWeatherData: function() {
    var qs = "";
    
    if(arguments.length == 2) {
      // Assume that lat/lng are present
      qs = "?lat=" + arguments[0] + "&lng=" + arguments[1];
    }
    
    if(this.homeLat != null && this.homeLng != null) {
      qs += (qs.length > 0) ? "&" : "?";
      qs += "homeLat=" + this.homeLat + "&homeLng=" + this.homeLng;
    }
    
    if(this.weatherEnabled) {
      qs += (qs.length > 0) ? "&" : "?";
      qs += "wf=1";
    }
    
    this.loadJSONp('http://nomejs.com/nome-locator.php'+qs);
  },

    // Oooo nice overloaded function!!! :)
    weatherFeed: function() {
        if(arguments.length == 1) {
            if(typeof arguments[0] === "boolean") {
                this.weatherEnabled = arguments[0];
            }
        }
        else if(arguments.length == 0) {
            return this.weatherEnabled;
        }
    },
  
  /**
  * Lite AJAX implementation to load in PHP data.
  */
  loadJSON: function( path ) {
    this.xhr = new XMLHttpRequest();
    
    var that = this;
    var rsc = (function( o ) {
      return function() {
        if(o.xhr.readyState === 4) {
          if(o.xhr.status === 200) {
            o.responseParse(o.xhr.responseText);
          } else {
            o.responseError(o.xhr);
          }
        }
      }
    })(that);
    
    this.xhr.onreadystatechange = rsc;
    
    this.xhr.open("GET", path, true);
    this.xhr.send();
  },

    /**
     * JSONp implementation
     */
    loadJSONp: function( path ) {
        var st = document.createElement('script');
        st.type = "text/javascript";
        st.src = path;
        h = document.getElementsByTagName("head")[0].appendChild(st);
    },

    /**
  * Parse the response back from PHP backend
  */
  responseParse: function( str ) {
    this.json_data = JSON.parse(str);
    this.dataEnabled = this.isReady = true;

    /* console.log(this.json_data); */
    
    if(!this.geoEnabled && this.json_data.location.latitude != null && this.json_data.location.longitude != null) {
      this.lat = this.json_data.location.latitude;
      this.lng = this.json_data.location.longitude;
    }
    
        if(this.json_data.weather != undefined) {
        this.temp_c = this.json_data.weather.current_condition[0].temp_C;
        this.temp_f = this.json_data.weather.current_condition[0].temp_F;
        }

    if(typeof this.onReady == 'function') {
      this.onReady.call(this);
    }
  },

  /**
  * Error handling for lite AJAX.
  */
  responseError: function( err ) {
    alert("Egads, something has gone wrong!");
    console.warn( 'ERROR(' + err + ')' );
  },
  
  getDistance: function( unit ) {
    var distance = 0;
    
    if(this.json_data.location.distance != undefined) {
      switch(unit) {
        case "M":
          distance = this.json_data.location.distance.M;
          break;
        case "K":
          distance = this.json_data.location.distance.K;
          break;
        case "N":
          distance = this.json_data.location.distance.N;
          break;
        default:
      }   
    } else {
      distance = false;
    }
    
    return distance;
  },
  
  getTemperature: function( unit ) {
    var temp = 0;

        if(this.dataEnabled) {
            switch(unit) {
                case "C":
                    temp = this.temp_c;
                    break;
                case "F":
                    temp = this.temp_f;
                    break;
            }

            return temp;
        } else {
            return -1;
        }
  },

    deg2rad: function( degrees ) {
        return degrees * Math.PI / 180;
    },

    rad2deg: function( radians ) {
        return radians * 180 / Math.PI;
    },

    calcDistance: function(lat1, lon1, lat2, lon2, unit) {
        theta = lon1 - lon2;
        dist = Math.sin(this.deg2rad(lat1)) * Math.sin(this.deg2rad(lat2)) +  Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.cos(this.deg2rad(theta));
        dist = Math.acos(dist);
        dist = this.rad2deg(dist);
        miles = dist * 60 * 1.1515;
        unit = unit.toUpperCase();

        if(unit == "K") {
            return (miles * 1.609344);
        }
        else if(unit == "N") {
            return (miles * 0.8684);
        } else {
            return miles;
        }
    }

};

/**
* Setup with auto running function, add to global namespace
*/
(function() {
  window.nome = new nome();
})();