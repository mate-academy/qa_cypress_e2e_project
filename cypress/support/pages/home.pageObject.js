import PageObject from '../PageObject';

class HomePageObject extends PageObject { // I understood how to add data-cy attributes, but it isn't working for me, i don't know why
  url = '/#/';

  get usernameLink() {
    return cy.get(':nth-child(4) > .nav-link'); //need changes
  }

  get articlesList(){
    return cy.get('.article-preview');
  }
}

export default HomePageObject;
