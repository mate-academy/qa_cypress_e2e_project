import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.get('[placeholder="Article Title"]');
  }

  get aboutField() {
    return cy.get('[placeholder="What\'s this article about?"]');
  }

  get articleField() {
    return cy.get('[placeholder="Write your article (in markdown)"]');
  }

  get publishButton() {
    return cy.get('.btn-primary');
  }

  get title() {
    return cy.get('h1');
  }

  get article() {
    return cy.get('p');
  }

  get editButton() {
    // eslint-disable-next-line max-len
    return cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary');
  }

  get deleteButton() {
    // eslint-disable-next-line max-len
    return cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-danger');
  }

  typeTitle(title) {
    this.titleField.clear();
    this.titleField.type(title);
  }

  typeAbout(about) {
    this.aboutField.clear();
    this.aboutField.type(about);
  }

  typeArticle(article) {
    this.articleField.clear();
    this.articleField.type(article);
  }

  publishClick() {
    this.publishButton.click();
  }

  editClick() {
    this.editButton.click();
  }

  deleteClick() {
    this.deleteButton.click();
  }
}

export default ArticlePageObject;
