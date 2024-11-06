import { generateArticle } from '../generateArticle'; // Імпорт генератора фейкових даних
import PageObject from '../PageObject';

class articlePageObject extends PageObject {
  constructor() {
    super();
    this.url = '/#/editor';
  }

  navigateToArticlePage() {
    cy.visit(this.url); // Перехід на сторінку редактора статей
    cy.url().should('include', '/#/editor'); // Перевірка, що URL правильний
  }

  createArticle() {
    const article = generateArticle();

    cy.get('[data-cy="article-title"]').type(article.title);
    cy.get('[data-cy="article-description"]').type(article.description);
    cy.get('[data-cy="article-body"]').type(article.body);
    cy.get('[data-cy="article-tag"]').first().type(article.tag);
    cy.get('[data-cy="publish-article-btn"]').click(); // Публікація статті
  }

  createArticleWithoutTag() {
    const article = generateArticle();

    cy.get('[data-cy="article-title"]').type(article.title);
    cy.get('[data-cy="article-description"]').type(article.description);
    cy.get('[data-cy="article-body"]').type(article.body);
    // Пропускаємо додавання тегу
    cy.get('[data-cy="publish-article-btn"]').click(); // Публікація статті
  }

  verifyArticleTitleExists() {
    cy.get('[data-cy="article-title"]').should('exist');
  }

  clickEditButton() {
    cy.get('[data-cy="edit-article-btn"]').should('be.visible'); // Перевірка видимості кнопки
    cy.get('[data-cy="edit-article-btn"]').first().click(); // Клік на кнопку редагування
  }

  updateArticle(title, description, body) {
    cy.get('[data-cy="article-title"]').clear();
    cy.get('[data-cy="article-title"]').type(title);
    cy.get('[data-cy="article-description"]').clear();
    cy.get('[data-cy="article-description"]').type(description);
    cy.get('[data-cy="article-body"]').clear();
    cy.get('[data-cy="article-body"]').type(body);
    cy.get('[data-cy="publish-article-btn"]').click(); // Збереження змін
  }

  verifyArticleChanges(updatedTitle, updatedBody, updatedDescription) {
    // Перевірки
    cy.url().should('include', '/article'); // Перевірка, що ми на сторінці статті
    cy.get('.banner').should('contain', updatedTitle); // Перевірка заголовка статті
    // cy.get('[data-cy="article-description"]').should('contain', updatedDescription);
    cy.get('.col-xs-12').should('contain', updatedBody);

    // Перехід на головну сторінку через хедер
    cy.contains('a', 'Home').click();
    // Перехід до вкладки "My Feed"
    cy.contains('a', 'Your Feed').click();
    // Перевірка, що опис статті оновлений у вкладці "My Feed"
    cy.get('.article-preview').should('contain', updatedDescription);
  }

  deleteArticle() {
    cy.get('[data-cy="delete-article-btn"]').first().click(); // Клікнути на кнопку Delete
    // Підтвердження видалення
    cy.get('.swal-modal').should('be.visible'); // Перевірка, що модальне вікно відображається
    cy.get('.swal-text')
      .should('contain', 'Deleted the article. Going home...'); // Перевірка тексту
    cy.url().should('include', '/'); // Перевірка, що ви повернулися на домашню сторінку
  }
}

export default articlePageObject;
