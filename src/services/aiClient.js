// Cliente de AI leve para desenvolvimento
// - Tenta encaminhar a requisição ao endpoint backend `/api/ai` (recomendado para produção)
// - Se o endpoint não existir ou falhar, devolve uma resposta mock segura

export async function generateResponse(userInput) {
  // Tentar chamar backend primeiro
  try {
    const resp = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: userInput })
    });

    if (!resp.ok) {
      throw new Error('backend ai erro');
    }

    const data = await resp.json();
    // aceitar múltiplos formatos (data.text, data.output, data.result)
    return data?.text || data?.output || data?.result || 'Desculpe, não consegui gerar resposta.';
  } catch (err) {
    // Fallback: resposta simples e útil para desenvolvimento
    console.warn('AI backend unavailable, using mock response:', err?.message || err);
    const sanitized = String(userInput || '').slice(0, 400);
    return `Recebi sua pergunta: "${sanitized}". No modo de desenvolvimento não há integração com o motor de IA — verifique a rota '/api/ai' ou instale o SDK. Aqui está uma sugestão: tente perguntar sobre motoristas, multas ou manutenção.`;
  }
}

export default { generateResponse };
