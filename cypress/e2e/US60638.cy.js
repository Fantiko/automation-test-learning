describe('template spec', () => {

	// before('login', () => {
	// 	cy.clearCookies()
	// 	cy.getCookies().should('be.empty')
	// 	cy.visit('https://app.dev.recrutamento.itixti-lab.com.br')
	// 	cy.get('.btn-login').click()
	// 	cy.get('#email').type('dj@gmail.com')
	// 	cy.get('#password').type('Itix.123')
	// 	cy.get('.btn').click()
	// })


	beforeEach('passes', () => {
		cy.LoginAdm()

		cy.get('.ci-settings').click()
		cy.get('.sub-menu > :nth-child(9)').click()
		cy.get('.btn').click()

	})

	it('TC001 - tela de cadastro de motivos de contratação/demissão', () => {
		cy.get('#title-section > h1').should('exist')
			.and('be.visible').and('contain.text', 'Setup da Empresa')
		cy.get('h3').should('exist').and('be.visible')
			.and('contain.text', 'Motivos de Contratação/Demissão')
		cy.get('.chore > span').should('exist').and('be.visible')
			.and('contain.text', 'Cadastro de motivos de contratação e demissão')

		cy.get('.col-2').should('contain.text', 'Tipo').and('be.visible')
		cy.get('.ng-select-container').should('exist').and('be.visible')

		cy.get('.grow').should('exist').and('be.visible').and('have.text', 'Descrição do Motivo*')

		cy.get('.primary').should('exist').and('be.visible')
		cy.get('.btn').should('exist').and('be.visible')


	})

	it('TC002 - salvar motivo com campos preenchidos corretamente', () => {
		cy.get('.ng-select-container').click()
		cy.contains('Admissão').click()
		cy.get('#motivo').type('Lorem ipsum dolor site')
		cy.get('.primary').click()

		cy.get('.swal2-popup').should('be.visible').and('contain.text', 'Sucesso').and('contain.text', 'Registro salvo com sucesso')

		cy.get('.swal2-confirm').should('be.visible')
	})

	it('TC003 - botão voltar em popup de confirmação de cadastro', () => {
		cy.get('.btn').click()

		cy.get('.swal2-popup').should('be.visible').and('contain.text', 'Atenção')
			.and('contain.text', 'Os dados serão perdidos, deseja continuar?')


		cy.get('.swal2-cancel').should('be.visible')
		cy.get('.swal2-confirm').should('be.visible').click()
		cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should('be.visible')

	})

	it.skip('TC004 - clicar fora do campo do popup de confirmação de cadastro', () => {


	})

	it('TC005 - salvar habilidade com campos preenchido incorretamente', () => {
		cy.get('#motivo').focus().blur()
		cy.get('.grow > :nth-child(3)').should('be.visible').and('contain.text', 'Campo de preenchimento obrigatório')
		cy.get('.primary').click()
		cy.get('.swal2-popup').should('be.visible').and('contain.text', 'Erro!')
			.and('contain.text', 'A nova descrição do motivo está vazia!. O novo tipo do motivo está vazio!')
		cy.get('.swal2-confirm').should('be.visible')


	})

	it('TC006 - salvar motivo com campo "Descrição de motivo" preenchido incorretamente', () => {
		cy.get('.ng-select-container').click()
		cy.contains('Admissão').click()

		cy.get('#motivo').focus().blur()
		cy.get('.grow > :nth-child(3)').should('be.visible').and('contain.text', 'Campo de preenchimento obrigatório')
		cy.get('.primary').click()
		cy.get('.swal2-popup').should('be.visible').and('contain.text', 'Erro!')
			.and('contain.text', 'A nova descrição do motivo está vazia!')
		cy.get('.swal2-confirm').should('be.visible')



	})

	it('TC007 - botão voltar em popup de erro de cadastro', () => {
		cy.get('.ng-select-container').click()
		cy.contains('Admissão').click()

		cy.get('#motivo').focus().blur()
		cy.get('.grow > :nth-child(3)').should('be.visible').and('contain.text', 'Campo de preenchimento obrigatório')
		cy.get('.primary').click()
		cy.get('.swal2-popup').should('be.visible').and('contain.text', 'Erro!')
			.and('contain.text', 'A nova descrição do motivo está vazia!')
		cy.get('.swal2-confirm').should('be.visible')

		cy.get('.swal2-confirm').click()

		cy.get('.chore > span').should('be.visible')

	})

	it.skip('TC008 - clicar fora do campo em popup de erro de cadastro', () => {


	})

	it('TC009 - salvar habilidades com campo "Tipo" preenchido incorretamente', () => {
		cy.get('.ng-select-container').click()
		cy.contains('Admissão').click()
		cy.get('.ng-clear-wrapper').click()
		cy.get('.col-2 > :nth-child(3)').should('be.visible')

		cy.get('#motivo').type('a')

	})


})