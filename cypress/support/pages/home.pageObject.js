import { PageObject } from '../PageObject';

export class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link1');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
