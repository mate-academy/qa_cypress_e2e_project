import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get popUp() {
    return cy.get('.swal-modal');
  }

  get homeLink() {
    return cy.getByDataCy('header-new-article-link');
  }

  get newArticleLink() {
    return cy.getByDataCy('header-new-article-link');
  }

  get settingsLink() {
    return cy.getByDataCy('navigation-settings-link');
  }

  get profileLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedToggle() {
    return cy.getByDataCy('home-your-feed');
  }

  get popUpOkButton() {
    return cy.get('.swal-button');
  }

  get newArticle() {
    return cy.getByDataCy('preview-article-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertPopUp() {
    this.popUp.should('contain', 'Your registration was successful!');
  }

  newArticleLinkClick() {
    this.newArticleLink.click();
  }

  asserArticleIsDeleted() {
    this.newArticle.should('not.exist');
  }

  settingsLinkClick() {
    this.settingsLink.click();
  }

  profileLinkClick() {
    this.profileLink.click();
  }

  yourFeedToggleClick() {
    this.yourFeedToggle.click();
  }

  clickPopUpOkButton() {
    this.popUpOkButton
      .click();
  }

  assertHomeUrl() {
    cy.url().should('include', '/#');
  }
}

export default HomePageObject;
