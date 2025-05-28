import React, { useEffect } from 'react';

export const AccessibilityAdvanced = () => {
  useEffect(() => {
    // Foco animado
    const style = document.createElement('style');
    style.innerHTML = `
      :focus {
        outline: 2px solid #00d2df !important;
        outline-offset: 2px;
        transition: outline 0.2s;
      }
      .skip-link {
        position: absolute;
        left: -999px;
        top: 8px;
        background: #00d2df;
        color: #fff;
        padding: 8px 16px;
        z-index: 1000;
        border-radius: 4px;
        font-weight: bold;
        transition: left 0.2s;
      }
      .skip-link:focus {
        left: 16px;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <a href="#main-content" className="skip-link" tabIndex={0} aria-label="Pular para o conteúdo principal">
      Pular para o conteúdo principal
    </a>
  );
}; 