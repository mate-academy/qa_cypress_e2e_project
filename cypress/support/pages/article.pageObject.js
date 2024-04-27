import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.findByPlaceholder('Article Title');
  }

  typeTitle(title) {
    this.titleField.clear()
      .type(title);
  }

  get descriptionField() {
    return cy.get(':nth-child(2) > .form-control');
  }

  typeDescription(description) {
    this.descriptionField.clear()
      .type(description);
  }

  get bodyField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  typeBody(body) {
    this.bodyField.clear()
      .type(body);
  }

  get tagsField() {
    return cy.findByPlaceholder('Enter tags');
  }

  enterTags(tags) {
    this.tagsField.clear()
      .type(tags + '{Enter}');
  }

  get editBtn() {
    return cy.contains('.btn', 'Edit Article');
  }

  clickEditBtn() {
    this.editBtn
      .click();
  }

  get submitBtn() {
    return cy.get('.btn');
  }

  clickSubmitBtn() {
    this.submitBtn
      .click();
  }

  get deleteBtn() {
    return cy.contains('.btn', 'Delete Article');
  }

  clickDeleteBtn() {
    this.deleteBtn
      .click();
  }

  get followBtn() {
    return cy.contains('.btn-outline-secondary', 'Follow');
  }

  clickOnFollowBtn() {
    this.followBtn.click();
  }

  assertFollow() {
    this.followBtn
      .should('contain.text', 'Unfollow');
  }

  assertBannerContainsTitle(title) {
    cy.get('.banner')
      .should('contain', title);
  }

  assertDeletedArticle() {
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  }

  createArticleAndRedirect(userId, title, description, body) {
    cy.createArticle(userId, title, description, body).then((res) => {
      cy.visit(`/#/articles/${res.body.article.slug}`);
    });
  }
}

export default ArticlePageObject;
