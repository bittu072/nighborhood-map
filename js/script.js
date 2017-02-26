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

// var map;
// function initMap() {

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
    var placeStr = $('#place').val();
    // var $greeting = $('#greeting');
    var self = this;
    this.placeList = ko.observableArray([]);
    this.currentPlace = ko.observable( this.placeList()[0] );

    // places.forEach(function(placeItem){
    //     self.placeList.push(new place(placeItem));
    // });

    var $greeting = $('#greeting');
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(37.865101, -119.538329),
    //   this style is to change look/colors of map
        });

    var markys = ko.observableArray([]);
    var selectedPlace = ko.observable();
    var c = ko.observable();

    function listen(place_info) {
        var infowindow = new google.maps.InfoWindow({
              content: place_info.name +": " + place_info.link.name
            });
        google.maps.event.addListener(place_info, 'click', function() {
            toggleBounce(place_info);
            selectedPlace(place_info);
            // self.currentPlace(markys()[i]);
            // alert(selectedPlace().name);
            $greeting.text(selectedPlace().name);
            infowindow.open(map, selectedPlace());
        });
    }



    // function to add marker
    function addMarker(place, i) {
        markys()[i] = new google.maps.Marker({
            position: {lat: place.lat, lng: place.long},
            animation: google.maps.Animation.DROP,
            map: map,
            name: place.name,
            link: place,
        });
        $("#list").append("<li id="+i+">"+markys()[i].name+"</li><br>");


        listen(markys()[i]);
    }

    // looping through all my data to get lat and long of those
    var i = 0;
    for (i; i < places.length; i++) {
        var placee = places[i];
        addMarker(placee, i);
        // self.placeList.push(new place(placee));
    }

    // this.itemClicked = function(data) {
    //         self.currentPlace(data);
    //         alert(currentPlace().name);
    //
    // }
    // var infowindow = new google.maps.InfoWindow({
    //     content: "abcd"
    // });

};

// ko.applyBindings(new ViewModel());
