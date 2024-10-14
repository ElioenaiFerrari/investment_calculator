/**
 * @typedef {Object} Req
 * @property {number} investment
 * @property {number} monthly_income
 * @property {number} months
 */

/**
 * @typedef {Object} Prediction
 * @property {number} month
 * @property {number} dividend
 * @property {number} total
 */

/**
 * @typedef {Object} Res
 * @property {Prediction[]} predictions
 * @property {number} total_dividend
 * @property {number} total
 */

/**
 * Calculate investment predictions.
 *
 * @param {number} investment - Initial investment amount.
 * @param {number} monthly_income - Monthly income from the investment.
 * @param {number} months - Number of months to calculate.
 * @returns {Res} The result containing predictions, total dividend, and total amount.
 */
function calculateInvestment(investment, monthly_income, months) {
  const res = {
    predictions: [],
    total_dividend: 0.0,
    total: 0.0,
  };

  for (let i = 0; i < months; i++) {
    const dividend = monthly_income * (investment + res.total_dividend);
    res.total_dividend += dividend;

    const prediction = {
      month: i + 1,
      dividend: dividend,
      total: investment + res.total_dividend,
    };
    res.predictions.push(prediction);
  }

  res.total = investment + res.total_dividend;
  return res;
}
