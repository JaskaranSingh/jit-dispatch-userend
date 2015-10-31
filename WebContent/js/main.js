var map = null;
function initialize() {
    var mapCanvas = document.getElementById('map');
		myLatLng = {lat: 17.440091, lng: 78.380193};
        var mapOptions = {
          center: myLatLng,
          zoom: 1,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(mapCanvas, mapOptions);		
    //		var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/man.png';
	//		var marker = new google.maps.Marker({
	//		  position: myLatLng,
	//		  map: map,
	//		  title: "Your Location",
	//		});
      }
$("document").ready(function(){
  initialize();
});

function getTech(){
  var custId = 2;
  var selectedType = document.getElementById("select-type").value;
  if(selectedType == ""){
    alert("Please select appropriate option");
  }
  else{
    // Using the core $.ajax() method
      $.ajax({
       
          // The URL for the request
          url: "http://113.128.164.168:8090/JITDispatch/Customer_Server",
       
          // The data to send (will be converted to a query string)
          data: {
              custID: custId,
              type: selectedType,
              format: "json",
              
          },
       
          // Whether this is a POST or GET request
          type: "GET",
          crossDomain:true,
          // The type of data we expect back
          dataType : 'jsonp',
          jsonp : false,
          jsonpcallback: 'callbackForTechSupport',

       
          // Code to run if the request succeeds;
          // the response is passed to the function
          
       
          // Code to run if the request fails; the raw request and
          // status codes are passed to the function
          error: function( xhr, status, errorThrown ) {
//              alert( "Sorry, there was a problem!" );
              console.log( "Error: " + errorThrown );
              console.log( "Status: " + status );
              console.dir( xhr );
          },
       
          // Code to run regardless of success or failure
          complete: function( xhr, status ) {
              alert( "The request is complete!" );
          }
      });
  }

}
function callbackForTechSupport(data){
	var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/man.png';
	LatLng = {lat: data[0].CustomerLat, lng: data[0].CustomerLng};
	var marker = new google.maps.Marker({
	  position: LatLng,
	  map: map,
	  title: "Your Location",
	})
	
	
	map.panTo(marker.getPosition());
	smoothZoom(map, 14, map.getZoom());
	if(data.length >1) {
		for(var i =1;i<data.length;i++)
		{
			LatLng = {lat:data[i].techLat,lng:data[i].techLng};
			console.log(LatLng.lat);
			console.log(map);
			var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/man.png';
			var icon = {
				    url: "http://maps.google.com/mapfiles/kml/shapes/man.png", // url
				    scaledSize: new google.maps.Size(40, 40), // scaled size
				    origin: new google.maps.Point(0,0), // origin
				    anchor: new google.maps.Point(0, 0) // anchor
				};
			var marker = new google.maps.Marker({
				  position: LatLng,
				  map: map,
				  title: "Technician",
				  icon: icon,
				  size: new google.maps.Size(22, 32)
				});
			marker.addListener('click', function() {
			    popUp();
			  })
		}
	}
	
}
//the smooth zoom function
function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
            return;
        }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 60); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
} 

function popUp(){
    
	
	$('<div "></div>').appendTo('body')
	  .html('<div "><h6>Yes or No?</h6></div>')
	  .dialog({
	      modal: true, title: 'Confirmation', zIndex: 10000, autoOpen: true,
	      width: '200px', resizable: false,
	      buttons: {
	          Yes: function () {
//	              doFunctionForYes();
	              $(this).dialog("close");
	          },
	          No: function () {
//	              doFunctionForNo();
	              $(this).dialog("close");
	          }
	      },
	      close: function (event, ui) {
	          $(this).remove();
	      }
	});
		
}

