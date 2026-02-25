import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { searchIndex } from '../../services/searchIndex';
import './Search.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();
  
  const q = (query.get('q') || '').trim().toLowerCase();
  const hasQueryParam = query.has('q');
  
  useEffect(() => {
    if (!hasQueryParam) {
      navigate('/not-found', { replace: true });
      return;
    }
  }, [hasQueryParam, navigate]);
  
  if (!hasQueryParam) {
    return null;
  }

  const results = q
    ? searchIndex.filter(item => {
        if (!item || !item.title || !item.keywords || !item.excerpt) {
          return false;
        }
        
        const searchableText = (
          item.title + ' ' + 
          (Array.isArray(item.keywords) ? item.keywords.join(' ') : '') + ' ' + 
          item.excerpt
        ).toLowerCase();
        
        return searchableText.includes(q);
      })
    : [];

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-header">
          <div className="search-header-content">
            <h1 className="search-title">
              Resultados da busca
            </h1>
            <div className="search-query-wrapper">
              <span className="search-query-label">Busca por:</span>
              <span className="search-query-value">{q || '—'}</span>
            </div>
            <div className="search-results-count">
              {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="search-content">
          {!q ? (
            <div className="search-empty-state">
              <div className="search-empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 className="search-empty-title">Busca vazia</h3>
              <p className="search-empty-description">
                Digite algo na barra de pesquisa para buscar no site.
              </p>
              <Link to="/" className="search-home-button">
                Voltar para Home
              </Link>
            </div>
          ) : results.length === 0 ? (
            <div className="search-no-results">
              <div className="search-no-results-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <h3 className="search-no-results-title">
                Nenhum resultado encontrado para "{q}"
              </h3>
              <div className="search-suggestions">
                <p className="search-suggestions-title">Sugestões:</p>
                <ul className="search-suggestions-list">
                  <li className="search-suggestion-item">
                    <span className="suggestion-bullet">•</span>
                    Verifique a ortografia das palavras
                  </li>
                  <li className="search-suggestion-item">
                    <span className="suggestion-bullet">•</span>
                    Tente termos mais gerais ou sinônimos
                  </li>
                  <li className="search-suggestion-item">
                    <span className="suggestion-bullet">•</span>
                    Use menos palavras-chave
                  </li>
                  <li className="search-suggestion-item">
                    <span className="suggestion-bullet">•</span>
                    Certifique-se de que todos os filtros estão corretos
                  </li>
                </ul>
              </div>
              <Link to="/" className="search-home-button">
                Voltar para Home
              </Link>
            </div>
          ) : (
            <div className="search-results-grid">
              {results.map((result, index) => (
                <article key={result.path || index} className="search-result-card">
                  <div className="search-result-header">
                    <h2 className="search-result-title">
                      <Link to={result.path} className="search-result-link">
                        {result.title}
                      </Link>
                    </h2>
                    <div className="search-result-badge">
                      Resultado {index + 1}
                    </div>
                  </div>
                  
                  <p className="search-result-excerpt">
                    {result.excerpt}
                  </p>
                  
                  {Array.isArray(result.keywords) && result.keywords.length > 0 && (
                    <div className="search-result-keywords">
                      {result.keywords.map((keyword, idx) => (
                        <span key={idx} className="search-keyword-tag">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="search-result-footer">
                    <Link to={result.path} className="search-result-action">
                      <span>Ver detalhes</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;