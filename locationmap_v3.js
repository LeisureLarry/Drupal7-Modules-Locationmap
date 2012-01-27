(function($){
    var mapType = google.maps.MapTypeId.ROADMAP;
    switch(Drupal.settings.locationmap.type) {
     case 'SATELLITE' : mapType = google.maps.MapTypeId.SATELLITE; break;
     case 'HYBRID' : mapType = google.maps.MapTypeId.HYBRID; break;
     case 'TERRAIN' : mapType = google.maps.MapTypeId.TERRAIN; break;
     default : ;
    }    
    
    var target_point = new google.maps.LatLng(Drupal.settings.locationmap.lat, Drupal.settings.locationmap.lng);
    /**
     *   
  var myOptions = {
    zoom: parseInt(Drupal.settings.locationmap.zoom),
    center: target_point,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: mapType,
    panControl: boolean,
    zoomControl: boolean,
    mapTypeControl: boolean,
    scaleControl: boolean,
    streetViewControl: boolean,
    overviewMapControl: boolean
    };
     */         
    var myOptions = {
     zoom: parseInt(Drupal.settings.locationmap.zoom),
     center: target_point,
     mapTypeControl: true,
     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
     navigationControl: true,
     navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
     mapTypeId: mapType 
    };  
   var map = new google.maps.Map(document.getElementById("locationmap_map"), myOptions);
   var admin = Drupal.settings.locationmap.admin;
   var description = Drupal.settings.locationmap.info;
   //var address = Drupal.settings.locationmap.address;

   /**
    * mytitle shouldnot be hardcoded, it should be text (inputed in administration) 
    */       
   var mytitle = 'Company office';
   var mycontent = "<div>" + description + "</div>";

   var infowindow = new google.maps.InfoWindow({
        content: mycontent
    });
   
   var marker = new google.maps.Marker({
        position: target_point,
        map: map,
        title: mytitle,
        draggable: (admin == true)
    });

    infowindow.open(map,marker);
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });   
    
    if (admin) {
	  google.maps.event.addListener(marker, "dragstart", function() {
	    infowindow.close();
	  });
    google.maps.event.addListener(marker, "dragend", function() {
      infowindow.open(map,marker);
		  latlng = marker.position;
		  $('#edit-locationmap-lat').val(latlng.lat());
	    $('#edit-locationmap-lng').val(latlng.lng());
      });
      /**
       * setting zoom from map ainot working becouse gmap api3 does not have any function to get actual zoom
       * it should be calculated somehow       
       */             
	  google.maps.event.addListener(map, "zoomend", function() {
	    $('#edit-locationmap-zoom').val(map.zoom);
	  });
    };    
})(jQuery);