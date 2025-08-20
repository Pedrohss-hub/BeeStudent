const getLatitude = document.querySelector('#getLatitude')
const getLongitude = document.querySelector('#getLongitude')
const buttonGetSeed = document.querySelector('.buttonGetSeed')

async function getJson(url) {
    const promise = await fetch(url)
    const json = await promise.json()
    return json
}

function adaptHour(iso86){
    let timeString = new Date(iso86).toLocaleTimeString('pt-br',{
        hour: '2-digit',
        minute: '2-digit',
    })
    return timeString
}

buttonGetSeed.addEventListener('click', ()=>{
    const latitude = getLatitude.value
    const longitude = getLongitude.value

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&timezone=America%2FSao_Paulo&forecast_days=1`

    getJson(URL).then((res)=>{
        const dateApi = res.hourly
        const arrTemperature = dateApi.temperature_2m        
        const arrTime = dateApi.time
        arrTime.forEach((element,index,arr) => {
            arr[index] = adaptHour(element)
        });


        const maxTemperature = Math.max(...arrTemperature)
        const indexMaxT = arrTemperature.findIndex(num=>num===maxTemperature)

        const minTemprature = Math.min(...arrTemperature)
        const indexMinT = arrTemperature.findIndex(num=>num===minTemprature)

        const sizeHours = dateApi.time.length
        

        console.log(`Temperatura Máxima: ${maxTemperature}ºC às ${arrTime[indexMaxT]}`)
        console.log(`Temperatura Mínima: ${minTemprature}ºC às ${arrTime[indexMinT]}`)

        new Chart(ctx, {
        type: 'line', // tipos: 'bar', 'line', 'pie', 'doughnut', etc.
        data: {
            labels: arrTime,
            datasets: [{
            label: 'Temperatura',
            data: arrTemperature,
            backgroundColor: ['red', 'blue', 'green']
            }]
        },
        options: {
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        return value + '°C'; // Adiciona °C a cada valor
                    }
                },
                title: {
                    display: true,
                    text: 'Temperatura (°C)' // Título do eixo
                }
            }
        }
    }
        });

    })
})

const ctx = document.getElementById('meuGrafico');

    
/*

let latitude = '-23.559454015626613'
let longitude = '-46.73140384604011'

let URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&timezone=America%2FSao_Paulo&forecast_days=2`

async function getHtml(url) {
    const promise = await fetch(url)
    const json = await promise.json() 
    return json
}

getHtml(URL).then((res)=>{
    console.log(res)

    let informationApi = res.hourly
    let i = 0
    let maxTemperatue = 100
    let idOfMax = 0

    
    while(i < 68){
        console.log(`${informationApi.time[i]} ${informationApi.temperature_2m[i]}ºC ${informationApi.rain[0]}`)
        if (maxTemperatue > informationApi.temperature_2m[i]){
            maxTemperatue = informationApi.temperature_2m[i]
            idOfMax = i
        }
        i ++
    }

    console.log(`Temperatura máxima: ${maxTemperatue}`)
    console.log(`${informationApi.time[idOfMax]} ${informationApi.temperature_2m[idOfMax]}ºC ${informationApi.rain[idOfMax]}`)
    

})

*/