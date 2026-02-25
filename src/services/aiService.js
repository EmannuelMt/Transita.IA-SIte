// services/aiService.js
export class AIService {
  static async analyzeFinancialData(financialData, transactions, vehicles) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = this.generateAIAnalysis(financialData, transactions, vehicles);
        resolve(analysis);
      }, 1000);
    });
  }

  static generateAIAnalysis(financialData, transactions, vehicles) {
    const { receita, despesas, lucro, margem } = financialData;
    
    let healthScore = 7.5;
    if (margem > 30) healthScore += 1;
    if (margem > 40) healthScore += 1;
    if (lucro > receita * 0.25) healthScore += 1;
    
    const receitasPendentes = transactions.filter(t => 
      t.tipo === 'receita' && t.status === 'pendente'
    ).length;
    
    if (receitasPendentes > 3) healthScore -= 1;
    
    const insights = this.generateInsights(financialData, transactions, vehicles);
    
    const vehiclesWithROI = vehicles.map(veiculo => ({
      ...veiculo,
      roi: ((veiculo.receita - veiculo.custos) / veiculo.custos * 100).toFixed(1),
      eficiencia: (veiculo.km / veiculo.combustivel).toFixed(2),
      lucro: veiculo.receita - veiculo.custos
    }));

    vehiclesWithROI.sort((a, b) => b.lucro - a.lucro);

    return {
      healthScore: Math.min(10, Math.max(0, healthScore)).toFixed(1),
      insights,
      vehicles: vehiclesWithROI,
      summary: this.generateSummary(financialData, insights)
    };
  }

  static generateInsights(financialData, transactions, vehicles) {
    const insights = [];
    const { receita, despesas, lucro, margem } = financialData;

    if (margem < 25) {
      insights.push({
        id: 1,
        type: 'warning',
        title: 'Margem de Lucro Baixa',
        description: `Sua margem atual é de ${margem}%, abaixo do ideal (25%) para o setor de transportes`,
        suggestion: 'Revise custos operacionais e otimize rotas para aumentar a rentabilidade',
        impact: 'Alto',
        economyPotential: 3200,
        priority: 'high'
      });
    }

    const combustivelCost = transactions
      .filter(t => t.categoria === 'combustivel')
      .reduce((sum, t) => sum + t.valor, 0);
    
    const combustivelPercent = (combustivelCost / despesas) * 100;
    if (combustivelPercent > 35) {
      insights.push({
        id: 2,
        type: 'opportunity',
        title: 'Otimização de Combustível',
        description: `Custos com combustível representam ${combustivelPercent.toFixed(1)}% das despesas totais`,
        suggestion: 'Implemente programa de direção econômica e negocie melhores preços com postos',
        impact: 'Médio',
        economyPotential: 1800,
        priority: 'medium'
      });
    }

    const receitasPendentes = transactions.filter(t => 
      t.tipo === 'receita' && t.status === 'pendente'
    );
    const totalPendente = receitasPendentes.reduce((sum, t) => sum + t.valor, 0);
    
    if (receitasPendentes.length > 2) {
      insights.push({
        id: 3,
        type: 'risk',
        title: 'Recebimentos Atrasados',
        description: `${receitasPendentes.length} fretes (${this.formatCurrency(totalPendente)}) aguardando pagamento`,
        suggestion: 'Reforce processo de cobrança e renegocie prazos com clientes',
        impact: 'Crítico',
        economyPotential: totalPendente * 0.3,
        priority: 'critical'
      });
    }

    return insights.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  static generateSummary(financialData, insights) {
    const totalEconomy = insights.reduce((sum, insight) => sum + insight.economyPotential, 0);
    const criticalInsights = insights.filter(i => i.priority === 'critical').length;
    
    return {
      totalEconomy,
      criticalInsights,
      totalInsights: insights.length,
      recommendation: this.getMainRecommendation(insights)
    };
  }

  static getMainRecommendation(insights) {
    if (insights.length === 0) return "Situação financeira saudável. Mantenha o bom trabalho!";
    
    const critical = insights.find(i => i.priority === 'critical');
    if (critical) return `Prioridade: Resolver ${critical.title.toLowerCase()}`;
    
    const high = insights.find(i => i.priority === 'high');
    if (high) return `Foco: Implementar ${high.title.toLowerCase()}`;
    
    return `Recomendação: ${insights[0].suggestion}`;
  }

  static formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  static async exportData(format, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Dados exportados em ${format} com sucesso`,
          downloadUrl: `/exports/finance-data-${Date.now()}.${format}`
        });
      }, 1000);
    });
  }
}
