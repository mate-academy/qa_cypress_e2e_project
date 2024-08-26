const { faker } = require('@faker-js/faker');

function generatePassword() {
  const length = 12;
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  
  let password = '';
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += digits.charAt(Math.floor(Math.random() * digits.length));
  
  while (password.length < length) {
    const allChars = upper + lower + digits;
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password;
}

function generateFakeUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: generatePassword(),
  };
}

function generateFakeArticle() {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(1),
    tag: faker.lorem.word(),
  };
}

module.exports = { generateFakeUser, generateFakeArticle };
