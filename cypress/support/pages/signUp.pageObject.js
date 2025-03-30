import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {

    url = '/#/register';

    setUsernameFieldAttr() {
    cy.get('.form-control.form-control-lg[type="text"][placeholder="Username"]')
    .invoke('attr', 'data-cy', 'username-Sign-Up-field');
    }

    typeUsername(username) {
    cy.get('[data-cy="username-Sign-Up-field"]').clear().type(username);
    }
    
    setEmailFieldAttr(){
        cy.get(':nth-child(2) > .form-control')
        .invoke('attr','data-cy', 'email-Sign-Up-field');
    }

    typeEmail(email) {
        cy.get('[data-cy="email-Sign-Up-field"]').clear().type(email);
    }

   typePassword (password){
    cy.get(':nth-child(3) > .form-control').clear().type(password);
   }

   signUpBtn(){
    cy.get('.btn').click()
   }

   assertModalContent(content) {
    cy.get(".swal-modal").should("contain", content);
  }

  get modalOkBTN() {
    return cy.get('.swal-button');
  }

  clickModalOkBTN(){
    this.modalOkBTN
      .click();
}
}
    

    
export default SignUpPageObject;
