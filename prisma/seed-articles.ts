import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const articleData: Prisma.ArticleCreateInput[] = [
  //// BATCH 1

  // {
  //     title: "The Best Budgeting Methods: A Complete Guide",
  //     content: "A budget method sets out how an individual, company, or organization plans to spend money over a period of time...",
  //     category: "BUDGETING",
  //     author: "Courtney Luke",
  //     publishedAt: new Date("2020-12-29"),
  //     linkTo: "https://arrestyourdebt.com/best-budgeting-methods/",
  // },
  // {
  //     title: "The 5 Most Effective Budgeting Methods — and How to Use Them",
  //     content: "There's more than one way to budget. A strategy that works for one person might be a terrible match for another — and that's OK...",
  //     category: "BUDGETING",
  //     author: "Jennifer Taylor",
  //     publishedAt: new Date("2024-01-02"),
  //     linkTo: "https://finance.yahoo.com/news/5-most-effective-budgeting-methods-211044762.html",
  // },
  // {
  //     title: "Dave Ramsey Says Budgeting Is More Than Just Making a List of What You Can and Can't Afford — Here's How To Get Started",
  //     content: "The holidays are approaching and with it, the temptation to overspend on gifts, activities, and decorations...",
  //     category: "BUDGETING",
  //     author: "Cindy Lamothe",
  //     publishedAt: new Date("2023-11-27"),
  //     linkTo: "https://finance.yahoo.com/news/dave-ramsey-says-budgeting-more-150115532.html",
  // },
  // {
  //     title: "New 'loud budgeting' trend saving thousands: 7 Aussies share their hacks",
  //     content: "The Chancellor will unveil his Budget on Wednesday as the country battles a cost-of-living crisis and a stalling economy...",
  //     category: "BUDGETING",
  //     author: "Sarah Megginson",
  //     publishedAt: new Date("2023-03-24"),
  //     linkTo: "https://au.finance.yahoo.com/news/new-loud-budgeting-trend-saving-thousands-7-aussies-share-their-hacks-025237647.html",
  // },
  // {
  //     title: "How to budget: a simple guide",
  //     content: "Creating a budget might sound a bit tedious but, once you have got perspective on how much you can save, it can leave you with a sense of excitement about the future...",
  //     category: "BUDGETING",
  //     author: "Faith Archer",
  //     publishedAt: new Date("2023-12-12"),
  //     linkTo: "https://www.thetimes.co.uk/money-mentor/income-budgeting/how-to-budget/guide-budgeting",
  // },
  // {
  //     title: "No savings account? 6 reasons to open one ASAP",
  //     content: "While the vast majority of households have at least a checking account, many don't also have a dedicated savings account. They may tuck their savings away in their checking account, on prepaid debit cards, under a mattress — or not save at all..",
  //     category: "SAVING",
  //     author: "Stephanie Colestock",
  //     publishedAt: new Date("2024-03-20"),
  //     linkTo: "https://finance.yahoo.com/personal-finance/why-open-high-yield-savings-account-120754211.html",
  // },
  // {
  //     title: "Master your savings goals with these expert tips",
  //     content: "Vanguard Group data revealed that 3.6% of individuals tapped into their 401K savings in 2023 amid high inflation. Vanguard Senior Financial Advisor Mary Ryan joins Yahoo Finance Live to discuss managing financial emergencies and retirement planning...",
  //     category: "SAVING",
  //     author: "Rachelle Akuffo and Akiko Fujita",
  //     publishedAt: new Date("2024-03-12"),
  //     linkTo: "https://finance.yahoo.com/video/master-savings-goals-expert-tips-170432754.html",
  // },
  // {
  //     title: "With no savings, I'd follow Warren Buffett's number one rule to build wealth",
  //     content: "The idea of building wealth can seem like a bad joke without any savings to invest. But lots of successful investors have started from scratch by putting aside a small amount regularly to buy their first shares...",
  //     category: "SAVING",
  //     author: "Christopher Ruane",
  //     publishedAt: new Date("2024-04-13"),
  //     linkTo: "https://uk.finance.yahoo.com/news/no-savings-d-warren-buffett-152621274.html",
  // },
  // {
  //     title: "Best savings accounts that offer above inflation rates",
  //     content: "UK households are on the lookout for every little way to make their money go further amid the cost of living crisis, and savings accounts might help...",
  //     category: "SAVING",
  //     author: "Pedro Goncalves",
  //     publishedAt: new Date("2024-04-12"),
  //     linkTo: "https://uk.finance.yahoo.com/news/best-savings-accounts-above-inflation-rates-121921784.html",
  // },
  // {
  //     title: "How saving for retirement is changing in 2024",
  //     content: "Saving for retirement is getting a little easier in 2024 thanks to the phase-in of a handful of provisions stemming from the Secure 2.0 Act, which became law at the end of last year...",
  //     category: "SAVING",
  //     author: "Kerry Hannon",
  //     publishedAt: new Date("2023-12-28"),
  //     linkTo: "https://finance.yahoo.com/news/how-saving-for-retirement-is-changing-in-2024-234559803.html",
  // },
  // {
  //     title: "Investing for beginners: how to buy stocks and shares",
  //     content: "For anyone new to investing, the stock market can conjure up a frantic image: a mass of trading screens, flashing numbers and unfathomable jargon. It's about as far removed from the idea of stashing pocket money in a piggy bank as you can get...",
  //     category: "INVESTING",
  //     author: "Andrew Michael",
  //     publishedAt: new Date("2023-04-28"),
  //     linkTo: "https://uk.finance.yahoo.com/news/investing-beginners-buy-stocks-shares-130658449.html",
  // },
  // {
  //     title: "How to start investing in 2024: A step-by-step guide",
  //     content: "Investing in markets — stock, bond, and others — is a useful part of a long-term savings strategy. Deciding how and where to invest your money isn't difficult, but beginning investors should take the time to understand the different types of markets...",
  //     category: "INVESTING",
  //     author: "Sarah Li-Cain",
  //     publishedAt: new Date("2024-02-20"),
  //     linkTo: "https://finance.yahoo.com/personal-finance/how-to-start-investing-162530701.html",
  // },
  // {
  //     title: "5 popular investment strategies for beginners",
  //     content: "When you start investing on your own, the world of investing may seem wide, often too wide. But you can simplify things with some time-tested strategies. These popular investment choices can help you achieve a variety of financial goals, and help set you up for a lifetime of financial security...",
  //     category: "INVESTING",
  //     author: "James Royal, Ph.D.",
  //     publishedAt: new Date("2023-12-13"),
  //     linkTo: "https://finance.yahoo.com/news/5-popular-investment-strategies-beginners-202137837.html",
  // },
  // {
  //     title: "20 Best Investing Podcasts for Beginners on Spotify",
  //     content: "In this article, we will take a look at the 20 best investing podcasts for beginners on Spotify. If you want to skip our detailed analysis, you can go directly to 5 Best Investing Podcasts for Beginners on Spotify...",
  //     category: "INVESTING",
  //     author: "Maleha Afzal",
  //     publishedAt: new Date("2023-10-22"),
  //     linkTo: "https://finance.yahoo.com/news/20-best-investing-podcasts-beginners-202655649.html",
  // },
  // {
  //     title: "Investing For Beginners",
  //     content: "If you require any personal advice, please seek such advice from an independently qualified financial advisor. While we aim to feature some of the best products available, this does not include all available products from across the market...",
  //     category: "INVESTING",
  //     author: "Jo Thornhill and Kevin Pratt",
  //     publishedAt: new Date("2024-04-27"),
  //     linkTo: "https://www.forbes.com/uk/advisor/investing/investing-for-beginners/",
  // },
  // {
  //     title: "What is debt management?",
  //     content: "Although credit cards make purchases easy using borrowed credit, managing your debt and making timely payments isn't always as easy. If you're struggling with mounting unsecured debt, debt management...",
  //     category: "DEBT_MANAGEMENT",
  //     author: "Jennifer Calonia",
  //     publishedAt: new Date("2023-07-28"),
  //     linkTo: "https://finance.yahoo.com/news/debt-management-110007253.html",
  // },
  // {
  //     title: "I Was Drowning In Debt: Here's How I Turned My Finances Around",
  //     content: "Debt is a serious issue in the United States. According to a 2023 study by Northwestern Mutual, the “average American's personal debt exclusive of mortgages is $21,800...",
  //     category: "DEBT_MANAGEMENT",
  //     author: "Tina Nazerian",
  //     publishedAt: new Date("2023-11-12"),
  //     linkTo: "https://finance.yahoo.com/news/drowning-debt-turned-finances-around-130147251.html",
  // },
  // {
  //     title: "Feeling Overwhelmed With Debt? Here Are 14 Ways To Improve Your Financial Future",
  //     content: "Making the decision to get out of debt is the first step, but also the most difficult, said Cory Chapman, personal finance coach and CEO of EFC Wealth Management. Actually changing your mind and accepting that you need to make life changes...",
  //     category: "DEBT_MANAGEMENT",
  //     author: "Gabrielle Olya",
  //     publishedAt: new Date("2022-01-13"),
  //     linkTo: "https://finance.yahoo.com/news/feeling-overwhelmed-debt-14-ways-170001818.html",
  // },
  // {
  //     title: "Managing credit card debt under higher for longer interest rates",
  //     content: "Federal Reserve officials decided not to change interest rates in their March FOMC meeting, keeping rates higher for longer. While nine members of the Federal Reserve see at least three interest rate cuts by the end of the year...",
  //     category: "DEBT_MANAGEMENT",
  //     author: "Brad Smith",
  //     publishedAt: new Date("2024-03-25"),
  //     linkTo: "https://finance.yahoo.com/video/managing-credit-card-during-higher-162248124.html",
  // },
  // {
  //     title: "How to get out of debt: 10 tips for improving your finances",
  //     content: "Unfortunately, many people's finances have taken a hit during the COVID-19 pandemic and the true long-term effects on household wealth will take a while to become clear...",
  //     category: "DEBT_MANAGEMENT",
  //     author: "Phoebe Dampare Osei",
  //     publishedAt: new Date("2021-07-15"),
  //     linkTo: "https://news.yahoo.com/debt-help-money-personal-finances-tips-for-getting-out-of-debt-050037459.html",
  // },
  
  //// BATCH 2

// {
//   title: "Cryptocurrency Basics: Pros, Cons and How It Works",
//   content: "Cryptocurrency (or “crypto”) is a digital currency that can be used to buy goods and services or traded for a profit. Bitcoin is the most widely used cryptocurrency...",
//   category: "INVESTING",
//   author: "Andy Rosen",
//   publishedAt: new Date("2024-05-01"),
//   linkTo: "https://www.nerdwallet.com/article/investing/cryptocurrency",
// },
// {
//   title: "How To Invest in Cryptocurrencies: The Ultimate Beginners Guide",
//   content: "Cryptocurrencies are seeing a massive surge in popularity. While they used to attract a very niche audience just a few years ago, today, everyone and their grandmother wants to learn how to invest....",
//   category: "INVESTING",
//   author: "Matthew Baggetta",
//   publishedAt: new Date("2023-10-02"),
//   linkTo: "https://blockgeeks.com/guides/how-to-invest-in-cryptocurrencies/",
// },
// {
//   title: "Crypto Investing--A New Investor's Guide",
//   content: "By now everyone's heard of Bitcoin. It introduced the world to blockchain or distributed ledger technology and as a crypto asset, it is the center of the universe.  But bitcoin is hardly alone...",
//   category: "INVESTING",
//   author: "Steven Ehrlich",
//   publishedAt: new Date("2024-05-01"),
//   linkTo: "https://www.investing.co.uk/cryptocurrency",
// },
// {
//   title: "How to start investing in cryptocurrency: A guide for beginners",
//   content: "Cryptocurrencies are enormously volatile, but that volatility can create opportunities for profit if you're looking to trade these digital assets. Cryptos such as Bitcoin and Ethereum have risen a lot since their debut...",
//   category: "INVESTING",
//   author: "James Royal, Ph.D. & Brian Beers",
//   publishedAt: new Date("2024-04-21"),
//   linkTo: "https://www.bankrate.com/investing/how-to-invest-in-cryptocurrency-beginners-guide/",
// },
// {
//   title: "Cryptocurrency taxes: A guide to tax rules for Bitcoin, Ethereum and more",
//   content: "With the staggering rise and fall of some cryptocurrencies such as Bitcoin and Ethereum, crypto traders may have serious tax questions on their minds. The Internal Revenue Service (IRS) is stepping up enforcement efforts, and even those who hold the currency...",
//   category: "INVESTING",
//   author: "James Royal, Ph.D. & Brian Beers",
//   publishedAt: new Date("2024-04-27"),
//   linkTo: "https://www.bankrate.com/investing/crypto-taxes-guide-bitcoin-ethereum/",
// },
// {
//   title: "How To Invest In Exchange-Traded Funds (ETFs)",
//   content: "If you require any personal advice, please seek such advice from an independently qualified financial advisor. While we aim to feature some of the best products available, this does not include all available products from across the market...",
//   category: "INVESTING",
//   author: "Andrew Michael & Kevin Pratt",
//   publishedAt: new Date("2024-01-31"),
//   linkTo: "https://www.forbes.com/uk/advisor/investing/how-to-invest-in-etfs/",
// },
// {
//   title: "Investment Ideas For Your ISA Allowance",
//   content: "If you require any personal advice, please seek such advice from an independently qualified financial advisor. While we aim to feature some of the best products available, this does not include all available products from across the market...",
//   category: "INVESTING",
//   author: "Jop Thornhill & Kevin Pratt",
//   publishedAt: new Date("2024-04-30"),
//   linkTo: "https://www.forbes.com/uk/advisor/investing/investment-isa-allowance/",
// },
// {
//   title: "How To Buy US Stocks In The UK",
//   content: "If you require any personal advice, please seek such advice from an independently qualified financial advisor. While we aim to feature some of the best products available, this does not include all available products from across the market...",
//   category: "INVESTING",
//   author: "Andrew Michael & Kevin Pratt",
//   publishedAt: new Date("2024-04-26"),
//   linkTo: "https://www.forbes.com/uk/advisor/investing/buying-us-stocks-in-uk/",
// },

// {
//   title: "29 Ways to Be a Better Saver (Even If You're a Spender)",
//   content: "Money saving is a problem. In fact, it's a huge issue, source of stress, and lifelong goal of almost everyone at some point in their life. Once we have money, it's all about what to do with it...",
//   category: "SAVING",
//   author: "Logan Allec, CPA",
//   publishedAt: new Date("2022-08-10"),
//   linkTo: "https://moneydoneright.com/personal-finance/saving-and-budgeting/how-to-be-a-better-saver/",
// },
// {
//   title: "20 money saving tips you can use every day",
//   content: "The rising cost of food and energy bills means it's harder than ever to save money - our list of saving tips can help you spend less. Here are 20 easy money saving tips designed to slot into your daily life without too much effort...",
//   category: "SAVING",
//   author: "Georgie Frost",
//   publishedAt: new Date("2023-04-11"),
//   linkTo: "https://www.thetimes.co.uk/money-mentor/banking-saving/savings-accounts/ways-to-save-money",
// },
// {
//   title: "How To Save Money - Top Saving Tips",
//   content: "You can save money in all sorts of ways. You can put cash in a safe. You can simply mentally categorize a certain amount of money in your checking account as “savings.” But it's crucial to put savings in an account created...",
//   category: "SAVING",
//   author: "Lisa MacColl",
//   publishedAt: new Date("2023-05-30"),
//   linkTo: "https://www.wealthsimple.com/en-ca/learn/how-to-save-money",
// },
// {
//   title: "How to Save Money In College",
//   content: "College is often portrayed as “real life lite,” but the truth is that the decisions you make in college will affect you for years to come. This includes your financial choices. With all the tuition, student loans, expensive...",
//   category: "SAVING",
//   author: "Luisa Rollenhagen",
//   publishedAt: new Date("2018-11-05"),
//   linkTo: "https://www.wealthsimple.com/en-ca/learn/save-money-in-college#best_ways_to_save_money_in_college",
// },
// {
//   title: "13 tips and tricks to earn more interest on your savings",
//   content: "But it's still important to shop around for a decent return. There are plenty of things you can do to maximise your savings interest, from bagging government bonuses to keeping your savings local. Read on for our top tips...",
//   category: "SAVING",
//   author: "Danielle Richardson",
//   publishedAt: new Date("2021-12-31"),
//   linkTo: "https://www.which.co.uk/news/article/13-tips-and-tricks-to-earn-more-interest-on-your-savings-aBfnP6K3rqHG",
// },
// {
//   title: "7 things you didn't know about Isas",
//   content: "Ask a savvy saver what an Isa means to them and they'll probably mention the £20,000 tax-free allowance. But the limit - which many customers are rushing to max out before it renews on 6 April - isn't the only good reason...",
//   category: "SAVING",
//   author: "Matthew Jenkin",
//   publishedAt: new Date("2024-03-11"),
//   linkTo: "https://www.which.co.uk/news/article/things-you-didnt-know-about-isas-aP3oH3N7Ykig",
// },

// {
//   title: "Repaying your student loan - 5 things graduates need to know",
//   content: "This April, around 429,000 workers will start repaying their student loan for the first time since leaving university. Although the debt will be repaid automatically from your wages, repayment will only kick in if you earn enough to meet the earnings threshold...",
//   category: "DEBT_MANAGEMENT",
//   author: "Grace Witherden",
//   publishedAt: new Date("2024-04-06"),
//   linkTo: "https://www.which.co.uk/news/article/repaying-your-student-loan-things-graduates-need-to-know-aeGy40S93IZn",
// },
// {
//   title: "Student loan repayments - are you owed a refund?",
//   content: "More than 833,000 graduates could be due a refund on their student loan repayments for 2022-23, according to the latest figures from the Student Loans Company (SLC). The refunds apply to graduates who ended up being 'below threshold' in the last tax year...",
//   category: "DEBT_MANAGEMENT",
//   author: "Grace Witherden",
//   publishedAt: new Date("2023-11-06"),
//   linkTo: "https://www.which.co.uk/news/article/student-loan-repayments-are-you-owed-a-refund-a2hZb0V7SsBC",
// },
// {
//   title: "Mortgages explained",
//   content: "The majority of those looking to get on the property ladder will need to take out a mortgage to buy their home. Here is everything you need to know about the mortgage process and how to find the right deal for you...",
//   category: "DEBT_MANAGEMENT",
//   author: "Dan Base & Atousa Cunnell",
//   publishedAt: new Date("2021-12-11"),
//   linkTo: "https://www.money.co.uk/mortgages/a-complete-guide-to-mortgages",
// },
// {
//   title: "First-time buyer schemes in place of Help to Buy",
//   content: "While the Help to Buy equity loan scheme has closed, there are other initiatives like the mortgage guarantee scheme that may be able to help. House prices and mortgage rates have increased in recent years, making it harder for first-time buyers to get...",
//   category: "DEBT_MANAGEMENT",
//   author: "Esther Shaw",
//   publishedAt: new Date("2023-06-19"),
//   linkTo: "https://www.thetimes.co.uk/money-mentor/buying-home/first-time-buyer-schemes",
// },

// {
//   title: "How to plan a monthly budget",
//   content: "Budget planners are hard to draw up, and even harder to stick to. That's because life has a habit of throwing up unexpected challenges that don't fit into a spreadsheet column or banking app...",
//   category: "BUDGETING",
//   author: "Stephanie Lake",
//   publishedAt: new Date("2023-07-14"),
//   linkTo: "https://www.thetimes.co.uk/money-mentor/income-budgeting/how-to-budget/how-to-plan-a-monthly-budget",
// },
// {
//   title: "How to create a family budget and stick to it",
//   content: "Whether you are struggling to make ends meet, wanting to pay off debt or saving for the future, drawing up a family budget is the best way to manage your finances and achieve your goals...",
//   category: "BUDGETING",
//   author: "Jessica Bown",
//   publishedAt: new Date("2023-06-26"),
//   linkTo: "https://www.thetimes.co.uk/money-mentor/income-budgeting/family-finance/guide-creating-family-budget",
// },
// {
//   title: "22 hidden holiday costs and how to avoid them",
//   content: "Hidden holiday costs from card charges while abroad, to extra luggage and seat reservation fees, are making it harder to find cheap deals and budget while abroad...",
//   category: "BUDGETING",
//   author: "Georgie Frost",
//   publishedAt: new Date("2023-08-29"),
//   linkTo: "https://www.thetimes.co.uk/money-mentor/income-budgeting/cheapest-holiday-low-budget-tips-uk",
// },
];


async function main() {
  console.log(`Start seeding ...`);
  for (const data of articleData) {
    const article = await prisma.article.create({
      data,
    });
    console.log(`Created article with ID: ${article.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
