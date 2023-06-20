import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    // return cy.getByDataCy('username-link');
    return cy.get(':nth-child(4) > .nav-link');
  }

  cheackArticlesList() {
    cy.get('.article-preview')
      .should('contain', 'No articles');
  }
}

export default HomePageObject;
