import React, { useState } from 'react';
import styled from 'styled-components';
import EventConfig from './EventConfig';
import AdditionalAttributeRow from './AdditionalAttributeRow';

const LogConfigContainer = styled.div`
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
  overflow: hidden;
`;

const LogHeader = styled.div`
  background: #f8f9fa;
  padding: 12px 16px; /* уменьшили на ~20% */
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #e9ecef;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #6c757d;
  border-bottom: 2px solid #6c757d;
  transform: ${props => (props.expanded ? 'rotate(45deg)' : 'rotate(-45deg)')};
  transition: transform 0.2s ease;
  margin-left: 4px;
`;

const LogTitle = styled.h3`
  margin: 0;
  color: #495057;
  font-weight: 600;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: #dc3545;
  }
`;

const LogContent = styled.div`
  padding: 20px;
  display: ${props => (props.isExpanded ? 'block' : 'none')};
`;

const LogSettings = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SettingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: space-between;
`;

const SettingLabel = styled.label`
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
`;

const SettingInput = styled.input`
  min-width: 300px;
`;

const AdditionalSection = styled.div`
  margin: 8px 0 20px 0;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
`;

const AdditionalHeader = styled.div`
  background: #f8f9fa;
  padding: 10px 14px; /* уменьшили на ~15% */
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid #e9ecef;
`;

const AdditionalHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AdditionalTitle = styled.div`
  color: #495057;
  font-weight: 600;
`;

const AddAttrButton = styled.button`
  background: #6c757d;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #28a745;
  }
`;

const AdditionalBody = styled.div`
  padding: 12px 16px;
`;

const AddAttrButtonRow = styled.div`
  margin-top: 8px;
`;

const EventsSection = styled.div`
  margin-top: 20px;
`;

const EventsTitle = styled.h4`
  margin-bottom: 16px;
  color: #495057;
  font-weight: 600;
`;

const AddEventButton = styled.button`
  background: #FFD200;
  color: #0F0F0F;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e6bd00;
    transform: translateY(-1px);
  }
