import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  visitYourFeed() {
    cy.visit('/#/my-feed/');
  }
  
  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get navBar() {
    return cy.getByDataCy('header-navbar');
  }

  assertDeletingArticle(modalText) {
    cy.get('.article-preview').should('contain', modalText);
  }
}

export default HomePageObject;
