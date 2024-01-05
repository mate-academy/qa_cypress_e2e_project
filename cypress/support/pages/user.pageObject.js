import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  followButtonClick() {
    cy.getByDataCy('userFollow')
      .click();
  }

  unFollowButtonClick() {
    cy.getByDataCy('userUnFollow')
      .click();
  }
}
export default UserPageObject;
