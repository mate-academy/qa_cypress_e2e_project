const { faker } = require('@faker-js/faker');
const moment = require('moment');

function generateUserData() {
  const randomNumber = Math.ceil(Math.random() * 1000);
  const gender = faker.helpers.arrayElement(['male', 'female']);
  const name = faker.person.firstName(gender);
  const username = `${name}${randomNumber}`;
  const email = generateEmail(username);
  const password = generatePassword(randomNumber);
  const bio = faker.lorem.sentence({ min: 3, max: 5 });

  return {
    username: username.toLowerCase(),
    email,
    password,
    bio
  };
}

function generatePassword(randomNumber) {
  const normalWord = faker.lorem.word(10);
  const capitalLetterNormal = normalWord.charAt(0).toUpperCase();
  const validPassword = `${capitalLetterNormal}${normalWord.slice(1)}${randomNumber}`;

  const word = faker.lorem.word(7);
  const capitalLetter = word.charAt(0).toUpperCase();
  const boundaryPassword = `${capitalLetter}${word.slice(1)}1`;

  const shortWord = faker.lorem.word(6);
  const capitalLetterShort = shortWord.charAt(0).toUpperCase();
  const shortPassword = `${capitalLetterShort}${shortWord.slice(1)}1`;

  const alphabeticPassword = `${capitalLetterNormal}${normalWord.slice(1)}`;

  return {
    validPassword,
    shortPassword,
    boundaryPassword,
    lowcasePassword: validPassword.toLowerCase(),
    alphabeticPassword
  };
}

function generateEmail(username) {
  const domain = faker.internet.domainWord();
  const topDomain = faker.internet.domainSuffix();

  return {
    validEmail: `test-${username.toLowerCase()}@${domain}.${topDomain}`,
    noNamePartEmail: `@${domain}.${topDomain}`,
    noAtSymbolEmail: `test-${username.toLowerCase()}${domain}.${topDomain}`,
    noDomainPartEmail: `test-${username.toLowerCase()}@.${topDomain}`,
    noDotPartEmail: `test-${username.toLowerCase()}@${domain}${topDomain}`,
    noTopDomainPartEmail: `test-${username.toLowerCase()}@${domain}.`
  };
}

function generateArticle() {
  const title = faker.lorem.sentence().toString().replace('.', '');
  const slug = title.replaceAll(' ', '-').toLowerCase();
  const description = faker.lorem.sentence().toString().replace('.', '');
  const body = faker.lorem.paragraphs(1);
  const tag = `#${faker.lorem.word({ length: { min: 3, max: 10 } })}`;
  const publishDate = moment().format('MMMM D, YYYY');

  return {
    title,
    slug,
    description,
    body,
    tag,
    publishDate
  };
}

module.exports = {
  generateUserData,
  generateArticle
};
