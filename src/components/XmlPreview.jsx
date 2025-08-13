import React from 'react';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PreviewContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0; /* чтобы не растягивать grid-колонку */
`;

const PreviewTitle = styled.h2`
  color: #495057;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #28a745;
  }
`;

const SaveButton = styled.button`
  background: #FFD200;
  color: #0F0F0F;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e6bd00;
    transform: translateY(-1px);
  }
`;

const XmlContent = styled.div`
  flex: 1;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: auto; /* и горизонтальный и вертикальный скролл */
  background: #f8f9fa;
  min-width: 0;

  /* Внутренний контейнер подсветки */
  pre {
    margin: 0;
    height: 100%;
    max-height: none;
    background: #f8f9fa !important;
    white-space: pre; /* не переносим строки, скроллим */
  }
`;

const XmlPreview = ({ xmlContent, onCopy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xmlContent);
      onCopy();
    } catch (err) {
      console.error('Ошибка копирования:', err);
    }
  };

  const handleSave = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logcfg.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <PreviewContainer>
      <PreviewTitle>Текст XML</PreviewTitle>
      
      <ButtonGroup>
        <ActionButton onClick={handleCopy}>Скопировать</ActionButton>
        <SaveButton onClick={handleSave}>Сохранить XML</SaveButton>
      </ButtonGroup>
      
      <XmlContent>
        <SyntaxHighlighter
          language="xml"
          style={tomorrow}
          customStyle={{
            margin: 0,
            height: '100%',
            fontSize: '13px',
            lineHeight: '1.4',
            backgroundColor: '#f8f9fa',
            minWidth: 0,
            overflowX: 'auto'
          }}
        >
          {xmlContent}
        </SyntaxHighlighter>
      </XmlContent>
    </PreviewContainer>
  );
};

export default XmlPreview;
