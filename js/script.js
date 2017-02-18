var place = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.link = ko.observable(data.link);
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

var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: new google.maps.LatLng(37.865101, -119.538329),
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

        // function to add marker
        function addMarker(latty, longy) {
          var marker = new google.maps.Marker({
            position: {lat: latty, lng: longy},
            animation: google.maps.Animation.DROP,
            map: map,
            title: 'Yosmite'
          });
        }

        // looping through all my data to get lat and long of those
        var i = 1;
        for (i; i < places.length; i++) {
            var placee = places[i];
            addMarker(placee.lat, placee.long);
        }
        google.maps.event.addListener(addMarker, 'click', toggleBounce());
}

function toggleBounce() {
  if (addMarker.getAnimation() !== null) {
    addMarker.setAnimation(null);
  } else {
    addMarker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


var ViewModel = function() {
    var self = this;

    this.placeList = ko.observableArray([]);

    places.forEach(function(placeItem){
        self.placeList.push(new place(placeItem));
    });

    this.currentPlace = ko.observable( this.placeList()[0] );
    // this.incrementCounter = function() {
    //     self.currentPlace().ClickCount(self.currentDog().ClickCount() +1);
    // };

    this.itemClicked = function(data) {
            self.currentPlace(data);
            // alert(self.currentPlace().name());
            // animateMarker(self.currentPlace().lat, self.currentPlace().long);
            toggleBounce();
    }
};

ko.applyBindings(new ViewModel());
