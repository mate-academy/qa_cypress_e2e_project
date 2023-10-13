/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signup.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should create new user', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user.username);
  });
  it('should failed registration by wrong email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeInvalidemail();
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
  });
  it('should failed registration by wrong email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeInvalidemail(user.email);
    signUpPage.typeInvalidPassword();
    signUpPage.clickSignUpBtn();

    cy.get('.swal-title').should('contain', 'Registration failed!');
  });
});
