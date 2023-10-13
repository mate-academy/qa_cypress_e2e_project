/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();

const wrongData = {
  fakeEmail: faker.internet.email(),
  fakePassword: faker.internet.password()
};

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.confirmUserNameInProfile(user.username);
    signInPage.assertForHomePageBanner();
    signInPage.assertWebsiteLogo();
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();
    signInPage.typeEmail(wrongData.fakeEmail);
    signInPage.typePassword(wrongData.fakePassword);
    signInPage.clickSignInBtn();
    signInPage.confirmFailSignIn();
    signInPage.clickFailBtn();
  });
});
