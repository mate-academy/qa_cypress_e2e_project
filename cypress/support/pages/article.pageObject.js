import PageObject from '../PageObject';

 class ArticlePageObject extends PageObject {
   url = '/#/editor';

   visitArticlePage() {
     cy.get('.container > .nav > :nth-child(2) > .nav-link').click();
   };

   assertErrorMessage(message) {
     cy.get('.swal-modal').should('contain', message);
   };

   enterTag(tag) {
     cy.get('[data-cy="articleTags"]').type(tag);
   };

   submitArticleBtn() {
     cy.get('[data-cy="submitBtn"]').click();
   };

   assertArticleTitle(titleText) {
     cy.get('h1').should('contain', titleText);
   };

   assertArticleBody(bodyText) {
     cy.get('p').should('contain', bodyText);
   };

   clickEditBtn() {
     cy.get('[data-cy="editArticleBtn"]').first().click();
   };

   clickDelete() {
     cy.get('[data-cy="deleteArticleBtn"]').first().click();
   };

   assertEdit(text) {
     cy.get('h1').should('include', text);
   };

   assertDelete() {
     cy.get('.swal-modal').should('contain', 'Deleted the article. Going home...');
   }
 };

 export default ArticlePageObject;