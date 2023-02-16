import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }
  get modalWind() {
    return cy.get('.swal-modal');
  }
  get articleDesc() {
    return cy.get('.preview-link > p')
  }
  get loginBtn() {
    return cy.get('[data-cy="login-btn"]')
  }
  
}

export default HomePageObject;
