/**
 * Função padrão para renderizar a página HTML no navegador.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ProntuárioSync - Localizador')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Função para buscar pacientes na planilha e retornar objetos estruturados.
 * Esta versão garante que o nome do paciente seja devolvido para evitar 'undefined'.
 */
function buscarPaciente(nome) {
  // Obtém a planilha ativa e a aba (ajuste o nome se necessário)
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Página1") || ss.getActiveSheet();
  const dados = sheet.getDataRange().getValues();

  let resultados = [];

  // Garante que o termo de busca seja uma string limpa e em minúsculas
  nome = nome ? nome.toString().toLowerCase().trim() : "";

  // Percorre os dados ignorando o cabeçalho (linha 0)
  for (let i = 1; i < dados.length; i++) {
    let armario = dados[i][0];
    let gaveta = dados[i][1];
    let pasta = dados[i][2];
    let nomePlanilhaRaw = dados[i][3];
    
    // Converte o nome da planilha para texto para comparação
    let nomePlanilha = nomePlanilhaRaw ? nomePlanilhaRaw.toString().toLowerCase() : "";

    // Verifica se o termo pesquisado está contido no nome do paciente
    if (nomePlanilha.includes(nome)) {
      resultados.push({
        armario: armario,
        gaveta: gaveta,
        pasta: pasta,
        paciente: nomePlanilhaRaw // Enviando o nome original para o frontend
      });
    }
  }

  return resultados;
}
