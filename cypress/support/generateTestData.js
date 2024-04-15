const { faker } = require('@faker-js/faker');

function generateArticle() {
  const article = {
    title: 'SunnyDay' + Math.floor(Math.random() * 1000),
    description: 'Hitrii lis',
    body: 'Everybody',
  };
  return article;
}

function generateUser() {
  const randomNumber = Math.ceil(Math.random(1000) * 1000);
  const user = {
    username: faker.person.firstName() + `${randomNumber}`,
    email: 'test' + `${randomNumber}` + '@mail.com',
    password: '12345Qwert!',
  };

  return user;
}

//export default {generateArticle, generateUser};
