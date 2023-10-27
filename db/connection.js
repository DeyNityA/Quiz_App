
const mongoose=require('mongoose')

mongoose.connect(`${process.env.MONGO_URL}`).then(() => console.log("Mongodb Connected!..."))
.catch((err) => console.log(err));