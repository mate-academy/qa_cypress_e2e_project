import { faker } from '@faker-js/faker';
const randomInt = Math.ceil(Math.random() * 1000);

export function generateUser() {
  return {
    username: faker.person.firstName() + randomInt,
    password: faker.internet.password() + randomInt,
    bio: faker.lorem.word(),
    email: faker.internet.email().toLowerCase()
  };
};

export function generateWrongData() {
  return {
    username: faker.person.firstName() + randomInt,
    password: faker.internet.password().slice(0, 7),
    bio: faker.lorem.word(),
    emailWithoutName:
      '@' +
      faker.lorem.word().slice(0, 4) +
      '.' +
      faker.internet.domainSuffix(),
    emailWithoutDomain:
      faker.lorem.word() +
      randomInt +
      '@'
  };
};
export function generateArticle() {
  return {
    title: faker.lorem.word(),
    description: faker.lorem.words(),
    body: faker.lorem.words(),
    tag1: faker.lorem.word(),
    tag2: faker.lorem.word()
  };
};
