const convertToDays = (period, time) => {
  if (period === 'months') return (time * 30);
  if (period === 'weeks') return (time * 7);
  return time;
};

const calculateImpact = (currentlyInfected, data) => {
  const {
    periodType, timeToElapse, totalHospitalBeds
  } = data;
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = data.region;

  const elapseTime = convertToDays(periodType, timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** (Math.trunc(elapseTime / 3)));
  const severeCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  // eslint-disable-next-line max-len
  const hospitalBedsByRequestedTime = Math.trunc((0.35 * totalHospitalBeds) - severeCasesByRequestedTime);
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);
  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / elapseTime
  );

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const impact = calculateImpact((data.reportedCases * 10), data);
  const severeImpact = calculateImpact((data.reportedCases * 50), data);
  return { data, impact, severeImpact };
};

module.exports = covid19ImpactEstimator;
