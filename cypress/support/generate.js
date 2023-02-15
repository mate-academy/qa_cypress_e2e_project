import { faker } from '@faker-js/faker';

function generateUser() {
  const username = faker.internet.userName();
  const email = `${faker.random.word()}${faker.random.numeric()}@gmail.com`
  const password = 'Test123!'

  return { username, email, password };
};

function generateArticle() {
  const title = faker.lorem.word();
  const description = faker.lorem.words();
  const body = faker.lorem.words();
  const tag = faker.lorem.word()

  return { title, description, body, tag };
};

module.exports = { generateUser, generateArticle };
