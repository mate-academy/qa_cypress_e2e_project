import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get newArticleLink() {
    return cy.get('.container > .nav > :nth-child(2) > .nav-link');
  }

  get titleField() {
    return cy.get('input[placeholder="Article Title"]');
  }

  get descriptionField() {
    return cy.get('input[placeholder="What\'s this article about?"]');
  }

  get bodyField() {
    return cy.get(':nth-child(3) > .form-control');
  }

  get submitBtn() {
    return cy.contains('button', 'Publish Article');
  }

  get editBtn() {
    return cy.get('.article-actions > .article-meta > :nth-child(3) > .btn-outline-secondary > span');
  }

  get deleteBtn() {
    return cy.contains('button', 'Delete Article');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickEditBtn() {
    this.editBtn.click();
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }
}

export default ArticlePageObject;
