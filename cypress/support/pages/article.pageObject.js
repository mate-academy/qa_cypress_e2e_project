import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  /*get bioField() {
    return cy.getByDataCy('bio-update-field');
  }*/
  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-description-field');
  }

  get articleBodyTextarea() {
    return cy.getByDataCy('article-body-textarea');
  }

  get articleTagsField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  get articleTitleElement() {
    return cy.getByDataCy('article-banner');
  }

  get articleBodyElement() {
    return cy.getByDataCy('article-body');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  get articlePreviewSection() {
    return cy.getByDataCy('article-preview-section');
  }

  get followUnfollowUserBtn() {
    return cy.getByDataCy('follow-user-btn');
  }

  /*fillBioField(bio) {
    this.bioField.clear().type(bio);
  }*/

  fillTitleField(title) {
    this.articleTitleField.clear().type(title)
  }

  fillDescriptionField(description) {
    this.articleDescriptionField.clear().type(description);
  }

  fillArticleBodyTextarea(body) {
    this.articleBodyTextarea.clear().type(body);
  }

  fillTagsField(tag) {
    this.articleTagsField.clear().type(tag).type('{enter}');
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.contains('Delete Article').click();
  }

  clickFollowUnfollowUserBtn() {
    this.followUnfollowUserBtn.contains('Follow').click();
  }

  assertArticlePageContainsTitle(title) {
    this.articleTitleElement.should('contain', title);
  }

  assertArticlePageContainsBody(body) {
    this.articleBodyElement.should('contain', body);
  }

  assertArticlePreviewSectionContainsNoArticlesMessage(message) {
    this.articlePreviewSection.should('contain', message);
  }

  assertArticlePreviewSectionDoesntContainArticleTitle(articleTitle) {
    this.articlePreviewSection.should('not.contain', articleTitle);
  }

  assertUnfollowUserBtn() {
    this.followUnfollowUserBtn.should('contain', 'Unfollow');
  }

  assertFollowUserBtn() {
    this.followUnfollowUserBtn.should('contain', 'Follow');
  }

}

export default ArticlePageObject;
