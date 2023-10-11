/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ModalObject from '../support/pages/modal.Object';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();
const modal = new ModalObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    signUpPage.visit();
  });

  it('should provide an ability to sign up user', () => {
    signUpPage.visit();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    modal.assertPageContainsRegistrationSuccessMessage();
    modal.clickOkButton();
    homePage.assertHeaderContainUsername(user.username);
    cy.logout();
  });

  it('shold show an error if unvalid email was used', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail('invalidEmail');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    modal.assertPageContainsUnvalidEmailMessage();
    modal.clickOkButton();
  });

  it('shold show an error if existing email was used', () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    modal.assertPageContainsEmailTakenMessage();
    modal.clickOkButton();
  });

  it(`shold show an error if password does not 
    meet the requirements`, () => {
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail('test@gmail.com');
    signUpPage.typePassword('unvalidPassword');
    signUpPage.clickSignUpBtn();
    modal.assertPageContainsPasswordErrorMessage();
    modal.clickOkButton();
  });
});
