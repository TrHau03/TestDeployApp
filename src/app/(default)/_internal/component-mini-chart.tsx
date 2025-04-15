import { memo, useEffect, useRef } from 'react';

const MiniChart = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const isScriptAdded = useRef(false);
  useEffect(() => {
    if (isScriptAdded.current) return;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: 'BINANCE:BTCUSDT',
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '1D',
      colorTheme: 'dark',
      isTransparent: false,
      autosize: false,
      largeChartUrl: '',
    });
    if (container.current) {
      container.current.appendChild(script);
      isScriptAdded.current = true;
    }
    return () => {
      if (container.current) {
        container.current.removeChild(script);
      }
    };
  }, []);
  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default memo(MiniChart);
