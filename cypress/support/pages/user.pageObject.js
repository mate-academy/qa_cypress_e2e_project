import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  followButtonClick() {
    cy.getByDataCy('userFollow');
  }

  unFollowButtonClick() {
    cy.getByDataCy('userUnFollow');
  }
}
export default UserPageObject;
