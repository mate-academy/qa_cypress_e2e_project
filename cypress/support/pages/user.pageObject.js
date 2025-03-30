import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('follow');
  }

  clickFollow() {
    this.followBtn.click();
  }

  logout() {
    cy.contains('Or click here to logout.')
      .click();
  }
}

export default UserPageObject;
