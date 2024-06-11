import PageObject from '../PageObject'; 
 
class SignUpPageObject extends PageObject { 
  url = '/#/register'; 
  fillUsername(username) { 
    cy.getByDataCy('username-signup').type(username); 
  } 
 
  fillEmail(email) { 
    cy.getByDataCy('email-signup').clear().type(email); 
  } 
 
  fillPassword(password) { 
    cy.getByDataCy('password-signup').clear().type(password); 
  } 
 
  submit() { 
    cy.getByDataCy('signup-btn').click(); 
  } 
 
  assertModalContent(content) { 
    cy.get('.swal-modal').should('contain', content); 
  } 
  fillInvalidEmail() {
    cy.getByDataCy('email-signup').type('gmail');
  }
} 

 
export default SignUpPageObject;


