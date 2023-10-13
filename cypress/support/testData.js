import faker from 'faker'
// SIGN UP // 
//valid fields
export const randomEmail = faker.internet.email();
export  const randomUsername = faker.internet.userName(); 
export const randomPassword = `${faker.internet.password()}1aA`;
// non valid password
export const invalidShortPassword = 'Short'; // less then 8 symbols
export const invalidNoNumberPassword = 'Password'; // non number
export const invalidNoUppercasePassword = 'password123'; // non lowercase letter.
export const invalidNoLowercasePassword = 'PASSWORD123'; // non uppercase letter
// non valid email 
export const invalidEmail = 'pivo'; // non valid email

// ARTICLE //
export const firstTitle = 'first title'; 
export const secondTitle = 'second title'
export const firstText = 'first text'
export const secondText = 'second text'

// SETTINGS // 
export const newEmail = faker.internet.email();
export  const newUsername = faker.internet.userName();
export const newPassword = `${faker.internet.password()}1aA`
export const newBio = faker.internet.userName();
