//server creation
// import express
const express=require('express')
//create server app using express
const app=express()

//to parse json data
app.use(express.json())

//set port number
app.listen(3000,()=>{
    console.log("server started at 3000");
})
//resolve api call
app.get('/',(req,res)=>{
    res.send("GET REQUEST")
})
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
})
app.patch('/',(req,res)=>{
    res.send("PATCH REQUEST")
})
app.put('/',(req,res)=>{
    res.send("PUT REQUEST")
})
app.delete('/',(req,res)=>{
    res.send("delete REQUEST")
})
//import data.service
const dataService=require('./services/data.service')

//bank server
//jsonwebtoken import
const jwt=require('jsonwebtoken')
//jwtMiddleware
const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.body.token
        const data=jwt.verify(token,'supersecret123456789')
        next()
    }
    catch{
        res.status(401).json({
            status:false,
            message:"Please login!!!"
        })
    }
}

//register api
app.post('/register',(req,res)=>{
  const result=dataService.register(req.body.username,req.body.acno,req.body.password)
 res.status(result.statusCode).json(result)
})

//login api 
app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.pswd)
   res.status(result.statusCode).json(result)
  })
  //deposit api

  app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
   res.status(result.statusCode).json(result)
  })

  //withdraw
  app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
   res.status(result.statusCode).json(result)
  })

  //transaction
  app.post('/transaction',jwtMiddleware,(req,res)=>{
    const result=dataService.transaction(req.body.acno)
   res.status(result.statusCode).json(result)
  })

