/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);
    
    
  });

  it('should be edited using Edit button', () => {

  });

  it('should be deleted using Delete button', () => {

  });
});
