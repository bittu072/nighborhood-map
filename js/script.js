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
    var placeInput = document.getElementById('place');
    // var place = document.getElementById("place").value;
    // var placeStr = ko.observable();
    // alert(placeStr);
    // var $greeting = $('#greeting');
    // var place = ko.observable("");
    var self = this;
    placeList = ko.observableArray([]);
    // this.currentPlace = ko.observable( this.placeList()[0] );

    var $greeting = $('#greeting');
    var $ab = $('#printinput');
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(37.865101, -119.538329),
    //   this style is to change look/colors of map
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
        // $("#list").append("<li id="+i+">"+markys()[i].info.name+"</li><br>");
        // var str_list="<li id="+i+">"+markys()[i].info.name+"</li><br>";
        // placeList()[i] = str_list;
        // $("#list").append(this.placeList());

        listen(markys()[i]);
    }

    // looping through all my data to get lat and long of those
    var i = 0;
    for (i; i < places.length; i++) {
        var placee = places[i];
        addMarker(placee, i);
    }

    i = 0;
    var query = ko.observable();

    // markys().forEach(function(marky) {
    //     placeList.push(new placeMark(marky));
    // });

    i=0;
    for (i; i < markys().length; i++) {
        // alert(placeList()[i].name);
        placeList.push(new placeMark(markys()[i], i));
        // alert(markys()[i].info.name);
    }


    // function search(value) {
    // // remove all the current beers, which removes them from the view
    // placeList.removeAll();
    // var x=0
    // for (x; x < markys().length; x++) {
    //     // alert("this is x: "+x);
    //     if(markys()[x].info.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
    //         placeList().push(new placeMark(markys()[x].info));
    //         $ab.text(markys()[x].info.name)
    //         // alert(markys()[x].info.name);
    //         }
    //     }
    // }
    //
    // placeInput.onkeyup = function(){
    //     search(placeInput.value);
    // }
    // if (placeInput==null || placeInput==""){
    //     placeList.removeAll();
    //     for (i; i < markys().length; i++) {
    //         placeList().push(new placeMark(markys()[x].info));
    //     }
    // }

    // placeInput.onkeyup = function(){
    //     // document.getElementById('printchatbox').innerHTML = placeInput.value;
    //     placeStr(placeInput.value);
    //
    //     //
    //     // for (i; i < places.length; i++) {
    //     //     $("#list").append("<li id="+i+">"+markys()[i].info.name+"</li><br>");
    //     //
    //     // }
    //     if (placeStr()){
    //
    //         // for (i; i < places.length; i++) {
    //             var placeTemp = markys()[i].info.name;
    //             var n = placeTemp.search(placeStr());
    //             // $ab.text(n);
    //             if (n >= 0){
    //                 // $ab.text("abcd "+placeStr());
    //                 $("#list").append("<li id="+i+">"+markys()[i].info.name+"</li><br>");
    //             }
    //         // $("#list").append("<li id="+i+">"+markys()[0].info.name+"</li><br>");
    //         // }
    //     }
    //     else {
    //             // $ab.text("abcd ");
    //             for (i; i < places.length; i++) {
    //                 $("#list").append("<li id="+i+">"+markys()[i].info.name+"</li><br>");
    //
    //             }
    //     }
    // }






    // for (i; i < places.length; i++) {
    //     $("#list").append("<li id="+i+">"+markys()[i].info.name+"</li><br>");
    //
    // }

    // this.itemClicked = function(data) {
    //     alert("abcd");
    //     alert(data.name);
    // }

    this.itemClicked = function(data) {
        // alert(event.target.id);
        var clickedItemID = event.target.id;
        listeny(markys()[clickedItemID]);
            // self.currentDog(data);
    }

    // $("li").click(function() {
    //     alert(event.target.id);
    //    var clickedItemID = event.target.id;
    //    listeny(markys()[clickedItemID]);
    // });


};

function startApp() {
	ko.applyBindings(new ViewModel());
}
