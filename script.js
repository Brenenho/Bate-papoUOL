let mensagens = [];
axios.defaults.headers.common['Authorization'] = 'Kps7jJcX6bsjiTXoVfNJrPap';
let usuario = prompt("Escreva o seu nome: ")

function entrarnasala() {
    const promessa = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/participants",
        {
            name: usuario
          }
      );
    
        promessa.then(UsuarioCadastradaComSucesso);
        promessa.catch(UsuarioErro);
    }

function UsuarioCadastradaComSucesso(deubom) {
        console.log(deubom)
    }

function UsuarioErro(erro) {
    while (erro.response.status === 400) {
            usuario = prompt("Insira outro nome: ")
            console.log(erro)
        }
    }
  entrarnasala();

  function manterconexao() {
    const promessa = axios.post(
        "https://mock-api.driven.com.br/api/vm/uol/status",
        {
            name: usuario
          }
      ); 
      console.log(promessa)     
  }

setInterval(manterconexao, 5000)

function limparInput() {
    var getValue= document.querySelector(".escrever");
        if (getValue.value !="") {
            getValue.value = "";
        }
 }

 function atualizarmensagem() {
  const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
  promise.then( processarListaRecebidaDoServidor );
 }

 atualizarmensagem();
 setInterval(atualizarmensagem, 3000);
 // 3 - pegar a resposta e processar esta resposta ( renderizar no HTML a lista que o servidor me enviou)
 function processarListaRecebidaDoServidor(res){
     console.log(res);

     mensagens = res.data;

     console.log(mensagens.length)

     console.log(mensagens)

    renderizarMensagens();
     
 }

function renderizarMensagens() {
  
  const mensagens1 = document.querySelector(".conteudo");

  mensagens1.innerHTML = ""

  for(let i = 0; i < mensagens.length; i++){
    let mensagem = mensagens[i];

    
    if (mensagem.type === "status") {

      
    
      

      mensagens1.innerHTML += `
    <div class="caixamensagem status" data-test="message">
              <p><a class="horario">(${mensagem.time})</a>  <a class="negrito">${mensagem.from}</a> para <a class="negrito">${mensagem.to}:</a> ${mensagem.text}</p>
            </div>
    `
    } else {

      


      mensagens1.innerHTML += `
    <div class="caixamensagem" data-test="message">
              <p><a class="horario">(${mensagem.time})</a>  <a class="negrito">${mensagem.from}</a> para <a class="negrito">${mensagem.to}:</a> ${mensagem.text}</p>
            </div>
    `}
   };
 };
  

function inserirReceita() {
    const mensagens = document.querySelector(".escrever").value;
    
    const promessa = axios.post(
      "https://mock-api.driven.com.br/api/vm/uol/messages",
      {
        from: usuario,
        to: "Todos",
        text: mensagens,
        type: "message" // ou "private_message" para o bônus
    }
    );
  
    promessa.then(enviosucesso);
    promessa.catch(naoenviada)
    limparInput();
  }

  function enviosucesso(mensagemenviada) {
    
    const promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promise.then( mensagemchegou );
  }

  function mensagemchegou(respostaatualizada) {

    mensagens = respostaatualizada.data;
    renderizarMensagens();
  }

  function naoenviada() {
    window.location.reload(forceReload);

  }