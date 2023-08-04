/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPage from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

describe('Sign Up page', () => {
  let name;
  let email;
  let password;
  const signUpPage = new SignUpPage();

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.visit('/#/register');
    name = faker.name.firstName();
    email = faker.internet.email();
    password = faker.internet.password();
  });

  it('should create a new user', () => {
    signUpPage.fillName(name);
    signUpPage.fillEmail(email);
    signUpPage.fillPassword(password);

    signUpPage.submitSignUpForm();

    cy.contains('Welcome!');
    cy.contains('Your registration was successful!');
    cy.contains('OK').click();

    const homePage = new HomePageObject();
    homePage.assertHeaderContainUsername(name);
  });

  it('should see warning message for empty username field', () => {
    signUpPage.fillEmail(email);
    signUpPage.fillPassword(password);

    signUpPage.submitSignUpForm();

    cy.contains('Registration failed!');
    cy.contains('Username field required');
    cy.contains('OK').click();
  });

  it('should see warning message for empty email field', () => {
    signUpPage.fillName(name);
    signUpPage.fillPassword(password);

    signUpPage.submitSignUpForm();

    cy.contains('Registration failed!');
    cy.contains('Email field required');
    cy.contains('OK').click();
  });

  it('should see warning message for empty password field', () => {
    signUpPage.fillName(name);
    signUpPage.fillEmail(email);

    signUpPage.submitSignUpForm();

    cy.contains('Registration failed!');
    cy.contains('Password field required');
    cy.contains('OK').click();
  });
});
