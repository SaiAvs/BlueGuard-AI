import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Gemini AI client if key exists
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// In-memory Blockchain Storage
let blockchain = [
  {
    blockNumber: 1,
    hash: "000004e2a918f7c8b21c6093d56ef12847192bc58d11e4a2c1928374a58b1092",
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    validator: "Node-Validator-OceanGuard-Alpha",
    transactionsCount: 4,
    data: [
      { type: "CONSERVATION_MILESTONE", id: "GEN-01", summary: "BlueGuard Genesis Block & Smart Contract Registry initialized." },
      { type: "SAFETY_ALERT", id: "ALERT-101", summary: "Bay of Bengal Cyclone Watch zone established." }
    ],
    signature: "sig_ed25519_9f81a7b2"
  },
  {
    blockNumber: 2,
    hash: "000007b81c29e4f5a6b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    previousHash: "000004e2a918f7c8b21c6093d56ef12847192bc58d11e4a2c1928374a58b1092",
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    validator: "Node-Validator-EcoMarine-04",
    transactionsCount: 8,
    data: [
      { type: "POLLUTION_REPORT", id: "POL-201", summary: "Ghost Net recovery verified near Andaman Reef. +50 GuardTokens issued." },
      { type: "CATCH_LOG", id: "CATCH-304", summary: "Sustainable Tuna catch logged in Sector 7-North. Zero byproduct." }
    ],
    signature: "sig_ed25519_3c49e210"
  }
];

// In-memory pollution reports store
let pollutionReports = [
  {
    id: "POL-201",
    title: "Abandoned Ghost Net entangled near Coral Shelf",
    location: "Andaman Sea Sector 4 (11.7401° N, 92.6586° E)",
    latitude: 11.7401,
    longitude: 92.6586,
    pollutionType: "Ghost Net",
    severity: "Critical",
    description: "Large commercial fishing net drifting near reef, posing severe danger to marine turtles and reef sharks.",
    imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80",
    aiAnalysis: {
      detectedObjects: ["Monofilament Net", "Polypropylene Rope", "Coral Entanglement"],
      riskAssessment: "High entanglement hazard for marine life within 2nm radius.",
      suggestedAction: "Dispatch local diver retrieval unit immediately. Priority Level 1."
    },
    reporter: "Captain Ramesh Kumar (Vessel: Matsya-07)",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    blockchainHash: "000007b81c29e4f5a6b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2",
    rewardTokens: 75,
    status: "Verified"
  },
  {
    id: "POL-202",
    title: "Plastic Container & Bottle Accumulation",
    location: "Chennai Coastal Zone (13.0827° N, 80.2707° E)",
    latitude: 13.0827,
    longitude: 80.2707,
    pollutionType: "Plastic Debris",
    severity: "Medium",
    description: "Significant floating debris cluster washed ashore after tidal shift.",
    imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    aiAnalysis: {
      detectedObjects: ["PET Bottles", "Polystyrene Fragments", "Plastic Film"],
      riskAssessment: "Moderate environmental degradation risk; microplastic leaching potential.",
      suggestedAction: "Schedule beach cleanup volunteer brigade for weekend low tide."
    },
    reporter: "Priya Sharma (Coastal Eco-Watcher)",
    timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
    blockchainHash: "000003a9f8e21c4b7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4",
    rewardTokens: 40,
    status: "Actioned"
  }
];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "BlueGuard AI", timestamp: new Date().toISOString() });
});

// Ocean Conditions & Weather endpoint
app.get("/api/ocean-conditions", (req, res) => {
  const customRegion = req.query.region as string;
  
  if (customRegion) {
    const hash = customRegion.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const waterTemp = Number((27 + (hash % 5) + Math.random() * 0.4).toFixed(1));
    const waveHeight = Number((1.0 + ((hash * 3) % 20) / 10).toFixed(1));
    const windSpeed = 10 + (hash % 18);
    const currentSpeed = Number((1.2 + ((hash * 7) % 15) / 10).toFixed(1));
    const dissolvedOxygen = Number((6.0 + ((hash * 2) % 15) / 10).toFixed(1));
    const phLevel = Number((8.0 + ((hash * 5) % 4) / 10).toFixed(1));
    const chlorophyll = Number((2.0 + ((hash * 4) % 25) / 10).toFixed(1));
    const tideStatus = hash % 2 === 0 ? "Rising" : "High Tide";
    const safetyStatus = waveHeight > 2.4 || windSpeed > 22 ? "CAUTION" : "SAFE";
    const stormWarning = waveHeight > 2.5 || windSpeed > 22;

    return res.json({
      region: customRegion,
      waterTemp,
      waveHeight,
      windSpeed,
      currentSpeed,
      dissolvedOxygen,
      phLevel,
      chlorophyll,
      tideStatus,
      safetyStatus,
      tsunamiRisk: false,
      stormWarning,
      timestamp: new Date().toISOString()
    });
  }

  const regions = [
    {
      region: "Bay of Bengal - Central Zone",
      waterTemp: 30.2,
      waveHeight: 2.8,
      windSpeed: 24,
      currentSpeed: 3.1,
      dissolvedOxygen: 5.9,
      phLevel: 7.9,
      chlorophyll: 3.8,
      tideStatus: "High Tide",
      safetyStatus: "CAUTION",
      tsunamiRisk: false,
      stormWarning: true,
      timestamp: new Date().toISOString()
    },
    {
      region: "Arabian Sea - Sector West",
      waterTemp: 28.5,
      waveHeight: 1.4,
      windSpeed: 12,
      currentSpeed: 1.8,
      dissolvedOxygen: 6.8,
      phLevel: 8.1,
      chlorophyll: 2.3,
      tideStatus: "Rising",
      safetyStatus: "SAFE",
      tsunamiRisk: false,
      stormWarning: false,
      timestamp: new Date().toISOString()
    },
    {
      region: "Andaman Sea & Nicobar",
      waterTemp: 29.1,
      waveHeight: 1.9,
      windSpeed: 15,
      currentSpeed: 2.2,
      dissolvedOxygen: 6.4,
      phLevel: 8.0,
      chlorophyll: 4.2,
      tideStatus: "Ebbing",
      safetyStatus: "SAFE",
      tsunamiRisk: false,
      stormWarning: false,
      timestamp: new Date().toISOString()
    }
  ];
  res.json(regions);
});

