import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '#';

  get followBtn() {
    return cy.getByDataQa('follow-button');
  }
}
export default UserPageObject;