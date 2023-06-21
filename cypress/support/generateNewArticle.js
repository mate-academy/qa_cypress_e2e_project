import faker from "faker";

function generateNewArticle() {
  const title = faker.lorem.word(3);
  const description = faker.lorem.sentence(5);
  const body = faker.lorem.sentence();
  const tags = faker.lorem.word(1);

  return { title, description, body, tags };
}

module.exports = { generateNewArticle };