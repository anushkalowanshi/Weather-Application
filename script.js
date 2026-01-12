// const weatherApi={
//     key:828cc99e033
// }
const txtInput = document.getElementById("input-box");
const btnWeather = document.getElementById("button");

const hTemp = document.getElementById("temp");
const hCity = document.getElementById("city");

const divWeatherBody = document.getElementById("weather-body");
const divErrorMessage = document.getElementById("error-message");

const pDate  = document.getElementById("date");
const pMinMax = document.getElementById("min-max");
const pWeather = document.getElementById("weather");
const pHumidity = document.getElementById("humidity");
const pWind = document.getElementById("wind");
const pPressure = document.getElementById("pressure");

txtInput.addEventListener("keypress",async(event)=>{
    if(event.key==="Enter"){
        getWeatherReport(event.target.value)
    }
});
btnWeather.addEventListener("click",async()=>{
        getWeatherReport(txtInput.value)
    }
);
async function getWeatherReport(city) {
    try{ 
        const response=await fetch (`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
        );
        if(!response.ok){
            throw 
        }
        const data=await response.json();
        showWeatherReport(data);
        divWeatherBody.classList.remove("d-none")
        divErrorMessage.classList.add("d-none");
    }
    catch(error){
            console.log(`error:${error}`);
             divWeatherBody.classList.add("d-none")
             divErrorMessage.classList.remove("d-none");
             clearWeatherDisplay();
    }
}
function showWeatherReport(weather){
    hCity.innerText=`${weather.name},${weather.sys.country}`;
    pDate.innerText=formatDate(new Date());
    hTemp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;
    pMinMax.innerHTML=`${Math.floor (weather.main.temp_min)}&deg;C(min)/${Math.ceil(weather.main.temp_max)}&deg;C(max)`;
    pWeather.innerText=`${weather.weather[0].main}`;
    pHumidity.innerText=`${weather.main.humidity}`;
    pWind.innerHTML=`${weather.wind.speed}`;
    pPressure.innerText=`${weather.weather[0].pressure}`
}
function formatDate(date){
    const obj={
        weekday:"long",
        year:"numeric",      
        month:"long",
        day:"numeric",
    };
   return date.toLocalDateString(undefined,obj);
}

function updateBackground(weatherType){
    const backgrounds={
        Clear:"images/clear.jpg",
        Clouds:"images/clouds.jpg",
        Haze:"images/haz.jpg",
        Rain:"images/rain.jpg",
        Thunderstrom:"images/thunder.jpg",
        Sunny:"images/sunny.jpg",
        Snow: "images/snow.jpg,"
    };
    document.body.style.backgroundImage=
    `url(${backgrounds[weatherType] || "images/clear.jpg"})`;
}
function clearWeatherDisplay(){
    hCity.innerText= "";
    hDate.innerText= ";"
}
