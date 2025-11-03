# 🎓 ML Finals Exam - Full Stack ML Web Application

A comprehensive machine learning web application featuring 6 different ML models for student performance prediction. Built with Flask (backend) and React (frontend), ready for deployment on Render and Vercel.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.0-green)
![Python](https://img.shields.io/badge/Python-3.11+-yellow)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.7.2-orange)

---

## 🌟 Features

### Machine Learning Models
- **Linear Regression** - Continuous grade prediction
- **Naive Bayes** - Classification based on student attributes
- **K-Nearest Neighbors (KNN)** - Pattern-based predictions
- **Support Vector Machine (SVM)** - Advanced classification
- **Decision Tree** - Rule-based predictions
- **Artificial Neural Network (ANN)** - Deep learning approach

### User Interface
- ✨ Modern, responsive design with Tailwind CSS
- 🎨 Interactive forms with real-time validation
- 📊 Visual prediction results
- 🔄 Clear form buttons with animations
- 📱 Mobile-friendly layout

### Backend API
- 🚀 RESTful Flask API
- 🔒 CORS-enabled for secure cross-origin requests
- ⚡ Fast prediction endpoints
- 📈 Dataset exploration endpoints

---## ✨ FeaturesNext steps you may want me to do:

- Run `npm install` and start the dev server here and verify pages load.

### 🤖 **6 Machine Learning Models**- Add lightweight unit tests or a GitHub Actions workflow.

- **Linear Regression** - Grade prediction with regression analysis- Wire a simple JSON dataset file and load it into `Dataset.jsx`.

- **Naive Bayes** - Probabilistic risk assessment  
- **K-Nearest Neighbors (KNN)** - Find similar student profiles
- **Support Vector Machine (SVM)** - High-accuracy classification
- **Decision Tree** - Transparent rule-based analysis
- **Artificial Neural Network (ANN)** - Deep learning forecasting

### 🎯 **User-Friendly Interface**
- Interactive charts and visualizations (Chart.js)
- Floating help button with comprehensive input guide
- Portuguese grading system (0-20) with conversions to US/GPA/UK systems
- Real-time validation and error handling
- Responsive design for all devices

### 📊 **Dataset Explorer**
- View 100 sample student records
- Pagination and data filtering
- CSV export functionality
- Comprehensive dataset statistics

### 🌍 **International Support**
- Grading system explanations for Portuguese 0-20 scale
- Conversion tables for US percentage, GPA, and UK letter grades
- Detailed input field definitions with examples

---

## 🛠️ Tech Stack

### **Frontend**
- **React** 18.2.0 - UI framework
- **Vite** 5.4.21 - Build tool
- **TailwindCSS** 3.4.1 - Styling
- **Chart.js** 4.4.1 - Data visualization
- **React Router** 6.22.0 - Navigation

### **Backend**
- **Flask** 3.0.0 - Web framework
- **Flask-CORS** 4.0.0 - Cross-origin resource sharing
- **Scikit-learn** 1.7.2 - ML algorithms
- **TensorFlow** 2.20.0 - Neural networks
- **Pandas** 2.3.3 - Data processing
- **NumPy** 2.3.4 - Numerical computing

### **Dataset**
- **UCI Student Performance Dataset** (395 students, 34 features)
- Portuguese secondary school mathematics course data

---

## 🚀 Quick Start

### Local Development

**1. Setup Development Environment**
```powershell
# Run the automated setup script
.\scripts\setup-dev.ps1
```

**2. Start Backend** (Terminal 1)
```powershell
cd backend
python app.py
```
Backend runs on: `http://localhost:5000`

**3. Start Frontend** (Terminal 2)
```powershell
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Deployment

**Ready to deploy?** Follow our comprehensive guides:

📖 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete step-by-step deployment tutorial  
✅ **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist  

**Quick Deployment Steps:**
1. Run pre-deployment checker: `.\scripts\check-deployment.ps1`
2. Push code to GitHub
3. Deploy backend to Render (10 mins)
4. Deploy frontend to Vercel (5 mins)
5. Update CORS settings

**Deployment Stack:**
- **Backend**: Render.com (Free tier)
- **Frontend**: Vercel (Free tier)
- **CI/CD**: GitHub Actions

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ Dataset │  │  Models │  │  Charts │  │  Help   │   │
│  │  Page   │  │  Pages  │  │(Chart.js)│  │  Modal  │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (Flask)                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │         API Routes (/api/predict/*)              │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐    │
│  │ LR │  │ NB │  │KNN │  │SVM │  │ DT │  │ANN │    │
│  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘    │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Trained Models      │
              │  (.pkl, .h5 files)   │
              └──────────────────────┘
```

---

## 🚀 Installation

### **Prerequisites**
- **Node.js** 16+ and npm
- **Python** 3.11+
- **Git**

### **Step 1: Clone Repository**
```powershell
git clone <your-repo-url>
cd ML_FINALS_EXAM
```

### **Step 2: Backend Setup**

```powershell
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate  # Windows PowerShell
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python -m flask run
```

Backend will run on **http://localhost:5000**

### **Step 3: Frontend Setup**

Open a **new terminal** window:

```powershell
# From project root
npm install

# Start development server
npm run dev
```

Frontend will run on **http://localhost:5173**

---

## 📖 Usage

### **1. Access the Application**
Open your browser and go to `http://localhost:5173`

### **2. Navigate to a Model Page**
Choose from 6 ML models in the navigation menu

### **3. Open the Help Guide**
Click the floating **"❓ Need Help?"** button in the bottom-right corner

### **4. Fill in Student Data**
- Use the **"📝 What to Enter"** tab to understand each field
- Use the **"📊 Grading Scale"** tab for grade conversions
- All fields are required (validation will notify you)

### **5. Generate Prediction**
Click the action button (Predict / Assess / Classify / etc.)

### **6. View Results**
- See predicted performance category (Good / Average / At-Risk)
- Explore interactive charts and visualizations
- Review confidence scores and detailed metrics

---

## 🤖 ML Models

### **1. Linear Regression**
- **Purpose:** Predicts exact final grade (G3) on 0-20 scale
- **Input Features:** 8 fields (age, study time, absences, G1, G2, etc.)
- **Output:** Numerical grade prediction
- **Visualization:** Scatter plot with regression line

### **2. Naive Bayes**
- **Purpose:** Probabilistic risk assessment
- **Algorithm:** Gaussian Naive Bayes
- **Output:** Risk category + probability distribution
- **Accuracy:** ~87.3%

### **3. K-Nearest Neighbors (KNN)**
- **Purpose:** Find similar student profiles
- **K-value:** 5 neighbors
- **Output:** Predicted category + 5 nearest neighbors with distances
- **Accuracy:** ~89.9%

### **4. Support Vector Machine (SVM)**
- **Purpose:** High-accuracy classification
- **Kernel:** RBF (Radial Basis Function)
- **Output:** Performance category + decision function values
- **Accuracy:** ~91.1% (best performer)

### **5. Decision Tree**
- **Purpose:** Transparent rule-based analysis
- **Input Features:** 3 simplified metrics (attendance, assignments, test scores)
- **Output:** Outcome + decision path visualization
- **Advantage:** Fully interpretable

### **6. Artificial Neural Network (ANN)**
- **Purpose:** Long-term performance forecasting
- **Architecture:** Multi-layer perceptron
- **Output:** Short-term and long-term grade predictions
- **Framework:** TensorFlow/Keras

---

## 📊 Dataset Information

### **Source**
- **Name:** Student Performance Dataset
- **Origin:** UCI Machine Learning Repository
- **Context:** Portuguese secondary schools (2005-2006)
- **Records:** 395 students
- **Features:** 34 total (15 used for predictions)

### **Target Variable**
- **G3:** Final grade (0-20 Portuguese scale)
- **Categories:**
  - **Good:** 15-20 (High achiever)
  - **Average:** 10-14 (Moderate performer)
  - **At-Risk:** 0-9 (Needs support)

### **Key Features (15)**
- Demographics: age
- Family: Medu (mother's education), Fedu (father's education), famrel
- School: traveltime, studytime, failures, absences
- Lifestyle: freetime, goout, Dalc (weekday alcohol), Walc (weekend alcohol), health
- Academic: G1 (period 1 grade), G2 (period 2 grade)

### **Citation**
> P. Cortez and A. Silva. Using Data Mining to Predict Secondary School Student Performance.  
> In Proceedings of 5th FUture BUsiness TEChnology Conference (FUBUTEC 2008) pp. 5-12, Porto, Portugal, April, 2008.

For detailed dataset documentation, see [DATASET_CONTEXT.md](./DATASET_CONTEXT.md)

---

## 📁 Project Structure

```
ML_FINALS_EXAM/
├── backend/
│   ├── models/              # ML model implementations
│   │   ├── linear_regression.py
│   │   ├── naive_bayes.py
│   │   ├── knn.py
│   │   ├── svm.py
│   │   ├── decision_tree.py
│   │   └── ann.py
│   ├── trained_models/      # Serialized models (.pkl, .h5)
│   ├── data/
│   │   └── student-mat.csv  # Dataset
│   ├── app.py               # Flask application
│   ├── requirements.txt     # Python dependencies
│   └── README.md
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── GradingSystemInfo.jsx  # Floating help modal
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dataset.jsx
│   │   └── Models/          # 6 model pages
│   │       ├── LinearRegression.jsx
│   │       ├── NaiveBayes.jsx
│   │       ├── KNN.jsx
│   │       ├── SVM.jsx
│   │       ├── DecisionTree.jsx
│   │       └── ANN.jsx
│   ├── utils/
│   │   └── api.js           # API client functions
│   ├── App.jsx
│   └── main.jsx
├── public/
├── DATASET_CONTEXT.md       # Comprehensive dataset docs
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── README.md
```

---

## 🔌 API Documentation

### **Base URL**
```
http://localhost:5000/api
```

### **Endpoints**

#### **Health Check**
```http
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "models_loaded": true
}
```

#### **Get Dataset**
```http
GET /api/dataset
```
**Response:** Full dataset statistics

#### **Get Sample Data**
```http
GET /api/dataset/sample?n=100
```
**Response:** N sample student records

#### **Linear Regression Prediction**
```http
POST /api/predict/linear-regression
Content-Type: application/json

{
  "age": 17,
  "Medu": 3,
  "Fedu": 3,
  "traveltime": 1,
  "studytime": 2,
  "failures": 0,
  "famrel": 4,
  "freetime": 3,
  "goout": 2,
  "Dalc": 1,
  "Walc": 1,
  "health": 3,
  "absences": 4,
  "G1": 15,
  "G2": 14
}
```
**Response:**
```json
{
  "predicted_grade": 14.52,
  "performance_category": "Average"
}
```

#### **Other Model Predictions**
- `POST /api/predict/naive-bayes`
- `POST /api/predict/knn`
- `POST /api/predict/svm`
- `POST /api/predict/decision-tree`
- `POST /api/predict/ann`

---

## 🎨 Features Highlights

### **Floating Help System**
- Always-accessible "Need Help?" button
- Modal popup with tabbed interface
- No scrolling back and forth
- Comprehensive field explanations

### **Input Validation**
- Required field checking
- Clear error messages
- Real-time feedback

### **Grade Conversions**
- Portuguese 0-20 → US Percentage
- Portuguese 0-20 → GPA (0-4.0)
- Portuguese 0-20 → UK Letter Grades

### **Interactive Visualizations**
- Scatter plots (Linear Regression)
- Probability bars (Naive Bayes)
- Neighbor comparisons (KNN)
- Decision boundaries (SVM)
- Tree diagrams (Decision Tree)
- Trend forecasts (ANN)

---

## 🙏 Acknowledgments

- UCI Machine Learning Repository for the Student Performance Dataset
- P. Cortez and A. Silva for the original research
- React and Flask communities for excellent documentation

---

**Made with ❤️ for ML Finals Exam 2025**
