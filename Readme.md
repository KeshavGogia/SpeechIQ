# 🧠 SpeechIQ – Real-Time Speech Intent Recognition

**SpeechIQ** is a real-time Speech Intent Recognition system that uses **Wave2Vec2** for speech-to-text transcription and a lightweight text classification model to determine the user’s intent from spoken audio.

---

## 🎯 What Does SpeechIQ Do?

1. Accepts a `.wav` voice recording from the user.
2. Transcribes the speech using **Wave2Vec2** (self-supervised ASR model from Facebook AI).
3. Classifies the transcribed sentence into one of the **predefined intents**.
4. Returns the **transcription** and **predicted intent** via a clean REST API.

---

## 🧠 Why Wave2Vec2 Over MFCC?

| Criteria             | MFCC (Mel-Frequency Cepstral Coefficients) | Wave2Vec2                                 |
|----------------------|---------------------------------------------|-------------------------------------------|
| Feature Extraction   | Hand-crafted                                | Self-learned (deep contextual learning)   |
| Preprocessing Needed | High (windowing, DCT, etc.)                 | Minimal (raw waveform input)              |
| Noise Robustness     | Low                                         | High                                      |
| Performance          | Good for classical ASR                      | Superior in modern NLP/ASR tasks          |
| Deep Contextual Info | No                                          | Yes (uses transformers)                   |

**Wave2Vec2** eliminates the dependency on MFCC by learning representations directly from raw waveform inputs. This enables better transcription, especially in noisy or varied environments, and greatly enhances the accuracy of downstream intent classification tasks.

---

## 📈 Model Performance

| Metric        | Value      |
|---------------|------------|
| Accuracy      | **92.5%**  |
| Dataset       | Fluent Speech Command
| Input Format  | `.wav` (Mono, 16kHz)

---

## ⚙️ Tech Stack

### 🔧 Backend (FastAPI)
- 🧠 **Wave2Vec2ForCTC** – Facebook's pre-trained ASR model (via Hugging Face)
- 🎯 **Intent classifier** – Lightweight NLP model trained on transcribed intent-labeled data
- 📦 `librosa`, `soundfile` – Audio preprocessing
- 🔌 REST API for file upload and prediction

### 🌐 Frontend (Next.js + TypeScript)
- 🎙️ Record or upload audio
- 📤 Send file to FastAPI backend
- 📃 Show predicted intent and transcript in real-time
- 💄 Responsive UI built with modern TypeScript patterns

---

## 🔥 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SpeechIQ.git
cd SpeechIQ
```

### 2. Backend Setup
```bash
cd backend
conda create -p venv python
conda activate venv
pip install -r requirements.txt
uvicorn main:app --reload
```
API will run at: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
npm install
npm run dv
```
Frontend will run at: `http://localhost:3000`

---
### 📬 API Usage
`POST /predict-intent`

- Input: .wav file (Mono, 16kHz)

`Response`:

```bash
{
  "intent": "decrease_volume_none"
}
```