import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  get errorModalSignIn() {
    return cy.get('.swal-modal');
  }

  assertErrorModalSignIn() {
    this.errorModalSignIn.should('contain', 'Login failed!');
  }

  get successfullDelete() {
    return cy.get('.swal-modal');
  }

  assertSuccessfullDelete() {
    this.successfullDelete.should('contain', 'Deleted the article');
  }

  get errorModalSignUp() {
    return cy.get('.swal-modal');
  }
  assertErrorModalSignUp() {
    this.errorModalSignUp.should('contain', 'Registration failed!');
  }

  get okBtn() {
    return cy.get(`[class='swal-button-container']`);
  }
  clickOkBtn() {
    this.okBtn.click();
  }

  get successfullBtn() {
    return cy.get(`[class='swal-button-container']`);
  }
  clickSuccessfullBtn() {
    this.successfullBtn.click();
  }

  get clickableTitle() {
    return cy.getByDataQa('clickable-title');
  }
  clickClickableTitle() {
    this.clickableTitle.click();
  }
  get articlePageUrl() {
    return cy.url();
  }
  assertArticlePageUrl(title) {
    this.articlePageUrl.should('include', title);
  }

  get editArticlePageUrl() {
    return cy.url();
  }
  assertEditArticlePageUrl(title) {
    this.editArticlePageUrl.should('include', `/#/editor/${title}`);
  }

  get homePageUrl() {
    return cy.url();
  }
  assertHomePageUrl() {
    this.homePageUrl.should('include', '/#/');
  }
}

export default HomePageObject;
