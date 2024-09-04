const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;

 
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid order_data format' });
  }


  data.unshift({ Order_date: req.body.order_date });

  try {
  
    let eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({'email':req.body.email})
    console.log('Fetched data:', myData)
    res.json({orderData : myData})
    console.log(req.body.email)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
