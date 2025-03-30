/// <reference types='cypress' />
/// <reference types='../support' />
import faker from "faker";

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  const randomNumber = Math.ceil(Math.random(1000) * 1000);

  const fakeUser = {
    wrongEmail: faker.internet.email(),
    wrongPassword: faker.internet.password(),
    invalidEmail: 'testset' + `${randomNumber}` + 'mail.com',
  }

  beforeEach(() => {
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
    signInPage.assertUrlNotInclude()

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with invalid Email', () => {
    signInPage.visit();    
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(fakeUser.wrongEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.assertUrlInclude(signInPage.url);
    signInPage.assertAlertContainErrorMessage();
  });

  it('should not provide an ability to log in with invalid Password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(fakeUser.wrongPassword);
    signInPage.clickSignInBtn();
    signInPage.assertUrlInclude(signInPage.url);
    signInPage.assertAlertContainErrorMessage();

  })
});
