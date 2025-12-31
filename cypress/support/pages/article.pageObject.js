import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get navNewArticle() {
    return cy.getByDataQa('nav-new-article');
  }

  get articleTitle() {
    return cy.getByDataQa('article-title-text');
  }

  get articleBio() {
    return cy.getByDataQa('article-bio-text');
  }

  get articleBody() {
    return cy.getByDataQa('article-body-text');
  }

  get articleTag() {
    return cy.getByDataQa('article-tag-item');
  }

  get articlePublishBtn() {
    return cy.getByDataQa('article-publish-btn');
  }

  get createdArticleTitle() {
    return cy.getByDataQa('article-h1-title');
  }

  get articleEditorBtn() {
    return cy.getByDataQa('article-editor-btn');
  }

  get articleDeleteBtn() {
    return cy.getByDataQa('article-delete-btn');
  }

  login(email, password) {
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signInBtn.click();
  }

  typeNewArticle({ title, description: bio, body, tag }) {
    this.articleTitle.should('be.visible').clear().type(title);
    this.articleBio.should('be.visible').clear().type(bio);
    this.articleBody.should('be.visible').clear().type(body);
    this.articleTag.should('be.visible').clear().type(`${tag}{enter}`);
    this.articlePublishBtn.should('be.visible').click();
  }
}

export default ArticlePageObject;
