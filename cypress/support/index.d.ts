/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataCy(selector: string): Chainable<any>
    register(email: string, username: string, password: string): Chainable<any>
    login(email: string, username: string, password: string): Chainable<any>
    createArticle(email: string, username: string, password: string, title: string, description: string, body: string, tags: string): Chainable<any>
  }
}
