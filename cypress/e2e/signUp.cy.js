/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

describe('Sign Up page', () => {
  let user;
  const signUpPage = new SignUpPageObject();

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });

    signUpPage.visit();
  });

  it('should create a user with valid credentials', function () {
    signUpPage.fillForm(user);
    signUpPage.clickOnSubmitButton();

    signUpPage.checkUsernameValue(user.username);
  });

  it(`should not allow to create a user with invalid email`, function () {
    signUpPage.fillForm({ ...user, email: '123456' });
    signUpPage.clickOnSubmitButton();

    signUpPage.checkModalTitle('Registration failed!');
  });

  it(`should not allow to create a user with invalid password`, function () {
    signUpPage.fillForm({ ...user, password: '123456' });
    signUpPage.clickOnSubmitButton();

    signUpPage.checkModalTitle('Registration failed!');
  });
});
