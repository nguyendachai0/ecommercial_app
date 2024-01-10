const fs = require('fs');
const path = require('path');


class Model {
  constructor() {
    this.filePath = path.join(__dirname, DATA_FILE);
  }

  // Read all users
  getAllUsers() {
    try {
      const rawData = fs.readFileSync(this.filePath);
      const data = JSON.parse(rawData);
      return data.users;
    } catch (error) {
      console.error(error);
      throw new Error('Error reading data from file');
    }
  }

  // Read a user by ID
  getUserById(userId) {
    const users = this.getAllUsers();
    return users.find(user => user.id === userId);
  }

  // Create a new user
  createUser(newUser) {
    try {
      const users = this.getAllUsers();
      const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
      newUser.id = lastUserId + 1;
      users.push(newUser);

      this.saveData({ users });
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  }

  // Update a user by ID
  updateUser(userId, updatedUserData) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(user => user.id === userId);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUserData };
        this.saveData({ users });
        return users[userIndex];
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error updating user');
    }
  }

  // Delete a user by ID
  deleteUser(userId) {
    try {
      const users = this.getAllUsers();
      const updatedUsers = users.filter(user => user.id !== userId);

      if (updatedUsers.length !== users.length) {
        this.saveData({ users: updatedUsers });
        return true;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting user');
    }
  }

  // Helper method to save data to the JSON file
  saveData(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(this.filePath, jsonData);
    } catch (error) {
      console.error(error);
      throw new Error('Error saving data to file');
    }
  }
}

module.exports = Model;
