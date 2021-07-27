'use strict';
const axios=require('axios');
const coffeeModel=require('../models/coffee.model');

// Endpoint for testing
const home=(req,res)=>{
res.send('is connected')
}
// Call the coffee api here and return the results
const retreiveItemController=(req,res)=>{
    // retreiveItemController
    // provide your logic here
    const getDataUrl = `https://coffeepedias.herokuapp.com/coffee-list/`;
     axios.get(getDataUrl).then(result=>{
        const coffeeData =result.data.map(item=>{
           return new CoffeData(item);
       })
    //    console.log(coffeeData);
    res.send(coffeeData);
    }).catch(()=>{
        console.log('no data');
    })
};
// Get favorite coffee from MongoDB
const getFavoriteCoffee=(req,res)=>{
    coffeeModel.find({},(err,item)=>{
        // console.log(item);
        res.send(item)
    })
    
}
// Create new fav coffee endpoint
const createItemController=(req,res)=>{
//    console.log(req.body);
   const {image_url,title,ingredients, description} =req.body
   const addToFav = new coffeeModel({
    title:title,
    description:description,
    ingredients:ingredients,
    img:image_url
   })
   console.log(addToFav);
    addToFav.save();
    

};

// update coffee from MongoDB
const updateItemController=(req,res)=>{
   console.log(req.params);
   console.log(req.body);
   const {title,description,ingredients,image_url} = req.body;
   const {id} = req.params;
   coffeeModel.findOne({_id:id},(err,item)=>{
   item.title=title;
   item.description=description;
   item.ingredients=ingredients;
   item.img=image_url;
   item.save().then(()=>{
    coffeeModel.find({},(err,item)=>{
       console.log(item);
        res.send(item)
    })
   })

})
   
};

// delete coffee from MongoDB
const deleteItemController=(req,res)=>{
    console.log(req.params);
    const {id} =req.params;
    coffeeModel.deleteOne({_id:id} , (err,item)=>{
        coffeeModel.find({},(err,item)=>{
            res.send(item)
        })
    })
};
class CoffeData{
    constructor(item){
        this.title=item.title;
        this.description=item.description;
        this.ingredients=item.ingredients;
        this.image_url=item.image_url
    }
}

module.exports={
    home,
    getFavoriteCoffee,
    createItemController,
    updateItemController,
    deleteItemController,
    retreiveItemController
};