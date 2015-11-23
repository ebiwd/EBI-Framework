function exitMap() {
  document.getElementById('event-venue').parentElement.removeChild(document.getElementById('event-venue')); // remove the map div
}

// exit if address is suspect
if(!document.getElementById('map-address')) {
  exitMap();
} else if (document.getElementById('map-address').innerHTML.length < 5) {
  exitMap();
} else {
  google.maps.event.addDomListener(window, 'load', init);
}

// Utility function to check that the ID exists before loading
function getInnerHtml(targetID) {
  if (document.getElementById(targetID)) {
    return document.getElementById(targetID).innerHTML;
  } else {
    return '';
  }
}

function init() { // init gmaps

  var map,
      title       = getInnerHtml('map-name'),
      description = getInnerHtml('map-description'),
      image       = getInnerHtml('map-image'),
      address     = getInnerHtml('map-address'),
      room        = getInnerHtml('map-room'),
      // lat         = parseFloat(document.getElementById('map-lat').innerHTML);
      // lon         = parseFloat(document.getElementById('map-lon').innerHTML);
      mapLink     = 'https://www.google.com/maps?q=',
      lat         = 0,
      lon         = 0,
      latCompensation = 0.001,
      markericon  = '//www.ebi.ac.uk/web_guidelines/js/events/images/map-marker-hex-16.png';

  // clean up the formatting of the address
  address = address.replace(new RegExp('#([^\\s]*)','g'), '');
  address = address.trim().replace(/(?:\r\n|\r|\n)/g,', ');
  address = address.replace(/(, )./g , ' ').replace(/\s\s+/g, ', ');


  // add the gmaps link to a big map
  mapLink = (mapLink + title + " " + address).replace(/ /g , '+');
  document.getElementById('event-venue-link').innerHTML = '<a href="'+mapLink+'">View this map bigger</a>';

  // intelligently make the image
  var withImage = '';
  if (image != '') {
    image = "<div class='image-wrapper'><img src='" + image + "'/></div>";
    withImage = " with-image";
    latCompensation = 0.004;
  } 

  // Geocode the address
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
        lat = results[0].geometry.location.lat();
        lon = results[0].geometry.location.lng();

        // Once we have the data, trigger the mapping event
        plotVenue();

      } else {
        alert("No map location found for this venue...");
      }
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });

  // make the map and add the dot
  function plotVenue() {

    var mapOptions = {
      center: new google.maps.LatLng(lat+latCompensation,lon), // increase lat to improve adjust map centering for info box
      // center: new google.maps.Geocoder(),
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
      },
      disableDoubleClickZoom: false,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: true,
      panControl: false,
      streetViewControl: false,
      draggable : true,
      overviewMapControl: true,
      overviewMapControlOptions: {
          opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
            {
              "featureType": "landscape",
              "stylers": [
                {
                  "hue": "#F1FF00"
                },
                {
                  "saturation": -27.4
                },
                {
                  "lightness": 9.4
                },
                {
                  "gamma": 1
                }
              ]
            },
            {
              "featureType": "road.highway",
              "stylers": [
                {
                  "hue": "#272007"
                },
                {
                  "saturation": -20
                },
                {
                  "lightness": 36.4
                },
                {
                  "gamma": 1
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "stylers": [
                {
                  "hue": "#00FF4F"
                },
                {
                  "saturation": 0
                },
                {
                  "lightness": 0
                },
                {
                  "gamma": 1
                }
              ]
            },
            {
              "featureType": "road.local",
              "stylers": [
                {
                  "hue": "#FFB300"
                },
                {
                  "saturation": -38
                },
                {
                  "lightness": 11.2
                },
                {
                  "gamma": 1
                }
              ]
            },
            {
              "featureType": "water",
              "stylers": [
                {
                  "hue": "#00B6FF"
                },
                {
                  "saturation": 4.2
                },
                {
                  "lightness": -63.4
                },
                {
                  "gamma": 1
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "hue": "#9FFF00"
                },
                {
                  "saturation": 0
                },
                {
                  "lightness": 0
                },
                {
                  "gamma": 1
                }
              ]
            }
          ],
    }
    var mapElement = document.getElementById('event-venue');
        
    map = new google.maps.Map(mapElement, mapOptions);

    marker = new google.maps.Marker({
      icon: markericon,
      position: new google.maps.LatLng(lat, lon),
      map: map,
      title: title,
      desc: description
    });
    bindInfoWindow(marker, map, title, description, image);

    function bindInfoWindow(marker, map, title, desc, image) {
      var html= "<div class='map-info-window"+withImage+"'>"+image+"<p><a href='"+mapLink+"'><strong>"+room+"<br/>"+title+"</strong> "+address+"</a><p></div>";
      var infoWindowVisible = (function () {
        var currentlyVisible = false;
        return function (visible) {
          if (visible !== undefined) {
              currentlyVisible = visible;
          }
          return currentlyVisible;
         };
      }());
      iw = new google.maps.InfoWindow({content:html, disableAutoPan: true});

      google.maps.event.addListener(marker, 'click', function() {
        if (infoWindowVisible()) {
          iw.close();
          infoWindowVisible(false);
        } else {
          // iw = new google.maps.InfoWindow({content:html});
          iw.open(map,marker);
          infoWindowVisible(true);
        }
      });
      google.maps.event.addListener(iw, 'closeclick', function () {
          infoWindowVisible(false);
      });

      // open the marker by default
      iw.open(map,marker);
    }
  }
}
