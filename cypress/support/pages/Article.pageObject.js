import PageObject from '../PageObject';

class ArticleForm extends PageObject {
  url = '/#/editor';

  get newArtickleLink() {
    return cy.get('[data-qa="New article link"]');
  }

  get articleTitleField() {
    return cy.get('[data-qa="Article title field"]').click();
  }

  get articleAboutField() {
    return cy.get('[data-qa="Article about field"]')
      .click();
  }

  get articleTextField() {
    return cy.get('[data-qa="Article text field"]')
      .click();
  }

  get articleTagField() {
    return cy
      .get('[data-qa="Article tag field"]')
      .first()
      .click();
  }

  get publishArticleBtn() {
    return cy.get('[data-qa="Article publish btn"]');
  }

  get articleBanner() {
    return cy.get('[data-qa="Article title"]');
  }

  get editArticleBtn() {
    return cy.get('[data-qa="Edit article btn"]')
      .should('contain', 'Edit Article')
      .first();
  }

  get artickleAuthorName() {
    return cy.get('[data-qa="Article author"]');
  }

  get deleteArticleBtn() {
    return cy.get('[data-qa="Delete article btn"]')
      .should('contain', 'Delete Article')
      .first();
  }

  get articleHomePageFeed() {
    return cy.get('[data-qa="Article feed"]');
  }

  assertArticleFeed() {
    this.articleHomePageFeed
      .should('contain', 'No articles are here... yet.');
  }

  assertUrlAfterDeleteArticle() {
    cy.url().should('be', this.url);
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  assertDeleteArticleBtn() {
    this.deleteArticleBtn.should('exist');
  }

  assertEditBtn() {
    this.editArticleBtn.should('exist');
  }

  assertArticleAuthorName(authorname) {
    this.artickleAuthorName
      .should('contain', `${authorname}`);
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  assertArticleTitle(title) {
    this.articleBanner.should('contain',
      `${title}`);
  }

  assertArticleUrl(articleName) {
    cy.url().should('contain', `${articleName}`);
  }

  filledArticleTitle(text) {
    this.articleTitleField
      .clear()
      .type(text);
  }

  filledArticleAbout(word) {
    this.articleAboutField
      .clear()
      .type(word);
  }

  filledYourArticle(bio) {
    this.articleTextField
      .clear()
      .type(bio);
  }

  filledArticleTag(newtag) {
    this.articleTagField
      .type(newtag);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickNewArtickleLink() {
    this.newArtickleLink.click();
  };

  visitArticlePage() {
    cy.visit('/#/editor');
  }
}

export default ArticleForm;
