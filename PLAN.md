# 🏘️ PropertyScout AI - תוכנית הטמעה מפורטת

## **שם הפרויקט: PropertyScout AI**
מערכת AI Agent חכמה לסינון ודירוג עסקאות נדלן בישראל

---

## **🎯 סקירה כללית**

**מטרה**: בנות אפליקציה מלאה (Frontend + Backend) שמחפשת ומודרגת עסקאות נדלן לפי קריטריונים מסומנים במידי על ידי המשתמש

**ארכיטקטורה**:
- **Backend**: Node.js + Express API
- **Frontend**: React + Tailwind CSS
- **Storage**: JSON files (לעסקאות וקונפיגורציה)
- **Authentication**: Social Login (Google/Facebook)
- **Data Source**: Web Scraping מ-"יד שנייה" ואתרים אחרים

---

## **📂 מבנה הפרויקט**

```
project-root/
├── backend/
│   ├── src/
│   │   ├── server.js                 # Entry point
│   │   ├── agents/
│   │   │   ├── scraper.js           # Web scraper logic
│   │   │   ├── analyzer.js          # AI agent for analysis
│   │   │   └── matcher.js           # Matching engine
│   │   ├── api/
│   │   │   ├── routes.js            # API endpoints
│   │   │   └── controllers.js       # Request handlers
│   │   ├── utils/
│   │   │   ├── logger.js            # Logging utility
│   │   │   ├── emailer.js           # Email service
│   │   │   └── pdf-generator.js     # PDF export
│   │   └── config.js                # Configuration
│   ├── data/
│   │   ├── parameters.json          # User-defined search parameters
│   │   ├── listings.json            # Fetched property listings
│   │   └── results.json             # Filtered/ranked results
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Main results view
│   │   │   ├── Parameters.jsx       # Parameter configuration
│   │   │   ├── Settings.jsx         # User settings
│   │   │   └── Results.jsx          # Detailed results
│   │   ├── components/
│   │   │   ├── PropertyCard.jsx     # Single property display (card)
│   │   │   ├── PropertyTable.jsx    # Table view
│   │   │   ├── FilterPanel.jsx      # Dynamic filters
│   │   │   ├── ExportModal.jsx      # Export options
│   │   │   └── Header.jsx           # Navigation
│   │   ├── hooks/
│   │   │   └── useAuth.jsx          # Authentication hook
│   │   ├── services/
│   │   │   └── api.js               # API client
│   │   └── index.css                # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── PLAN.md
└── .gitignore
```

---

## **🔧 שלבי ההטמעה**

### **שלב 1: Setup ראשוני (Backend)**
**קבצים**: `backend/package.json`, `backend/src/server.js`, `backend/src/config.js`

1. יצירת תיקיית Backend עם npm init
2. התקנת תלויות:
   - `express` - Web server
   - `axios` - HTTP requests for scraping
   - `cheerio` - HTML parsing
   - `node-schedule` - Scheduled tasks
   - `pdfkit` - PDF generation
   - `dotenv` - Environment variables
3. יצירת `server.js` עם Express app בסיסי
4. הגדרת CORS ו-middleware בסיסי

### **שלב 2: Web Scraper Agent**
**קבצים**: `backend/src/agents/scraper.js`

1. כתיבת פונקציה `scrapeYadShneya()` שמחלצת עסקאות מ-יד שנייה:
   - טעינת עמוד
   - parsing HTML
   - חילוץ: מחיר, מיקום, סוג נכס, גודל, וקישור
2. שמירת נתונים גולמיים ל-`data/listings.json`
3. הוספת error handling וlogging

### **שלב 3: AI Analyzer Agent**
**קבצים**: `backend/src/agents/analyzer.js`, `backend/src/agents/matcher.js`

1. קריאת `parameters.json` - הפרמטרים שהמשתמש הגדיר
2. קריאת `listings.json` - כל העסקאות שמצאנו
3. יצירת logic של matching:
   - בדיקה אם עסקה עומדת בקריטריונים
   - חישוב ניקוד (score) לכל עסקה
   - דירוג לפי הניקוד
