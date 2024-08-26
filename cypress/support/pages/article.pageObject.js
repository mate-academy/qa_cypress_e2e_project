import PageObject from '../PageObject';

class ArticlePage extends PageObject {
  url = '/#/articles/';
  visitEditor() {
    this.visit('/#/editor');
  }

  visitArticleUrl(title) {
    cy.visit(`${this.url}${title.toLowerCase()}`);
  }

  visitArticle(slug) {
    this.visit(`/article/${slug}`);
  }

  createArticle(title, description, body) {
    cy.getByDataCy('article-title-field').clear().type(title);
    cy.getByDataCy('article-description-field').clear().type(description);
    cy.getByDataCy('article-body-field').clear().type(body);

    cy.getByDataCy('article-publish-btn').click();
  }

  edit() {
    cy.getByDataCy('article-publish-btn').click();
  }

  delete() {
    cy.getByDataCy('delete-btn').eq(0).click();
  }

  assert(title) {
    cy.get('h1').should('contain', title);
  }
}

export default ArticlePage;
