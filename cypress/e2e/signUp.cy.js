/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');


import SignUpPageObject from "../support/pages/signUp.pageObject";

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up after filling in required fields with valid data', () => {
    signUpPage.visit();
    signUpPage.fillInUsernameField(user.username);
    signUpPage.fillInEmailField(user.email);
    signUpPage.fillInPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertSuccessSignUp(user.email, user.password, user.username);
  });

  it('should not provide an ability to sign up with an empty username field', () => {
    signUpPage.visit();
    signUpPage.fillInEmailField(user.email);
    signUpPage.fillInPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertErrorMessage('Registration failed! Username field required.')
  })
  

  it('should not provide an ability to sign up with an empty email field', () => {
    signUpPage.visit();
    signUpPage.fillInUsernameField(user.username);
    signUpPage.fillInPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertErrorMessage('Registration failed! Email field required.')
  })

  it('should not provide an ability to sign up with an empty password field', () => {
    signUpPage.visit();
    signUpPage.fillInUsernameField(user.username);
    signUpPage.fillInEmailField(user.email);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertErrorMessage('Registration failed!Password field required.')
  })

  it('should not provide an ability to sign up with email without @', () => {
    const wrongEmail = faker.lorem.word() + 'gmail.com'
    signUpPage.visit();
    signUpPage.fillInUsernameField(user.username);
    signUpPage.fillInEmailField(wrongEmail);
    signUpPage.fillInPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertErrorMessage('Registration failed! Email must be a valid email.')
  })

  it('should not provide an ability to sign up with taken email', () => {
    const nonTakenUsername = faker.name.firstName()
    cy.register(user.email, user.username, user.password)
    signUpPage.visit();
    signUpPage.fillInUsernameField(nonTakenUsername);
    signUpPage.fillInEmailField(user.email);
    signUpPage.fillInPasswordField(user.password);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertErrorMessage('Registration failed! Email already taken.')
  })
  
  it('should not provide an ability to sign in with too short password', () => {
    const shortPassword = 'Qwerty1'
    signUpPage.visit();
    signUpPage.fillInUsernameField(user.username);
    signUpPage.fillInEmailField(user.email);
    signUpPage.fillInPasswordField(shortPassword);
    signUpPage.clickOnSignUpBtn();
    signUpPage.assertErrorMessage('Registration failed! Password must be 8 characters')
  })
});
