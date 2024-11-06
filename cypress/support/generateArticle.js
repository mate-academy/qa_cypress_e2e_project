import { faker } from '@faker-js/faker';

export function generateArticle () {
  return {
    title: faker.lorem.word(5), // Генерація випадкової назви статті
    description: faker.lorem.sentence(), // Генерація випадкового опису
    body: faker.lorem.sentence(), // Генерація випадкового тіла статті
    tag: faker.lorem.word() // Генерація випадкового слова як тега
  };
};
