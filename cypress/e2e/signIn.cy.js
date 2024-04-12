/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ValidatedMessagesPage from '../support/pages/validatedMessages.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const validatedMessagesPage = new ValidatedMessagesPage();

describe('Sign In page', () => {
  let user;
  let email;

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

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with email without @', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    cy.replaceString(user.email, '@').then((newEmail) => {
      email = newEmail;
      signInPage.typeEmail(email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      signInPage.assertHaveText(
        validatedMessagesPage.swalTitle,
        validatedMessagesPage.loginFailedMessage
      );
      signInPage.assertHaveText(
        validatedMessagesPage.swalText,
        validatedMessagesPage.unvalidEmailMessage
      );
    });
  });

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail('test@test.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    signInPage.assertHaveText(
      validatedMessagesPage.swalTitle,
      validatedMessagesPage.loginFailedMessage
    );
    signInPage.assertHaveText(
      validatedMessagesPage.swalText,
      validatedMessagesPage.invalidCredantialsMessage
    );
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword('Wrong11Password?');
    signInPage.clickSignInBtn();

    signInPage.assertHaveText(
      validatedMessagesPage.swalTitle,
      validatedMessagesPage.loginFailedMessage
    );
    signInPage.assertHaveText(
      validatedMessagesPage.swalText,
      validatedMessagesPage.invalidCredantialsMessage
    );
  });
});
