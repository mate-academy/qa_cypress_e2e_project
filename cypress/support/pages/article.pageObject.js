import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/article';

  get title() {
    return cy.getByDataCy('article-title');
  }

  get body() {
    return cy.getByDataCy('article-body');
  }

  get editBtn() {
    return cy.getByDataCy('edit-article').first();
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article').first();
  }

  pressEditBtn() {
    this.editBtn.click();
  }

  pressDeleteBtn() {
    this.deleteBtn.click();
  }
}

export default ArticlePageObject;
