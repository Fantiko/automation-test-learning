describe("TS001 - Judicial - Consultar favorecido", () => {
  const url = "http://sinistro-controller-jud-dev.segurosunimed.com.br/vida-b2c/api/judicial/consultar-favorecido"

    let json = {}
    beforeEach('Json',() => {
      json = {
        numeroSinistro: '3009324000003',
        tipoRegistro: 'CORRETOR',
        tipoPessoa: 'FISICA',
        documento: '058.044.307-85',
        nome: 'Jorge malaquias de oliveira neto',
        dataNascimento: '2016-05-12',
        sexo: 'MASC'
      };
    })
   
    it("TC001 - Busca todos os campos informados e válidos válidos", () => {
      cy.envioJsonPost(json, url, 200);
    })
   
    it("TC002 - Busca numero sinistro vazio e todos os campos válidos", () => {
      json.numeroSinistro = '';
      cy.envioJsonPost(json, url, 200);
    })

    it('TC003 - Busca com o cada valor de tipo de registro', ()=>{
      const Registros = ["CORRETOR",
        "CLIENTE",
        "SEGURADO",
        "BENEFICIARIO",
        "PRESTADOR_SERVICO",
        "SUB_ESTIPULANTE",
        "OUTROS",
        "PREPOSTO",
        "DESTINATARIO"]

       for(const registro of Registros){
        json.tipoRegistro = registro
        cy.envioJsonPost(json, url, 400, 'Nenhum favorecido localizado com os parâmetros informados.');

       }

    })

    it('TC004 - Busca com o cada valor de tipo de pessoa', ()=>{
      const Registros = ["FISICA",
        "JURIDICA",
        "JURIDICA_ISENTA"]

       for(const registro of Registros){
        json.tipoPessoa = registro

        if(registro != 'FISICA'){
          json.sexo = null
          json.dataNascimento = null
          json.documento = '93.662.709/0001-33'
        }
        cy.envioJsonPost(json, url, 400, "Nenhum favorecido localizado com os parâmetros informados.");
        
       }

    })

    it('TC005 - Busca com Nome', ()=>{
      json.nome = 'Kaio Stefan Campos Nunes'
      cy.envioJsonPost(json, url, 400, "Nenhum favorecido localizado com os parâmetros informados.");
        
    })

    it('TC006 - Busca com documento', ()=>{
      json.documento = '683.921.270-05'
      cy.envioJsonPost(json, url, 400, "Nenhum favorecido localizado com os parâmetros informados.");
        
    })

    it('TC007 - Busca com Sexo', ()=>{
      json.sexo = 'FEM'
      cy.envioJsonPost(json, url, 400, "Nenhum favorecido localizado com os parâmetros informados.");
        
    })

    it('TC008 - Tipo de registro invalido', ()=>{
      json.tipoRegistro = 'CORRETORA'
      cy.envioJsonPost(json, url, 400);
        
    })

    it('TC009 - Busca com pessoa fisica documento errado', ()=>{

      json.documento = '93.662.709/0001-33'
    
      cy.envioJsonPost(json, url, 400, "O Documento informado não é um CPF válido.");
        
       

    })

    it('TC0010 - Busca com pessoa fisica sem documento', ()=>{

      json.documento = null
    
      cy.envioJsonPost(json, url, 400, "Campo Documento não informado.");
        
       

    })

    it('TC011 - Busca com pessoa fisica sem sexo', ()=>{

      json.sexo = null
    
      cy.envioJsonPost(json, url, 400, "Campo Sexo não informado.");
        
       

    })

    it('TC012 - Busca com pessoa fisica sexo invalido', ()=>{

      json.sexo = 'invalido'
    
      cy.envioJsonPost(json, url, 400, "");
        
       

    })

    it('TC013 - Busca com pessoa juridica e juridica insenta documento invalido', ()=>{
      const Registros = ["JURIDICA",
      "JURIDICA_ISENTA"]
      
      json.sexo = null
      json.dataNascimento = null
     
      for(const registro of Registros){
        json.tipoPessoa = registro
        
        cy.envioJsonPost(json, url, 400, "O Documento informado não é um CNPJ válido.");
              
      }

    })

    it('TC014 - Busca com pessoa juridica e juridica insenta recebendo o campo sexo', ()=>{
      const Registros = ["JURIDICA",
      "JURIDICA_ISENTA"]
      
      json.dataNascimento = null

      json.documento = '93.662.709/0001-33'

     
      for(const registro of Registros){
        json.tipoPessoa = registro
        
        cy.envioJsonPost(json, url, 400, "Para Pessoa Jurídica não informar o Sexo.");
              
      }

    })

    it('TC015 - Busca com pessoa juridica e juridica insenta recebendo data de nascimento', ()=>{
      const Registros = ["JURIDICA",
      "JURIDICA_ISENTA"]
      
      json.sexo = null


      json.documento = '93.662.709/0001-33'

     
      for(const registro of Registros){
        json.tipoPessoa = registro
        
        cy.envioJsonPost(json, url, 400, "Para Pessoa Jurídica não informar Data de Nascimento.");
              
      }

    })

    it('TC016 - Busca Nome com numero', ()=>{
        json.nome = 1111111111
        cy.envioJsonPost(json, url, 400, "Nenhum favorecido localizado com os parâmetros informados.");
              
      

    })

    it('TC017 - Data de Nascimento', ()=>{
      json.dataNascimento = '2024-05-30'
      cy.envioJsonPost(json, url, 400);
            

    })

    it.only('TC018 - Data de Nascimento', ()=>{
      json.tipoPessoa = 'JURIDICA'
      json.tipoRegistro = 'CORRETOR'
      json.documento = '29.579.099/0001-00'
      json.nome = 'teste CNPJ QA 2'
      json.sexo = null
      json.dataNascimento = null
      json.numeroSinistro = 3009324000003

      cy.envioJsonPost(json, url, 400, 'Nenhum favorecido localizado com os parâmetros informados.');
            

    })

   


  })