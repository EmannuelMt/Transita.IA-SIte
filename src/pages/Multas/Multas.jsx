import React, { useState, useEffect } from 'react';
import './Multas.css';

const Multas = () => {
  const [multas, setMultas] = useState([]);
  const [filteredMultas, setFilteredMultas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMulta, setEditingMulta] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todas');
  const [formData, setFormData] = useState({
    placa: '',
    motorista: '',
    valor: '',
    data: '',
    local: '',
    infracao: '',
    status: 'pendente',
    observacoes: ''
  });

  // Dados mockados para demonstração
  useEffect(() => {
    const mockMultas = [
      {
        id: 1,
        placa: 'ABC-1234',
        motorista: 'João Silva',
        valor: 195.23,
        data: '2024-01-15',
        local: 'Av. Paulista, 1000',
        infracao: 'Estacionamento proibido',
        status: 'pendente',
        observacoes: 'Veículo estacionado em local proibido'
      },
      {
        id: 2,
        placa: 'DEF-5678',
        motorista: 'Maria Santos',
        valor: 293.47,
        data: '2024-01-10',
        local: 'Rua Augusta, 500',
        infracao: 'Excesso de velocidade',
        status: 'paga',
        observacoes: 'Velocidade 80km/h em zona de 60km/h'
      },
      {
        id: 3,
        placa: 'GHI-9012',
        motorista: 'Pedro Oliveira',
        valor: 880.41,
        data: '2024-01-08',
        local: 'Av. Brigadeiro, 200',
        infracao: 'Avanço de sinal vermelho',
        status: 'pendente',
        observacoes: 'Cruzamento sem respeitar sinal vermelho'
      }
    ];
    setMultas(mockMultas);
    setFilteredMultas(mockMultas);
  }, []);

  // Filtrar multas
  useEffect(() => {
    let filtered = multas.filter(multa =>
      multa.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      multa.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      multa.infracao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== 'todas') {
      filtered = filtered.filter(multa => multa.status === statusFilter);
    }

    setFilteredMultas(filtered);
  }, [multas, searchTerm, statusFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMulta) {
      // Editar multa existente
      setMultas(prev => prev.map(multa =>
        multa.id === editingMulta.id
          ? { ...multa, ...formData }
          : multa
      ));
    } else {
      // Adicionar nova multa
      const newMulta = {
        ...formData,
        id: Date.now(),
        valor: parseFloat(formData.valor)
      };
      setMultas(prev => [...prev, newMulta]);
    }

    // Reset form
    setFormData({
      placa: '',
      motorista: '',
      valor: '',
      data: '',
      local: '',
      infracao: '',
      status: 'pendente',
      observacoes: ''
    });
    setShowForm(false);
    setEditingMulta(null);
  };

  const handleEdit = (multa) => {
    setEditingMulta(multa);
    setFormData({
      placa: multa.placa,
      motorista: multa.motorista,
      valor: multa.valor.toString(),
      data: multa.data,
      local: multa.local,
      infracao: multa.infracao,
      status: multa.status,
      observacoes: multa.observacoes
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta multa?')) {
      setMultas(prev => prev.filter(multa => multa.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'status-pendente';
      case 'paga': return 'status-paga';
      case 'contestado': return 'status-contestado';
      default: return 'status-pendente';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'paga': return 'Paga';
      case 'contestado': return 'Contestado';
      default: return 'Pendente';
    }
  };

  const totalMultas = multas.length;
  const totalValor = multas.reduce((sum, multa) => sum + multa.valor, 0);
  const multasPendentes = multas.filter(m => m.status === 'pendente').length;

  return (
    <div className="multas-page">
      <div className="multas-container">
        {/* Header */}
        <div className="multas-header">
          <div className="header-content">
            <h1 className="page-title">Gerenciamento de Multas</h1>
            <p className="page-subtitle">Controle e acompanhe todas as infrações da frota</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            <span className="btn-icon">+</span>
            Nova Multa
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{totalMultas}</div>
              <div className="stat-label">Total de Multas</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-value">R$ {totalValor.toFixed(2)}</div>
              <div className="stat-label">Valor Total</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{multasPendentes}</div>
              <div className="stat-label">Pendentes</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por placa, motorista ou infração..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <div className="filter-select">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="todas">Todas as multas</option>
              <option value="pendente">Pendentes</option>
              <option value="paga">Pagas</option>
              <option value="contestado">Contestadas</option>
            </select>
          </div>
        </div>

        {/* Multas List */}
        <div className="multas-list">
          {filteredMultas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🚫</div>
              <h3>Nenhuma multa encontrada</h3>
              <p>Não há multas que correspondam aos filtros aplicados.</p>
            </div>
          ) : (
            filteredMultas.map(multa => (
              <div key={multa.id} className="multa-card">
                <div className="multa-header">
                  <div className="multa-info">
                    <h3 className="multa-placa">{multa.placa}</h3>
                    <p className="multa-motorista">{multa.motorista}</p>
                  </div>
                  <div className="multa-status">
                    <span className={`status-badge ${getStatusColor(multa.status)}`}>
                      {getStatusText(multa.status)}
                    </span>
                  </div>
                </div>

                <div className="multa-details">
                  <div className="detail-row">
                    <span className="detail-label">Valor:</span>
                    <span className="detail-value">R$ {multa.valor.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Data:</span>
                    <span className="detail-value">{new Date(multa.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Local:</span>
                    <span className="detail-value">{multa.local}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Infração:</span>
                    <span className="detail-value">{multa.infracao}</span>
                  </div>
                  {multa.observacoes && (
                    <div className="detail-row">
                      <span className="detail-label">Observações:</span>
                      <span className="detail-value">{multa.observacoes}</span>
                    </div>
                  )}
                </div>

                <div className="multa-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => handleEdit(multa)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(multa.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingMulta ? 'Editar Multa' : 'Nova Multa'}</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="multa-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="placa">Placa do Veículo *</label>
                    <input
                      type="text"
                      id="placa"
                      name="placa"
                      value={formData.placa}
                      onChange={handleInputChange}
                      required
                      placeholder="ABC-1234"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="motorista">Motorista *</label>
                    <input
                      type="text"
                      id="motorista"
                      name="motorista"
                      value={formData.motorista}
                      onChange={handleInputChange}
                      required
                      placeholder="Nome do motorista"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="valor">Valor (R$) *</label>
                    <input
                      type="number"
                      id="valor"
                      name="valor"
                      value={formData.valor}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="data">Data da Infração *</label>
                    <input
                      type="date"
                      id="data"
                      name="data"
                      value={formData.data}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="local">Local da Infração *</label>
                    <input
                      type="text"
                      id="local"
                      name="local"
                      value={formData.local}
                      onChange={handleInputChange}
                      required
                      placeholder="Endereço completo"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="infracao">Tipo de Infração *</label>
                    <select
                      id="infracao"
                      name="infracao"
                      value={formData.infracao}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione a infração</option>
                      <option value="Estacionamento proibido">Estacionamento proibido</option>
                      <option value="Excesso de velocidade">Excesso de velocidade</option>
                      <option value="Avanço de sinal vermelho">Avanço de sinal vermelho</option>
                      <option value="Parada sobre faixa">Parada sobre faixa</option>
                      <option value="Falta de cinto de segurança">Falta de cinto de segurança</option>
                      <option value="Uso de celular">Uso de celular durante direção</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="paga">Paga</option>
                      <option value="contestado">Contestado</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="observacoes">Observações</label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      value={formData.observacoes}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Detalhes adicionais sobre a infração..."
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingMulta ? 'Salvar Alterações' : 'Adicionar Multa'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multas;