import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  clickOnBtn(btnDataQa) {
    cy.getByDataQa(btnDataQa).eq(0).click();
  }

  fillField(field, input) {
    cy.getByDataQa(field).type(input);
  }

  assertDeletingArticle(title) {
    cy.getByDataQa('article-list').should('contain', 'No articles are here... yet.');
    cy.getByDataQa('article-list').should('not.have.value', title);
  }
}

export default HomePageObject;
