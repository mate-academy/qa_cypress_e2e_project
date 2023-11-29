import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visit(articleData) {
    cy.visit(`#/articles/${encodeURIComponent(articleData)}`);
  }

  get editButton() {
    return cy.getByDataCy('edit-button-user').first();
  }

  get deleteButton() {
    return cy.getByDataCy('delete-button-user').first();
  }

  get titleName() {
    return cy.get('.banner h1');
  }

  // commands to click on buttons
  clickEditBtn() {
    this.editButton.click();
  }

  clickDeleteBtn() {
    this.deleteButton.click();
  }

  // commands to asserts
  assertTitleName(title) {
    this.titleName.should('contain', title);
  }
}

export default ArticlePageObject;
