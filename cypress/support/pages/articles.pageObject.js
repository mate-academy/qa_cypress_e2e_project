import PageObject from '../PageObject';

class ArticlesPageObject extends PageObject {
  url = '/';

  get editArticleBtn() {
    return cy.contains('.btn', 'Edit Article');
  }

  get deleteArticleBtn() {
    return cy.contains('.btn', 'Delete Article');
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .click();
  }

  visitArticlesPage(slug) {
    cy.visit(`#/articles/${slug}`);
  }
}

export default ArticlesPageObject;
