const path = require('path')
const hbs = require('hbs')
const requests = require('requests')
const express = require('express')
const { hasSubscribers } = require('diagnostics_channel')
const app = express()
const staticpath = path.join(__dirname,"hrml")
const staticpath2 = path.join(__dirname,"views/partials")
console.log(staticpath)
app.set("view engine","hbs")
hbs.registerPartials(staticpath2)

//app.use(express.static(staticpath)) --enable to use static template

app.get("/",(req,res)=>{
   res.render("index",{rep:"hello my name is sayan"})

})
app.get("/param",(req,res)=>{
   
    console.log(req.query)

    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=4a5ba8d1f93ccbb89959c42e14d12261`)
    .on('data', function (chunk) {
    let response = JSON.parse(chunk)
    const arrdata = [response]
    const realtimedata = arrdata
    .map((val) => val.main.temp)
    .join(" ")

   console.log(realtimedata)
    res.render('index',{rep:`the temprature of ${req.query.name} is  ${realtimedata}`})
})
.on('end', function (err) {
if (err) return console.log('connection closed due to errors', err);

console.log('end');
});

})
app.get("/*",(req,res)=>{
    res.send("error")
})
app.listen(8000,()=>{
    console.log('listening')
})