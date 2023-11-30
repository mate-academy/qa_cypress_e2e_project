import PageObject from '../PageObject';

 class SignUpPageObject extends PageObject {
   url = '/#/register';

   visitSignUppage() {
     cy.get(':nth-child(3) > .nav-link').click();
   }

   clickButtn(name) {
     cy.get(name).click();
   }

   assertAllert() {
     cy.get('.swal-modal').should('contain', 'Your registration was successful!');
   }

   assertErrorMessage(message) {
     cy.get('.swal-modal').should('contain', message);
   }
 }
 export default SignUpPageObject;