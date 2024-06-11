import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/articles/';

  visitArticleUrl(title) {
    cy.visit(`${this.url}${title.toLowerCase()}`);
  }

  get articleTitle() {
    return cy.get('h1');
  };

  get articleBody() {
    return cy.get('p');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  assertTitleContainText(text) {
    this.articleTitle
      .should('contain.text', `${text}`);
  }

  assertTitleNotContainText(text) {
    this.articleTitle
      .should('not.contain.text', `${text}`);
  }

  assertBodyContainText(text) {
    this.articleBody
      .should('contain.text', `${text}`);
  }

  assertBodyNotContainText(text) {
    this.articleBody
      .should('not.contain.text', `${text}`);
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .eq(0).click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .eq(0).click();
  }
}

export default ArticlePageObject;
