import PageObject from "../PageObject";

export default class HomePageObject extends PageObject {
  url = "/#/";

  get usernameLink() {
    return cy.getByDataCy("username-link");
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should("contain", username);
  }
}
