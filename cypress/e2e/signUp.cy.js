/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import PopUpPageObject from '../support/pages/popUp.pageObjects';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const signUp = new SignUpPageObject();
const popUp = new PopUpPageObject();
const signIn = new SignInPageObject();

describe('Sign Up page', () => {
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    homePage.signUpBtnClick();
  });

  it('should successfully redirected to Sign In page', () => {
    signUp.clickHaveAnAccountLink();

    signIn.assertSignInPage();
  });

  it('should successfully sign up', () => {
    signUp.signUpProcess('successWithValidData');

    popUp.popUpAssert('registration: success');

    homePage.assertHeaderContainUsername(signUp.genData.user.username);
  });

  it('shouldn\'t sign up when username is empty', () => {
    signUp.signUpProcess('whithoutUsername');

    popUp.popUpAssert('registration: without username');
  });

  it('shouldn\'t sign up when email is empty', () => {
    signUp.signUpProcess('withoutEmail');

    popUp.popUpAssert('registration: without email');
  });

  it('shouldn\'t sign up when password is empty', () => {
    signUp.signUpProcess('withoutPassword');

    popUp.popUpAssert('registration: without password');
  });

  it('shouldn\'t sign up when password is shorter than 8 symbols', () => {
    signUp.signUpProcess('passwordLessThan8');

    popUp.popUpAssert('registration: password validation');
  });

  it('shouldn\'t sign up when password without number', () => {
    signUp.signUpProcess('passwordWithoutNumber');

    popUp.popUpAssert('registration: password validation');
  });

  it('shouldn\'t sign up when password without uppercase letter', () => {
    signUp.signUpProcess('passwordWithoutUpper');

    popUp.popUpAssert('registration: password validation');
  });

  it('shouldn\'t sign up when email without name', () => {
    signUp.signUpProcess('emailWithoutName');

    popUp.popUpAssert('registration: email failed');
  });

  it('shouldn\'t sign up when email without at (@)', () => {
    signUp.signUpProcess('emailWithoutAt');

    popUp.popUpAssert('registration: email failed');
  });

  it('shouldn\'t sign up when email without domain', () => {
    signUp.signUpProcess('emailWithoutDomain');

    popUp.popUpAssert('registration: email failed');
  });

  it('shouldn\'t sign up when email without top-domain', () => {
    signUp.signUpProcess('emailWithoutTopDomain');

    popUp.popUpAssert('registration: email failed');
  });

  it('shouldn\'t sign up when email without dot (.)', () => {
    signUp.signUpProcess('emailWithoutDot');

    popUp.popUpAssert('registration: email failed');
  });

  it('shouldn\'t sign up when email with double at (@)', () => {
    signUp.signUpProcess('emailWithDoubleAt');

    popUp.popUpAssert('registration: email failed');
  });

  it('shouldn\'t sign up when email with double dot (.)', () => {
    signUp.signUpProcess('emailWithDoubleDot');

    popUp.popUpAssert('registration: email failed');
  });
});
