/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPage from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import userGenerator from '../plugins/userGenerator';
import faker from 'faker';
import {
  welcomeMessage,
  registrationSuccessfulMessage,
  registrationFailedMessage,
  usernameEmptyFieldMessage,
  usernameExistingTakenMessage,
  emailEmptyFieldMessage,
  emailExistingTakenMessage,
  passwordEmptyFieldMessage,
  confirmationMessage
} from '../plugins/alertMessages';

describe('Sign Up page', () => {
  let nameNextUser;
  let emailNextUser;
  let passwordNextUser;
  let user;
  const signUpPage = new SignUpPage();

  before(() => {
    cy.task('db:clear');
    user = userGenerator.generateUser();
    nameNextUser = faker.name.firstName();
    emailNextUser = faker.internet.email();
    passwordNextUser = faker.internet.password();
  });

  beforeEach(() => {
    cy.visit('/#/register');
  });

  it('should create a new user', () => {
    signUpPage.fillForm(user.username, user.email, user.password);
    signUpPage.submitSignUpForm();

    cy.contains(welcomeMessage);
    cy.contains(registrationSuccessfulMessage);
    cy.contains(confirmationMessage).click();

    const homePage = new HomePageObject();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should see warning message for empty username field', () => {
    signUpPage.fillForm('', user.email, user.password);
    signUpPage.submitSignUpForm();

    cy.contains(registrationFailedMessage);
    cy.contains(usernameEmptyFieldMessage);
    cy.contains(confirmationMessage).click();
  });

  it('should not allow registration with existing username', () => {
    signUpPage.fillForm(user.username, emailNextUser, passwordNextUser);
    signUpPage.submitSignUpForm();

    cy.contains(registrationFailedMessage);
    cy.contains(usernameExistingTakenMessage);
    cy.contains(confirmationMessage).click();
  });

  it('should see warning message for empty email field', () => {
    signUpPage.fillForm(user.username, '', user.password);
    signUpPage.submitSignUpForm();

    cy.contains(registrationFailedMessage);
    cy.contains(emailEmptyFieldMessage);
    cy.contains(confirmationMessage).click();
  });

  it('should not allow registration with existing email', () => {
    signUpPage.fillForm(nameNextUser, user.email, passwordNextUser);
    signUpPage.submitSignUpForm();

    cy.contains(registrationFailedMessage);
    cy.contains(emailExistingTakenMessage);
    cy.contains(confirmationMessage).click();
  });

  it('should see warning message for empty password field', () => {
    signUpPage.fillForm(user.username, user.email, '');
    signUpPage.submitSignUpForm();

    cy.contains(registrationFailedMessage);
    cy.contains(passwordEmptyFieldMessage);
    cy.contains(confirmationMessage).click();
  });
});
