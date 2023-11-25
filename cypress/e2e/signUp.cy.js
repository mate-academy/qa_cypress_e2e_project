/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import faker from 'faker';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      signUpPage.visit();
    });
  });

  it('should register user', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpButton();
    signUpPage.clickSomeButton();
  });

  it('should not register user with not existing credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('wronguser.password');
    signUpPage.clickSignUpButton();
    signUpPage.clickSomeButton();
  });
});
