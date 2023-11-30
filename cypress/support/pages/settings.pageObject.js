import PageObject from '../PageObject';

 class SettingsPageObject extends PageObject {
   url = '/#/settings';

   clickUpdateBtn() {
     cy.get('[data-cy="updateBtn"]').click();
   };

   clickLogOutBtn() {
     cy.get('[data-cy="logOutBtn"]').click();
   };

   assertSuccessUpdate(message) {
     cy.get('.swal-modal').should('contain', message);
     cy.get('.swal-button').click();
   };

   assertLogOut(username) {
     cy.get('.navbar').should('not.have.value', username);
   }

   assertUpdatedUsername(username) {
     cy.get('[data-cy="username-link"]').should('contain', username);
   };

   assertUpdatedBio(bio) {
     cy.get('[data-cy="username-link"]').click();
     cy.get('p').should('contain', bio);
   };
 }

 export default SettingsPageObject;