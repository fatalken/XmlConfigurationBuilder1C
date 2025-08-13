import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  flex-wrap: wrap;
`;

const Index = styled.span`
  font-weight: 600;
  color: #6c757d;
  min-width: 24px;
`;

const AttrInput = styled.input`
  flex: 1;
  min-width: 160px;
`;

const ValueInput = styled.input`
  flex: 1;
  min-width: 160px;
`;

const RemoveBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  background: #6c757d;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc3545;
    transform: scale(1.1);
  }
`;

const Description = styled.div`
  width: 100%;
  color: #495057;
  font-size: 13px;
  margin-top: 4px;
`;

const AdditionalAttributeRow = ({
  index,
  attribute,
  value,
  onAttributeChange,
  onValueChange,
  onRemove,
  attributesConfig,
  listIdPrefix = 'row'
}) => {
  const attrListId = `${listIdPrefix}-attr-${index}`;
  const valListId = `${listIdPrefix}-val-${index}`;
  const values = attribute && attributesConfig[attribute]?.values ? attributesConfig[attribute].values : [];
  const description = attribute && attributesConfig[attribute]?.description ? attributesConfig[attribute].description : '';

  return (
    <>
      <Row>
        <Index>{index + 1}</Index>
        <AttrInput
          list={attrListId}
          value={attribute}
          onChange={(e) => onAttributeChange(e.target.value)}
          placeholder="Атрибут"
        />
        <datalist id={attrListId}>
          {Object.keys(attributesConfig).map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <ValueInput
          list={values.length ? valListId : undefined}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Значение"
        />
        {values.length > 0 && (
          <datalist id={valListId}>
            {values.map((v) => (
              <option key={v} value={v} />
            ))}
          </datalist>
        )}
        <RemoveBtn title="Удалить атрибут" onClick={onRemove}>×</RemoveBtn>
        {description && <Description>{description}</Description>}
      </Row>
    </>
  );
};

export default AdditionalAttributeRow;
