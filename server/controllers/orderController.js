const Order = require('../models/orderModel');


// Create a new order
const createOrder = async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// Update an order by ID
const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
  
// Delete an order by ID
const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({message: "order deleted successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
  
// Get all orders
const getAllOrders = async (req, res) => {
try {
    const orders = await Order.find();
    res.status(200).json({ orders });
} catch (error) {
    res.status(400).json({ error: error.message });
}
};
  
  // Get orders by user ID
const getOrdersByUserId = async (req, res) => {
try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({ orders });
} catch (error) {
    res.status(400).json({ error: error.message });
}
};
  
// Get monthly income
const getMonthlyIncome = async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
    const income = await Order.aggregate([
        {
        $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
            products: { $elemMatch: { productId } },
            }),
        },
        },
        {
        $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
        },
        },
        {
        $group: {
            _id: '$month',
            total: { $sum: '$sales' },
        },
        },
    ]);
    res.status(200).json(income);
    } catch (err) {
    res.status(400).json(err);
    }
};

module.exports = {createOrder, updateOrderById, deleteOrderById, getOrdersByUserId, getAllOrders, getMonthlyIncome}
