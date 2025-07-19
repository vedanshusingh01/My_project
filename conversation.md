## use javascript 💡 Capstone Prompt: Health Tracker App using MERN Stack
Build a full-stack health tracking web application using the MERN stack.
This app should allow users to track their BMI, monitor daily health metrics, and manage custom wellness tasks.

🧩 Tech Stack:
Frontend: React (with Hooks and functional components)

Backend: Node.js + Express

Database: MongoDB Atlas (cloud-hosted)

ORM: Mongoose

🎯 Core Features
✅ 1. User Authentication
Register and login functionality

Secure password hashing (e.g., bcrypt)

JWT-based token auth or session management

🧮 2. BMI Calculator
Input: height & weight

Backend calculates BMI or you can do it on the client

Save BMI records to the user's profile (optional timestamped)

📊 3. Health Metrics Tracker
Daily inputs for:

Water intake (liters or glasses)

Sleep hours

Weight

Steps walked (manual input or integrated via API in future)

Stored in MongoDB per user with date/time

Graphs/charts for weekly/monthly progress using Chart.js or Recharts

📅 4. Custom Health Tasks
Users can create/edit/delete daily or weekly health tasks:

Example: “Drink 2L water”, “Walk 5,000 steps”

Task checklist resets daily

Backend stores task templates and completion records per user

📈 5. Progress Dashboard
Visual summary of:

Daily metrics

Task completion stats

Current streaks and goals achieved

Styled with a clean UI (Tailwind CSS, Material UI, or Bootstrap)

🌟 Bonus Features (Optional)
Notifications/reminders (email, push)

Dark mode

PWA support for offline access

Admin dashboard for managing users and global health tips

Integration with wearable device APIs (Fitbit, Apple Health) in future

🗂 Suggested Folder Structure:
bash
Copy
Edit
/client (React frontend)
  /components
  /pages
  /services (API handlers)
  /context (Auth/context providers)

/server (Node + Express)
  /routes
  /controllers
  /models (Mongoose)
  /middleware (auth, error handlers)
  /config (.env, DB connection)

/.env (Mongo URI, JWT secret, etc.)
🚀 Development Milestones:
 Set up backend + MongoDB Atlas connection

 Build auth system (login/register with JWT)

 Implement BMI calculator and store results

 Create metric tracking system

 Add health task creation/completion

 Build React dashboard for user progress

 Polish UI and add optional features

Here's a detailed guide and implementation plan for building a Health Tracker App using the MERN stack.

### **Project Setup & Folder Structure**

First, create the main project directory and then scaffold the frontend and backend folders. The suggested folder structure is ideal for organizing a MERN application.

```bash
/client
  /src
    /components
    /pages
    /services
    /context
/server
  /routes
  /controllers
  /models
  /middleware
  /config
.env
```

-----

### **1. User Authentication ✅**

This feature handles user registration and login using JWT for secure sessions.

#### **Backend (Node.js / Express)**

**1. User Model (`server/models/User.js`)**
Use Mongoose to define the user schema. `bcrypt` will be used to hash passwords before saving.

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

**2. Auth Routes (`server/routes/auth.js`)**
Define the endpoints for registration and login.

```javascript
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
```

**3. Auth Controller (`server/controllers/authController.js`)**
Handle the logic for creating users and issuing JSON Web Tokens (JWT).

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  // ... (try/catch block)
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).send({ message: 'User registered successfully!' });
};

