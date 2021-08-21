const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempMin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempMax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}", orgVal.weather[0].main);
    
    return temperature;
}



const server = http.createServer((req,  res) => {
    if(req.url == "/")
    {
     requests("http://api.openweathermap.org/data/2.5/weather?q=Surat&appid=5f287c0a9641e17f177111ab0a823727")
    .on('data', (chunk) => {
        const objData = JSON.parse(chunk);
        const arrData = [objData];

    // console.log(arrayData[0].main.temp);
    const realarrData = arrData.map((val) => replaceVal(homeFile, val)).join("");
        res.write(realarrData);
        // console.log(realarrData);
})
    .on('end', (err) => {
    if (err) return console.log('connection closed due to errors', err);
 
   res.end();
});
}
    
});

server.listen(8000, "127.0.0.1");