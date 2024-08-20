const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// Route to handle order data
router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;

  // Check if data is an array before using unshift
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid order_data format' });
  }

  // Add Order_date at the beginning of the data array
  data.unshift({ Order_date: req.body.order_date });

  try {
    // Check if an order already exists for the email
    let eId = await Order.findOne({ email: req.body.email });

    if (eId === null) {
      // Create a new order entry if not found
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      // Update the existing order entry
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


module.exports = router;
