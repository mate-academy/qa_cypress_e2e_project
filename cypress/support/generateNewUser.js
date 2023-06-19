const faker = require("faker");

function generateNewUser() {
    const randomNumber = Math.random().toString().slice(2, 6);
    const username = faker.name.firstName() + `${randomNumber}`;
    const email = `${username}@gmail.com`.toLowerCase();
    const password = `Qwer1234`;

    return { username, email, password };
}

module.exports = {generateNewUser};