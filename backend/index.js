let app=require("./src/app");

app.listen(process.env.server_port,()=>{
    console.log(`server start http//:localhost/${process.env.server_port}`);
    
});

