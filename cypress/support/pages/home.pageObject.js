import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('usernameLink');
  }

  cheackArticlesList() {
    cy.get('.article-preview')
      .should('contain', 'No articles')
  }
}

export default HomePageObject;
