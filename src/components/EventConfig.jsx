import React from 'react';
import styled from 'styled-components';
import PropertyRow from './PropertyRow';

const EventConfigContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
`;

const EventHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const EventSelect = styled.select`
  flex: 1;
  min-width: 200px;
`;

const EventDescription = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  color: #495057;
  font-size: 14px;
  line-height: 1.5;
`;

const PropertiesSection = styled.div`
  margin-top: 20px;
`;

const PropertiesTitle = styled.h4`
  margin-bottom: 16px;
  color: #495057;
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const AddPropertyButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #28a745;
  }
`;

const RemoveEventButton = styled.button`
  background: transparent;
  color: #6c757d;
  border: 1px solid #6c757d;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #dc3545;
    border-color: #dc3545;
  }
`;

const EventConfig = ({
  event,
  properties,
  onEventChange,
  onPropertiesChange,
  onRemoveEvent,
  availableEvents,
  availableProperties,
  operators,
  eventDescriptions,
}) => {
  const handleAddProperty = () => {
    const newProperties = [...properties, { property: '', operator: '', value: '' }];
    onPropertiesChange(newProperties);
  };

  const handleRemoveProperty = (index) => {
    const newProperties = properties.filter((_, i) => i !== index);
    onPropertiesChange(newProperties);
  };

  const handlePropertyChange = (index, field, value) => {
    const newProperties = [...properties];
    newProperties[index] = { ...newProperties[index], [field]: value };
    onPropertiesChange(newProperties);
  };

  const handleRemoveEvent = () => {
    if (window.confirm('Вы уверены, что хотите удалить это событие?')) {
      onRemoveEvent();
    }
  };

  const getEventDescription = (eventName) => {
    return eventDescriptions[eventName] || '';
  };

  return (
    <EventConfigContainer>
      <EventHeader>
        <EventSelect value={event} onChange={(e) => onEventChange(e.target.value)}>
          <option value="">Выберите событие</option>
          {availableEvents.map((evt) => (
            <option key={evt} value={evt}>
              {evt}
            </option>
          ))}
        </EventSelect>
      </EventHeader>

      {event && getEventDescription(event) && (
        <EventDescription>
          <strong>{event}</strong> - {getEventDescription(event)}
        </EventDescription>
      )}

      <PropertiesSection>
        <PropertiesTitle>Свойства события</PropertiesTitle>

        {properties.map((prop, index) => (
          <PropertyRow
            key={index}
            index={index}
            property={prop.property}
            operator={prop.operator}
            value={prop.value}
            onPropertyChange={(value) => handlePropertyChange(index, 'property', value)}
            onOperatorChange={(value) => handlePropertyChange(index, 'operator', value)}
            onValueChange={(value) => handlePropertyChange(index, 'value', value)}
            onRemove={() => handleRemoveProperty(index)}
            properties={availableProperties}
            operators={operators}
          />
        ))}

        <ButtonGroup>
          {event && (
            <AddPropertyButton onClick={handleAddProperty}>Добавить свойство</AddPropertyButton>
          )}
          <RemoveEventButton onClick={handleRemoveEvent}>Удалить событие</RemoveEventButton>
        </ButtonGroup>
      </PropertiesSection>
    </EventConfigContainer>
  );
};

export default EventConfig;