// AI Fish Density Prediction
app.post("/api/predict-fish", async (req, res) => {
  try {
    const { region = "Bay of Bengal", targetSpecies = "All" } = req.body || {};
    const ai = getAIClient();

    if (ai) {
      const prompt = `Act as BlueGuard AI's marine intelligence model. Generate 3 high-yield fishing zones for region "${region}" targeting species "${targetSpecies}". Return strictly valid JSON array of objects with keys: zoneId (string), zoneName (string), latitude (number), longitude (number), densityScore (number 60-98), recommendedSpecies (array of strings), estimatedYieldKg (number 400-3500), waterTemp (number 26-31), chlorophyll (number 1.5-5.0), distanceNm (number 10-85), fuelEstimateLiters (number 20-180), confidence (number 85-98), reasoning (string).`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      if (response && response.text) {
        const zones = JSON.parse(response.text);
        return res.json(zones);
      }
    }

    // Fallback algorithmic prediction if AI is unavailable
    const fallbackZones = [
      {
        zoneId: "ZONE-A1",
        zoneName: "Upwelling Shelf Alpha",
        latitude: 14.2531,
        longitude: 81.4215,
        densityScore: 92,
        recommendedSpecies: ["Yellowfin Tuna", "Skipjack", "Mackerel"],
        estimatedYieldKg: 2400,
        waterTemp: 28.2,
        chlorophyll: 3.9,
        distanceNm: 34,
        fuelEstimateLiters: 65,
        confidence: 94,
        reasoning: "Strong nutrient-rich thermal upwelling detected via satellite altimetry and sea surface temperature gradients."
      },
      {
        zoneId: "ZONE-B4",
        zoneName: "Canyon Edge Current Seam",
        latitude: 12.8904,
        longitude: 82.1042,
        densityScore: 88,
        recommendedSpecies: ["Kingfish", "Red Snapper", "Sardine Shoals"],
        estimatedYieldKg: 1850,
        waterTemp: 29.1,
        chlorophyll: 4.5,
        distanceNm: 52,
        fuelEstimateLiters: 98,
        confidence: 91,
        reasoning: "Confluence of oceanic boundary currents creating abundant zooplankton concentration."
      },
      {
        zoneId: "ZONE-C7",
        zoneName: "Coral Fringe Deep Bank",
        latitude: 15.1102,
        longitude: 80.9521,
        densityScore: 84,
        recommendedSpecies: ["Black Pomfret", "Barracuda", "Indo-Pacific Sailfish"],
        estimatedYieldKg: 1420,
        waterTemp: 27.8,
        chlorophyll: 3.1,
        distanceNm: 22,
        fuelEstimateLiters: 42,
        confidence: 89,
        reasoning: "Submerged sea mount edge with stable thermocline and moderate tidal mixing."
      }
    ];
    res.json(fallbackZones);
  } catch (error: any) {
    console.error("Fish prediction error:", error);
    res.status(500).json({ error: error.message || "Failed to generate fish prediction" });
  }
});

