/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let username;
  let email;
  let password;

  before(() => {});

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      username = user.username;
      email = user.email;
      password = user.password;
    });
  });

  it('should sign up succefully', () => {
    signInPage.visit();
    cy.register(email, username, password);
  });

  it('should not sign up if invalid email', () => {
    homePage.visit();
    cy.contains('a', 'Sign up').click();

    cy.get('input[placeholder="Username"]').type('username');
    cy.get('input[placeholder="Email"]').type('usermail');
    cy.get('input[placeholder="Password"]').type('userpassword');

    cy.contains('button', 'Sign up').click();

    cy.contains('div[class="swal-title"]', 'Registration failed!').should(
      'be.visible'
    );
  });
});
