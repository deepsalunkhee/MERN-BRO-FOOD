const mongoose=require('mongoose');
require('dotenv').config();
const MONGODBURL=process.env.MONGO_URL;
console.log(process.env.MONGO_URL)

mongoose.set('strictQuery', true);
const mongoDB= async ()=>  {
   await mongoose.connect(MONGODBURL,{useNewUrlParser:true},async (err,result)=>{
    if(err) console.log("---",err)
    else{
     console.log(`Connected to DataBase`);   
     const fetched_data= await mongoose.connection.db.collection("food_items");
     fetched_data.find({}).toArray(async function(err,data){
        const foodCatagory = await mongoose.connection.db.collection("foodCatagory");
        foodCatagory.find({}).toArray(function(err,catData){
            if(err) console.log(err);
        else 
        {
            global.food_items=data;
            global.foodCatagory=catData;
            //  console.log(global.food_items)
        }
        })
        // if(err) console.log(err);
        // else 
        // {
        //     global.food_items=data;
        //      console.log(global.food_items)
        // }
     })
    }
    
});
}

module.exports=mongoDB;