// AI Pollution Analysis & Report Creation
app.post("/api/pollution-reports", async (req, res) => {
  try {
    const { title, location, latitude, longitude, pollutionType, severity, description, imageUrl, reporter } = req.body;
    const ai = getAIClient();

    let aiAnalysis = {
      detectedObjects: [pollutionType, "Marine Debris"],
      riskAssessment: "Moderate ecological hazard requiring cleanup or retrieval intervention.",
      suggestedAction: "Log into immutable ledger and notify regional marine conservation unit."
    };

    if (ai && imageUrl && imageUrl.startsWith('data:image')) {
      try {
        const matches = imageUrl.match(/^data:(.+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const base64Data = matches[2];

          const imagePart = {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          };

          const analysisPrompt = `Analyze this image submitted by a fisherman/conservationist for marine pollution. Identify specific objects, assess ecological risk to marine life, and suggest an immediate action. Return JSON with keys: detectedObjects (array of strings), riskAssessment (string), suggestedAction (string).`;

          const result = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: [imagePart, analysisPrompt],
            config: { responseMimeType: 'application/json' }
          });

          if (result && result.text) {
            aiAnalysis = JSON.parse(result.text);
          }
        }
      } catch (imgErr) {
        console.error("Gemini image analysis error, using fallback analysis:", imgErr);
      }
    }

    // Generate blockchain record and hash
    const blockNumber = blockchain.length + 1;
    const previousHash = blockchain[blockchain.length - 1].hash;
    const reportId = `POL-${Math.floor(100 + Math.random() * 900)}`.toUpperCase();
    const rewardTokens = severity === 'Critical' ? 100 : severity === 'Medium' ? 50 : 25;
    
    const rawDataString = `${reportId}-${title}-${location}-${Date.now()}`;
    const blockchainHash = crypto.createHash('sha256').update(rawDataString).digest('hex');

    const newReport = {
      id: reportId,
      title: title || "Marine Hazard Report",
      location: location || "Coastal Waters",
      latitude: Number(latitude) || 13.0,
      longitude: Number(longitude) || 80.0,
      pollutionType: pollutionType || "Plastic Debris",
      severity: severity || "Medium",
      description: description || "Reported via BlueGuard AI mobile interface.",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      aiAnalysis,
      reporter: reporter || "Independent Captain",
      timestamp: new Date().toISOString(),
      blockchainHash,
      rewardTokens,
      status: "Verified"
    };

    pollutionReports.unshift(newReport);

    // Add block to blockchain
    const newBlock = {
      blockNumber,
      hash: blockchainHash,
      previousHash,
      timestamp: new Date().toISOString(),
      validator: "Node-Validator-EcoMarine-07",
      transactionsCount: 1,
      data: [
        { type: "POLLUTION_REPORT" as const, id: reportId, summary: `Pollution verified: ${title} (${severity} severity). ${rewardTokens} GuardTokens awarded.` }
      ],
      signature: `sig_ed25519_${crypto.randomBytes(4).toString('hex')}`
    };

    blockchain.push(newBlock);

    res.status(201).json(newReport);
  } catch (error: any) {
    console.error("Pollution report error:", error);
    res.status(500).json({ error: error.message || "Failed to create pollution report" });
  }
});

app.get("/api/pollution-reports", (req, res) => {
  res.json(pollutionReports);
});

// Blockchain endpoint
app.get("/api/blockchain", (req, res) => {
  res.json({
    blocks: blockchain,
    totalBlocks: blockchain.length,
    networkStatus: "SECURE_VALIDATED",
    consensusProtocol: "Proof-of-Environmental-Impact (PoEI)",
    activeValidators: 124,
    totalRewardsDistributed: pollutionReports.reduce((acc, curr) => acc + curr.rewardTokens, 12500)
  });
});

// Aqualis AI Assistant Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const ai = getAIClient();

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (ai) {
      const systemInstruction = `You are Aqualis, the advanced AI marine assistant for "BlueGuard AI", an ecosystem empowering fishermen with safety, fish density prediction, pollution reporting, and ocean conservation. Answer questions expertly regarding weather safety, sustainable fishing, marine ecosystems, tsunami/storm preparedness, and BlueGuard platform features. Be concise, professional, encouraging, and authoritative.`;

      const chatSession = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      // Replay history if needed or send message directly
      const result = await chatSession.sendMessage({ message });
      const reply = result.text || "I am Aqualis, your marine intelligence guide. How can I assist you on the water today?";

      return res.json({ reply });
    }

    // Fallback response if API key is not configured
    let fallbackReply = `Hello captain! As Aqualis AI, I monitor ocean conditions, weather risks, and fish migration patterns. Since the Gemini API key is currently configuring, I can still guide you through BlueGuard AI's smart dashboard, fish prediction maps, and blockchain pollution reporting. What would you like to explore?`;

    const lower = message.toLowerCase();
    if (lower.includes('storm') || lower.includes('safety') || lower.includes('tsunami')) {
      fallbackReply = `Safety Alert: Always monitor wind speeds and wave heights before heading out. Current Bay of Bengal advisory suggests exercising caution due to rising swell. Check the Disaster Preparedness tab for emergency SOS protocols.`;
    } else if (lower.includes('fish') || lower.includes('tuna') || lower.includes('catch') || lower.includes('zone')) {
      fallbackReply = `Fish Density AI: Check our AI Fish Density tab for real-time thermal upwelling zones where Tuna and Mackerel concentrations are highest, optimizing your fuel and catch yield.`;
    } else if (lower.includes('pollution') || lower.includes('plastic') || lower.includes('net')) {
      fallbackReply = `Environmental Monitoring: You can snap a photo of marine pollution or ghost nets in our Environmental Monitoring tab. Our AI verifies it instantly and logs it to our immutable blockchain while issuing GuardTokens!`;
    }

    res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error("Aqualis chat error:", error);
    res.status(500).json({ error: error.message || "Chat failed" });
  }
});

// Vite middleware setup for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BlueGuard AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
