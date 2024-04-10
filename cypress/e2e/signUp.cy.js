/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject
  from '../support/pages/signUp.pageObject';

const signUp = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUp.visit();
  });

  it('should sign up with valid data', () => {
    signUp.typeUsername(user.username);
    signUp.typeEmail(user.email);
    signUp.typePassword(user.password);
    signUp.clickSignUpBtn();

    signUp.assertSuccessRegister();
  });

  it('should not sign up with taken email', () => {
    cy.register(user.email, user.username, user.password);

    signUp.typeUsername(user.username + 'f');
    signUp.typeEmail(user.email);
    signUp.typePassword(user.password);
    signUp.clickSignUpBtn();

    signUp.assertInvalidRegister();
  });

  it('should not sign up with blank fields', () => {
    signUp.typeUsername(' ');
    signUp.typeEmail(' ');
    signUp.typePassword(' ');
    signUp.clickSignUpBtn();

    signUp.assertInvalidRegister();
  });
});