`;

const LogConfig = ({
  logIndex,
  config,
  onConfigChange,
  onRemove,
  isExpanded,
  onToggle,
  availableEvents,
  getAvailableProperties,
  operators,
  eventDescriptions,
  attributesConfig,
}) => {
  const [additionalOpen, setAdditionalOpen] = useState(false);

  const handleLogSettingChange = (field, value) => {
    if (field === 'history') {
      const numValue = parseInt(value);
      if (numValue === 0) {
        alert('Значение должно быть больше 0');
        return;
      }
    }
    onConfigChange({
      ...config,
      [field]: value,
    });
  };

  const handleEventsChange = (events) => {
    onConfigChange({
      ...config,
      events,
    });
  };

  const handleAddEvent = () => {
    const newEvents = [
      ...config.events,
      { event: '', properties: [] },
    ];
    handleEventsChange(newEvents);
  };

  const handleEventChange = (eventIndex, field, value) => {
    const newEvents = [...config.events];
    newEvents[eventIndex] = { ...newEvents[eventIndex], [field]: value };
    handleEventsChange(newEvents);
  };

  const handleEventPropertiesChange = (eventIndex, properties) => {
    const newEvents = [...config.events];
    newEvents[eventIndex] = { ...newEvents[eventIndex], properties };
    handleEventsChange(newEvents);
  };

  const handleRemoveEvent = (eventIndex) => {
    const newEvents = config.events.filter((_, i) => i !== eventIndex);
    handleEventsChange(newEvents);
  };

  const handleAddAttribute = () => {
    const newAttrs = [...(config.additionalAttributes || []), { attribute: '', value: '' }];
    onConfigChange({ ...config, additionalAttributes: newAttrs });
    setAdditionalOpen(true);
  };

  const handleAttributeChange = (idx, field, value) => {
    const newAttrs = [...(config.additionalAttributes || [])];
    newAttrs[idx] = { ...newAttrs[idx], [field]: value };
    onConfigChange({ ...config, additionalAttributes: newAttrs });
  };

  const handleRemoveAttribute = (idx) => {
    const newAttrs = (config.additionalAttributes || []).filter((_, i) => i !== idx);
    onConfigChange({ ...config, additionalAttributes: newAttrs });
  };

  const getFolderName = (path) => {
    if (!path) return '';
    const parts = path.split(/[\\\/]/);
    return parts[parts.length - 1] || '';
  };

  const folderName = getFolderName(config.location);

  return (
    <LogConfigContainer>
      <LogHeader onClick={onToggle}>
        <HeaderLeft>
          <LogTitle>Лог-файл "{folderName || `log_${logIndex}`}"</LogTitle>
          <ArrowIcon expanded={isExpanded} />
        </HeaderLeft>
        <RemoveButton
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Вы уверены, что хотите удалить этот лог?')) {
              onRemove();
            }
          }}
          title="Удалить лог"
        >
          ×
        </RemoveButton>
      </LogHeader>

      <LogContent isExpanded={isExpanded}>
        <LogSettings>
          <SettingGroup>
            <SettingLabel>Каталог хранения логов:</SettingLabel>
            <SettingInput
              type="text"
              value={config.location}
              onChange={(e) => handleLogSettingChange('location', e.target.value)}
              placeholder={`C:\\logs\\log_${logIndex}`}
            />
          </SettingGroup>

          <SettingGroup>
            <SettingLabel>Время хранения логов (ч.):</SettingLabel>
            <SettingInput
              type="number"
              value={config.history}
              onChange={(e) => handleLogSettingChange('history', e.target.value)}
              placeholder="24"
              min="1"
            />
          </SettingGroup>
        </LogSettings>

        <AdditionalSection>
          <AdditionalHeader onClick={() => setAdditionalOpen(!additionalOpen)}>
            <AdditionalHeaderLeft>
              <AdditionalTitle>Дополнительные атрибуты лога</AdditionalTitle>
              <ArrowIcon expanded={additionalOpen} />
            </AdditionalHeaderLeft>
          </AdditionalHeader>
          {additionalOpen && (
            <AdditionalBody>
              {(config.additionalAttributes || []).map((attr, idx) => (
                <AdditionalAttributeRow
                  key={idx}
                  index={idx}
                  attribute={attr.attribute}
                  value={attr.value}
                  onAttributeChange={(v) => handleAttributeChange(idx, 'attribute', v)}
                  onValueChange={(v) => handleAttributeChange(idx, 'value', v)}
                  onRemove={() => handleRemoveAttribute(idx)}
                  attributesConfig={attributesConfig}
                  listIdPrefix={`log${logIndex}`}
                />
              ))}
              <AddAttrButtonRow>
                <AddAttrButton onClick={handleAddAttribute}>Добавить атрибут</AddAttrButton>
              </AddAttrButtonRow>
            </AdditionalBody>
          )}
        </AdditionalSection>

        <EventsSection>
          <EventsTitle>События:</EventsTitle>

          {config.events.map((eventConfig, eventIndex) => (
            <EventConfig
              key={eventIndex}
              event={eventConfig.event}
              properties={eventConfig.properties}
              onEventChange={(value) => handleEventChange(eventIndex, 'event', value)}
              onPropertiesChange={(properties) => handleEventPropertiesChange(eventIndex, properties)}
              onRemoveEvent={() => handleRemoveEvent(eventIndex)}
              availableEvents={availableEvents}
              availableProperties={getAvailableProperties(eventConfig.event)}
              operators={operators}
              eventDescriptions={eventDescriptions}
            />
          ))}

          <AddEventButton onClick={handleAddEvent}>Добавить событие</AddEventButton>
        </EventsSection>
      </LogContent>
    </LogConfigContainer>
  );
};

export default LogConfig;
