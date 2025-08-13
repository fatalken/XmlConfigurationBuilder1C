import React, { useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import LogConfig from './components/LogConfig';
import XmlPreview from './components/XmlPreview';
import Notification from './components/Notification';
import { generateXml } from './utils/xmlGenerator';
import platformConfig from './config/platforms.json';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const MainTitle = styled.h1`
  color: #0F0F0F;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
`;

const LeftPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  min-width: 0;
`;

const RightPanel = styled.div`
  height: calc(100vh - 140px);
  min-width: 0; /* критично для корректного горизонтального скролла внутри */
  overflow: hidden; /* не даем колонке расширяться из-за вложенного контента */
`;

const PlatformSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #495057;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const PlatformSelect = styled.select`
  width: 100%;
  max-width: 300px;
`;

const AddLogButton = styled.button`
  background: #FFD200;
  color: #0F0F0F;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 20px;
  
  &:hover {
    background: #e6bd00;
    transform: translateY(-1px);
  }
`;

const App = () => {
  const [platformVersion, setPlatformVersion] = useState('');
  const [logs, setLogs] = useState([]);
  const [expandedLogs, setExpandedLogs] = useState(new Set());
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  // Получаем все доступные события из всех платформ
  const getAllAvailableEvents = () => {
    const allEvents = new Set();
    Object.values(platformConfig.Platforms).forEach(platform => {
      Object.keys(platform).forEach(event => {
        allEvents.add(event);
      });
    });
    return Array.from(allEvents).sort();
  };

  const availableEvents = getAllAvailableEvents();
  const operators = platformConfig.Operators || [];
  const eventDescriptions = platformConfig.EventDescriptions || {};
  const attributesConfig = platformConfig.LogAttributes || {};

  const getAvailableProperties = (eventName) => {
    if (!platformVersion || !eventName) return [];
    return platformConfig.Platforms[platformVersion]?.[eventName] || [];
  };

  const handlePlatformChange = (version) => {
    setPlatformVersion(version);
    setLogs([]);
    setExpandedLogs(new Set());
  };

  const handleAddLog = () => {
    if (!platformVersion) return;
    const newLog = {
      location: `C:\\logs\\log_${logs.length + 1}`,
      history: '24',
      events: [],
      additionalAttributes: []
    };

    setLogs([...logs, newLog]);
    setExpandedLogs((prev) => new Set([...prev, logs.length]));
  };

  const handleLogChange = (logIndex, newConfig) => {
    const newLogs = [...logs];
    newLogs[logIndex] = newConfig;
    setLogs(newLogs);
  };

  const handleLogRemove = (logIndex) => {
    setLogs(logs.filter((_, i) => i !== logIndex));
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      newSet.delete(logIndex);
      return newSet;
    });
  };

  const handleLogToggle = (logIndex) => {
    setExpandedLogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(logIndex)) {
        newSet.delete(logIndex);
      } else {
        newSet.add(logIndex);
      }
      return newSet;
    });
  };

  const handleCopyNotification = () => {
    setNotification({ message: 'Текст XML скопирован в буфер обмена', isVisible: true });
  };

  const handleHideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const xmlContent = generateXml(platformVersion, logs);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <MainTitle>Инструмент сборки конфигурационного файла технологического журнала logcfg.xml</MainTitle>
        </Header>

        <MainContent>
          <LeftPanel>
            <PlatformSection>
              <SectionTitle>Версия платформы 1С</SectionTitle>
              <PlatformSelect value={platformVersion} onChange={(e) => handlePlatformChange(e.target.value)}>
                <option value="">Выберите версию платформы</option>
                {Object.keys(platformConfig.Platforms).map((version) => (
                  <option key={version} value={version}>
                    {version}
                  </option>
                ))}
              </PlatformSelect>
            </PlatformSection>

            {platformVersion && (
              <>
                <AddLogButton onClick={handleAddLog}>Добавить лог</AddLogButton>

                {logs.map((log, index) => (
                  <LogConfig
                    key={index}
                    logIndex={index + 1}
                    config={log}
                    onConfigChange={(newConfig) => handleLogChange(index, newConfig)}
                    onRemove={() => handleLogRemove(index)}
                    isExpanded={expandedLogs.has(index)}
                    onToggle={() => handleLogToggle(index)}
                    availableEvents={availableEvents}
                    getAvailableProperties={getAvailableProperties}
                    operators={operators}
                    eventDescriptions={eventDescriptions}
                    attributesConfig={attributesConfig}
                  />
                ))}
              </>
            )}
          </LeftPanel>

          <RightPanel>
            <XmlPreview xmlContent={xmlContent} onCopy={handleCopyNotification} />
          </RightPanel>
        </MainContent>

        <Notification message={notification.message} isVisible={notification.isVisible} onHide={handleHideNotification} />
      </AppContainer>
    </>
  );
};

export default App;
