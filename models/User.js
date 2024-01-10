// models/User.js
const fs = require('fs');

class User {
    constructor() {
        this.users = this.loadUsers();
    }
    
    loadUsers() {
        const data = fs.readFileSync('database/users.json', 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.users || [];
    }

    saveUsers() {
        const data = JSON.stringify({users: this.users}, null, 2);
        fs.writeFileSync('database/users.json', data, 'utf8');
    }

    getAllUsers() {
        return this.users;
    }

    getUserByEmail(email) {
      return this.users.find(user => user.email == email);
    }

    getUserById(categoryId) {
        return this.users.find(category => category.id === categoryId);
    }
    getLastUserId() {
      if (this.users.length === 0) {
          return null; // No users, return null or handle accordingly
      }
      return this.users[this.users.length - 1].id;
  }

    addUser(newUser) {
        this.users.push(newUser);
        this.saveUsers();
    }

    updateUser(updatedUser) {
        const index = this.users.findIndex(category => category.id === updatedUser.id);
        if (index !== -1) {
            this.users[index] = updatedUser;
            this.saveUsers();
        }
    }

    deleteUser(categoryId) {
        this.users = this.users.filter(category => category.id !== categoryId);
        this.saveUsers(); // Correct the method name
    }
}

module.exports = new User();
