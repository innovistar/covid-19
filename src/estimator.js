const covid19ImpactEstimator = (data) => {
   const impact = {};
   const severeimpact = {};
   const beds = (0.35 * data.totalHospitalBeds);
   const income = data.region.avgDailyIncomePopulation;
   if (data.periodType == 'weeks') {
     data.timeToElapse *= 7;
   }else if (data.periodType == 'months') {
     data.timeToElapse *= 30;
   }

  const days = data.timeToElapse;
  const factor = math.trunc(days /3);
  impact.currentlyInfected = data.reportedCases * 10
  severeimpact.currentlyInfected = data.reportedCases * 50
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;

  const severecases = severeimpact.severeCasesByRequestedTime;
  impact.hospitalbedsByRequestedTime = math.ceil(beds - impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = math.ceil(beds - severecases);

  impact.casesForICUByRequestedTime = 0.05 * impact.InfectionsByRequestedTime;
  severeimpact.casesForICUByRequestedTime = 0.05 * severeImpact.InfectionsByRequestedTime;

  impact.casesForVentilatorsByRequestedTime = 0.02 * impact.InfectionsByRequestedTime;
  severeimpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.InfectionsByRequestedTime;

  const severeInfectionsByRequestedTime =  severeImpact.InfectionsByRequestedTime;
  impact.dollarsFlight =  impact.infectionsByRequestedTime * income * population * days;
  severeImpact.dollarsFlight =  severeInfectionsByRequestedTime * income * population * days;

  return {
     data,
     impact,
     severeImpact
  };
};
export default covid19ImpactEstimator;
