const { faker } = require('@faker-js/faker');

export const generateArticle = () => {
  return {
    title: faker.word.words(1),
    description: faker.word.words(3),
    body: faker.word.words(10),
    tag: faker.word.words(1)
  };
};

export const generateNewArticle = () => {
  return {
    newTitle: faker.word.words(2),
    newDescription: faker.word.words(5),
    newBody: faker.word.words(15),
    newTag: faker.word.words(2)
  };
};