4. שמירת תוצאות ל-`results.json` עם metadata

### **שלב 4: API Endpoints**
**קבצים**: `backend/src/api/routes.js`, `backend/src/api/controllers.js`

יצירת endpoints:
- `GET /api/results` - קריאת תוצאות סוננות
- `POST /api/parameters` - שמירת פרמטרים חדשים
- `GET /api/parameters` - קריאת פרמטרים קיימים
- `POST /api/refresh` - הפעלת scraper ידני
- `POST /api/export/pdf` - ייצוא תוצאות כ-PDF
- `POST /api/export/excel` - ייצוא תוצאות כ-Excel
- `POST /api/export/json` - ייצוא תוצאות כ-JSON
- `POST /api/share/email` - שליחה via email
- `POST /api/share/whatsapp` - שליחה via WhatsApp

### **שלב 5: Export & Sharing**
**קבצים**: `backend/src/utils/pdf-generator.js`, `backend/src/utils/emailer.js`

1. PDF Generation:
   - ספרייה `pdfkit` להפקת PDF
   - טבלה עם תוצאות
   - תרשימים בסיסיים

2. Email Service:
   - שימוש ב-`nodemailer`
   - תמפלט HTML
   - attachment של JSON/PDF

3. WhatsApp Integration:
   - Twilio API או webhook
   - קישור לתוצאות או קובץ

### **שלב 6: Setup ראשוני (Frontend)**
**קבצים**: `frontend/package.json`, `frontend/src/App.jsx`

1. יצירת React app עם Vite ✅
2. התקנת תלויות ✅
3. הגדרת routing בסיסי ✅

### **שלב 7: Authentication (Frontend)**
**קבצים**: `frontend/src/hooks/useAuth.jsx`, `frontend/src/pages/Settings.jsx`

1. Integration עם Google/Facebook OAuth
2. ספרייה: `@react-oauth/google` או `react-facebook-login`
3. שמירת token ב-localStorage
4. Hook `useAuth` להרמת state לכל הApp
5. Protected routes

### **שלב 8: Dashboard & Results Display**
**קבצים**: `frontend/src/pages/Dashboard.jsx`, `frontend/src/components/PropertyCard.jsx`, `frontend/src/components/PropertyTable.jsx`

1. **Dashboard**: ✅
   - Tabs: "כרטיסים" ו-"Table"
   - סטטיסטיקות quick-view
   - כפתור "Refresh Results"

2. **Property Card** (view 1): ✅
   - תצוגה יפה של קard לכל עסקה
   - תמונה, מחיר, מיקום
   - ניקוד וdescription
   - כפתורים: Details, Share, Export

3. **Property Table** (view 2): ✅
   - טבלה עם כל הנתונים
   - עמודות: דירוג, מחיר, מיקום, גודל, ניקוד
   - sorting וfiltering

### **שלב 9: Parameter Configuration**
**קבצים**: `frontend/src/pages/Parameters.jsx`, `frontend/src/components/FilterPanel.jsx`

1. ממשק דינמי לעריכת `parameters.json`: ✅
   - קלט ליד-שנייה text
   - בחירה רב-ערכית לקריטריונים
   - inputs למחיר min/max
   - inputs לגודל min/max
   - בחירה למיקום

2. כפתור "Save" השומר ל-Backend
3. כפתור "Test" שמריץ analyzer על ההגדרות החדשות

### **שלב 10: Export Modal**
**קבצים**: `frontend/src/components/ExportModal.jsx`

1. ממשק export עם options: ✅
   - PDF export
   - Excel export
   - JSON export
   - Email (+ form להזנת כתובת)
   - WhatsApp (+ QR code)

### **שלב 11: Scheduled Tasks**
**קבצים**: `backend/src/agents/scraper.js`

1. Cron job שמריץ עדכון יומי:
   - באמצעות `node-schedule`
   - זמן קבוע (למשל 08:00 בבוקר)
   - Logging של תוצאות

### **שלב 12: Error Handling & Logging**
**קבצים**: `backend/src/utils/logger.js`

1. Logger utility לחיפוש שגיאות
2. Logging ל-console ו-file (`logs/app.log`)
3. Error handling ב-API endpoints

### **שלב 13: Testing & Deployment**
1. Manual testing של כל endpoints
2. Testing של scraper על יד-שנייה
3. Testing של export features
4. Deployment ל-production (Heroku/Railway/Docker)

---

## **📄 קובץ Parameters (JSON)**

דוגמה של `backend/data/parameters.json`:

```json
{
  "searchCriteria": [
    {
      "id": 1,
      "name": "דירה זולה שדורשת שיפוץ",
      "type": "apartment",
      "priceMax": 500000,
      "priceMin": 150000,
      "sizeMin": 50,
      "locations": ["תל אביב", "ראשון לציון"],
      "keywords": ["שיפוץ", "זקן"],
      "weight": 1.5
    },
    {
      "id": 2,
      "name": "בנין לפני פינוי-בינוי",
      "type": "building",
      "priceMax": 3000000,
      "priceMin": 800000,
      "sizeMin": 500,
      "locations": ["תל אביב", "ירושלים"],
      "keywords": ["פינוי", "בינוי"],
      "weight": 2
    }
  ]
}
```

---

## **📋 סדר ביצוע מוסדר**

| שלב | משימה | קבצים | אומדן מורכבות | סטטוס |
|-----|-------|--------|---|---|
| 1 | Setup Backend | package.json, server.js | ⭐ | ⏳ |
| 2 | Web Scraper | scraper.js | ⭐⭐⭐ | ⏳ |
| 3 | AI Analyzer | analyzer.js, matcher.js | ⭐⭐⭐⭐ | ⏳ |
| 4 | API Endpoints | routes.js, controllers.js | ⭐⭐ | ⏳ |
| 5 | Export & Share | pdf-generator.js, emailer.js | ⭐⭐⭐ | ⏳ |
| 6 | Setup Frontend | React app | ⭐ | ✅ |
| 7 | Authentication | useAuth.jsx, OAuth | ⭐⭐ | ⏳ |
| 8 | Dashboard | PropertyCard.jsx, PropertyTable.jsx | ⭐⭐ | ✅ |
| 9 | Parameters UI | Parameters.jsx, FilterPanel.jsx | ⭐⭐ | ✅ |
| 10 | Export Modal | ExportModal.jsx | ⭐⭐ | ✅ |
| 11 | Scheduled Tasks | Cron jobs | ⭐ | ⏳ |
| 12 | Logging | logger.js | ⭐ | ⏳ |
| 13 | Testing & Deploy | E2E tests | ⭐⭐ | ⏳ |

---

## **🚀 הוראות התחלה (Quick Start)**

```bash
# Backend
cd backend
npm install
npm start

# Frontend (בטרמינל נפרד)
cd frontend
npm install
npm run dev
```

גש ל- `http://localhost:5173` (או 5174) בדפדפן

---

## **⚠️ הערות חשובות**

1. **Web Scraping**: בדוק את robots.txt של אתרי היד-שנייה
2. **Auth**: הגדר OAuth credentials (Google/Facebook)
3. **Email**: הגדר SMTP credentials ל-nodemailer
4. **Rate Limiting**: אל תחפש עדכון יותר מפעם בשעה כדי לא להעמיס על השרתים
5. **Caching**: שמור results ב-cache כדי להימנע מrecompute מיד

---

## **✅ מה סיימנו כבר**

- ✅ Frontend app עם React + Tailwind CSS
- ✅ Login Page
- ✅ Dashboard עם כרטיסים וטבלה
- ✅ Parameters configuration page
- ✅ Settings page
- ✅ Export Modal
- ✅ Header/Navigation

## **⏳ מה עדיין חסר**

- ⏳ Backend server (Express.js)
- ⏳ Web Scraper Agent
- ⏳ AI Analyzer Agent
- ⏳ API Endpoints
- ⏳ Integration Frontend <-> Backend
- ⏳ PDF/Excel export
- ⏳ Email sending
- ⏳ Authentication (OAuth setup)
