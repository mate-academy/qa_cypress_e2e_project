/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import faker from "faker";

const signUpPage = new SignUpPageObject;
const homePage = new HomePageObject;

describe('Sign Up page', () => {
  let user;

  const randomNumber = Math.ceil(Math.random(1000) * 1000);

  const fakeUser = {
    wrongUsername: faker.lorem.word(2),
    wrongEmail: faker.internet.email(),
    wrongPassword: faker.internet.password(),
    invalidEmail: 'testset' + `${randomNumber}` + 'mail.com',
    invalidPassword: faker.lorem.word(7),
  }

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up', () => {
    signUpPage.visit();
    
     signUpPage.typeUsernameField(user.username);
     signUpPage.typeEmail(user.email);
     signUpPage.typePasssword(user.password);
     signUpPage.clickSignUpBtn();
     homePage.assertHeaderContainUsername(user.username);
     signUpPage.assertAlertContainMessage();
  });
  it('should not provide an ability to sign up with invalid username', () => {
    signUpPage.visit();
    signUpPage.typeUsernameField(fakeUser.wrongUsername);
    signUpPage.typeEmail(user.email);
    signUpPage.typePasssword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
    signUpPage.assertUrlInclude(signUpPage.url);
  })

  it('should not provide an ability to sign up with invalid email', () => {
    signUpPage.visit();
    signUpPage.typeUsernameField(user.username);
    signUpPage.typeEmail(fakeUser.invalidEmail);
    signUpPage.typePasssword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
    signUpPage.assertUrlInclude(signUpPage.url);
})

  it('should not provide an ability to sign up with invalid password', () => {
    signUpPage.visit();
    signUpPage.typeUsernameField(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePasssword(fakeUser.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
    signUpPage.assertAlertErrorMessage();

  })
});