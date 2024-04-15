import PageObject from '../PageObject';
class ArticlePageObject extends PageObject {
  url = '#/articles';

  loginUser(email, username, password) {
    cy.login(email, username, password).then((response) => {
      cy.visit('#/editor');
    });
  }

  get getArticleTitle() {
    return cy.getByDataCy('articleTitle');
  }

  typeArticleTitle(title) {
    this.getArticleTitle.type(title);
  }

  get getAboutField() {
    return cy.getByDataCy('about');
  }

  typeInAboutField(description) {
    this.getAboutField.type(description);
  }

  get getArticleBody() {
    return cy.getByDataCy('writeArticle');
  }

  get getArticleBodyInEditor() {
    return cy.getByDataCy('articleBody');
  }

  typeInBodyField(body) {
    this.getArticleBody.type(body);
  }

  get clickSubmitBtn() {
    return cy.getByDataCy('submitBtn').click();
  }

  assertionArticleTitle(title) {
    this.getArticleTitle.should('contain.text', title);
  }

  assertionArticleBody(body) {
    this.getArticleBodyInEditor.should('contain.text', body);
  }

  addArticle(title, description, body, tag) {
    cy.addArticle(title, description, body, tag).then((response) => {
      cy.visit(`/#/articles/${response.body.article.slug}`);
    });
  }

  get getEditButton() {
    return cy.getByDataCy('editButton');
  }

  typeNewArticleBody(editedBody) {
    this.getArticleBody.type(editedBody);
  }
}

export default ArticlePageObject;
