/// <reference types="Cypress" />


describe("US 67093 ", () => {

	beforeEach('passes', () => {
		cy.clearCookies()
		cy.getCookies().should('be.empty')
		cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')
	
		cy.get('.ci-settings').click()
		cy.get('.sub-menu > :nth-child(10)').click()
		cy.get('tbody > :nth-child(1) > .description').click()
	  })

	it("TC001 - selecionando motivo para edição", ()=>{

		cy.get('h3').should('be.visible')
		cy.get('.chore > span').should('be.visible').and('have.text', 'Cadastro de motivos de contratação e demissão')

		cy.get('.toogle-switch').should('be.visible').and('have.text', 'Status')
		.find('.toggle') 
		.should('exist')
		.and('be.visible')
		.and('not.be', 'editable');

		cy.get('.col-2').should('be.visible').and('contain.text', 'Tipo')
		.find('.ng-select-container')
		.should('exist')
		.and('be.visible')
		.and('not.be', 'editable');

		cy.get('.grow').should('be.visible').and('contain.text', 'Descrição do Motivo')
		.find('#motivo')
		.should('exist')
		.and('be.visible')
		.and('not.be', 'editable');

		cy.get('.btn').should('be.visible').and('contain.text', 'Voltar')

		cy.get('.primary').should('be.visible').and('contain.text', 'Editar')



	})

	it('TC002 - habilitando edição', () => {
		cy.get('.primary').click()
		cy.get('h3').should('be.visible')
		cy.get('.chore > span').should('be.visible').and('have.text', 'Cadastro de motivos de contratação e demissão')

		cy.get('.toogle-switch').should('be.visible').and('have.text', 'Status')
		.find('.toggle') 
		.should('exist')
		.and('be.visible')
		.should('not.be.disabled');


		cy.get('.col-2').should('be.visible').and('contain.text', 'Tipo')
		.find('.ng-select-container')
		.should('exist')
		.and('be.visible')
		.and('not.be.disabled');

		cy.get('.grow').should('be.visible').and('contain.text', 'Descrição do Motivo')
		.find('#motivo')
		.should('exist')
		.and('be.visible')
		.and('not.be.disabled');


		cy.get('.btn').should('be.visible').and('contain.text', 'Voltar')

		cy.get('.primary').should('be.visible').and('contain.text', 'Salvar')


	})

	describe('editando', ()=>{

		beforeEach('habilitando edição', ()=>{
			cy.get('.primary').click()

		})

		it('TC003 - editando descrição de motivo', () => {
			
			cy.get('.slider').click()
			cy.get('.ng-select-container').click()
			cy.get("div.ng-option:nth(1)").click()
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()
			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible')
			
			
		})
		
		it('TC004 - botão voltar em popup de edição de motivo', ()=>{

			cy.get('.slider').click()
			cy.get('.ng-select-container').click()
			cy.get("div.ng-option:nth(1)").click()
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()
			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible').click()
			cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should('be.visible')


		})

		it('TC005 - edição válida de descrição de motivo', ()=>{
			
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()
			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible')
		})

		it('TC006 - edição de descrição de motivo para campo vazio',()=>{
			cy.get('#motivo').clear()
			cy.get('.primary').click()

			cy.get('.swal2-popup').should("be.visible")
			cy.get('#swal2-title').should('be.visible').and('contain.text', 'Erro na requisição')
			cy.get('.swal2-popup').should('contain.text', 'A nova descrição do motivo está vazia!')
			cy.get('.swal2-confirm').click()

		})

		it('TC007 - edição de descrição de motivo para descrição já existente', () =>{
			cy.get('#motivo').clear().type("saddasadasdsa")
			cy.get('.primary').click()

			cy.get('.swal2-popup').should("be.visible")
			cy.get('#swal2-title').should('be.visible').and('contain.text', 'Erro na requisição')
			cy.get('.swal2-popup').should('contain.text', 'Já existe um registro com essa descrição e tipo!')
			cy.get('.swal2-confirm').click()



		})

		it('TC008 - editar ativando campo status inativo', () =>{
			cy.get('.slider').click()
			cy.get('.primary').click()
			cy.get('.swal2-confirm').click()
			cy.get('tbody > :nth-child(1) > :nth-child(3)').should('contain.text'," ")



		})

		it('TC009 - editar desativando campo status ativo de motivo associado a usuário', ()=>{


		})

		it("TC010 - editar alterando campo tipo - válido", ()=>{
			
			cy.get('.ng-select-container').click()
			cy.get("div.ng-option:nth(0)").click()
			
			cy.get('.primary').click()

			cy.get('.swal2-popup').should('be.visible')
			cy.get('.swal2-popup').find('#swal2-title').should('contain.text', 'Sucesso')
			cy.get('.swal2-popup').should('contain.text', 'Registro atualizado com sucesso!')
			cy.get('.swal2-confirm').should('be.visible').click()


		})

		it('TC011 - editar alterando campo "tipo" - inválido', ()=>{
			cy.get('.ng-clear-wrapper').click()
			cy.get('.ng-select-container').type('dabaca')
			

		})

		it('TC012 - editar alterando campo "descrição de motivo" - válido', ()=>{
			cy.get('#motivo').clear().type('aaaaaaaaabbbbbbcccccc')
			cy.get('.primary').click()



		})

		it('TC013 - editar alterando campo "descrição de motivo" - inválido',() => {
			cy.get('#motivo').testaCampo(120)


		} )

	})

})

