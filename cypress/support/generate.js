import { faker } from "@faker-js/faker";

function generateUser() {
  const randomNumber = Math.random().toString().slice(2, 6);
  const username = faker.internet.userName() + "_" + randomNumber;
  const email = `${username}@mail.com`;
  const bio = faker.lorem.words(3);

  const password = generatePassword();

  return { email, password, username, bio };
}

function generatePassword() {
  const lower = faker.random.alpha({ count: 4, casing: 'lower' });
  const upper = faker.random.alpha({ count: 2, casing: 'upper' });
  const number = faker.random.numeric(2);

  return faker.helpers.shuffle([lower, upper, number]).join('');
}

module.exports = { generateUser };
