const userLocation = {
  lat: 0,
  long: 0
};

if ('geolocation' in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
    userLocation.lat = position.coords.latitude;
    userLocation.long = position.coords.longitude;
    console.log('userLocation is: ', userLocation);
  });
} else {
  /* geolocation IS NOT available */
  console.log('userLocation is not available');
}
