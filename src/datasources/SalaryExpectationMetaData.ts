export const EXPECTED_SALARY_WITH_NO_BENEFITS = 100000;
export const MINIMUM_LIVABLE_SALARY = 50000;

export const STOCK_REDUCTION = 0.5;
export const TRAINING_ALLOWANCE = 0.9;
export const GENERAL_ALLOWANCES = 0.8;

// Numbers represent USD, e.g 8000 = $8,000usd
export const salaryExpectations = {
	fullyRemote: 6000,
	hybridRemote: 3000,
	flatHierarchy: 500,
	layoffFree: 2000,
	ethical: 2000,
	workLifeBalance: 3100,
	internationalTravel: 1000,
	stock: 0,
	trainingAllowances: 2000,
	otherAllowances: 2000,
	internationalRelocation: 15000,
};

// Country cost of living multipliers
export const countryScaler = {
	Nepal: 0.35,
	Romania: 0.45,
	Brazil: 0.5,
	Spain: 0.65,
	Japan: 0.7,
	Canada: 0.8,
	Germany: 0.95,
	Australia: 1,
	USA: 1.2,
	Switzerland: 1.3,
};
