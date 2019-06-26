const express=require('express')
const app=express();
const routes=require('./routes/route.js')
const cors=require('cors')
const path=require('path')
app.use(cors())
app.use(routes);


if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(1111||process.env.PORT,()=>{
    console.log(`SERVER RUNNING AT 1111`);
})
