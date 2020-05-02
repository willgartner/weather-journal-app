/* Global Variables */
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code(us)}&appid={your api key}&units=imperial
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=7ef869df9318a59ad803c4e45df27c34&units=imperial';
const gen = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const zipError = document.getElementById('ziperror');
let trueFeelings = '';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// GET Request for weather data
const retrieveWeather = async (zip) => {
    const request = await fetch(`${url}${zip}${key}`);
    try {
      const allData = await request.json();
      // Temprature per API documentation
      return parseInt(allData.main.temp);
    }
    catch(error) {
      console.log("error: ", error);
    }
  };

// POST data to projectData
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },       
  body: JSON.stringify(data), 
});

  try {
    const newData = await response.json();
    return newData;
  } 
  catch(error) {
    console.log("error: ", error);
  }
}
  
const addToUi = async () => {
  const req = await fetch('/data');
  try {
    const projectData = await req.json();
    document.getElementById('date').innerHTML=`Date: ${projectData.date}`;
    document.getElementById('temp').innerHTML=`Temprature: ${projectData.temp}`;
    document.getElementById('content').innerHTML=`Feelings: ${projectData.feelings}`;
  } 
  catch (error) {
    console.log('error: ', error);    
  }
}
  
  // Run the main program loop
  const executePageUpdate = () => {
      const isValidZip = /(^\d{5}$)/.test(zip.value);
      if(isValidZip){
        if(feelings.value === '' || feelings.value === undefined || feelings.value === null){
          trueFeelings = 'Must be feeling kind of empty!';
        }
        else {
          trueFeelings = feelings.value;
        }
        retrieveWeather(zip.value)
        .then(temp => {
          postData('/add', { date: newDate, temp: temp, feelings: trueFeelings })
        })
        .then(() => {
          addToUi();
        });
      }
      else{        
        zipError.innerHTML = 'Please enter a valid zip code format (5 digits)';
      }
  }


// Add event listener for generate button
gen.addEventListener('click', executePageUpdate);
zip.addEventListener('change', () => {zipError.innerHTML = '';});