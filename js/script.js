// function loadData() {
//     var $mapplaceElem = $('#mapplace');
//     var cityStr = $('#city').val();
//     var mapviewUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAVPz6x8WGP1jhFxAqoeU-tE43ZPZl6n4o&q=' + cityStr;
//     var tagmap = '<iframe width="600" height="450" frameborder="0" style="border:0" src="' +mapviewUrl + '" allowfullscreen></iframe>';
//     // alert(tagmap);
//     // $("#mapplace").append(tagmap);
//     // $("#mapplace").replaceWith(tagmap);
//     // $( "p" ).append( "<p>Test</p>" );
// };
//
// $("#submit-btn").click(loadData())
// $('#form-container').click(loadData);


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
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Glacier_Point_Trail_Hike_59152/'
        },
        {
            name: 'Half Dome',
            address: 'Yosemite Valley, CA 95389',
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Top_of_Half_Dome_Hike_54302/'
        },
        {
            name: 'Tuolumne Meadows',
            address: 'Tioga Rd, Yosemite Valley, CA 95389',
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Tuolumne_Meadows_26248/'
        },
        {
            name: 'Mist Trail and Vernal Fall',
            address: 'Mist Trail, California 95389',
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Mist_Trail_and_Vernal_Falls_59154/'
        },
        {
            name: 'Ansel Adams Gallery',
            address: '9031 Village Dr, YOSEMITE NATIONAL PARK, CA 95389',
            link: 'http://travel.usnews.com/Yosemite_CA/Things_To_Do/Ansel_Adams_Gallery_61126/'
        },
        {
            name: 'Horsetail Fall',
            address: 'Horsetail Fall, Yosemite National Park, California, USA',
            link: 'https://en.wikipedia.org/wiki/Horsetail_Fall_(Yosemite)'
        },
        {
            name: 'Tenaya Lake',
            address: 'Yosemite National Park, Tioga Rd, California 95389',
            link: 'https://www.nps.gov/yose/planyourvisit/lakes.htm'
        }
]


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
    }
};

ko.applyBindings(new ViewModel());
