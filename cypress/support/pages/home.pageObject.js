import PageObject from "../PageObject";

class HomePageObject extends PageObject {
  url = "/#/";

  get usernameLink() {
    return cy.getByDataCy("username-link");
  }

  get signUpBtn() {
    return cy.get('[data-qa="signUpBtnH"]').click();
  }

  get signInBtn() {
    return cy.get('[data-qa="signInBtnH"]').click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should("contain", username);
  }
}

export default HomePageObject;
