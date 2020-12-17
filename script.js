//const and var list
const searchCity = $("#search-city");
const searchButton = $("#search-button");
const clearButton = $("#clear-button");
const presentCity = $("#present-city");
const presentTemperature = $("#temperature");
const humidty= $("#humidity");
const windSpeed=$("#wind-speed");
const uvIndex= $("#uv-index");
const APIKey="afb6532892a9434a7de4da566251a643";
const hList = $(".list-group")

var city="";
var cityArray=[];
var d = new Date();
var year = d.getFullYear()
var month = d.getMonth()+1;
var day = d.getDate();
var date=  day + "." + month+ "." + year


// looks for duplicates
function find(cities){
    for (var i = 0; i<cityArray.length; i++){
        if(cities.toUpperCase()===cityArray[i]){
            return -1;
        }}
    return 1;
}
// saves users search input
function displayWeather(event){
    event.preventDefault();
    if(searchCity.val()!==""){
        city=searchCity.val();
        presenttWeather(city);
    }
}

// gets info from API
function presentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";

        $(presentCity).html(response.name +"("+date+")" + "<img src="+iconurl+">");
        var tempC = (response.main.temp - 273.15);
   
        $(presentTemperature).html(" " + tempC.toFixed(2) + " Celsius");
        
        $(humidty).html(" " +response.main.humidity+"%");
       
        var responsWindSpeed=response.wind.speed;
        var winds=responsWindSpeed;
        $(windSpeed).html(" " + winds + "m/s");

        UVIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            cityArray=JSON.parse(localStorage.getItem("cityname"));
            if (cityArray==null){
                cityArray=[];
                cityArray.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(cityArray));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    cityArray.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(cityArray));
                    addToList(city);
                }}}
            });
}
// gets info from API
function UVIndex(ln,lt){
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $(uvIndex).html(" " +response.value);
                $(uvIndex).css("background-color", "red")
            });
}
// gets info from API 
function forecast(cityid){
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        console.log(response);
        
        for (i=0;i<6;i++){
            var iconcode= response.list[i].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempK= response.list[i].main.temp;
            var tempC=(tempK-273.5);
            var humidity= response.list[i].main.humidity;
            var fDays=parseInt(day + i)
       
            $("#fDate"+i).html(" " + fDays +"." + month);
            $("#fImg"+i).html("<img src="+iconurl+">");
            $("#fTemp"+i).html(tempC.toFixed(2));
            $("#fHumidity"+i).html(humidity+"%");
        }
    });
}
// prepend the last search list
function addToList(c){
    var listH= $("<li>"+c.toUpperCase()+"</li>");
    $(listH).attr("class","list-group-item");
    $(listH).attr("data-value",c.toUpperCase());
    $(hList).prepend(listH);
}
// makes last search list useful
function getPastSearch(event){
    var target=event.target;
    if (event.target.matches("li")){
        city=target.textContent.trim();
        presentWeather(city);
    }
}
// loads on startup
function loadlastCity(){
    $("ul").empty();
    var cityArray = JSON.parse(localStorage.getItem("cityname"));
    if(cityArray!==null){
        cityArray=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<cityArray.length;i++){
            addToList(cityArray[i]);
        }
        city=cityArray[i-1];
        presentWeather(city);
    }
}
// not working yet, should clear everything
function clearHistory(event){
    event.preventDefault();
    city=""
    cityArray=[];
    localStorage.empty();
    $(hList).empty()
}


loadlastCity()
$("#search-button").on("click",displayWeather);
$(document).on("click",getPastSearch);
$("#clear-history").on("click",clearHistory);

