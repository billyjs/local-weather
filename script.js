var apikey = "e5a7c524d3fa9da7dd03cce3911b8a48"; // it's just a free key to darksky.net
var temperature = 0;
var options = {
    metric: true,
    github: "https://www.github.com/billy-7",
    linkedin: "https://www.linkedin.com/in/billyschulze"
};

function showTemp(val, metric) {
    temperature = val;
    var units = ["°F", "°C"];
    $(".units-tab").text(units[!options.metric * 1]);
    $("#units").text(units[options.metric * 1]);
    var temp = metric ? val : c2f(val);
    $("#temp").text(parseInt(temp));

    function c2f(val) {
        return 32 + val * 9/5;
    }
}

function error() {
    console.log("error");
}

function showWeather(weather) {
    showTemp(weather.currently.temperature, options.metric);
    $("#cloud").text("Cloud: " + weather.currently.cloudCover*100 + "%");
    $("#humidity").text("Humidity: " + weather.currently.humidity*100  + "%");
    $("#wind").text("Wind: " + weather.currently.windSpeed  + "m/s");
    $("#desc").text(weather.currently.summary);
    $(".weather-type i").removeClass().addClass("wi wi-forecast-io-" + weather.currently.icon);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (location) {
            var lat = location.coords.latitude;
            var lon = location.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeather(lat, lon) {
    var url = "https://api.darksky.net/forecast/" + apikey + "/" + lat + "," + lon +
        "?units=si&exclude=minutely,hourly,daily,alerts,flags&callback=?";
    $.getJSON({
        url: url,
        success: showWeather,
        error: error,
        cache: true
    });
}

function changeUnits() {
    options.metric = !options.metric;
    showTemp(temperature, options.metric);
}

function github() {
    window.open(options.github);
}

function linkedin() {
    window.open(options.linkedin);
}


$(function() {
    getLocation();
    $(".units-tab").click(changeUnits);
    $(".github-tab").click(github);
    $(".linkedin-tab").click(linkedin);
});