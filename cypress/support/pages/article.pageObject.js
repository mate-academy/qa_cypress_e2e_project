import PageObject from '../PageObject';
import generateData from '../generate';

class ArticlePageObject extends PageObject {
  genData = generateData();

  get titleLable() {
    return cy.getByDataCy('title-article-page');
  }

  get bodyLable() {
    return cy.getByDataCy('body-article-page');
  }

  get tagsLable() {
    return cy.getByDataCy('tags-article-page');
  }

  get editBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  titleLableAssert(title) {
    this.titleLable.should('contain', title);
  }

  bodyLableAssert(body) {
    this.bodyLable.should('contain', body);
  }

  tagsLableAssert(tags) {
    const tagsArray = tags.split('{enter}');

    for (const i of tagsArray) {
      this.tagsLable.should('contain', i);
    }
  }

  editBtn0Click() {
    this.editBtn.eq(0).click();
  }

  editBtn1Click() {
    this.editBtn.eq(1).click();
  }

  deleteBtnClick() {
    this.deleteBtn.click();
  }

  deleteBtn0Click() {
    this.deleteBtn.eq(0).click();
  }

  deleteBtn1Click() {
    this.deleteBtn.eq(1).click();
  }

  fullAssertion(title, body, tags) {
    this.titleLableAssert(title);
    this.bodyLableAssert(body);
    this.tagsLableAssert(tags);
  }

  articleCreationProcess() {
    cy.register(
      this.genData.user.email.default,
      this.genData.user.username,
      this.genData.user.password.passwordDefault
    );

    cy.window().then((win) => {
      const userFromLocal = JSON.parse(win.localStorage.getItem('user'));
      cy.articleCreate(
        this.genData.article.title,
        this.genData.article.about,
        this.genData.article.body,
        this.genData.article.tags.split('{enter}').join(','),
        userFromLocal.id
      );
    });
    // cy.articleCreateButFake();
  }

  deleteAssertion() {
    cy.window().then((win) => {
      const article = JSON.parse(win.localStorage.getItem('article'));
      cy.visit(`/#/articles/${article.slug}`);
      this.bodyLable.should('not.contain', article.body);
      this.titleLable.should('not.contain', article.title);
    });
  }
}

export default ArticlePageObject;
