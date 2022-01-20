import express from 'express';
import fetch from 'node-fetch';
import utm from 'utm';
const app = express();

app.set('port', process.env.PORT || 3000);

//Lanzamos el servidor
app.listen(app.get('port'), () =>{
    console.log("Servidor en el puerto ", app.get('port'));
});


const url = 'http://mapas.valencia.es/lanzadera/opendata/Valenbisi/JSON';
const response = fetch(url);
const data = response.json();
//console.log(data);

const valenbisi = [];


for(let i = 0; i < data.features.length; i++){

    valenbisi.push({
        'address' : data.features[i].properties.address, 
        'free': data.features[i].properties.free,
        'coords': utm.toLatLon(data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1], 30, "N")
    });
}

console.log(valenbisi);

app.get('/valenbisi', (req, res) => {    
    res.json(
        {
            "valenbisi": valenbisi
        }
    );
});

