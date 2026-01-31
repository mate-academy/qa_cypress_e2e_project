/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const invalidData = {
  email: faker.internet.email(),
  password: faker.internet.password()
};

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.register(user.email, user.username, user.password);
      signInPage.visit();
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.login(user.email, user.password);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.login(invalidData.email, invalidData.password);

    signInPage.assertErrorMessage('Invalid user credentials.');
  });
});
