import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';

  typeNewArticleTitle(title) {
    cy.getByDataCy('new-article-title')
      .type(title);
  }

  typeNewArticleDescription(description) {
    cy.getByDataCy('new-article-description')
      .type(description);
  }

  typeNewArticleBody(body) {
    cy.getByDataCy('new-article-body')
      .type(body);
  }

  typeNewArticleTag(tag) {
    cy.getByDataCy('new-article-tag')
      .eq(1)
      .type(tag);
  }

  typeEditArticleTitle(title) {
    cy.getByDataCy('new-article-title')
      .clear()
      .type(title);
  }

  typeEditArticleDescription(description) {
    cy.getByDataCy('new-article-description')
      .clear()
      .type(description);
  }

  typeEditArticleBody(body) {
    cy.getByDataCy('new-article-body')
      .clear()
      .type(body);
  }

  clickPublishButton() {
    cy.getByDataCy('submit-button')
      .click();
  }

  createArticle(title, description, body, tag) {
  cy.createArticle(title, description, body, tag)
    .then((response) => {
      const slug = response.body.article.slug;

      cy.visit(`#/articles/${slug}`);
    });
  }
}

export default NewArticlePageObject;