exports.login = async (req, res) => {
  // ... (try/catch block)
  const user = await User.findOne({ email: req.body.email });
  if (!user || !await bcrypt.compare(req.body.password, user.password)) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(200).send({ token });
};
```

#### **Frontend (React)**

**1. Auth Context (`client/src/context/AuthContext.js`)**
Manage user authentication state globally.

```javascript
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // Login, logout functions that modify state and localStorage
  // ...
  return (
    <AuthContext.Provider value={{ token /* ... other values */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**2. Register/Login Components (`client/src/pages/`)**
Create forms to capture user input and call the backend API using a service.

```javascript
// In Register.js
import { registerUser } from '../services/api';

const handleRegister = async (e) => {
  e.preventDefault();
  // Call API service with form data
  await registerUser({ username, email, password });
  // Redirect to login
};
```

-----

### **2. BMI Calculator 🧮**

Calculate and store the user's Body Mass Index. The formula is:

$$\text{BMI} = \frac{\text{weight (kg)}}{\text{height (m)}^2}$$

#### **Backend (Node.js / Express)**

**1. BMI Model (`server/models/Bmi.js`)**
A simple schema to store timestamped BMI records for each user.

```javascript
const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bmi: { type: Number, required: true },
  height: { type: Number, required: true }, // in meters
  weight: { type: Number, required: true }, // in kg
}, { timestamps: true });

module.exports = mongoose.model('Bmi', bmiSchema);
```

**2. BMI Routes/Controller**
Endpoints to save a new BMI record and fetch the user's history. These should be protected routes.

```javascript
// POST /api/bmi - Save new BMI record
// GET /api/bmi - Get all BMI records for the logged-in user
```

#### **Frontend (React)**

**1. BMI Calculator Component (`client/src/components/BmiCalculator.js`)**
A form for height and weight input. The calculation can happen on the client-side for immediate feedback before saving.

```javascript
const [height, setHeight] = useState(''); // in cm
const [weight, setWeight] = useState(''); // in kg
const [bmi, setBmi] = useState(null);

const calculateBmi = () => {
  if (height > 0 && weight > 0) {
    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(calculatedBmi);
    // Call API service to save the record
    saveBmiRecord({ height: heightInMeters, weight, bmi: calculatedBmi });
  }
};
```

-----

### **3. Health Metrics Tracker 📊**

Track daily metrics like water intake, sleep, and steps.

#### **Backend (Node.js / Express)**

**1. Health Metric Model (`server/models/HealthMetric.js`)**

```javascript
const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: { type: Number },
  sleepHours: { type: Number },
  waterIntake: { type: Number }, // in liters
  steps: { type: Number },
}, { timestamps: true });

// Ensure one record per user per day
healthMetricSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
```

**2. Metrics Routes/Controller**
An endpoint to create or update the metrics for a specific day (`upsert` logic is useful here). Another to fetch data for a date range (e.g., last 7 days).

```javascript
// POST /api/metrics - Create/Update today's metrics
// GET /api/metrics?range=7 - Get metrics for the last 7 days
```

#### **Frontend (React)**

**1. Metrics Form Component (`client/src/components/MetricsForm.js`)**
A form to input daily metrics.

**2. Chart Component (`client/src/components/ProgressChart.js`)**
Use a library like `Recharts` to visualize data fetched from the backend.

```javascript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProgressChart = ({ data /* fetched from /api/metrics */ }) => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
    <Line type="monotone" dataKey="sleepHours" stroke="#82ca9d" />
  </LineChart>
);
```

-----

### **4. Custom Health Tasks 📅**

Allow users to manage their own recurring health goals.

#### **Backend (Node.js / Express)**

**1. Task Model (`server/models/Task.js`)**
This schema defines the task template created by the user.

```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
```

**2. Task Completion Model (`server/models/TaskCompletion.js`)**
This tracks which tasks were completed on which dates.

```javascript
const mongoose = require('mongoose');

const taskCompletionSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  isCompleted: { type: Boolean, default: true },
});

module.exports = mongoose.model('TaskCompletion', taskCompletionSchema);
```

**3. Task Routes/Controller**
Implement full CRUD (Create, Read, Update, Delete) for task templates and routes to mark tasks as complete/incomplete for the current day.

#### **Frontend (React)**

**1. Task Management Component (`client/src/components/TaskManager.js`)**
A component to list, create, edit, and delete tasks.

**2. Daily Checklist Component (`client/src/components/DailyChecklist.js`)**
Fetch the user's tasks and their completion status for the current day. Display them as a checklist. Clicking a checkbox should call the API to update the completion status.

-----

### **5. Progress Dashboard 📈**

This is the main page for a logged-in user, combining all the features into a single view.

#### **Frontend (React)**

**Dashboard Page (`client/src/pages/Dashboard.js`)**
This page will be the central hub. It should be a protected route, accessible only to logged-in users.

1.  **Layout:** Use a grid system (e.g., from Tailwind CSS or Material-UI) to arrange components.
2.  **Data Fetching:** On component mount (`useEffect`), fetch all necessary data for the current user:
      * Latest BMI
      * Health metrics for the last week
      * Today's tasks and their completion status
3.  **Component Composition:** Assemble the components you've built:
      * A welcome message with the user's name.
      * A small card displaying the current BMI.
      * The `ProgressChart` showing trends for weight, sleep, etc.
      * The `DailyChecklist` for health tasks.
      * A quick-access form to log today's metrics (`MetricsForm`).