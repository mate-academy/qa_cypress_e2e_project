import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const SignUpPage = new SignUpPageObject();
const HomePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((userData) => {
      user = userData;
    });
    SignUpPage.visit();
  });

  it('should sign up a user with valid credentials', () => {
    SignUpPage.signUpAndResult(user, 'Your registration was successful!');
    HomePage.assertHeaderContainUsername(user.username);
  });

  it('should notify a user if email is taken', () => {
    cy.register(user);
    SignUpPage.signUpAndResult(user, 'Email already taken');
  });

  it('should display an error message for incorrect email', () => {
    SignUpPage.signUpAndResult(
      { ...user, email: 'invalidEmail' },
      'Email must be a valid email'
    );
  });

  it('should display an error message for weak password', () => {
    SignUpPage.signUpAndResult(
      { ...user, password: '1111' },
      'Registration failed!'
    );
  });
});
