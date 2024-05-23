import SignUpPageObject from '../support/pages/signUp.pageObject';
import { faker } from '@faker-js/faker';

describe('Sign Up Page', () => {
  const signUpPage = new SignUpPageObject();

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should sign up with valid data', () => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = '12345Qwert!';

    cy.log(`Generated data - Username: ${username}, Email: ${email}, Password: ${password}`);

    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();

    cy.url().should('not.include', '/register');
    cy.contains('Your Feed').should('be.visible');
  });

  it('Sign up with invalid data', () => {
    signUpPage.typeUsername('Zdzisiu');
    signUpPage.typeEmail('zdzisiu-mail');
    signUpPage.typePassword('zapomnialam');
    signUpPage.clickSignUpBtn();

    signUpPage.checkErrorMessage('Email must be a valid email.');
  });
});
