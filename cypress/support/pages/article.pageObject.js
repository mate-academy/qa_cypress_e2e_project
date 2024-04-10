import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get titleField() {
    return cy.getByPlaceholder('Article Title');
  }

  get descField() {
    return cy.getByPlaceholder(`What's this article about?`);
  }

  get bodyField() {
    return cy.getByPlaceholder('Write your article (in markdown)');
  }

  get tagField() {
    return cy.getByPlaceholder('Enter tags');
  }

  get publishBtn() {
    return cy.contains('.btn', 'Publish Article');
  }

  get editBtn() {
    return cy.contains('.btn', 'Edit');
  }

  get deleteBtn() {
    return cy.contains('.btn', 'Delete');
  }

  titleType(text) {
    this.titleField.type(text);
  }

  descType(text) {
    this.descField.type(text);
  }

  bodyType(text) {
    this.bodyField.type(text);
  }

  tagType(text) {
    this.tagField.type(text);
  }

  assertTitle(title) {
    cy.get('h1').should('contain', title);
  }

  visitBySlug(slug) {
    cy.visit(`/#/articles/${slug}`);
  }

  newArticle(title, description, body) {
    cy.get('@createdUser').then((user) => {
      cy.publishArticle(user.id, title, description, body)
        .then((response) => {
          const slug = response.body.article.slug;
          this.visitBySlug(slug);
        });
    });
  }
}

export default ArticlePageObject;
