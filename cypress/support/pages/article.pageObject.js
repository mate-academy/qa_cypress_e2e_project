import PageObject from '../PageObject';

const fakedata = {
  title: 'TestTitle',
  topic: 'TestTopic',
  body: 'TestBody',
  tags: 'TestTags'
};

const newData = {
  title: 'newTitle',
  topic: 'newTopic',
  body: 'newBody',
  tags: 'newTags'
};

class ArticleObject extends PageObject {
  get titleArt() {
    return cy.getByDataCy('title');
  }

  get topic() {
    return cy.getByDataCy('topic');
  }

  get bodyArt() {
    return cy.getByDataCy('body');
  }

  get tagsNew() {
    return cy.getByDataCy('tags-new');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-btn');
  }

  get title() {
    return cy.getByDataCy('qa-banner');
  }

  get body() {
    return cy.getByDataCy('qa-container');
  }

  get feed() {
    return cy.getByDataCy('feed');
  }

  clickYourFeed() {
    this.feed.click();
  }

  assertTitle() {
    this.title.should('contain', fakedata.title);
  }

  assertNewTitle() {
    this.title.should('contain', newData.title);
  }

  assertBody() {
    this.body.should('contain', fakedata.body);
  }

  assertNewBody() {
    this.body.should('contain', newData.body);
  }

  get topicPre() {
    return cy.getByDataCy('article-pre');
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-art');
  }

  get tagsList() {
    return cy.getByDataCy('tags-list');
  }

  assertTag() {
    this.tagsList.should('contain', fakedata.tags);
  }

  assertNewTag() {
    this.tagsList.should('contain', newData.tags);
  }

  clickDeleteBtn() {
    this.deleteBtn.eq(0).click();
  }

  clickEditBtn() {
    this.editBtn.eq(0).click();
  }

  assertTopic() {
    this.topicPre.should('contain', fakedata.topic);
  }

  assertNewTopic() {
    this.topicPre.should('contain', newData.topic);
  }

  typeTitle() {
    this.titleArt.type(fakedata.title);
  }

  typeTopic() {
    this.topic.type(fakedata.topic);
  }

  typeBody() {
    this.bodyArt.type(fakedata.body);
  }

  typeTags() {
    this.tagsNew.eq(0).type(fakedata.tags);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  typeNewTitle() {
    this.titleArt.clear().type(newData.title);
  }

  typeNewTopic() {
    this.topic.clear().type(newData.topic);
  }

  typeNewBody() {
    this.bodyArt.clear().type(newData.body);
  }

  typeNewTags() {
    this.tagsNew.eq(0).clear().type(newData.tags);
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  assertDeleteArticle() {
    this.modalWindow.should('contain', 'Deleted the article. Going home...');
  }
}

export default ArticleObject;
