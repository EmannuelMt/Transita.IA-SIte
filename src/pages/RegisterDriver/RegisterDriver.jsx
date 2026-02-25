import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt,
  FaMapMarkerAlt, FaTruck, FaSave, FaArrowLeft, FaCheckCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './RegisterDriver.css';

const RegisterDriver = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    cnh: '',
    categoriaCNH: 'B',
    dataNascimento: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    tipoVeiculo: 'caminhao',
    placa: '',
    modelo: '',
    ano: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLoading(false);
    setSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        cnh: '',
        categoriaCNH: 'B',
        dataNascimento: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
        tipoVeiculo: 'caminhao',
        placa: '',
        modelo: '',
        ano: ''
      });
    }, 3000);
  };

  if (success) {
    return (
      <div className="register-driver-container">
        <div className="success-message">
          <FaCheckCircle size={64} />
          <h2>Motorista Registrado com Sucesso!</h2>
          <p>O motorista foi adicionado ao sistema e receberá as credenciais por email.</p>
          <Link to="/dashboard" className="back-button">
            <FaArrowLeft /> Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-driver-container">
      <div className="register-header">
        <Link to="/dashboard" className="back-link">
          <FaArrowLeft /> Voltar ao Dashboard
        </Link>
        <h1>Registrar Novo Motorista</h1>
        <p>Adicione um novo motorista à sua frota</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="register-form-container"
      >
        <form onSubmit={handleSubmit} className="register-form">
          {/* Dados Pessoais */}
          <div className="form-section">
            <h3>Dados Pessoais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome Completo</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="João Silva"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="joao@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>CPF</label>
                <div className="input-wrapper">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Data de Nascimento</label>
                <div className="input-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CNH */}
          <div className="form-section">
            <h3>Carteira Nacional de Habilitação</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Número da CNH</label>
                <div className="input-wrapper">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    name="cnh"
                    value={formData.cnh}
                    onChange={handleInputChange}
                    required
                    placeholder="00000000000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
                  name="categoriaCNH"
                  value={formData.categoriaCNH}
                  onChange={handleInputChange}
                  required
                >
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="form-section">
            <h3>Endereço</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Endereço</label>
                <div className="input-wrapper">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    required
                    placeholder="Rua das Flores, 123"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  required
                  placeholder="São Paulo"
                />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  {/* Adicionar mais estados */}
                </select>
              </div>

              <div className="form-group">
                <label>CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  required
                  placeholder="00000-000"
                />
              </div>
            </div>
          </div>

          {/* Veículo */}
          <div className="form-section">
            <h3>Veículo</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Tipo de Veículo</label>
                <select
                  name="tipoVeiculo"
                  value={formData.tipoVeiculo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="caminhao">Caminhão</option>
                  <option value="carreta">Carreta</option>
                  <option value="van">Van</option>
                  <option value="utilitario">Utilitário</option>
                </select>
              </div>

              <div className="form-group">
                <label>Placa</label>
                <div className="input-wrapper">
                  <FaTruck className="input-icon" />
                  <input
                    type="text"
                    name="placa"
                    value={formData.placa}
                    onChange={handleInputChange}
                    required
                    placeholder="ABC-1234"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleInputChange}
                  required
                  placeholder="Mercedes-Benz Actros"
                />
              </div>

              <div className="form-group">
                <label>Ano</label>
                <input
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleInputChange}
                  required
                  placeholder="2020"
                  min="1990"
                  max="2026"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <FaSave /> Registrar Motorista
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterDriver;