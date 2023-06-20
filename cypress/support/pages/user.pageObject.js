import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataCy('follow-user-btn');
  }
}

export default UserPageObject;
