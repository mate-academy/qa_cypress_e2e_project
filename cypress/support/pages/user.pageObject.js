import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/';
  
  get userBio() {
    return cy.getByDataCy('userBio')
  }

}

export default UserPageObject;
