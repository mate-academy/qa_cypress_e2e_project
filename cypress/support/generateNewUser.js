const { faker } = require('@faker-js/faker');

function generateUsername() {
  return faker.person.firstName();
}

function generateEmail() {
  return faker.internet.email();
}

function generatePassword() {
  return faker.internet.password();
}

module.exports = { generateUsername, generateEmail, generatePassword };
