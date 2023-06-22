import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('usernamelink');
  }

  cheackArticlesList() {
    cy.get('.article-preview')
      .should('contain', 'No articles')
  }

  checkRegistration() {
    cy.get('.swal-text')
      .should('contain', 'Your registration was successful!');
  }
}

export default HomePageObject;
