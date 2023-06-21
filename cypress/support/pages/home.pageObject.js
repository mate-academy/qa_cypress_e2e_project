import PageObject from '../PageObject';

class HomePageObject extends PageObject { // I understood how to add data-cy attributes, but it isn't working for me, i don't know why
  url = '/#/';

  get usernameLink() {
    return cy.get(':nth-child(4) > .nav-link'); //need changes
  }

  get articlesList(){
    return cy.get('.article-preview');
  }

  get signUpLink(){
    // return cy.contains('.nav-link', 'Sign Up');
    return cy.get(':nth-child(3) > .nav-link'); // need changes
  }

  get signInLink(){
    // return cy.contains('.nav-link', 'Sign In');
    return cy.get(':nth-child(2) > .nav-link'); // need changes
  }
}

export default HomePageObject;
