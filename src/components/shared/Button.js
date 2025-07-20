import React from 'react';

function ActionButton({ title, color, onClick }) {
  const buttonClass = `btn btn-${color} btn-sm`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {title}
    </button>
  );
}

export default ActionButton;
