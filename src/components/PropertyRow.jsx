import React from 'react';
import styled from 'styled-components';

const PropertyRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  flex-wrap: wrap;
`;

const PropertyNumber = styled.span`
  font-weight: 600;
  color: #6c757d;
  min-width: 24px;
`;

const PropertyInput = styled.input`
  flex: 1;
  min-width: 160px;
`;

const OperatorSelect = styled.select`
  width: 80px;
`;

const ValueInput = styled.input`
  flex: 1;
  min-width: 160px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const RemoveButton = styled(IconButton)`
  background: #6c757d;
  color: white;
  
  &:hover {
    background: #dc3545;
  }
`;

const PropertyRow = ({ 
  index, 
  property, 
  operator, 
  value, 
  onPropertyChange, 
  onOperatorChange, 
  onValueChange, 
  onRemove, 
  properties,
  operators 
}) => {
  const datalistId = `props-${index}`;
  return (
    <PropertyRowContainer>
      <PropertyNumber>{index + 1}</PropertyNumber>

      <PropertyInput
        list={datalistId}
        value={property}
        onChange={(e) => onPropertyChange(e.target.value)}
        placeholder="Свойство"
      />
      <datalist id={datalistId}>
        {properties.map((prop) => (
          <option key={prop} value={prop} />
        ))}
      </datalist>

      <OperatorSelect value={operator} onChange={(e) => onOperatorChange(e.target.value)}>
        <option value="">...</option>
        {operators.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </OperatorSelect>

      <ValueInput
        type="text"
        placeholder="Значение"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />

      <RemoveButton onClick={onRemove} title="Удалить свойство">
        ×
      </RemoveButton>
    </PropertyRowContainer>
  );
};

export default PropertyRow;
