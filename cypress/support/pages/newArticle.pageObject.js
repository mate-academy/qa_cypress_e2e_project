import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor/';

  typeArticleTitle(title) {
    cy.getByDataQa('input-article-title')
      .type(title);
  }

  typeArticleDescription(description) {
    cy.getByDataQa('input-article-description')
      .type(description);
  }

  typeArticleBody(body) {
    cy.getByDataQa('input-article-body')
      .type(body);
  }

  typeArticleTag(tag) {
    cy.getByDataQa('input-article-tags')
      .type(tag);
  }

  clickPublishArticle() {
    cy.getByDataQa('publish-article-btn')
      .click();
  }
}

export default NewArticlePageObject;
