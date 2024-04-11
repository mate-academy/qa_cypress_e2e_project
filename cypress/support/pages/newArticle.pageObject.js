import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  typeArticleTitle(title) {
    return cy.getByDataQa('article-title').type(`{selectAll}${title}`, );
  }

  typeArticleDescription(description) {
    return cy.getByDataQa('article-description').type(`{selectAll}${description}`);
  }

  typeArticleBody(body) {
    return cy.getByDataQa('article-body').type(`{selectAll}${body}`);
  }

  typeArticleTag(tag) {
    return cy.getByDataQa('article-tag').type(tag);
  }

  get clickOnSubmitButton() {
    return cy.getByDataQa('submit-button').click();
  }
}

export default NewArticlePageObject;
