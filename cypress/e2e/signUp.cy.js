/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  const wrongData = {
    emptyEmail: '',
    emptyPassword: '',
    emptyUsername: '',
    badUsername: 'm',
    emailWithoutAt: 'mkozynukr.net',
    emailWithoutDomain: 'mkozyn@.net',
    emailWithoutName: '@google.com',
    emailWithoutDot: 'mkozyn@ukrnet'
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((genarateUser) => {
      user = genarateUser;
    });
  });

  it('should provide an abillity to register using valid creds', () => {
    signUpPage.visit();

    signUpPage.registerAllRequiredFields(user.username,
      user.email, user.password);

    signUpPage.AssertTheSucessfulMessage();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with wrong credentials', () => {
    signUpPage.visit();

    signUpPage.registerAllRequiredFields(
      wrongData.emptyUsername,
      user.email,
      user.password
    );

    signUpPage.assertTheMessageErrorEmptyUsername();

    //

    signUpPage.registerAllRequiredFields(
      user.username,
      wrongData.emptyEmail,
      user.password
    );

    signUpPage.assertTheMessageErrorEmptyEmail();

    //

    signUpPage.registerAllRequiredFields(
      user.username,
      user.email,
      wrongData.emptyPassword
    );

    signUpPage.assertTheMessageErrorEmptyPassword();

    //
    signUpPage.registerAllRequiredFields(
      user.username,
      wrongData.emailWithoutAt,
      user.password
    );

    signUpPage.assertTheMessageErrorEmailNonvalid();
    //
    signUpPage.registerAllRequiredFields(
      user.username,
      wrongData.emailWithoutDomain,
      user.password
    );

    signUpPage.assertTheMessageErrorEmailNonvalid();

    //
    signUpPage.registerAllRequiredFields(
      user.username,
      wrongData.emailWithoutName,
      user.password
    );

    signUpPage.assertTheMessageErrorEmailNonvalid();

    //
    signUpPage.registerAllRequiredFields(
      user.username,
      wrongData.emailWithoutDot,
      user.password
    );

    signUpPage.assertTheMessageErrorEmailNonvalid();
  });
});
