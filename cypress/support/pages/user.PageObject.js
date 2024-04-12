import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '#';

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }
}
export default UserPageObject;
