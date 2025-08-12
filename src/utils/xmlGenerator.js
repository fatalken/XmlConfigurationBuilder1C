export const generateXml = (platformVersion, logs) => {
  if (!platformVersion || !logs || logs.length === 0) {
    return `<?xml version="1.0"?>
<config xmlns="http://v8.1c.ru/v8/tech-log">
</config>`;
  }

  let xmlContent = `<?xml version="1.0"?>
<config xmlns="http://v8.1c.ru/v8/tech-log">`;

  logs.forEach((log) => {
    if (log.location && log.history) {
      xmlContent += `\n\t<log location="${log.location}" history="${log.history}">`;

      if (log.events && log.events.length > 0) {
        log.events.forEach((event) => {
          if (event.event) {
            xmlContent += `\n\t\t<event>`;

            // Имя события
            xmlContent += `\n\t\t\t<eq property="name" value="${event.event}"/>`;

            // Свойства события
            if (event.properties && event.properties.length > 0) {
              event.properties.forEach((property) => {
                if (property.property && property.operator && property.value !== undefined) {
                  xmlContent += `\n\t\t\t<${property.operator} property="${property.property}" value="${property.value}"/>`;
                }
              });
            }

            xmlContent += `\n\t\t</event>`;
          }
        });
      }

      // Свойство all
      xmlContent += `\n\t\t<property name="all"/>`;
      xmlContent += `\n\t</log>`;
    }
  });

  xmlContent += `\n</config>`;

  return xmlContent;
};
