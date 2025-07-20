function showweather(response){
    let temperature=document.querySelector("#weather-temp");
   let temp=response.data.temperature.current;
   cityElement=document.querySelector("#city");
   cityElement.innerHTML=response.data.city;

   temperature.innerHTML=Math.round(temp);

}

function cityweather(city){
    apiKey="b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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