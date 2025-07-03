declare module 'react-plotly.js' {
  import React from 'react';
  import { Layout, Data, Config } from 'plotly.js';

  interface PlotProps {
    data: Data[];
    layout?: Partial<Layout>;
    config?: Partial<Config>;
    onInitialized?: (figure: { data: Data[]; layout: Partial<Layout> }) => void;
    onUpdate?: (figure: { data: Data[]; layout: Partial<Layout> }) => void;
    style?: React.CSSProperties;
    useResizeHandler?: boolean;
    className?: string;
  }

  const Plot: React.FC<PlotProps>;
  export default Plot;
}
