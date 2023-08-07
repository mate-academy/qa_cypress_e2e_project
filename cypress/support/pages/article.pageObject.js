import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles';

  get editButton() {
    return cy.contains('.btn', 'Edit Article');
  }

  get deleteButton() {
    return cy.contains('.btn', 'Delete Article');
  }

  clickEditButton() {
    this.editButton.click();
  }

  clickDeleteButton() {
    this.deleteButton.click();
  }
}

export default ArticlePageObject;
