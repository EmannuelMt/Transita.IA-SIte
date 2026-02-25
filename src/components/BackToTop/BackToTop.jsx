import React, { useState, useEffect } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import './BackToTop.css';

const BackToTop = ({ offset = 300 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.pageYOffset > offset);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [offset]);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible) return null;

    return (
        <button
            className="back-to-top"
            onClick={handleClick}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
        >
            <FiChevronUp size={20} />
        </button>
    );
};

export default BackToTop;
