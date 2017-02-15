var countries = [];


var makeRequest = function(url, callback) {

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();



}


var requestComplete = function() {

  if(this.status !== 200) return;
    var jsonString = this.responseText;
    countries = JSON.parse(jsonString);
    var country = countries[45];

    populateList(countries);


  }

  // var listerButton = function(){
  //   var button = document.getElementById('allButton')
  //   button.onclick = populateList();
  // }

var populateList = function(countries) {

  var selectCountry;
  var selectedCountry = document.getElementById('selectCountry');
  
  if (localStorage.getItem("currentCountry") !== null) {
    var countryObject = localStorage.getItem("currentCountry");
    selectedCountry = JSON.parse(countryObject);
    
    
  }

  var select = document.getElementById('selectCountry');

  for (country of countries) {
    var eachOption = document.createElement('option')
    eachOption.innerText = country.name;
    if (country.name === selectedCountry.name){
      eachOption.selected = "selected"
    }
    select.appendChild(eachOption)
  }


  // countries.forEach(function(country) {
  //   var eachOption = document.createElement('option')
  //   eachOption.innerText = country.name;

  //   select.appendChild(eachOption)
  // })
}

var onSelectClick = function(){
  var url = "https://restcountries.eu/rest/v1";
  makeRequest(url, requestComplete);
}

var onShowInfoClick = function(){

  var url = "https://restcountries.eu/rest/v1";
  var countrySelected = document.getElementById('selectCountry')
  var countryName = countrySelected.options[countrySelected.selectedIndex].innerText //look up dropdown, list all option, find the indexes, display inner text of one selected.


  var div = document.getElementById('info')

  var paragraph = document.createElement('p');
  // paragraph.clear();
  var capital = function()
  {
  for (country of countries)
    {
    if (country.name === countryName){
      var stringifiedCountry = JSON.stringify(country)
      localStorage.setItem("currentCountry", stringifiedCountry);
      return "Name: " + country.name + "<br />Capital: " + country.capital + "<br />Population: " + country.population;
      }
      
    }
  }



  paragraph.innerHTML = capital();
  div.removeChild(div.firstChild);
  div.appendChild(paragraph);
  //console.log(countries[0].name)

  


// makeRequest(url, );

//   if(this.status !== 200) return;
//     var jsonString = this.responseText;
//     var countries = JSON.parse(jsonString);
//     var country = countries[];


//   console.log(countryName)
  
}

var app = function(){


  var select = document.getElementById('selectCountry')
  onSelectClick();
  var button = document.getElementById('country-selected');
  button.onclick = onShowInfoClick;

  // if (localStorage =! null) {
  //   var select = localStorage.getItem("currentCountry");
  //  onSelectClick();
  // }
  // else{
  //   onSelectClick();
  // }



}

window.onload = app;