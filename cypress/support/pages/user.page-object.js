import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = `#/`;

  get followButton() {
    return cy.getByDataCy('follow-button');
  }
}
export default UserPageObject;
