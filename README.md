# GUIDE ON HOW TO RUN SAVIN'IT #


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


## README.md-V.0.2 – for City Submission, not Public Repo due to .env fields.
