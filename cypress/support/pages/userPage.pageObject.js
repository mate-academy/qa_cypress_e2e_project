import PageObject from '../PageObject';

class userPageObject extends PageObject {
  url = '/#/settings'

  get usernameField(){
    return cy.getByDataCy('username-field')
  }
  get updateBtn(){
    return cy.getByDataCy('update-btn')
  }
  get bioField(){
    return cy.getByDataCy('bio-field')
  }
  get emailField(){
    return cy.getByDataCy('email-field')
  }
  get logoutBtn(){
    return cy.getByDataCy('logout-btn')
  }
  get passwordField(){
    return cy.getByDataCy('password-field')
  }
  get articlePreview(){
    return cy.getByDataCy('article-preview')
  }
  get articleDesc(){
    return cy.get('.preview-link > p')
  }
  get modalOk(){
    return cy.get('.swal-button')
  }
}

export default userPageObject;