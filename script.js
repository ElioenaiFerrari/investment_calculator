/**
 * @typedef {Object} Req
 * @property {number} investment
 * @property {number} monthlyIncome
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
 * @property {number} totalDividend
 * @property {number} totalMonthlyInvestment
 * @property {number} total
 */

/**
 * Calculate investment predictions.
 *
 * @param {number} initialInvestment - Initial investment amount.
 * @param {number} monthlyInvestment - Monthly investment amount.
 * @param {number} monthlyIncome - Monthly income from the investment.
 * @param {number} months - Number of months to calculate.
 * @returns {Res} The result containing predictions, total dividend, and total amount.
 */
function calculateInvestment(
  initialInvestment,
  monthlyInvestment,
  monthlyIncome,
  months
) {
  const res = {
    predictions: [],
    totalDividend: 0.0,
    totalMonthlyInvestment: 0.0,
    total: 0.0,
  };

  for (let i = 0; i < months; i++) {
    const dividend = monthlyIncome * (initialInvestment + res.totalDividend);
    res.totalDividend += dividend;
    res.totalMonthlyInvestment += monthlyInvestment;

    const prediction = {
      month: i + 1,
      dividend: dividend,
      monthlyInvestment: monthlyInvestment,
      total: initialInvestment + res.totalDividend + res.totalMonthlyInvestment,
    };
    res.predictions.push(prediction);
  }

  res.total =
    initialInvestment + res.totalDividend + res.totalMonthlyInvestment;
  return res;
}
