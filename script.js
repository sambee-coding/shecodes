function showweather(response){
    let temperature=document.querySelector("#weather-temp");
   let temp=response.data.temperature.current;
     temperature.innerHTML=Math.round(temp);
   cityElement=document.querySelector("#city");
   cityElement.innerHTML=response.data.city;
 
      ///description fectching
      let descriptionElement=document.querySelector("#description");
      descriptionElement.innerHTML =response.data.condition.description;
      console.log(response.data.condition.description);
      //humidity fetching
      console.log(response.data.temperature.humidity);
      let humidityElement=document.querySelector("#hum");
      humidityElement.innerHTML= `${response.data.temperature.humidity}% `;
      //windspeed ferching 
      console.log(response.data.wind.speed);
      let windElement=document.querySelector("#wind");
      windElement.innerHTML= `${Math.round(response.data.wind.speed)}km/h `;
         let iconImage=document.querySelector("#icon");
  iconImage.innerHTML= `<img src="${response.data.condition.icon_url}" class="weather-icon"/> `;

      //fetching time
      let data=new Date (response.data.time*1000);
      console.log(response.data);
      let timeElement=document.querySelector("#time");
      timeElement.innerHTML=formatDate(data);
      function formatDate(date){
        
        let hours=date.getHours();
    let minutes=date.getMinutes();
    let days=["sunday","monday","tusday","wednesday","thursday","friday","saturday"];
     let day= days[date.getDay()];
     if (minutes<10){
        minutes= `0${minutes} `;
     }
     

        return `${day},${hours}:${minutes} `;
}
      


}
   
function cityweather(city){
    apiKey="2faae9d4e47d0b0a09a9to05afdf381d";
    let apiUrl =  `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric `;
    axios.get(apiUrl).then(showweather);
}

function handleSubmit(event){
    event.preventDefault();
    let searchInput=document.querySelector("#search-input");
    let city=document.querySelector("#city");
    city.innerHTML=searchInput.value;
    cityweather(searchInput.value);

}


let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);
 cityweather("addis ababa");