import { faker } from '@faker-js/faker';

export function generateData() {
   const username = faker.internet.userName();
   const email = faker.internet.email();
   const password = '12345Qwert!';


   return { username, email, password };
};
