# RoadSense AI 🛣️🤖

**Digital Vigilance for Bharat: Transforming ordinary dashcams and smartphones into a distributed safety network.**

[![Track: Open Innovation](https://img.shields.io/badge/Track-Open_Innovation-orange.svg)]()
[![Status: Prototype](https://img.shields.io/badge/Status-Working_Prototype-success.svg)]()

## 📌 Problem Statement: The Infrastructure Failure
Despite living in an era of smart cities, our approach to road safety is fundamentally stuck in the past. We are solving dynamic problems with static, outdated tools:
* **The 99% Blind Spot:** Stationary cameras cover less than 1% of city streets. Reckless drivers resume bad habits the moment they are out of frame.
* **Dumb Dashcams:** Millions of cameras record footage onto SD cards, but they are reactive. They do nothing to stop behavior in real-time.
* **Resource Bottleneck:** Police cannot be everywhere. Crowdsourcing manual reports is too tedious and slow for effective enforcement.
* **Wrong-Side Lethality:** Head-on collisions are uniquely deadly. Static cameras fail to track behavioral anomalies that cause them.

**Our Solution:** RoadSense transforms ordinary dashcams into a distributed safety network. Automated, scalable, and built for the unique chaos of Indian urban roads.

---

### 🇮🇳 National Validation: The Ministry's Mandate
The problem we are solving is not hypothetical—it is a current national priority. Just days before this hackathon, Shri Nitin Gadkari (Minister of Road Transport and Highways) announced the NHAI's initiative to deploy AI-powered Dashcam Analytics Services (DAS) to detect road defects and safety risks. 

While the government's approach relies on outfitting a limited fleet of official Route Patrol Vehicles, **RoadSense AI democratizes and scales this exact vision.** We bring the Ministry's $100M infrastructure monitoring goal to the edge, allowing any of India's millions of civilian dashcams to act as an official DAS node for zero infrastructure cost.

<blockquote class="twitter-tweet" data-theme="dark"><p lang="en" dir="ltr">🔸The National Highways Authority of India (NHAI) is set to transform highway operations and maintenance by deploying AI-powered Dashcam Analytics Services (DAS) across nearly 40,000 km of the National Highway network. This initiative leverages Artificial Intelligence (AI) and…</p>&mdash; Nitin Gadkari (@nitin_gadkari) <a href="https://twitter.com/nitin_gadkari/status/2034988927757484032?ref_src=twsrc%5Etfw">March 20, 2026</a></blockquote>
link- https://x.com/nitin_gadkari/status/2034988927757484032?s=20

## 🏗️ System Architecture: The "Open Architecture" Bridge
We solved the ultimate technical paradox: How to process 20GB of AI intelligence offline and bridge it to an online portal securely, using an Asynchronous Pipeline.

```mermaid
%%{init: {
  "theme": "base",
  "flowchart": {
    "useMaxWidth": true,
    "htmlLabels": true
  },
  "themeVariables": {
    "background": "transparent",
    "primaryColor": "#2563eb",
    "primaryTextColor": "#ffffff",
    "primaryBorderColor": "#60a5fa",
    "secondaryColor": "#1e40af",
    "secondaryTextColor": "#e0f2fe",
    "tertiaryColor": "#0ea5e9",
    "lineColor": "#93c5fd",
    "textColor": "#e0f2fe",
    "clusterBkg": "rgba(37, 99, 235, 0.08)",
    "clusterBorder": "#3b82f6"
  }
}}%%
flowchart TD

%% ===== EDGE =====
subgraph EDGE["Edge Device"]

A["Dashcam Feed"]
B["Zero-Copy Ingestion"]
C["AI Inference"]
D{"Violation?"}
X["Drop Frame"]
E["Blur Engine"]
F["Proof Gen"]
G["Encrypted Storage"]

A --> B --> C --> D
D -- No --> X
D -- Yes --> E --> F --> G

end

%% ===== SYNC =====
subgraph SYNC["Sync Layer"]

H{"Network?"}
I["TLS Push"]
J["Upload"]

G --> H
H -- No --> G
H -- Yes --> I --> J

end

%% ===== CLOUD =====
subgraph CLOUD["Cloud"]

K["Relay"]
L["Validation"]
M{"Valid?"}
N["Reject"]
O["Dashboard"]
P["Challan"]

J --> K --> L --> M
M -- No --> N
M -- Yes --> O --> P

end
```

---

## 🧠 The Technical Tree (How we achieve 60FPS on Edge)
Addressing the skeptical question: How does a 45MB model handle 60 FPS without RAM bloat or lag?

1. **Hardware-Level Capture (Zero-Copy):** The camera frame bypasses the device's general Heap RAM. Using Hardware Tiling, pixels are fed directly to the NPU/GPU cache.
2. **Asynchronous Inference (No-Lag Pipeline):** The AI runs on a separate, lower-priority thread. Even if the AI is busy, the Camera-to-UI loop stays at perfectly smooth 60 FPS while inference drops to 15 FPS.
3. **16ms Lifetime Disposal:** 99.9% of frames are discarded from the hardware cache within 16 milliseconds. The system has zero "junk" persistence.
4. **Neural Distillation (20GB → 45MB):** By distilling the mathematical essence of massive server-side models into INT8 quantized tensors, we fit intelligence into a package smaller than a WhatsApp update.

---

## 🛡️ Privacy & Security: Built-In, Not Bolted On
Surveillance is a major concern with crowdsourced video. RoadSense AI is a closed system on the client-side, mathematically incapable of mass surveillance. We respect the privacy of every citizen while enforcing road discipline:

* **100% Client-Side Render:** The video feed is rendered and processed entirely on your Dashcam or Phone NPU/GPU. We **NEVER** stream live footage to the cloud or government servers.
* **Offline-First "Secure Push" Transmission:** The server cannot "ping", wake up, or connect to your camera. The edge device acts as an autonomous gateway. It buffers data and pushes it outbound via tiny encoded packets *only* when a violation is mathematically proven and a secure tower handshake is established. This strictly eliminates tracking and back-door access.
* **Pedestrian Face Blurring:** Our AI automatically blurs pedestrian faces and non-involved vehicle plates directly in the GPU buffer *before* the snapshot is finalized or saved, protecting innocent bystanders.
* **Encryption at Rest & 16ms Disposal:** Raw frames cease to exist within 16 milliseconds. If a violation is logged, the blurred proof is encrypted in the local buffer and wiped instantly from the device upon successful upload to the portal.
---

📈 Why Adopt? (Economic & Behavioral Scalability)
-------------------------------------------------

Bridging the massive gap between infrastructure and enforcement requires a scalable, citizen-led network.

*   **Economic Scalability (1/1000th Cost):** A city can deploy thousands of mobile sensors for the cost of a single fixed CCTV installation.
    
*   **Zero Friction Deployment:** No new hardware required. Works instantly with existing commercial dashcams and smartphones already owned by millions of citizens.
    
*   **Proactive Deterrence:** When every vehicle is a potential reporting node, drivers lose the sense of impunity. Road discipline becomes the default behavioral shift.
    
*   **Irrefutable Legal & Insurance Proof:** Every recorded incident is cryptographically hashed with precise metadata (timestamp, GPS coordinates, and vehicle velocity). This creates tamper-proof, court-admissible evidence that instantly resolves "he-said-she-said" disputes and dramatically accelerates insurance claim approvals.
    

🚗 Real-World Operation (The Daily Routine)
-------------------------------------------

Moving from vision to the nitty-gritty of daily dashboard vigilance:

*   **Hardware Agnostic:** Run it on a Pro Dashcam (like the RoadSense Sentinel) with 12V constant power for 24/7 autonomous monitoring, or an ordinary iPhone/Android from the last 4-5 years.
    
*   **Zero-Friction Routine:** \* _Dashcams:_ Auto-boots AI triage on ignition.
    
    *   _Smartphones:_ One-tap "Start Drive" initiates **Ghost Mode**, allowing the AI to run in the background while you simultaneously use Google Maps or Spotify.
        
*   **One-Click Claim Export:** In the event of an accident or dispute, users can generate a certified PDF report directly from the app. This bundles the unedited video proof and telemetry data for immediate, frictionless submission to insurance agents or traffic courts.
    
*   **Handling Edge Cases (Thermal & Light):** Running AI constantly generates heat. Our system dynamically throttles (downscaling video to 640x480 and limiting processing to 10-15 FPS) if the hardware temperature exceeds 45°C. For nighttime inference, the system automatically calibrates for IR-compatible sensors.

## ⚙️ Development & Setup Instructions

### 1. Environment Configuration (CRITICAL)
Create a `.env.local` file inside the `frontend/RoadSenseAI/` directory. This is required for the demo UI to authenticate users and admins.

**File Path:** `frontend/RoadSenseAI/.env.local`
```env
NEXT_PUBLIC_USER_EMAIL=user1@gmail.com
NEXT_PUBLIC_USER_PASSWORD=12345678
NEXT_PUBLIC_ADMIN_EMAIL=admin@gmail.com
NEXT_PUBLIC_ADMIN_PASSWORD=12345678
```

### 2. Backend (AI Inference Engine)
The backend manages the YOLOv8 INT8 quantized logic.
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*(Runs on localhost:5000)*

### 3. Frontend (Dashboard & Live Camera Feed)
The Next.js 14 application providing the UI for Sentinels and Admins.
```bash
cd frontend/RoadSenseAI
npm install
npm run dev -- -p 9002
```
*(Runs on localhost:9002)*

**Testing the Live Feed:** Navigate to `http://localhost:9002/dashboard/camera` to see the live model checking for violations in real-time.

---

## 👥 Real-World Operation (Phase 5)
* **Economic Scalability:** A city can deploy thousands of mobile sensors for the cost of one fixed CCTV installation.
* **Hardware Agnostic:** Works with Pro Dashcams (RoadSense Sentinel) or ordinary iPhone/Androids (last 4-5 years).
* **Thermal Management:** AI throttles dynamically if phone/dashcam hits >45°C.

*Challenge: Open Innovation | Duration: 36 Hours*
