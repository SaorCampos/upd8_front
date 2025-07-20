import React from 'react';

function Loading() {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
      <p>Carregando...</p>
    </div>
  );
}

export default Loading;