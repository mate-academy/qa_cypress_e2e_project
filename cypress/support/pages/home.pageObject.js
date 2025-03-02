import PageObject from "../PageObject";

class HomePageObject extends PageObject {
  url = "/#/";

  get usernameLink() {
    return cy.getByDataCy("username-link");
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should("contain", username);
  }
}

export default HomePageObject;
