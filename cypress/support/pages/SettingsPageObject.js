import PageObject from '../PageObject'; 
 
class SettingsPageObject extends PageObject { 
  url = '/#/settings'; 
 
  get userNameField() { 
    return cy.getByDataCy('username'); 
  } 
 
  get bioField() { 
    return cy.getByDataCy('bio'); 
  } 
 
  get passwordField() { 
    return cy.getByDataCy('password'); 
  } 
 
  get emailField() { 
    return cy.getByDataCy('email'); 
  } 
 
  get updateSettingsBtn() { 
    return cy.getByDataCy('update-button'); 
  } 
 
  get logoutBtn() { 
    return cy.getByDataCy('logout-button'); 
  } 
 
  get modalBtn() { 
    return cy.get('.swal-button--confirm'); 
  } 
 
  get navBar() { 
    return cy.getByDataCy('nav-bar-header'); 
  } 
 
  typeUserName(username) { 
    this.userNameField 
      .clear() 
      .type(username); 
  } 
 
  typeBio(bio) { 
    this.bioField 
      .clear() 
      .type(bio); 
  } 
 
  typePassword(password) { 
    this.passwordField 
      .clear() 
      .type(password); 
  } 
 
  typeEmail(email) { 
    this.emailField 
      .clear() 
      .type(email); 
  } 
 
  clickUpdateBtn() { 
    this.updateSettingsBtn 
      .click(); 
  } 
 
  clickLogoutBtn() { 
    this.logoutBtn 
      .click(); 
  } 
 
  clickOkBtn() { 
    this.modalBtn 
      .click(); 
  } 
 
  assertUpdatedUsername(username) { 
    this.userNameField 
      .should('have.value', username); 
  } 
 
  assertUpdatedBio(bio) { 
    this.bioField 
    .should('have.value', bio); 
  } 
 
  assertUpdatedEmail(email) { 
    this.emailField 
      .should('have.value', email); 
  } 
 
  assertHeaderNotContainUsername(username) { 
    this.navBar 
      .should('not.contain', username); 
  } 
} 
 
export default SettingsPageObject;