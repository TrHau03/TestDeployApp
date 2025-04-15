import { useEffect, useRef } from 'react';

const TopStory = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const isScriptAdded = useRef(false);
  useEffect(() => {
    if (isScriptAdded.current) return;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: 'all_symbols',
      isTransparent: false,
      displayMode: 'regular',
      width: '100%',
      height: '100%',
      colorTheme: 'dark',
      locale: 'en',
    });
    if (container.current) {
      container.current.appendChild(script);
      isScriptAdded.current = true;
    }
  }, []);
  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TopStory;
