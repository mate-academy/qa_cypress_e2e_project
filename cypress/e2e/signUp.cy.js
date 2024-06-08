/// <reference types='cypress' />
/// <reference types='../support' />

import { homePage } from '../support/pages//ProjectPages/HomePage';
import { signUpPage } from '../support/pages//ProjectPages/SignUpPage';

describe('SignUp page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(5);
  });
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should sign up (positive)', () => {
    homePage.visitSignUpPage();
    signUpPage.eterWalidData(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertWalidData();
  });

  it('should sign up (negative)', () => {
    homePage.visitSignUpPage();
    signUpPage.eterWalidDataAndemptyemailField(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertemptyemailField();
    signUpPage.ClickOkBtn();

    signUpPage.eterWalidDataAndemptyUsernamelField(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertemptyUsernamelField();
    signUpPage.ClickOkBtn();

    signUpPage.eterWalidDataAndemptyPasswordField(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertemptyPasswordField();
    signUpPage.ClickOkBtn();

    signUpPage.eterWalidDataAndemailWithoutAt(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertInvalidemail();
    signUpPage.ClickOkBtn();

    signUpPage.eterWalidDataAndemailWithoutDot(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertInvalidemail();
    signUpPage.ClickOkBtn();

    signUpPage.eterWalidDataAndemailWithoutGmailDotCom(user);
    signUpPage.ClickSingUpBtn();
    signUpPage.AssertInvalidemail();
    signUpPage.ClickOkBtn();
  });
});
