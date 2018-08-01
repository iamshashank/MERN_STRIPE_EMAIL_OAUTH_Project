const express = require('express');
const app = express();


app.get('/',(req,res)=>{
	res.send({name:"GTA"});
})


app.listen(5000);