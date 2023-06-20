import faker from "faker";

function generateNewUser() {
    const username = faker.name.firstName();
    const email = `${username}@gmail.com`.toLowerCase();
    const password = 'Qwerty123!';

    return { username, email, password };
}

module.exports = {generateNewUser};