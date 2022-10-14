let search = document.getElementById('search');
let res = document.getElementById('resultados');
let btnBuscar = document.getElementById('buscar');
let APIKEY = '7d9c531e07d34b0cc345e7a8e3a58330';
let h2 = document.createElement('h2');
let h3 = document.createElement('h3');
let clima = document.getElementById('clima');
let body = document.getElementById('body');

btnBuscar.addEventListener('click', event =>{
    event.preventDefault();

    // resultado.innerHTML = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&lang=sp&appid=${APIKEY}`)
    .then(resp=>{
        return resp.json();
    })
    .then(json=>{
        json = traducirApi(json.id);
        }
    )
    .catch(err=> {            alert('No se ha encontrado ninguna ciudad con ese nombre.'); })
    .finally(ok=>
    {
        console.log('Salio todo ok.');
    })

})


function traducirApi(id){
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=es&appid=${APIKEY}`)
    .then(resp => {
        return resp.json();
    })
    .then(json =>{
        clima.innerHTML = '';
        body.className = '';
        let tempMin = json.main.temp_min - 275.15;
        let tempMax = json.main.temp_max - 275.15;
        let temp = json.main.feels_like - 275.15;

        let div = document.createElement('div');
        div.className = 'bg-gray row';
        
        clima.append(div);

        let divImg = document.createElement('div');

        let divSensacion = document.createElement('div');
    

        if(json.weather[0].main == 'Clear')
        {   
            let img = document.createElement('img');
            img.src = 'img/caliente.png';
            img.className = 'img-fluid w-75';
            divImg.append(img);

            body.className = 'soleado';
        }
        else if (json.weather[0].main == 'Clouds')
        {   
            let img = document.createElement('img');
            img.src = 'img/nube.png';
            img.className = 'img-fluid w-75';
            divImg.append(img);

            body.className = 'nublado';
        }
        else if(json.weather[0].main == 'Drizzle' || json.weather[0].main == 'Rain')
        {
            let img = document.createElement('img');
            img.src = 'img/lluvia.png';
            img.className = 'img-fluid w-75';
            divImg.append(img);

            body.className = 'lluvioso';

        }
        else if(json.weather[0].main == 'Snow')
        {
            let img = document.createElement('img');
            img.src = 'img/nieve.gif';
            img.className = 'img-fluid w-75';
            divImg.append(img);

            body.className = 'nieve';
        }

        let min = document.createElement('strong');
        let max = document.createElement('strong');

        min.innerText = `La minima: ${Math.round(tempMin)}º C.     -  `;
        max.innerText = `La maxima: ${Math.round(tempMax)}º C.     -  `;


        let humedad = document.createElement('strong');
        humedad.innerText = `Humedad: ${json.main.humidity}.       -  `;

        let presion = document.createElement('strong');
        presion.innerText = `Presion: ${json.main.pressure}.       -  `;

        let textViento = document.createElement('strong');
        textViento.innerText = `Viento ${json.wind.speed}`;

        let imgViento = document.createElement('img');
        imgViento.src = 'img/wind.png';
        imgViento.className = 'img-fluid w-25';
        divImg.append(textViento, imgViento);

        divSensacion.append(humedad, presion, min, max);

        h2.innerText = `${json.name}, ${json.sys.country} es de ${Math.round(temp)}º C.`; 

        div.append(h2, divImg, divSensacion)
        clima.append(div);   
        })
    .catch(err=> {console.log(`Hubo un error: ${err}`)})
        .finally(ok=>
        {
            console.log('Salio todo ok.');
        })
}