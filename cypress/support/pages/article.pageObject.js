import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get articleAboutField() {
    return cy.findByPlaceholder(`What's this article about?`);
  }

  get articleBodyField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  get articleTagsField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get submitButton() {
    return cy.get('[type="submit"]');
  }

  get deleteArticleButton() {
    return cy.get('.btn.btn-outline-danger').contains('Delete Article');
  }

  createArticle(article) {
    const { title, description, tag, body } = article;

    this.articleTitleField.type(title);
    this.articleAboutField.type(description);
    this.articleBodyField.type(body);
    this.articleTagsField.type(tag);

    this.submitButton.click();

    cy.contains(title).should('be.visible');
  }

  editArticle(articleTitle, newArticle) {
    cy.visit(`${this.url}/${articleTitle}`);
    this.createArticle(newArticle);
  }

  clickDeleteButton() {
    this.deleteArticleButton.click();
  }
};

export default ArticlePageObject;
