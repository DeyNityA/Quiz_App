const jwt= require('jsonwebtoken')


const createToken= async (user)=>{
try{
    const payload= {
        _id:user._id,
        name:user.name,
        email:user.email,
    }
  const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1d'});
  return token;
  
  
}catch(err){
    console.log(err.message);
    throw new Error()
}
}


 async function getUser(token){
    try{
    const user= await jwt.verify(token,process.env.SECRET_KEY);
    return user;
    }catch(err){
        return null
    }
}

module.exports ={
    getUser,
    createToken,
};