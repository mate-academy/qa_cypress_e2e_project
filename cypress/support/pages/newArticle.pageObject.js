import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get descriptionField() {
    return cy.findByPlaceholder(`What's this article about?`);
  }

  get bodyField() {
    return cy.findByPlaceholder(`Write your article (in markdown)`);
  }

  get tagField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get pubArtBtn() {
    return cy.get('.btn');
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  typeTag(tag) {
    this.tagField
      .type(tag);
  }

  clickPubArtBtn() {
    this.pubArtBtn
      .click();
  }

  assertNewArticleUrl(articleTitle) {
    cy.url()
      .should('eq', `http://localhost:1667/#/articles/${articleTitle}`);
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
