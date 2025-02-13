/// <reference types="cypress" />


describe('Quiz Application', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.intercept('GET', '/api/questions/random', {
			body: [
				{
					_id: '1',
					question: 'Test Question',
					answers: [
						{ text: 'Answer 1', isCorrect: false },
						{ text: 'Answer 2', isCorrect: true },
					],
				},
			],
		}).as('getQuestions');
	});

	it('completes a full quiz flow', () => {
		// Start the quiz
		cy.get('button').contains('Start Quiz').click();
		cy.wait('@getQuestions');

		// Verify question display
		cy.get('.card').should('exist');
		cy.get('h2').should('contain', 'Test Question');

		// Answer question
		cy.get('.btn-primary').first().click();

		// Verify completion screen
		cy.get('h2').should('contain', 'Quiz Completed');
		cy.get('.alert-success').should('exist');

		// Start new quiz
		cy.get('button').contains('Take New Quiz').should('exist');
	});
});