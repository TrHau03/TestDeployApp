import { memo, useEffect, useRef } from 'react';

function CoinHeadMap() {
  const container = useRef<HTMLDivElement | null>(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (scriptAdded.current) return;
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
          "dataSource": "Crypto",
          "blockSize": "market_cap_calc",
          "blockColor": "change",
          "locale": "en",
          "symbolUrl": "",
          "colorTheme": "dark",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "isMonoSize": false,
          "width": "100%",
          "height": "100%"
        }`;
    if (container.current) {
      container.current.appendChild(script);
      scriptAdded.current = true;
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(CoinHeadMap);
