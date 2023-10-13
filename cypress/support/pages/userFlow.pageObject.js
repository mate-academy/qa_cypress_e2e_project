import PageObject from '../PageObject';

class UserFlowPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataCy('user_followBtn');
  }
}

export default UserFlowPageObject;