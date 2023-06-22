import PageObject from '../PageObject';

class ArticleEditPageObject extends PageObject {
  url = '/#/editor/';

  typeNewArticleTitle(title) {
    cy.getByDataQa('input-article-title')
      .clear()
      .type(title);
  }

  typeNewArticleDescription(description) {
    cy.getByDataQa('input-article-description')
      .clear()
      .type(description);
  }

  typeNewArticleBody(body) {
    cy.getByDataQa('input-article-body')
      .clear()
      .type(body);
  }

  typeNewArticleTag(tag) {
    cy.getByDataQa('input-article-tags')
      .clear()
      .type(tag);
  }

  clickPublishArticle() {
    cy.getByDataQa('publish-article-btn')
      .click();
  }
}

export default ArticleEditPageObject;