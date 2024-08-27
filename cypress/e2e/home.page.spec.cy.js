/// <reference types='cypress' />

describe('Home Page', () => {
  it('should have all parts', () => {
    cy.visit('/')
      .get('h1')
      .should('contain.text', 'Техника которая дает большие возможности');

    cy.contains('button', 'Посмотреть модели').should('exist');
    cy.contains('a', 'Главная').should('exist');
    cy.get('.Header__logo-img');

    cy.get('h1');
  });
});
