// models/Order.js
const fs = require('fs');

class Order {
    constructor() {
        this.orders = this.loadOrders();
    }

    loadOrders() {
        const data = fs.readFileSync('database/orders.json', 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.orders || [];
    }

    saveOrders() {
        const data = JSON.stringify({ orders: this.orders }, null, 2);
        fs.writeFileSync('database/orders.json', data, 'utf8');
    }

    getAllOrders() {
        return this.orders;
    }

    getOrderById(orderId) {
        return this.orders.find(order => order.id == orderId);
    }

    getLastOrderId() {
        if (this.orders.length === 0) {
            return null; // No orders, return null or handle accordingly
        }
        return this.orders[this.orders.length - 1].id;
    }

    addOrder(newOrder) {
        this.orders.push(newOrder);
        this.saveOrders();
    }

    updateOrder(updatedOrder) {
        const index = this.orders.findIndex(order => order.id == updatedOrder.id);
        if (index !== -1) {
            this.orders[index] = updatedOrder;
            this.saveOrders();
        }
    }

    deleteOrder(orderId) {
        this.orders = this.orders.filter(order => order.id != orderId);
        this.saveOrders();
    }
}

module.exports = new Order();
