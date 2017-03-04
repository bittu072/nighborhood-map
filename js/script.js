var placeMark = function(data, num) {
    this.idNum = ko.observable(num)
    this.position = ko.observable(data.position);
    this.animation = ko.observable(data.animation);
    this.map = ko.observable(data.map);
    this.name = ko.observable(data.info.name);
    // this.info = ko.observableArray(data.info);
}

// model/datas for the places on map
var places = [
        {
            name: 'Glacier Point',
            address: 'Glacier Point Rd, Yosemite Valley, CA 95389',
            lat: 37.730424,
            long: -119.573650,
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Glacier_Point_Trail_Hike_59152/'
        },
        {
            name: 'Half Dome',
            address: 'Yosemite Valley, CA 95389',
            lat: 37.745919,
            long: -119.533199,
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Top_of_Half_Dome_Hike_54302/'
        },
        {
            name: 'Tuolumne Meadows',
            address: 'Tioga Rd, Yosemite Valley, CA 95389',
            lat: 37.871206,
            long: -119.357716,
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Tuolumne_Meadows_26248/'
        },
        {
            name: 'Mist Trail and Vernal Fall',
            address: 'Mist Trail, California 95389',
            lat: 37.726498,
            long: -119.539999,
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Mist_Trail_and_Vernal_Falls_59154/'
        },
        {
            name: 'Ansel Adams Gallery',
            address: '9031 Village Dr, YOSEMITE NATIONAL PARK, CA 95389',
            lat: 37.748544,
            long: -119.586838,
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Ansel_Adams_Gallery_61126/'
        },
        {
            name: 'Horsetail Fall',
            address: 'Horsetail Fall, Yosemite National Park, California, USA',
            lat: 37.729124,
            long: -119.628476,
            link: 'https://en.wikipedia.org/wiki/Horsetail_Fall_(Yosemite)'
        },
        {
            name: 'Tenaya Lake',
            address: 'Yosemite National Park, Tioga Rd, California 95389',
            lat: 37.831851,
            long: -119.460007,
            link: 'https://www.nps.gov/yose/planyourvisit/lakes.htm'
        }
]

// var map;

function toggleBounce(marker) {
  // Google map documentation shows to keep one "=" instead of two. Does not work with "=="
  if (marker.setAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
  }, 1400);
  }
}


function ViewModel() {

    var self = this;
    var $greeting = $('#greeting');
    var $ab = $('#printinput');
    var $wikiElem = $('#wikipedia-links');
    var placeInput = document.getElementById('place');
    placeList = ko.observableArray([]);
    this.query = ko.observable("");
    placewiki = ko.observable("");


    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(37.76962919, -119.49417114),
    //   this style is to change look/colors of map
    styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
    ],
        });

    var markys = ko.observableArray([]);

    // function to perform task when click on the marker or list name
    function listen(place_info) {
        var infowindow = new google.maps.InfoWindow({
              content: place_info.info.name
            });
        google.maps.event.addListener(place_info, 'click', function() {
            toggleBounce(place_info);
            $greeting.text(place_info.info.name);
            infowindow.open(map, place_info);
            setTimeout(function () { infowindow.close(); }, 5000);
            wikiapi(place_info.info.name);
        });
    }

    function listeny(place_info) {
        var infowindow = new google.maps.InfoWindow({
              content: place_info.info.name
            });
            toggleBounce(place_info);
            $greeting.text(place_info.info.name);
            infowindow.open(map, place_info);
            setTimeout(function () { infowindow.close(); }, 5000);
    }

    // function to add marker
    function addMarker(place, i) {
        markys()[i] = new google.maps.Marker({
            position: {lat: place.lat, lng: place.long},
            animation: google.maps.Animation.DROP,
            map: map,
            info: place,
        });
        listen(markys()[i]);
    }

    // looping through all my data to get lat and long of those
    var i = 0;
    for (i; i < places.length; i++) {
        var placee = places[i];
        addMarker(placee, i);
    }

    i = 0;
    // initial list of places
    for (i; i < markys().length; i++) {
        placeList.push(new placeMark(markys()[i], i));
    }

    // list of places.. should update based on search
    this.finalList = ko.computed( function() {
        var searchy = self.query().toLowerCase();
        placeList.removeAll();
        if (!searchy) {
            i = 0;
            for (i; i < markys().length; i++) {
                // placeList()[i].visible = false;
                placeList.push(new placeMark(markys()[i], i));
                // alert(placeList()[i].name);
            }
            return placeList();
        } else {
            i = 0;
            $ab.text(searchy);
            for (i; i < markys().length; i++) {
                var base_str = markys()[i].info.name;

                if(base_str.toLowerCase().indexOf(searchy) >= 0){
                    placeList.push(new placeMark(markys()[i], i));
                }
            }
            return placeList();
        }
    }, self);

    this.itemClicked = function(data) {
        // alert(event.target.id);
        var clickedItemID = event.target.id;
        listeny(markys()[clickedItemID]);
        placewiki(markys()[clickedItemID].info.name);
        wikiapi(placewiki());
            // self.currentDog(data);
    }

    // 3rd party API implmentation. Wikipedia API
    function wikiapi(placewiki){
        $wikiElem.empty();
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + placewiki +'&format=json&callback=wikiCallback';
        var wikiRequestTimeout = setTimeout(function(){
            $wikiElem.text("failed to get wikipedia resources!");
        }, 8000);

        $.ajax({
            url:wikiUrl,
            dataType: "jsonp",
            // jsonp: "callback",
            success: function(response) {
                var articlesList = response[1];
                var articleNum;

                // limiting wikipedia links
                if (articlesList.length > 2){
                    articleNum = 2;
                } else {
                    articleNum = articlesList.length;
                }

                for (var i = 0; i < articleNum; i++){
                    articleStr = articlesList[i];
                    var url = 'http://en.wikipedia.org/wiki/'+articleStr;
                    $wikiElem.append('<li><a href="'+ url +'" style="text-decoration:none">' + articleStr + '</a></li>');
                };

                clearTimeout(wikiRequestTimeout);
            }
        });
    }

    // reference: http://stackoverflow.com/questions/21318897/how-to-disable-enter-key-in-html-form
    // when enter key is press, submit should not be called
    $('input').on('keydown', function(event) {
        var x = event.which;
        if (x === 13) {
            event.preventDefault();
        }
    });

};

// this is to call when application starts
function start() {
	ko.applyBindings(new ViewModel());
}
