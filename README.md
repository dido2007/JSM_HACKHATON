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


## 📝 STEP 2. CREATE AN ENVIRONMENT FILE 📝 ##


### Create a .env file in the root directory. ###

Copy and paste what follows:
```js
DATABASE_URL="postgresql://savin-it_test_owner:3v0GfKkCzjWy@ep-frosty-morning-a2ip34lh-pooler.eu-central-1.aws.neon.tech/savin-it_test?sslmode=require"

DATABASE_URL_UNPOOLED="postgresql://savin-it_test_owner:3v0GfKkCzjWy@ep-frosty-morning-a2ip34lh.eu-central-1.aws.neon.tech/savin-it_test?sslmode=require"

AUTH_SECRET="07dfb5646f7f44979d4e59232d0f31aa5a0756d57c423282f1005fb78adb52b4"

RESEND_API_KEY=re_ZALfCTLY_F4tQpAHPzbARgQ48tY8fhcdc

NEXT_PUBLIC_URL="https://savin-it.co.uk"
```


## 🛠 STEP 3. SETUP DATABASE TABLES 🛠 ##


Run the given commands in the terminal shell of your IDE:

```bash
npx prisma generate     # Generates the database client – CF. prisma/schema.prisma
npx prisma db push      # Updates the database schema – CF. prisma/schema.prisma
```

IF everything went ALRIGHT you should see a rocket emoji (🚀) after the second command was executed
and Seeding finished after the last command.

### IF NOT double check the correctness of your .env file; something's wrong there 🥲 ###

## STILL STUCK? – Check the links below. They will definitely help you get through! ##

### 🍏 MAC USERS 🍏 ###
Press CMD + Left Click on the HTML LINK

### 🖥️ PC USERS 🖥️ ###
Press CTRL + Left Click on the HTML LINK

- Database Provider 🗃️: [https://neon.tech/docs/guides/prisma]
- Email Service Provider 📧: [https://resend.com/docs/send-with-nextjs]
- Connection Strings 🛜:[https://www.prisma.io/docs/orm/reference/connection-urls]
- Prisma Schema and Environment Variables 🛂: [https://www.prisma.io/docs/orm/prisma-schema/overview#accessing-environment-variables-from-the-schema]



## 🛫 STEP 4. START THE WEB APP 🛫 ##


Run the given commands in the terminal shell of your IDE:
```bash
npm run dev
```
### 🍏 MAC USERS 🍏 ###
Press CMD + Left Click on [http://localhost:3000/]

### 🖥️ PC USERS 🖥️ ###
Press CTRL + Left Click on [http://localhost:3000/]



## 💫 STEP 5. ENJOY 💫 ##


Play around with different features and just like me start to Savin'IT😉



## 🧰 STEP 6. OTHERS 🧰 ##


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
