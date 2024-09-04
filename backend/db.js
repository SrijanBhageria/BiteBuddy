const mongoose = require("mongoose");
// const mongoURI = 'mongodb+srv://srijanbhageria:shashwat1606@cluster0.aqjgu.mongodb.net/BiteBuddymern?retryWrites=true&w=majority&appName=Cluster0';
const mongoURI =
  "mongodb://srijanbhageria:shashwat1606@cluster0-shard-00-00.aqjgu.mongodb.net:27017,cluster0-shard-00-01.aqjgu.mongodb.net:27017,cluster0-shard-00-02.aqjgu.mongodb.net:27017/BiteBuddymern?ssl=true&replicaSet=atlas-11cu4w-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

  const mongoDB = async () => {
    try {
      const connection = await mongoose.connect(mongoURI, {});
      console.log("MongoDB connected successfully");
  
      const db = connection.connection.db;
      console.log("Connected to DB:", db.databaseName);
  
      // Fetch food items
      const fetched_data = db.collection("food_items");
      const data = await fetched_data.find({}).toArray();
  
      // Fetch food categories
      const foodCategoryCollection = db.collection("foodCategory");
      const catData = await foodCategoryCollection.find({}).toArray();

      // Fetch orders
      const ordersCollection = db.collection("orders");
      const ordersData = await ordersCollection.find({}).toArray();
  
      // Assign to global variables
      global.food_items = data;
      global.foodCategory = catData;
      global.orders = ordersData;

      console.log("Data fetched and stored globally");
    } catch (err) {
      console.error("MongoDB connection or data fetching error:", err);
    }
  };
  

module.exports = mongoDB;
