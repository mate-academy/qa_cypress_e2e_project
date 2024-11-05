import PageObject from '../PageObject';
class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.get('[placeholder="Article Title"]');
  }

  get articleAboutField() {
    return cy.get(`[placeholder="What's this article about?"`);
  }

  get articleBodyField() {
    return cy.get('[placeholder="Write your article (in markdown)"');
  }

  get articleTagsField() {
    return cy.get('[placeholder="Enter tags"');
  }

  get submitButton() {
    return cy.get('[type="submit"]');
  }

  get deleteArticleButton() {
    return cy.get('.btn.btn-outline-danger').contains('Delete Article');
  }

  createArticle(article) {
    const { title, description, body, tag } = article;

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
};
export default ArticlePageObject;
