import PageObject from '../PageObject';
const newDescription = 'newtest description';
export class ArticlePageObject extends PageObject {
  url = 'http://localhost:1667/#/editor';

  assertCreateAnArticle(title) {
    cy.url().should('include', '/#/articles/' + title.toLowerCase());
  }

  editArticleButton() {
    cy.getByDataQa('editbtn').click();
  }

  get descriptionField() {
    return cy.getByDataQa('description-field');
  }

  TypeNewDescription() {
    this.descriptionField.clear().type(newDescription);
  }

  get publishButton() {
    return cy.getByDataQa('submit-button');
  }

  clickOnPublishButton() {
    this.publishButton.click();
  }

  clickOnUserNameUrl() {
    cy.get('.container > .article-meta > :nth-child(1) > img').click();
  }

  assertDescriptionChange() {
    cy.get('.article-preview').should('contain', newDescription);
  }

  get deleteArticleButton() {
    return cy.getByDataQa('deletearticlebtn');
  }

  clickOnDeleteArticleButton() {
    this.deleteArticleButton.click();
  }

  assertDeteledArticle() {
    cy.get('.swal-modal').should('be.visible');
    cy.get('.swal-modal').should('contain.text', 'Deleted the article.');
  }
}
