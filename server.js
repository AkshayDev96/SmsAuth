const express = require('express')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()
var messagebird = require('messagebird')(process.env.sms_api_key);

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/numberVerification',(req,res)=>{
    const {number} = req.body
    var params = {
        originator: '+918090393593',
        type: 'sms'
      };
      messagebird.verify.create('+918090393593', params, function (err, response) {
        if (err) {
          return console.log(err);
        }
        console.log(response);
      });
      res.status(200).json("sended")
})

app.get('/verify',(req,res)=>{
    const {id,token} = req.body
    messagebird.verify.verify(id,token,(error,response)=>{
        if(error){
            return res.status(400).json({
                error:error.errors[0].description,
                id
            })
        }
        res.status(200).json({
            message:'Phone number verified successfully!'
        })
    })
})


app.listen(5000,()=>console.log('Server started on 5000'))