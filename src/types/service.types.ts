export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  icon: string;
  unit?: string;
}

export interface PricingTier {
  min: number;
  max: number;
  label: string;
  unit?: string;
}
