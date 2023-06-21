import PageObject from '../PageObject';

class UserFlowPageObject extends PageObject {
  url = '/#/';

  get followBtn() {
    return cy.getByDataCy('user/followBtn');
  }
}

export default UserFlowPageObject;