import React, { useState, useEffect, memo } from 'react';
import { FiClock } from 'react-icons/fi';
import './TimeClock.css';

const TimeClock = () => {
  const [time, setTime] = useState(new Date());
  const [dayInfo, setDayInfo] = useState('');

  useEffect(() => {
    // Atualizar relógio a cada segundo
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Formatar informações do dia
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: 'America/Sao_Paulo'
    });
    
    const brasiliaTime = new Date(time.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const formatted = formatter.format(brasiliaTime);
    setDayInfo(formatted);
  }, [time]);

  // Obter hora de Brasília
  const getBrasiliaTime = () => {
    const brasiliaTime = new Date(time.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    return brasiliaTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo'
    });
  };

  const brasiliaTime = getBrasiliaTime();

  return (
    <div className="time-clock">
      <div className="time-clock-icon">
        <FiClock size={18} />
      </div>
      <div className="time-clock-content">
        <div className="time-clock-time">{brasiliaTime}</div>
        <div className="time-clock-date">{dayInfo}</div>
      </div>
    </div>
  );
};

export default memo(TimeClock);
