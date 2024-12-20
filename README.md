# GUIDE ON HOW TO RUN SAVIN'IT #

---

## **🌟 HOW TO USE SAVIN'IT 🌟**

### **Create Your Account**
1. **Sign up to create your account:**
   - A two-factor authentication system is enabled.
   - You will receive an email confirmation to verify your account.

2. **Test Account for Quick Access:**
   - Use the following credentials to quickly access the app:
     - Email: `hfourati2007@gmail.com`
     - Password: `JSMmastery`

3. **Access the Dashboard:**
   - Click on **"GET STARTED"** to begin using the app and explore its features.

---

## **🎨 FEATURES EXPLAINED 🎨**

### **Dashboard**
- View an overview of your finances:
  - **Largest expense this month.**
  - **Upcoming bills.**
  - **Current bank account balance.**
  - **Recent expenses.**
  - **Spending evaluation.**
  - **Monthly budget overview.**

### **Budget Management**
- **Create a budget:**
  - Define a budget by category and date range.
- **View budget history:**
  - Access all previous budgets for better planning.

### **Expense Tracking**
- **Add expenses:**
  - Record expenses with details like amount, date, and description.
- **View all expenses:**
  - Access a full history of your transactions.

### **Recurring Bills**
- **Set up recurring bills:**
  - Define the frequency (e.g., monthly or weekly).
  - Specify start and end dates.

### **Income Configuration**
- **Set up your income:**
  - Enter your salary and specify how often you receive it (e.g., monthly).

### **Learning Section**
- Improve your financial knowledge with articles on:
  - **Savings** (Learn how to save).
  - **Budgeting** (Learn how to budget).
  - **Investing** (Learn how to invest).
  - **Debt Management** (Learn how to manage debt).

  **Note:** Each section redirects you to detailed and informative articles.

---


## 🎛️ STEP 0. PREREQUISITES 🎛️ ##


You will need to have at least Node v21.7.1 on your machine.
```bash
node -v     # Checks the version of Node on your machine.
```



## 📥 STEP 1. INSTALL ALL THE PACKAGES 📥 ##


Run the given command in the terminal shell of your IDE:
```bash
npm i       # Installs the node modules.
```



## 🛫 STEP 2. START THE WEB APP 🛫 ##


Run the given commands in the terminal shell of your IDE:
```bash
npm run dev
```
### 🍏 MAC USERS 🍏 ###
Press CMD + Left Click on [http://localhost:3000/]

### 🖥️ PC USERS 🖥️ ###
Press CTRL + Left Click on [http://localhost:3000/]



## 💫 STEP 3. ENJOY 💫 ##


To start, click on GET STARTED
Play around with different features and just like me start to Savin'IT😉



## 🧰 STEP 4. OTHERS 🧰 ##


### To have a look at the hosted version of the project: ###
Enter the given web link into you web browser and have fun savin'it!
```html
https://savin-it.co.uk
```

### To have a look at the Database Tables, follow the instructions below: ###
Run the given command in a separate IDE Terminal Shell (different than the one you ran npm run dev):
```bash
npx prisma studio
```
### 🍏 MAC USERS 🍏 ###
### Press CMD + Left Click on [http://localhost:3000/] ###

### 🖥️ PC USERS 🖥️ ###
### Press CTRL + Left Click on [http://localhost:3000/] ###


### To Populates the database with articles data, follow the instructions below: ###
- Rename prisma/seed-articles.ts to seed.ts
- Uncomment the desired content.
- Run the given command in a separate IDE Terminal Shell (different than the one you ran npm run dev and fills all fields otherwise it fails!):
```bash
npm run prisma:seed     # Populates the database with articles data – CF. prisma/seed.ts
```

### To Populates the database with expenses data for your user, follow the instructions below: ###
- Rename prisma/seed-expenses.ts to seed.ts
- - Uncomment the desired content.
- Run the given command in a separate IDE Terminal Shell (different than the one you ran npm run dev and fills all fields otherwise it fails!):
```bash
npm run prisma:seed     # Populates the database with articles data – CF. prisma/seed.ts
```


