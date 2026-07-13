export interface OceanData {
  region: string;
  waterTemp: number; // Celsius
  waveHeight: number; // meters
  windSpeed: number; // knots
  currentSpeed: number; // knots
  dissolvedOxygen: number; // mg/L
  phLevel: number; // pH
  chlorophyll: number; // mg/m3
  tideStatus: 'High Tide' | 'Low Tide' | 'Rising' | 'Ebbing';
  safetyStatus: 'SAFE' | 'CAUTION' | 'DANGER' | 'SEVERE STORM';
  tsunamiRisk: boolean;
  stormWarning: boolean;
  timestamp: string;
}

export interface FishPrediction {
  zoneId: string;
  zoneName: string;
  latitude: number;
  longitude: number;
  densityScore: number; // 0-100
  recommendedSpecies: string[];
  estimatedYieldKg: number;
  waterTemp: number;
  chlorophyll: number;
  distanceNm: number; // Nautical miles from port
  fuelEstimateLiters: number;
  confidence: number;
  reasoning: string;
}

export interface PollutionReport {
  id: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  pollutionType: 'Plastic Debris' | 'Oil Spill' | 'Chemical Discharge' | 'Algal Bloom' | 'Ghost Net' | 'Other';
  severity: 'Low' | 'Medium' | 'Critical';
  description: string;
  imageUrl?: string;
  aiAnalysis?: {
    detectedObjects: string[];
    riskAssessment: string;
    suggestedAction: string;
  };
  reporter: string;
  timestamp: string;
  blockchainHash: string;
  rewardTokens: number;
  status: 'Verified' | 'Pending Validation' | 'Actioned';
}

export interface BlockchainBlock {
  blockNumber: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  validator: string;
  transactionsCount: number;
  data: {
    type: 'POLLUTION_REPORT' | 'SAFETY_ALERT' | 'CATCH_LOG' | 'CONSERVATION_MILESTONE';
    id: string;
    summary: string;
  }[];
  signature: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aqualis';
  text: string;
  timestamp: string;
  sources?: string[];
}

export interface MarineHealthIndicator {
  metric: string;
  value: string;
  status: 'Optimal' | 'Warning' | 'Critical';
  change: string;
  description: string;
}
