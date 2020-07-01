
var map;
var markers = [];
var infoWindow;
function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 8,
        styles: googlemapstyle
    });
    infoWindow = new google.maps.InfoWindow();
    displayStores()
    showStoresMarkers()
}

function displayStores() {
    var storesHtml = "";
    stores.forEach(function(store, index){
        var address = store.addressLines;
        var phone = store.phoneNumber;
        storesHtml += `
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-adress">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
            </div>
        `
    });
    document.querySelector('.stores-list').innerHTML=storesHtml
}

function showStoresMarkers() {
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        var name = store.name;
        var address = store.addressLines[0];
        var schedule = store.openStatusText;
        var phoneNumber = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, schedule, phoneNumber)
    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, schedule, phoneNumber) {
    var html = "<b>" + name + "</b> <br/>" + schedule + "<br/>" + address + "<br/>" + phoneNumber;
    //var iconBase = 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png';
    var pinIcon = new google.maps.MarkerImage(
        "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(30,45)
    );  
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        icon: pinIcon,
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
   }

   
 