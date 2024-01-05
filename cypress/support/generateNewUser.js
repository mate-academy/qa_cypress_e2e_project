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

function generateBio() {
  return faker.person.bio();
}

module.exports = {
  generateUsername,
  generateEmail,
  generatePassword,
  generateBio
};
