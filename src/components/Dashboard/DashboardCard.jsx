import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import PropTypes from 'prop-types';
import './DashboardCard.css';

const DashboardCard = ({ title, value, subtitle, trend, trendValue, icon: Icon, loading }) => {
    const isTrendPositive = trendValue > 0;
    const IconComponent = Icon || (() => <div className="icon-fallback" aria-hidden>⚑</div>);

    if (!Icon) {
        // evitar crash no render caso o caller não tenha passado o ícone corretamente
        // registra no console para facilitar debug
        // eslint-disable-next-line no-console
        console.warn('DashboardCard: ícone não fornecido, renderizando fallback para', title);
    }

    return (
        <div className={`dashboard-card ${loading ? 'loading' : ''}`}>
            <div className="dashboard-card-header">
                <div className="dashboard-card-icon">
                    <IconComponent size={24} />
                </div>
                <div className="dashboard-card-title">{title}</div>
            </div>
            <div className="dashboard-card-content">
                {loading ? (
                    <div className="dashboard-card-skeleton">
                        <div className="skeleton-value"></div>
                        <div className="skeleton-subtitle"></div>
                        <div className="skeleton-trend"></div>
                    </div>
                ) : (
                    <>
                        <div className="dashboard-card-value">{value}</div>
                        <div className="dashboard-card-subtitle">{subtitle}</div>
                        {trend && (
                            <div className={`dashboard-card-trend ${isTrendPositive ? 'positive' : 'negative'}`}>
                                {isTrendPositive ? <FiTrendingUp /> : <FiTrendingDown />}
                                <span>{Math.abs(trendValue)}%</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subtitle: PropTypes.string,
    trend: PropTypes.bool,
    trendValue: PropTypes.number,
    icon: PropTypes.elementType.isRequired,
    loading: PropTypes.bool
};

DashboardCard.defaultProps = {
    subtitle: '',
    trend: false,
    trendValue: 0,
    loading: false
}; export default DashboardCard;