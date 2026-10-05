/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataQa(selector: string): Chainable<JQuery<HTMLElement>>
    register(email: string, username: string, password: string): Chainable<any>
    login(email: string, password: string): Chainable<any>
    createArticle(article: {
      title: string
      description: string
      body: string
      tag: string
    }, authorId: number): Chainable<any>
  }
}
