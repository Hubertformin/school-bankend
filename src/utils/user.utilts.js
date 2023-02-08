const fs = require('fs');
const {convertCSVTOJSON} = require('./')

function getAllUsers() {
    //  Here we are reading user's data from the file
    const fileData = fs.readFileSync("users.csv").toString();

    return convertCSVTOJSON(fileData);
}


function getUserById(id) {
    const users = getAllUsers();
    return users.find(user => user.id == id);
}

/**
 * 
 * @param {string} id The Id of the user
 * @param {UserModel} user The payload to be updated, {name, email, age}
 * @return Boolean
 * This function Updates a user in the database.
 */
function updateUser(id, payload) {
    const updatedUsers = getAllUsers().map(user => {
        if (user.id == id) {
            Object.assign(user, payload)
        }
        return user
    });
    // save users
    saveUsers(updatedUsers);
}

function deleteUser(id) {
    const retainingUsers = getAllUsers().filter(user => user.id !== id);
    saveUsers(retainingUsers);
}

function saveUsers(users) {
    // We can make sure that that the only arrays should be saves
    if (!Array.isArray(users)) {
        throw new Error('users must be an array of users')
    }
    // First write the headers
    fs.writeFileSync('users.csv', "ID,Name,Email,Age\n")

    users.forEach(user => {
        fs.appendFileSync("users.csv", `${Object.values(user).toString()}\n`)
    });
}


module.exports = {
    getAllUsers, 
    getUserById,
    updateUser,
    deleteUser
}