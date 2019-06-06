/*
key = 210880fe295c40c4ba3153425190506
url = http://api.apixu.com/v1/current.json?key=210880fe295c40c4ba3153425190506&q=moscow
* */
var input = document.querySelector('form');
var zone = document.querySelector('.zone');
var temp = document.querySelector('.temperature');
var icon = document.querySelector('.temperature-icon');
var desc = document.querySelector('.descr-weather');
var btn = document.querySelector('.button');
var display = document.querySelector('.out');
var out = '';
document.addEventListener('DOMContentLoaded', getWeather);
function getWeather() {
    input.onsubmit = function (e) {
        e.preventDefault();
        var city = document.querySelector('#city').value;
        if (city.length >= 2) {
            //console.log(city);
            var api = "http://api.apixu.com/v1/current.json?key=210880fe295c40c4ba3153425190506&q=" + city;
            fetch(api)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                //console.log(data);
                var location = data.location.name;
                var temperature = data.current.temp_c;
                var iconweather = data.current.condition.icon;
                var description = data.current.condition.text;
                //console.log(temperature);
                //console.log(icon);
                //console.log(location);
                zone.innerHTML = location;
                temp.innerHTML = temperature + ' C';
                icon.style.display = 'block';
                icon.src = iconweather;
                desc.innerHTML = description;
            })["catch"](function (error) { return console.log(error); });
        }
        else {
            alert('Введите город');
        }
    };
}
;
btn.onclick = function (e) {
    var city = document.querySelector('#city').value;
    var api = "http://api.apixu.com/v1/forecast.json?key=210880fe295c40c4ba3153425190506&q=" + city + "&days=7";
    if (city.length >= 2) {
        city = document.querySelector('#city').value;
        fetch(api)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            out = '';
            // console.log(data['forecast']['forecastday'][0]); //прогноз на день
            data['forecast']['forecastday'].forEach(function (elem) {
                //console.log(elem.date);
                //console.log( dat
                // a['forecast']['forecastday'].length); //длина массива
                out += "\n                    <div class=\"weather-section\">\n                        <div class=\"date\">" + elem.date + "</div>\n                        <div class=\"temperature\">\u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 " + elem.day.maxtemp_c + " C</div>\n                        <img class=\"temperature-icon\" style=\"display:block\" alt=\"weather-icon\" src=\"https://" + elem.day.condition.icon + "\"/>\n                        <div class=\"descr-weather\">" + elem.day.condition.text + "</div>\n                    </div>\n            ";
            });
        });
        display.innerHTML = out;
    }
    else {
        alert('Введите город');
    }
};
