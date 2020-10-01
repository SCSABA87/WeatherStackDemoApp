const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

app.set(`view engine`, `ejs`);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")

});

app.post("/",function(req,res){


const query = req.body.city;

console.log(query);


const url = "http://api.weatherstack.com/current?access_key=4098fe641cddbf398963874d1852c645&query="+ query + "&units=m"

const request = http.get(url,function(response){

response.on("data",function(data){

const jsondata = JSON.parse(data);

const temperature = jsondata.current.temperature;

const imageURL = jsondata.current.weather_icons[0]

const responseMessage = "The current temperature in " + query + " is: " + temperature + " Celsius degrees"


res.render("response", {

  responseMessage: responseMessage,
  imageURL: imageURL,

});

res.send();

}); // end of response.on


}); // end of const request

}); // end of POST method


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000")
});



// Weatherstack api key  4098fe641cddbf398963874d1852c645
