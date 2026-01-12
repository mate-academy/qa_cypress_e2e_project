import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get homeLink() {
    return cy.getByDataQa('home');
  }

  get profileLink() {
    return cy.getByDataQa('username-link');
  }

  get settingsLink() {
    return cy.getByDataQa('settings');
  }

  get signInNavigation() {
    return cy.getByDataQa('header-sign-in-btn');
  }

  get signUpInNavigation() {
    return cy.getByDataQa('header-sign-up-btn');
  }

  get articleLink() {
    return cy.getByDataQa('new-article-link');
  }

  get followBtn() {
    return cy.getByDataQa('follow-user-btn').first();
  }

  get feedBtn() {
    return cy.getByDataQa('global-feed-btn');
  }

  get newTitleInBanner() {
    return cy.getByDataQa('banner-title');
  }

  get bodyUnderBanner() {
    return cy.getByDataQa('article-page-body');
  }

  get previewTitle() {
    return cy.getByDataQa('preview-title');
  }

  get previewDescription() {
    return cy.getByDataQa('preview-description');
  }

  get author() {
    return cy.getByDataQa('author-link');
  }

  get globalFeedBtn() {
    return cy.getByDataQa('your-feed-btn');
  }

  assertHeaderContainUsername(username) {
    this.profileLink.should('contain', username);
  }

  assertLoggingOut() {
    this.profileLink.should('not.exist');
  }

  clickHomeLink() {
    this.homeLink.click();
  }

  clickSettingsLink() {
    this.settingsLink.click();
  }

  clickSignInNav() {
    this.signInNavigation.click();
  }

  clickArticleBtn() {
    this.articleLink.click();
  }

  clickGlobalFeedBtn() {
    this.feedBtn.click();
  }

  clickProfileLink() {
    this.profileLink.click();
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickAuthor() {
    this.author.click();
  }

  clickInDeletionOfArticle() {
    cy.getByDataQa('delete-article-btn').first().click();
  }

  clickInEditionOfArticle() {
    cy.getByDataQa('edit-article-btn').first().click();
  }

  assertFollowedUser() {
    this.followBtn.should('have.class', 'btn btn-sm pull-xs-right btn-primary');
  }

  assertUnfollowedUser() {
    this.followBtn.should(
      'have.class',
      'btn btn-sm pull-xs-right btn-outline-primary'
    );
  }

  assertNewArticle(title, description) {
    this.newTitleInBanner.should('contain.text', title);
    this.bodyUnderBanner.should('contain.text', description);
  }

  assertTitleInBanner(title) {
    this.newTitleInBanner.should('contain.text', title);
  }

  assertBodyUnderBanner(body) {
    this.bodyUnderBanner.should('contain.text', body);
  }

  assertDeletedArticle(title, description) {
    cy.contains('[data-qa="preview-title"]', title).should('not.exist');
    cy.contains('[data-qa="preview-description"]', description).should(
      'not.exist'
    );
  }
}

export default HomePageObject;
