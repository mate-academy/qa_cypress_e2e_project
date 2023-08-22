// plugins/UserGenerator.js

const faker = require('faker');

const userGenerator = {
  generateUser() {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    return { email, username, password };
  }
};

module.exports = userGenerator;
