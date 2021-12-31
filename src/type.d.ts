export interface IStats {
    base: string;
    limit: number;
    offset: number;
    order: string;
    total: number;
    total24hVolume: number;
    totalExchanges: number;
    totalMarketCap: number;
    totalMarkets: number;
  }
  
  
export interface INews {
    name: string;
    url: string;
    image: any;
    description: string;
    provider: [any];
    datePublished: string;
  }

export interface ICoins {
    id: number;
    name: string;
    rank: number;
    iconUrl: string;
    change: number;
    marketCap: number;
  }
  