const loc = document.getElementById("location")
const tempicon = document.getElementById("temp-icon")
const tempvalue = document.getElementById("temp-value")
const climate = document.getElementById("climate")

let iconfile;
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button");


searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    getWeather(searchInput.value);
    searchInput.value='';
}
)

const getWeather= async(city)=>
{
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c8ca3391ad99dbe1030cc2f6d40105e`, {mode: 'cors'});

        const weatherData = await response.json();
        console.log(weatherData)
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main
        tempvalue.textContent=Math.round(feels_like-273)
        if(id<300 && id>200){
            tempicon.src ="./icons/strom.svg"
        }
        else if(id<400 && id>300){
           tempicon.src ="./icons/cloud.svg"
       } 
       else if(id<600 && id>500){
           tempicon.src ="./icons/rain.svg"
       } 
       else if(id<700 && id>600){
           tempicon.src ="./icons/snowflake.svg"
       }
       else if(id<800 && id>700){
           tempicon.src ="./icons/cloud.svg"
       }
      else if(id==800){
           tempicon.src ="./icons/atmosphere.svg"
       }



       

    }
    catch(error){
        alert('city not foun d')
    }
}


window.addEventListener("load" , () => {
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const proxy = "https://cors-anywhere.herokuapp.com/"

            const api =`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7c8ca3391ad99dbe1030cc2f6d40105e`
            
            fetch(api).then((response) => {
                return response.json();
            }
            )
            .then((data) => {
                     const{name}=data;
                     const{feels_like}=data.main
                     const{id,main}= data.weather[0];

                     loc.textContent=name;
                     climate.textContent=main;
                     tempvalue.textContent=Math.round(feels_like-273)
                     if(id<300 && id>200){
                         tempicon.src ="./icons/strom.svg"
                     }
                     else if(id<400 && id>300){
                        tempicon.src ="./icons/cloud.svg"
                    } 
                    else if(id<600 && id>500){
                        tempicon.src ="./icons/rain.svg"
                    } 
                    else if(id<700 && id>600){
                        tempicon.src ="./icons/snowflake.svg"
                    }
                    else if(id<800 && id>700){
                        tempicon.src ="./icons/cloud.svg"
                    }
                   else if(id==800){
                        tempicon.src ="./icons/atmosphere.svg"
                    }
            }
            )
        }
        )
    }
}
)