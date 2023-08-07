/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  const generateUserName = (usernameLength) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let userName = '';
    for (let i = 0; i < usernameLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      userName += characters[randomIndex];
    }
    return userName;
  };

  const generateUserPassword = (passwordLength) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const alertMessage = {
    successSignUp: 'Your registration was successful!',
    failedSignUp: 'Registration failed!',
    emptyUsername: 'Username field required.',
    emptyEmail: 'Email field required.',
    emptyPassword: 'Password field required.',
    usernameTaken: 'Username already taken.',
    emailTaken: 'Email already taken.',
    shortUsername: 'Too short username.',
    longUsername: 'Too long username.',
    usernameStarsWithDigit: 'Username should start with letter',
    usernameWithSpecSymbol: 'Username should not include special symbols',
    invalidEmail: 'Email must be a valid email.',
    invalidPassword: 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
  };

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should allow to register with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    homePage.assertWindowForSucsessSignUp(alertMessage.successSignUp);

    homePage.clickOnOkBtnOnSignUpModal();

    homePage.assertHeaderContainUsername(user.username);
    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/register');
  });

  it('should not allow to register without username', () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.emptyUsername);

    cy.url().should('include', '/register');
  });

  it('should not allow to register without email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.emptyEmail);

    cy.url().should('include', '/register');
  });

  it('should not allow to register without password', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.emptyPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with taken username', () => {
    const takenUsername = 'Username32';

    cy.register();

    signUpPage.typeUsername(takenUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.usernameTaken);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with taken email', () => {
    const takenEmail = 'testing16@gmail.com';

    cy.register();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(takenEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.emailTaken);

    cy.url().should('include', '/register');
  });

  it('should allow to register with username with 3 symbols', () => {
    const usernameSymbols3 = generateUserName(3);

    signUpPage.typeUsername(usernameSymbols3);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    homePage.assertWindowForSucsessSignUp(alertMessage.successSignUp);

    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/register');
  });

  it('should allow to register with username with 40 symbols', () => {
    const usernameSymbols40 = generateUserName(40);

    signUpPage.typeUsername(usernameSymbols40);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    homePage.assertWindowForSucsessSignUp(alertMessage.successSignUp);

    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/register');
  });

  it('should not allow to register with username with 2 symbols', () => {
    const usernameSymbols2 = generateUserName(2);

    signUpPage.typeUsername(usernameSymbols2);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.shortUsername);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with username with 1 symbol', () => {
    const usernameSymbol1 = generateUserName(1);

    signUpPage.typeUsername(usernameSymbol1);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.shortUsername);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with username with 41 symbols', () => {
    const usernameSymbols41 = generateUserName(41);

    signUpPage.typeUsername(usernameSymbols41);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.longUsername);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with username with 50 symbols', () => {
    const usernameSymbols50 = generateUserName(50);

    signUpPage.typeUsername(usernameSymbols50);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.longUsername);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with username starting from number', () => {
    signUpPage.typeUsername(`1${user.username}`);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.usernameStarsWithDigit);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with username with special symbols', () => {
    signUpPage.typeUsername(`#${user.username}`);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.usernameWithSpecSymbol);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with email without [name] part', () => {
    const emailWithoutName = '@gmail.com';

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutName);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidEmail);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with email without @', () => {
    const userNameForEmail = generateUserName(10);
    const emailWithoutAt = `${userNameForEmail}gmail.com`;

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutAt);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidEmail);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with email without [top-domain]', () => {
    const userNameForEmail = generateUserName(10);
    const emailWithoutTopDomain = `${userNameForEmail}@gmail`;

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutTopDomain);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidEmail);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with email without [domain]', () => {
    const userNameForEmail = generateUserName(10);
    const emailWithoutDomain = `${userNameForEmail}@com`;

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutDomain);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidEmail);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with email without dot', () => {
    const userNameForEmail = generateUserName(10);
    const emailWithoutDot = `${userNameForEmail}@gmailcom`;

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(emailWithoutDot);
    signUpPage.typePassword(user.password);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidEmail);

    cy.url().should('include', '/register');
  });

  it('should allow to register with password with 8 symbols', () => {
    const passwordSymbols8 = generateUserPassword(5);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols8}1aQ`);
    signUpPage.clickOnSignUpBtn();

    homePage.assertWindowForSucsessSignUp(alertMessage.successSignUp);

    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/register');
  });

  it('should allow to register with password with 30 symbols', () => {
    const passwordSymbols30 = generateUserPassword(27);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols30}1aQ`);
    signUpPage.clickOnSignUpBtn();

    homePage.assertWindowForSucsessSignUp(alertMessage.successSignUp);

    cy.url().should('include', '/#/');
    cy.url().should('not.include', '/register');
  });

  it('should not allow to register with password with 5 symbols', () => {
    const passwordSymbols5 = generateUserPassword(2);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols5}1aQ`);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with password with 7 symbols', () => {
    const passwordSymbols7 = generateUserPassword(4);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols7}1aQ`);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with password with 31 symbols', () => {
    const passwordSymbols31 = generateUserPassword(28);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols31}1aQ`);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with password with 50 symbols', () => {
    const passwordSymbols50 = generateUserPassword(47);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols50}1aQ`);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with password without digits', () => {
    const passwordSymbols10 = generateUserPassword(10);

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(passwordSymbols10);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with password without uppercase letter', () => {
    const passwordSymbols10 = generateUserPassword(10).toLowerCase();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols10}1`);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });

  it('should not allow to register with password without lowercase letter', () => {
    const passwordSymbols10 = generateUserPassword(10).toUpperCase();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(`${passwordSymbols10}1`);
    signUpPage.clickOnSignUpBtn();

    signUpPage.assertWindowForFailedSignUp(alertMessage.failedSignUp);
    signUpPage.assertWindowForFailedSignUp(alertMessage.invalidPassword);

    cy.url().should('include', '/register');
  });
});
