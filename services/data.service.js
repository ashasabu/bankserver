//jsonwebtoken import
const jwt=require('jsonwebtoken')
database={
    1000:{acno:1000,username:"meena",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,username:"neena",password:1001,balance:3000,transaction:[]},
    1002:{acno:1002,username:"aneena",password:1002,balance:4000,transaction:[]}
  }

 const register= (username,acno,password)=>{
   
    
    if(acno in database){
      //user exist
      return {
        statusCode:401,
        status:false,
        message:"Account number already exist"
      }
    }
    else{
      database[acno]={
        acno,
        username,
        password,
        balance:0,
        transaction:[]
      }
     console.log(database);
      return {
        statusCode:200,
        status:true,
        message:"Sucessfully registered .........Please login"
      }
    }
   }

  const login=(acno,pswd)=>{

    if(acno in database){
       if(pswd == database[acno]["password"]){
        //already exist
        currentUser=database[acno]["username"]
        currentAcno=acno
        const token=jwt.sign({
          currentAcno:acno
        },'supersecret123456789')
      return {
        statusCode:200,
        status:true,
        message:"Login Sucessfull...",
        token:token,
        currentAcno,
        currentUser
      } 
        
      }
      else{
       
        return {
          statusCode:422,
          status:false,
          message:"Incorrect password"
        }
      }
  
    }
    else{
   
      return {
        statusCode:401,
        status:false,
        message:"user does not exist"
      }
    }
  }

 const deposit=(acno,pswd,amt)=>{
    let amount=parseInt(amt)
    if(acno in database){
      if(pswd==database[acno]["password"]){
        database[acno]["balance"]+=amount
        database[acno]["transaction"].push(
          {
            type:"CREDIT",
            amount:amount
          }
        )
       // console.log(database);
   
  return  {
    statusCode:200,
    status:true,
    message:amount+"successfully debited... And new balance is"+ database[acno]["balance"]

  } 
      }
     
      
      else{
        return {
          statusCode:422,
          status:false,
          message:"Incorrect password"
        }
      }

    }
    else{

      return  {
        statusCode:401,
        status:false,
        message:"user does not exist"
      }
    }
    
    
  }

  const withdraw=(acno,pswd,amt)=>{
    let amount=parseInt(amt)
    if(acno in database){
      if(pswd==database[acno]["password"]){
        database[acno]["balance"]-=amount
        database[acno]["transaction"].push(
          {
            type:"DEBIT",
            amount:amount
          }
        )
       // console.log(database);
   
  return  {
    statusCode:200,
    status:true,
    message:amount+"successfully debited... And new balance is"+ database[acno]["balance"]

  } 
      }
     
      
      else{
        return {
          statusCode:422,
          status:false,
          message:"Incorrect password"
        }
      }

    }
    else{

      return  {
        statusCode:401,
        status:false,
        message:"user does not exist"
      }
    }
    
    
  }

  const transaction=(acno)=>{
    if(acno in database){
      return  {
        statusCode:200,
        status:true,
        transaction:database[acno].transaction
      } 
    }
    else{
      return  {
        statusCode:401,
        status:false,
        message:"user does not exist"
      }
    }

  }



   
   //export
   module.exports={
    register,
    login,
    deposit,
    withdraw,
    transaction
   }