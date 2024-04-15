
const passwords = [
  'short1',
  'password',
  'TESTING123',
  'AbCdEfGh'
];

const emails = [
  'riotgmail.com',
  'riot@gmailcom',
  'riot@gmail.',
  'riot@.com',
  '@gmail.com'
];

const randomEmail = Math.floor(Math.random() * emails.length);
const invalidEmail = emails[randomEmail];
const emailValidationMessage = 'Email must be a valid email.';

const randomPassword = Math.floor(Math.random() * passwords.length);
const invalidPassword = passwords[randomPassword];
const passwordValidationMessage = 'Password must be 8 ' +
'characters long and include 1 number, ' +
'1 uppercase letter, and 1 lowercase letter.';

const variables = {
  invalidPassword,
  passwordValidationMessage,
  invalidEmail,
  emailValidationMessage
};

module.exports = {
  variables
};
