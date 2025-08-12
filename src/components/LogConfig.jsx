import React from 'react';
import styled from 'styled-components';
import EventConfig from './EventConfig';

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
  padding: 16px 20px;
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
  display: ${(props) => (props.isExpanded ? 'block' : 'none')};
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
}) => {
  const handleLogSettingChange = (field, value) => {
    // Проверка для времени хранения логов
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

  // Получаем имя конечной папки из пути
  const getFolderName = (path) => {
    if (!path) return '';
    const parts = path.split(/[\\\/]/);
    return parts[parts.length - 1] || '';
  };

  const folderName = getFolderName(config.location);

  return (
    <LogConfigContainer>
      <LogHeader onClick={onToggle}>
        <LogTitle>Лог-файл "{folderName || `log_${logIndex}`}"</LogTitle>
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
