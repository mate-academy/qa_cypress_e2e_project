import { faker } from '@faker-js/faker';

export function generateNewArticle() {
  const title = faker.lorem.sentence(1).slice(0, -1);
  const description = faker.lorem.sentence();
  const body = faker.lorem.sentence(10);
  const tags = faker.lorem.sentence(1).slice(0, -1);

  return { title, description, body, tags };
};
