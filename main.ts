/*
key = 210880fe295c40c4ba3153425190506
url = http://api.apixu.com/v1/current.json?key=210880fe295c40c4ba3153425190506&q=moscow
* */

let input: any = document.querySelector('form');
let zone: any = document.querySelector('.zone');
let temp: any = document.querySelector('.temperature');
let icon: any = document.querySelector('.temperature-icon');
let desc: any = document.querySelector('.descr-weather');
let btn: any = document.querySelector('.button');
let display: any = document.querySelector('.out');
let out: any = '';




document.addEventListener('DOMContentLoaded', getWeather);

function getWeather(){

    input.onsubmit = (e) => {
        e.preventDefault();
        let city: string = (<HTMLInputElement>document.querySelector('#city')).value;
        if (city.length >= 2) {
            //console.log(city);

            let api: string = `http://api.apixu.com/v1/current.json?key=210880fe295c40c4ba3153425190506&q=${city}`;

            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                    const location = data.location.name;
                    const temperature = data.current.temp_c;
                    const iconweather = data.current.condition.icon;
                    const description = data.current.condition.text;
                    //console.log(temperature);
                    //console.log(icon);
                    //console.log(location);
                    zone.innerHTML = location;
                    temp.innerHTML = temperature + ' C';
                    icon.style.display = 'block';
                    icon.src = iconweather;
                    desc.innerHTML = description;

                }).catch((error) => console.log(error));
        } else {
            alert('Введите город');
        }
    }

};

btn.onclick = (e) => {

    let city: string = (<HTMLInputElement>document.querySelector('#city')).value;
    let api: string = `http://api.apixu.com/v1/forecast.json?key=210880fe295c40c4ba3153425190506&q=${city}&days=7`;
    if (city.length >= 2) {
        city = (<HTMLInputElement>document.querySelector('#city')).value;
        fetch(api)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                out = '';
                // console.log(data['forecast']['forecastday'][0]); //прогноз на день


                data['forecast']['forecastday'].forEach((elem) => {
                    //console.log(elem.date);
                    //console.log( dat
                    // a['forecast']['forecastday'].length); //длина массива
                    out += `
                    <div class="weather-section">
                        <div class="date">${elem.date}</div>
                        <div class="temperature">Температура ${elem.day.maxtemp_c} C</div>
                        <img class="temperature-icon" style="display:block" alt="weather-icon" src="https://${elem.day.condition.icon}"/>
                        <div class="descr-weather">${elem.day.condition.text}</div>
                    </div>
            `

                })


            });
        display.innerHTML = out;
    }else{
        alert('Введите город');
    }
}


