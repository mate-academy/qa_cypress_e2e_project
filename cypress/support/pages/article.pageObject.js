import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
   url = '#/articles/';

   get heder() {
    return cy.getByDataCy('title-header');
   }

   assertHeaderContainTitle(title) {
    this.heder.should('contain', title);
   }

   get editArticBut() {
    return cy.getByDataCy('edit-button').eq(0).click();
   }

   clickEditArticBut() {
    this.editArticBut.click();
   }

   get deleteArticBut() {
    return cy.getByDataCy('delete-button');
   }
   
   clickDeletArticBut() {
    this.deleteArticBut.eq(0).click();
   }

   get modalWindow() {
    return cy.get('.swal-modal');
  }
  assertModalWindowContain() {
    this.modalWindow.should('contain', 'Deleted the article. Going home...')
  }

}
export default ArticlePageObject;