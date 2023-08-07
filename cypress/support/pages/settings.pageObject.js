import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/';

  //   assertHeaderContainUsername(username) {
  //     this.usernameLink
  //       .should('contain', username);
  //   }

//   assertMainPageUrl() {
//     cy.url().should('include', '/#/');
//   }
}

export default SettingsPageObject;
