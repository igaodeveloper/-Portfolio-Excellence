// Função serverless para API básica no Netlify
exports.handler = async (event, context) => {
  // Configuração de CORS para permitir solicitações da origem do site
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Tratamento para solicitações OPTIONS (preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Preflight passou com sucesso" }),
    };
  }

  try {
    // Tratamento de diferentes rotas
    const path = event.path.replace(/\/\.netlify\/functions\/api/, "");
    
    // Rota principal
    if (path === "" || path === "/") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: "API do Portfolio funcionando!",
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || "development",
        }),
      };
    }
    
    // Rota para contato
    if (path === "/contact" && event.httpMethod === "POST") {
      try {
        const data = JSON.parse(event.body);
        
        // Aqui você poderia implementar a lógica para salvar o contato 
        // em um serviço externo como Supabase, banco de dados, etc.
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: "Mensagem recebida com sucesso",
            data: {
              name: data.name,
              email: data.email,
              received: true,
            },
          }),
        };
      } catch (error) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            message: "Erro ao processar a solicitação",
            error: error.message,
          }),
        };
      }
    }

    // Rota não encontrada
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ message: "Rota não encontrada" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Erro interno do servidor", error: error.message }),
    };
  }
}; 