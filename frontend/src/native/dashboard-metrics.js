export /* Portfolio measure glossary. Plain-language definitions are based on the
   approved financial-wellbeing measure dictionary supplied for the build. */
const EMPLOYER_METRIC_INFO = {
  execEmployeesEnrolled: {
    title: 'Employees enrolled',
    text: 'Headcount who have created an account on the platform.',
    formula: 'Count of registered user accounts for this employer.'
  },
  execCashflow: {
    title: 'Monthly cashflow restored',
    text: 'Total recurring rand saved per month across completed fixes.',
    formula: 'Sum of monthly premium or instalment reductions from completed credit-life, funeral and short-term fixes.'
  },
  execDebtIntervention: {
    title: 'Debt under active intervention',
    text: 'Arrears where a settlement or reduced-instalment arrangement has actually been sent. Prescribed-debt challenges and guidance-only cases are excluded.',
    formula: 'Sum of balances on accounts with a dispatched arrangement in the arrears journey.'
  },
  execPrescribed: {
    title: 'Prescribed debts challenged',
    text: 'Rand value or account count of debt flagged as potentially prescribed and formally contested.',
    formula: 'Sum of balances, or count of accounts, where a prescription challenge has been lodged.'
  },
  execBetterOff: {
    title: 'Employees better off',
    text: 'Unique employees who completed at least one fix with a concrete result. A person is counted once even if they completed more than one fix.',
    formula: 'Distinct employees with at least one completed outcome; guidance-only journeys are excluded.'
  },
  execSatisfaction: {
    title: 'Employee satisfaction',
    text: 'Average end-of-journey star rating given by employees.',
    formula: 'Mean of all post-journey ratings from 1 to 5.'
  },
  wellness: {
    title: 'Workforce Financial Wellness Score',
    text: 'A single score out of 100 that tracks workforce financial health and movement over time. It combines engagement, cashflow relief, debt risk and insurance efficiency.',
    formula: 'Engagement 20% + Cashflow relief 30% + Debt risk 30% + Insurance efficiency 20%.'
  },
  wellnessEngagement: {
    title: 'Engagement driver',
    text: 'Measures whether eligible employees are actually using the programme by starting a journey.',
    formula: 'Users who started a journey ÷ eligible employees × 100. Weight: 20%.'
  },
  wellnessCashflow: {
    title: 'Cashflow relief driver',
    text: 'Measures how much recurring monthly saving has already been unlocked against the monthly saving still achievable.',
    formula: 'Monthly savings unlocked ÷ monthly savings achievable × 100. Weight: 30%.'
  },
  wellnessDebt: {
    title: 'Debt risk driver',
    text: 'Measures the share of platform users in arrears, inverted so lower arrears produces a higher score.',
    formula: '100 − (platform users in arrears ÷ platform users × 100). Weight: 30%.'
  },
  wellnessInsurance: {
    title: 'Insurance efficiency driver',
    text: 'Measures how much identified wasteful or duplicate cover has already been fixed.',
    formula: 'Wasteful or duplicate cover fixed ÷ total wasteful or duplicate cover found × 100. Weight: 20%.'
  },
  takeUp: {
    title: 'Programme take-up',
    text: 'Share of the eligible workforce who have enrolled by creating an account on the platform.',
    formula: 'Enrolled employees ÷ eligible workforce × 100.'
  },
  engaged: {
    title: 'Actively engaged',
    text: 'Share of the eligible workforce who have started at least one product journey.',
    formula: 'Activated users ÷ eligible workforce × 100.'
  },
  saving: {
    title: 'Cash freed up / month',
    text: 'Total recurring monthly saving created by completed fixes.',
    formula: 'Sum of monthly reductions from completed credit-life, funeral and short-term fixes.'
  },
  rating: {
    title: 'Average experience rating',
    text: 'Average end-of-journey star rating, together with the number of ratings collected.',
    formula: 'Mean of post-journey ratings from 1 to 5.'
  },
  funnel: {
    title: 'Engagement funnel',
    text: 'Shows how employees move from eligibility through enrolment and activation to completing one or more fixes.',
    formula: 'Each stage is a distinct employee count; percentages are shown against the eligible workforce.'
  },
  funnelEligible: {
    title: 'Eligible',
    text: 'Everyone in the workforce the employer has switched on for the programme.',
    formula: 'Employer eligible headcount for the selected as-at date.'
  },
  funnelEnrolled: {
    title: 'Enrolled',
    text: 'Employees who joined the programme by creating an account.',
    formula: 'Count of registered user accounts.'
  },
  funnelActivated: {
    title: 'Activated',
    text: 'Employees who started at least one product journey.',
    formula: 'Distinct employees who began one or more journeys.'
  },
  funnelCompleted: {
    title: 'Completed a fix',
    text: 'Employees who finished at least one journey with a concrete result.',
    formula: 'Distinct employees with at least one completed journey.'
  },
  funnelMultiple: {
    title: 'Multiple fixes',
    text: 'Employees who completed two or more journeys.',
    formula: 'Distinct employees with at least two completed journeys.'
  },
  outcomes: {
    title: 'Financial problems resolved',
    text: 'Shows the number of completed fixes by journey type and the rand impact created by each type.',
    formula: 'Count completed journeys by type; value is the relevant monthly saving or balance challenged/under arrangement.'
  },
  valueMonthly: {
    title: 'Monthly cash freed up',
    text: 'Recurring monthly saving delivered by completed fixes, with the annualised equivalent.',
    formula: 'Sum of monthly reductions; annualised value = monthly amount × 12.'
  },
  valuePrescribed: {
    title: 'Prescribed debt challenged',
    text: 'Value and number of potentially prescribed debt accounts being contested.',
    formula: 'Sum of challenged balances and count of accounts with a lodged challenge.'
  },
  valueArrears: {
    title: 'Arrears under active intervention',
    text: 'Value and employee count where settlement or reduced-instalment arrangements have actually been sent.',
    formula: 'Sum of balances and distinct employees with a dispatched arrangement.'
  },
  valueAvgSaving: {
    title: 'Average saving per active employee',
    text: 'Average recurring monthly cashflow restored for each activated employee.',
    formula: 'Monthly cashflow restored ÷ activated employees.'
  },
  debtProfile: {
    title: 'Debt Pressure Profile',
    text: 'Shows arrears balances by credit type, with an optional drill-down by named creditor, account count, average balance and current status.',
    formula: 'Sum arrears balances by credit type; creditor view aggregates the same balances by creditor.'
  },
  stressBySite: {
    title: 'Stress index by site',
    text: 'A pressure score by site. Higher values mean greater financial stress, reflecting arrears incidence and debt load.',
    formula: 'Composite of arrears rate and average debt load among users at each site. Higher = more pressure.'
  },
  stressHighest: {
    title: 'Highest stress site',
    text: 'The site with the greatest financial pressure in the selected view.',
    formula: 'Site with the highest stress index.'
  },
  stressLowest: {
    title: 'Lowest stress site',
    text: 'The site with the lowest financial pressure in the selected view.',
    formula: 'Site with the lowest stress index.'
  },
  stressEngaged: {
    title: 'Most engaged site',
    text: 'The site with the strongest programme take-up.',
    formula: 'Site with the highest enrolled ÷ eligible headcount.'
  },
  stressIndebted: {
    title: 'Most indebted site',
    text: 'The site with the highest average unsecured debt exposure per user.',
    formula: 'Site with the highest average arrears balance per user.'
  },
  incomeReach: {
    title: 'Reach by income band',
    text: 'Shows which income bands the programme is reaching among activated employees.',
    formula: 'Activated employees grouped by payroll income band.'
  },
  ratingDistribution: {
    title: 'Average rating & distribution',
    text: 'Shows the mean employee rating and the spread of 1 to 5 star responses.',
    formula: 'Mean and frequency distribution of post-journey star ratings.'
  },
  fiveStarPct: {
    title: '5-star share',
    text: 'Share of post-journey ratings that received the highest 5-star rating.',
    formula: '5-star ratings ÷ all ratings × 100.'
  },
  nps: {
    title: 'Net Promoter Score',
    text: 'The balance between employees giving the highest rating and those giving a 1–3 rating.',
    formula: '% rating 5 − % ratings 1–3.'
  },
  debtStates: {
    title: 'How problem debt is being handled',
    text: 'Separates problem debt into active intervention, debt being challenged and guidance-only cases so the states are not overstated.',
    formula: 'Balances and employee counts are grouped by the current intervention state.'
  },
  debtActive: {
    title: 'Under active intervention',
    text: 'Arrears where a settlement or reduced-instalment arrangement has actually been sent.',
    formula: 'Balances and distinct employees where an arrangement has been dispatched.'
  },
  debtChallenged: {
    title: 'Being challenged',
    text: 'Potentially prescribed debt that is being formally contested.',
    formula: 'Balances and distinct employees with a lodged prescription challenge.'
  },
  debtGuided: {
    title: 'Self-managed via guidance',
    text: 'Employees who could not afford an arrangement and were educated on prescription so they can manage the account themselves. This is not counted as active intervention.',
    formula: 'Balances and distinct employees in the guidance-only state.'
  },
  prescription: {
    title: 'Prescribed debt recovery',
    text: 'Tracks potentially prescribed debt from identification through challenge and creditor outcome.',
    formula: 'Value challenged and status counts across identified → letter sent → creditor conceded → written off.'
  },
  prescriptionValue: {
    title: 'Value challenged',
    text: 'Total rand value of potentially prescribed debt that has been contested.',
    formula: 'Sum of challenged account balances.'
  },
  prescriptionWrittenOff: {
    title: 'Already written off',
    text: 'Value creditors have already conceded or confirmed as written off.',
    formula: 'Sum of balances confirmed written off.'
  },
  prescriptionAccounts: {
    title: 'Challenge accounts',
    text: 'Number of accounts included in the prescribed-debt challenge process.',
    formula: 'Count of challenge accounts in the selected view.'
  },
  riskSignals: {
    title: 'Financial Risk Signals',
    text: 'Counts employees showing specific exposures such as duplicate cover, arrears, possible prescribed debt, limited emergency resilience or over-insurance.',
    formula: 'Per signal: distinct users flagged by the diagnostic scan of their accounts or cover.'
  },
  opportunities: {
    title: 'Opportunities identified',
    text: 'Shows employees who appear eligible for a fix they have not yet completed, and the potential value associated with the next wave of action.',
    formula: 'Eligibility is based on diagnostic flags with no completed fix. Value is shown using the portal\'s configured opportunity method.'
  },
  opportunityValue: {
    title: 'Estimated additional value',
    text: 'Projected additional monthly and annual value associated with the identified next-wave opportunities.',
    formula: 'The displayed value follows the portal\'s current opportunity calculation for the selected employer and filters.'
  },
  referralRate: {
    title: 'Organic referral rate',
    text: 'Share of employees who completed a journey and then shared or referred the programme.',
    formula: 'Referral/share events relative to the relevant completed-user population.'
  },
  ewaEmployees: {
    title: 'Employees took up Early Wage Access',
    text: 'Number of unique employees who used Early Wage Access in the selected period.',
    formula: 'Distinct employees with finalised salary advances.'
  },
  ewaTotal: {
    title: 'Total advanced',
    text: 'Total rand value of finalised Early Wage Access drawdowns in the selected period.',
    formula: 'Sum of finalised advance amounts.'
  },
  ewaAverage: {
    title: 'Average advance',
    text: 'Average rand amount per finalised Early Wage Access drawdown.',
    formula: 'Total finalised advance value ÷ number of finalised advances.'
  },
  ewaFrequency: {
    title: 'Advances per employee',
    text: 'Average number of finalised Early Wage Access drawdowns per employee who used the service.',
    formula: 'Finalised advances ÷ unique employees with a finalised advance.'
  },
  ewaTrend: {
    title: 'Total advanced per month',
    text: 'Monthly trend in the total value of finalised Early Wage Access advances.',
    formula: 'Sum finalised advance amounts by advance month.'
  },
  chatTotal: {
    title: 'Total conversations',
    text: 'Number of chat conversations for this employer in the selected period.',
    formula: 'Count of chat sessions from the separate chat source.'
  },
  chatResolved: {
    title: 'Resolved in chat',
    text: 'Share of conversations closed without handing the employee to a person.',
    formula: 'Sessions resolved in chat ÷ all chat sessions × 100.'
  },
  chatFirstReply: {
    title: 'First reply time',
    text: 'Typical time to the first response across chat sessions.',
    formula: 'The source specification defines this as the median first-response time.'
  },
  chatSatisfaction: {
    title: 'Chat satisfaction',
    text: 'Average rating employees give after a chat.',
    formula: 'Mean post-chat rating from the separate chat source.'
  },
  chatByJourney: {
    title: 'Conversations by journey',
    text: 'Chat volume split across product journeys, with the available sentiment read.',
    formula: 'Chat sessions grouped by journey tag.'
  },
  chatTrending: {
    title: 'Trending questions',
    text: 'Specific employee questions that are appearing most often or rising in the selected period.',
    formula: 'Question text grouped/classified and compared period to period.'
  },
  chatThemes: {
    title: 'Chat themes',
    text: 'Groups employee questions into recurring themes so common concerns and objections are visible.',
    formula: 'Question/message text classified into themes by the separate chat system.'
  }
};
export const PORTFOLIO_METRIC_INFO = {
  employerClients: {
    title: 'Employer clients',
    text: 'The number of authorised employer clients currently included in this portfolio selection.',
    formula: 'Employees covered = the eligible workforce across the selected employers.'
  },
  takeUp: {
    title: 'Programme take-up',
    text: 'Share of the eligible workforce who have enrolled by creating an account on the platform.',
    formula: 'Enrolled employees ÷ eligible workforce × 100.'
  },
  engaged: {
    title: 'Actively engaged',
    text: 'Share of the eligible workforce who have started at least one product journey.',
    formula: 'Activated users ÷ eligible workforce × 100.'
  },
  wellness: {
    title: 'Financial Wellness Score',
    text: 'A single score out of 100 that tracks workforce financial health. It combines engagement, cashflow relief, debt risk and insurance efficiency.',
    formula: 'Default model: Engagement 20% + Cashflow 30% + Debt risk 30% + Insurance 20%.'
  },
  saving: {
    title: 'Cashflow restored / month',
    text: 'Total recurring rand saved per month across completed fixes such as credit life, funeral and short-term insurance journeys.',
    formula: 'Sum of monthly saving amounts from completed fixes.'
  },
  betterOff: {
    title: 'Employees better off',
    text: 'Unique employees who completed at least one journey with a concrete result. People are counted once even if they completed multiple fixes.',
    formula: 'Distinct employees with at least one completed outcome.'
  },
  oppValue: {
    title: 'Open opportunity / month',
    text: 'The current portal value of unresolved monthly premium identified for further action. It is an observed exposure value, not an assumed saving percentage.',
    formula: 'Sum of monthly premium on unresolved wasteful or duplicate policies currently under review.'
  },
  stress: {
    title: 'Financial stress index',
    text: 'A composite pressure indicator. Higher values mean greater financial stress, driven by arrears incidence and debt load.',
    formula: 'Portfolio uses the same arrears/debt pressure model as the employer dashboard. Lower is better.'
  },
  arrears: {
    title: 'Arrears %',
    text: 'Share of platform users whose debt is visible and who are currently in arrears.',
    formula: 'Users in arrears ÷ users with visible debt × 100. Lower is better.'
  },
  rating: {
    title: 'Average experience rating',
    text: 'Average end-of-journey star rating received from employees.',
    formula: 'Mean of post-journey ratings from 1 to 5.'
  },
  fiveStarPct: {
    title: '5-star share',
    text: 'Share of all post-journey ratings that received the highest 5-star rating.',
    formula: '5-star ratings ÷ all ratings × 100.'
  },
  nps: {
    title: 'Net Promoter Score',
    text: 'The balance between employees giving the highest rating and those giving a 1–3 rating.',
    formula: '% rating 5 − % ratings 1–3.'
  },
  measureGuide: {
    title: 'What these measures mean',
    text: 'Portfolio measures use the same dated source records and calculation rules as the corresponding employer dashboard metrics. Select employers to recalculate the portfolio cards, heatmap and league table for that subset.',
    formula: 'Missing source data is shown as unavailable and is excluded from averages/rankings rather than treated as zero.'
  }
};