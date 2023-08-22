// cypress/support/pages/article.pageObject.js

class ArticlePage {
  get titleInput() {
    return cy.get('input[placeholder="Article Title"]');
  }

  get descriptionInput() {
    return cy.get('input[placeholder="What\'s this article about?"]');
  }

  get contentTextarea() {
    return cy.get('textarea[placeholder="Write your article (in markdown)"]');
  }

  get tagsInput() {
    return cy.get('[data-v-61d92e31] input[data-v-61d92e31]');
  }

  get publishButton() {
    return cy.get('[type="submit"]');
  }

  fillTitle(title) {
    return this.titleInput.type(title);
  }

  fillDescription(description) {
    return this.descriptionInput.type(description);
  }

  fillContent(content) {
    return this.contentTextarea.type(content);
  }

  fillTags(tags) {
    return this.tagsInput.type(tags);
  }

  submitArticle() {
    return this.publishButton.click();
  }
}

export default ArticlePage;
