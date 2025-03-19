const express=require('express')
const app=express()
const port=5000;

require('dotenv').config()
const mongoose=require('mongoose')

const User=require('./models/usermodel')


app.use(express.json())



mongoose.connect('mongodb+srv://grmonishs65:2007@asap-project.izf50.mongodb.net/dsdas').then(()=>console.log('Conneted to Mongodb')).catch(e=>console.log('Not Connected',e))


app.post('/user',async(req,res)=>{

    const{email,password}=req.body;

    try{
        const user=new User({
            email,
            password
        })

        await user.save()

        res.status(200).json({msg:"user created succesfully"})
    }

    catch(error){
        console.log(error);
        
    }


})



app.put('/user',async(req,res)=>{

    const{email,password}=req.body
    if(!email || !password){
        return res.status(400).json({msg:"email and password are reuired"})
    }

    const user=await User.findOne({email})
    if(user){
        
        user.password=password

        await user.save()

        return res.status(200).json({msg:"user updated succesfully"})
    
    }else{
      return res.status(404).json({msg:"email not found"})
    }

 

   
})


app.delete('/user',async(req,res)=>{
    const{email}=req.body;

    if(!email){
        return res.status(400).json({msg:"email is required"})

    }

    const user=await User.findOneAndDelete({email})
    if(user){
        return res.status(200).json({msg:"user deleted succesfully"})
    }

    else{
        return res.status(404).json({msg:"email not found"})
    }
})







app.listen(port,()=>{

    console.log(`Server is running on the port ${port}`);
    
})