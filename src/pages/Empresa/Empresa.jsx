import React from 'react';
import { motion } from 'motion/react';
import Lottie from 'lottie-react';
import CountUp from 'react-countup';
import './Empresa.css';
import logoBanner from '../../assets/images/Logo/logo.svg';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Globe, 
  Award, 
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

// Mock Lottie animation data (placeholder)
const animationData = {
  v: "5.5.7",
  fr: 60,
  ip: 0,
  op: 60,
  w: 500,
  h: 500,
  nm: "Logistics",
  ddd: 0,
  assets: [],
  layers: []
};

const Empresa = () => {
  const stats = [
    { label: 'Clientes Ativos', value: 500, suffix: '+' },
    { label: 'Rotas Otimizadas', value: 10, suffix: 'M+' },
    { label: 'Economia Gerada', value: 150, suffix: 'M+' },
    { label: 'Países Atendidos', value: 12, suffix: '' },
  ];

  const team = [
    { name: 'Ana Silva', role: 'CEO & Founder', image: 'https://picsum.photos/seed/ana/200/200' },
    { name: 'Bruno Costa', role: 'CTO', image: 'https://picsum.photos/seed/bruno/200/200' },
    { name: 'Carla Dias', role: 'Head of AI', image: 'https://picsum.photos/seed/carla/200/200' },
    { name: 'David Santos', role: 'COO', image: 'https://picsum.photos/seed/david/200/200' },
  ];

  const values = [
    { title: 'Inovação Constante', desc: 'Buscamos sempre a fronteira da tecnologia em IA.', icon: Lightbulb },
    { title: 'Foco no Cliente', desc: 'O sucesso da sua logística é o nosso norte.', icon: Target },
    { title: 'Sustentabilidade', desc: 'Reduzimos emissões através da eficiência.', icon: Globe },
    { title: 'Transparência', desc: 'Processos claros e dados protegidos.', icon: Users },
  ];

  return (
    <div className="empresa-root">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-layout">
            <div className="hero-left">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="hero-title"
              >
                Transformando a logística global com <span className="highlight">Inteligência Artificial</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="hero-subtitle"
              >
                Nascemos com a missão de tornar o transporte de cargas mais eficiente, sustentável e inteligente através de algoritmos avançados e dados em tempo real.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="cta-buttons"
              >
                <button className="btn-outline">Trabalhe Conosco</button>
              </motion.div>
            </div>
            <div className="hero-right">
              <div className="hero-animation">
                <div className="hero-decor"></div>
                <Lottie animationData={animationData} className="animation-player" />
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="hero-gradient" />
      </section>

      {/* stats section removed */}

      {/* About Section */}
      <section className="about-section">
        <div className="container about-layout">
          <div className="about-left">
            <div className="about-logo">
              <img src={logoBanner} alt="Transita.AI Logo" />
            </div>
          </div>

          <div className="about-right">
            <p className="about-text">Desde 2018, a Transita.AI vem revolucionando o setor logístico brasileiro através da tecnologia de ponta. Nossa missão é simplificar a complexidade das operações logísticas, proporcionando eficiência, redução de custos e sustentabilidade para empresas de todos os portes.</p>

            <div className="about-values">
              <div className="value-item">
                <h3>Inovação Constante</h3>
                <p>Buscamos constantemente novas tecnologias e soluções criativas para superar expectativas.</p>
              </div>

              <div className="value-item">
                <h3>Parceria Estratégica</h3>
                <p>Trabalhamos lado a lado com nossos clientes, construindo relações de longo prazo.</p>
              </div>

              <div className="value-item">
                <h3>Confiança Total</h3>
                <p>Segurança, transparência e confiabilidade são a base de todas as nossas relações.</p>
              </div>

              <div className="value-item">
                <h3>Sustentabilidade</h3>
                <p>Compromisso com operações eco-friendly e responsabilidade ambiental em todas as ações.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Features Section */}
          <section className="features-section">
            <div className="container">
              <div className="features-header">
                <h2 className="features-title">Funcionalidades</h2>
                <p className="features-subtitle">Tudo que você precisa em um só lugar</p>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon"><Target size={28} /></div>
                  <h3 className="feature-title">Roteirização Dinâmica</h3>
                  <p className="feature-desc">Otimização em tempo real considerando trânsito, entregas e restrições</p>
                  <div className="feature-metric">+40% eficiência</div>
                </div>

                <div className="feature-card">
                  <div className="feature-icon"><TrendingUp size={28} /></div>
                  <h3 className="feature-title">Monitoramento em Tempo Real</h3>
                  <p className="feature-desc">Acompanhe sua frota com atualizações a cada 5 segundos</p>
                  <div className="feature-metric">99.9% uptime</div>
                </div>

                <div className="feature-card">
                  <div className="feature-icon"><Lightbulb size={28} /></div>
                  <h3 className="feature-title">Análise Preditiva</h3>
                  <p className="feature-desc">Preveja demandas e evite gargalos com machine learning</p>
                  <div className="feature-metric">95% precisão</div>
                </div>

                <div className="feature-card">
                  <div className="feature-icon"><Award size={28} /></div>
                  <h3 className="feature-title">Segurança Avançada</h3>
                  <p className="feature-desc">Criptografia de ponta a ponta e conformidade com LGPD</p>
                  <div className="feature-metric">ISO 27001.</div>
                </div>
              </div>
            </div>
          </section>

      {/* Mission & Values */}
      <section className="values-section">
        <div className="container">
          <div className="values-header">
            <h2 className="values-title">Nossos Valores</h2>
            <p className="values-subtitle">O que nos guia todos os dias na construção do futuro da logística.</p>
          </div>
          <div className="values-grid">
            {values.map((value, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="value-card">
                <div className="value-icon"><value.icon size={24} /></div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-header">
            <div className="team-intro">
              <h2 className="team-title">Mentes brilhantes por trás da tecnologia</h2>
              <p className="team-subtitle">Um time multidisciplinar de especialistas em IA, logística e engenharia de software.</p>
            </div>
            <button className="btn-outline">Ver Time Completo</button>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="team-member">
                <div className="member-photo">
                  <img src={member.image} alt={member.name} className="member-img" referrerPolicy="no-referrer" />
                  <div className="member-over">
                    <button className="icon-btn"><Linkedin size={18} /></button>
                    <button className="icon-btn"><Twitter size={18} /></button>
                  </div>
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">FALE CONOSCO</h2>
            <h3 className="section-subtitle">Estamos Prontos para Ajudar</h3>
            <p className="section-description">Converse com nossos especialistas e transforme sua operação logística hoje mesmo.</p>
          </div>

          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h3>Envie uma Mensagem</h3>
                <p>Preencha o formulário abaixo e nossa equipe entrará em contato em até 2 horas úteis.</p>
              </div>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Assunto *</label>
                  <select id="subject" required>
                    <option value="">Selecione o assunto</option>
                    <option value="orcamento">Orçamento</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="demonstracao">Demonstração</option>
                    <option value="parceria">Parceria</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem *</label>
                  <textarea
                    id="message"
                    placeholder="Descreva sua dúvida, problema ou solicitação..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="form-footer">
                  <p className="privacy-notice">
                    Seus dados estão seguros conosco. Não compartilhamos informações com terceiros.
                  </p>
                  <button type="submit" className="btn-primary transita-btn-xl">
                    <span>Enviar Mensagem</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-units">
                <h3>Nossas Unidades</h3>

                <div className="unit-card">
                  <div className="unit-header">
                    <div className="unit-badge">HQ</div>
                    <h4>São Paulo - Matriz</h4>
                  </div>
                  <div className="unit-address">
                    <MapPin size={18} />
                    <span>Av. Paulista, 1000 - 10º andar<br />Bela Vista, São Paulo - SP</span>
                  </div>
                  <div className="unit-contact">
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>(11) 3333-4444</span>
                    </div>
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>sp@transita.ai</span>
                    </div>
                    <div className="contact-item">
                      <span>Seg-Sex: 8h às 18h</span>
                    </div>
                  </div>
                </div>

                <div className="unit-card">
                  <div className="unit-header">
                    <div className="unit-badge">FILIAL</div>
                    <h4>Goiás - Anápolis</h4>
                  </div>
                  <div className="unit-address">
                    <MapPin size={18} />
                    <span>Av. Brasil, 500 - Centro<br />Anápolis, Goiás - GO</span>
                  </div>
                  <div className="unit-contact">
                    <div className="contact-item">
                      <Phone size={16} />
                      <span>(62) 2222-3333</span>
                    </div>
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>go@transita.ai</span>
                    </div>
                    <div className="contact-item">
                      <span>Seg-Sex: 8h às 18h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Empresa;