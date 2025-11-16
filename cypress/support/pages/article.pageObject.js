import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/editor';

  get articleTitleField() {
    return cy.getByPlaceholder('Article Title');
  }

  typeArticleTitle(articleTitle) {
    this.articleTitleField.type(articleTitle);
  }

  get articleDescriptionField() {
    return cy.getByPlaceholder(`What's this article about?`);
  }

  typeArticleDescription(description) {
    this.articleDescriptionField.type(description);
  }

  get articleBodyField() {
    return cy.getByPlaceholder('Write your article (in markdown)');
  }

  typeArticleBody(body) {
    this.articleBodyField.type(body);
  }

  get articleTagField() {
    return cy.getByPlaceholder('Enter tags');
  }

  typeArticleTag(tag) {
    this.articleTagField.type(`${tag}{enter}`);
  }

  get publishButton() {
    return cy.contains('.btn', 'Publish Article');
  }

  assertContainsPublishButton() {
    this.publishButton.should('be.visible');
  }

  clickInPublishButton() {
    this.publishButton.click();
    return cy.url().then((url) => {
      const slug = url.split('/article/')[1];
      return {
        article: {
          slug
        }
      };
    });
  }

  assertContainsArticleTitle(title) {
    return cy.get('h1').should('contain', title);
  }

  assertContainsBody(body) {
    return cy.get('p').should('contain', body);
  }

  clickInProfileLink() {
    cy.get('@user').then((user) => {
      return cy.contains('a', user.username.toLowerCase()).click();
    });
  }

  assertContainsDescription(description) {
    return cy.contains('p', 'Article description:')
      .should('contain', description);
  }

  assertContainsTag(tag) {
    return cy.get('li').should('contain', tag);
  }

  clickInNewArticle() {
    return cy.contains('h1', 'Article title:')
      .click();
  }

  clickInEditButton() {
    return cy.contains('a', ' Edit Article')
      .first()
      .click();
  }

  get updateArticleButton() {
    return cy.contains('.btn', 'Update Article');
  }

  clickInUpdateArticle() {
    this.updateArticleButton.click();
  }

  clickInDeleteButton() {
    return cy.contains('.btn', ' Delete Article')
      .first()
      .click();
  }

  clickInArticle() {
    return cy.contains('h1', 'Article title:')
      .click();
  }
}

export default ArticlePageObject;
