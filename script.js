$(document).ready(() => {
  let url = "",
      urlBase = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?",
      api = "&appid=7dd813783fb9e52fba48ee9b02a4caa7"
  
  $('#Search').fadeIn('slow');
  
  //  Grabs json file from weather application
  const getAsyncData = (url, callback) => {
    $.ajax({
      url: url,
      dataType:'json',
      success: callback,
      //  If an error occurs due to an invalid query, web app updates with error
      error: function (err) {
        $('#City').html('Invalid Inquiry');
        $('#City').fadeIn('slow');
      }
    });
  }
  
  //  Takes json file and updates web app
  const result = (json) => {
    let weatherType = json.weather[0].description,
        tempK = json.main.temp,
        tempF = ((9 * tempK) / 5) - 459.67,
        tempC = tempK - 273,
        city = json.name,
        changeTemp = false;
    
    //  Event handler that switches temperature from F to C and vice-versa
    $('#Temp').on('click', () => {
      if (changeTemp) {
        $('#Temp').html(Math.round(tempF) + '&deg;F');
        changeTemp = false;
      } else {
        $('#Temp').html(Math.round(tempC) + '&deg;C');
        changeTemp = true;
      }
    });
    
    
    //  Selection structure that outputs icon based on temperature
    if (tempF >= 80) {
      $('img').attr('src', 'assets/sunny_castform.png')
    } else if (tempF <= 40) {
      $('img').attr('src', 'assets/snowy_castform.png')
    } else {
      $('img').attr('src', 'assets/regular_castform.png')
    }
    
    //  Update html with data from json
    $('#Weather').html(weatherType.substring(0, 15));
    $('#Temp').html(Math.round(tempF) + '&deg;F');
    $('#City').html(city);
    $('.info').fadeIn('slow');
    $('#Pkmn').fadeIn('slow');
    $('#Ball').fadeOut('slow');
  }
  
  //  Event handler that takes search query and 
  $('#Search').on('keypress', (e) => {
    if (e.which==13 && $('#Search').val() !== '') {
      
      //  Animation
      $('#Ball').fadeIn('fast');
      $('.info').fadeOut('fast');
      $('#Ball').animate({ borderSpacing: -360 }, {
        step: function(now, fx) {
          $(this).css('transform','rotate(' + now + 'deg)');
        },
        duration: '100'
      },'linear');
      
      //  Update url
      let city = $('#Search').val();
      url = urlBase + "q=" + city + api;
      
      //  Get json based on query and update web app
      getAsyncData(url, result);
      $('#Search').val('');
    }
  });
  
  //  If user allows browser location, app updates based on approximate user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let long = position.coords.longitude,
          lat = position.coords.latitude;
      url = urlBase + 'lat=' + lat + '&lon=' + long + api;
      
      $('#Ball').fadeIn('fast');
      $('.info').fadeOut('fast');
      $('#Ball').animate({ borderSpacing: -360 }, {
        step: function(now, fx) {
          $(this).css('transform','rotate(' + now + 'deg)');
        },
        duration: '100'
      },'linear');
      getAsyncData(url, result);
    });
  }
});
