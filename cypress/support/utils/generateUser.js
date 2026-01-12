import { faker } from '@faker-js/faker';

function generateUser() {
  const randomNumber = Math.ceil(Math.random() * 10000);
  return {
    username: faker.person.firstName({ length: 6 }) + `${randomNumber}`,
    email: 'test' + `${randomNumber}` + '@mail.com',
    password: '12345Qwert!'
  };
};

export default generateUser;
