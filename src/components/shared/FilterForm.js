import React from 'react';
import Button from './Button';

export default function FilterForm({
  fields,
  values,
  errors,
  onChange,
  onSubmit,
  onClear,
  submitLabel = "Pesquisar",
  clearLabel  = "Limpar"
}) {
  return (
    <form className="g-3 align-items-center mt-3" onSubmit={onSubmit}>
      <div className="row">
        {fields.map((f, i) => {
          const common = {
            id:   f.name,
            name: f.name,
            value: values[f.name] || '',
            onChange,
            className: `form-control ${errors?.[f.name] ? 'is-invalid':''}`
          };
          
          switch(f.type) {
            case 'text':
            case 'date':
              return (
                <React.Fragment key={i}>
                  <div className="col-auto">
                    <label htmlFor={f.name} className="col-form-label">{f.label}</label>
                  </div>
                  <div className="col-auto">
                    <input type={f.type} placeholder={f.placeholder||''} maxLength={f.maxLength||undefined} {...common}/>
                    <div className="invalid-feedback">
                      {errors?.[f.name] || f.required && 'Campo obrigatório'}
                    </div>
                  </div>
                </React.Fragment>
              );
            case 'radio-group':
              return (
                <div className="col-auto d-flex" key={i}>
                  {f.options.map(opt => (
                    <div className="form-check me-2" key={opt.value}>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={opt.value}
                        name={f.name}
                        value={opt.value}
                        checked={values[f.name]===opt.value}
                        onChange={onChange}
                      />
                      <label className="form-check-label" htmlFor={opt.value}>
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              );
            case 'select':
              return (
                <React.Fragment key={i}>
                  <div className="col-auto">
                    <label htmlFor={f.name} className="col-form-label">{f.label}</label>
                  </div>
                  <div className="col-auto">
                    <select {...common} className="form-select">
                      <option value="">{f.emptyLabel||'—'}</option>
                      {f.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors?.[f.name] || f.required && `Selecione ${f.label}`}
                    </div>
                  </div>
                </React.Fragment>
              );
            default:
              return null;
          }
        })}
      </div>
      <div className="d-flex justify-content-end mt-3">
        <Button title={submitLabel} color="primary" type="submit"/>
        &nbsp;&nbsp;
        <Button title={clearLabel} color="secondary" onClick={onClear}/>
      </div>
    </form>
  );
}
