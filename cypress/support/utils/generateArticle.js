import { faker } from '@faker-js/faker';

const generateArticle = () => {
  const title = `${faker.word.adjective()} ${faker.word.noun()}`;
  const description = faker.lorem.sentence();
  const body = faker.lorem.sentences(3);
  const tags = faker.word.adjective({ length: 3 });

  return {
    title,
    description,
    body,
    tags
  };
};

export default generateArticle;
