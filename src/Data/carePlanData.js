
import faker from 'faker';
import moment from 'moment';

export const carePlanFakeData = {
  // overview: {
  //   patientEducation: 'App access given',
  //   requiredEP: [
  //     {
  //       value: 'Blood pressure cuff',
  //       isCheck: true,
  //     },
  //     {
  //       value: 'Oxygen saturation',
  //       isCheck: true,
  //     },
  //     {
  //       value: 'Weight scale',
  //       isCheck: false,
  //     },
  //   ],
  //   bloodFrequency: '1',
  //   bloodFrequencyUnit: 'per month',
  //   bloodTheNextDate: moment(),
  //   testType: ['Liver function testing', 'Creatinine'],
  //   stressFrequency: '2',
  //   stressFrequencyUnit: 'per month',
  //   stressTheNextDate: moment(),
  //   schedule: 'Monthly',
  //   notes: 'Nullam ut rhoncus nisl, nec rutrum ante. Sed consequat tincidunt mauris eu porttitor. Aenean nec sem tempus, pretium urna ut, gravida dolor. Aenean quis lacinia nulla, in bibendum leo.',
  // },
};

export const patientEducationData = [
  'Printed materials given',
  'App access given',
  'Online education booked',
];
export const FrequencyUnitsData = [
  'per month',
  'per 2 months',
  'per 3 months',
];
export const RequiedEPData = [
  {
    value: 'Blood pressure cuff',
    isCheck: false,
  },
  {
    value: 'Oxygen saturation',
    isCheck: false,
  },
  {
    value: 'Weight scale',
    isCheck: false,
  },
];
export const TestTypeData = [
  'CBC',
  'INR',
  'TSH',
  'Creatinine',
  'Liver function testing',
  'Fasting Blood Sugar',
  'Lipid profile',
];
export const ScheduleData = [
  {
    title: 'Weekly',
    content: '',
  },
  {
    title: 'Bi-weekly',
    content: '',
  },
  {
    title: 'Monthly',
    content: '',
  },
  // {
  //   title: 'Other',
  //   content: '',
  // },
];

const NormalRangeData = [
  'Heart rate min',
  'Blood pressure min',
  'INR min',
  'EHRA score min',

  'Heart rate max',
  'Blood pressure max',
  'INR max',
  'EHRA score max',
];
// const leftCol = [heartRateMin, bloodPressureMin, inrMin, ehraScoreMin];
// const rightCol = [heartRateMax, bloodPressureMax, inrMax, ehraScoreMax];

const leftKey = ['heartRateMin', 'bloodPressureMin', 'inrMin', 'ehraScoreMin'];
const rightKey = ['heartRateMax', 'bloodPressureMax', 'inrMax', 'ehraScoreMax'];

// const MonthlyRPData = [
//   {
//     value: 'Monthly report access for nurse',
//     isCheck: true,
//   },
// ];

// const NormalRangeData = [
//   {
//     title: 'Heart rate',
//     data: ['Min: 60 bpm', 'Max: 120 bpm'],
//   },
//   {
//     title: 'Blood pressure',
//     data: ['Min: 100/65 mmHg', 'Max: 120/80 mmHg'],
//   },
//   {
//     title: 'INR',
//     data: ['Min: 0', 'Max: 1.1'],
//   },
//   {
//     title: 'EHRA score',
//     data: ['Min: 1', 'Max: 3'],
//   },
// ];
// const MediComplianceNotiData = [
//   {
//     title: 'For nurse',
//     data: '48 hours',
//   },
//   {
//     title: 'For MD',
//     data: '72 hours',
//   },
// ];
// const SymptomsData = [
//   {
//     title: 'Increasing shortness of breath',
//     data: '1 day',
//   },
//   {
//     title: 'Chest pain',
//     data: '1 day',
//   },
//   {
//     title: 'Abnormal bleeding',
//     data: '1 day',
//   },
//   {
//     title: 'Light headedness',
//     data: '1 day',
//   },
//   {
//     title: 'Sleep disturbance changes',
//     data: '1 day',
//   },
// ];

export const ReportSettingsDefaultData = {
  isMonthlyRA: true,
  // NORMAL RANGE
  heartRateMin: '60',
  heartRateMax: '120',
  bloodPressureMin: '90',
  bloodPressureMax: '120',
  inrMin: '2',
  inrMax: '3',
  ehraScoreMin: '3',
  ehraScoreMax: '5',
  // MEDICATION COMPLIANCE NOTIFICATIONS
  mediNotiForNurse: '48',
  mediNotiForMD: '72',

  bloodPressureMinUnit: '60',
  bloodPressureMaxUnit: '80',
  // SYMPTOMS
  increasingSOB: '2',
  chestPain: '1',
  abnormalBleeding: '1',
  lightHeadedness: '2',
  sleepDC: '5',
};
