import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { arrayOf } from 'prop-types';
import { KEY_MEDICATION, URL_SEARCH_MEDICATION } from '../Constants';


export function isTheSameObj(objA = {}, objB = {}) {
  if (JSON.stringify(objA) !== JSON.stringify(objB)) {
    return false;
  }
  return true;
}

export function dateFormated(cell = '') {
  if (cell && moment(cell).isValid()) return moment(cell).format('MM/DD/YYYY');
  return '';
}

export function timeFormated(cell = '') {
  if (cell && moment(cell).isValid()) return moment(cell).format('MM/DD/YYYY, HH:mm:ss');
  return '';
}

export function removeitemFromArr(item = '', arr = []) {
  const array = [...arr]; // make a separate copy of the array
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
    return array;
  }
  return array;
}

export function isCheckOne(arr = []) {
  if (arr.length === 0) return true;
  const item = _.find(arr, x => x.isCheck);
  if (item) return true;
  return false;
}

export function isValidEmail(email = '') {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
}

export function getRealPhone(phone = '') {
  if (!phone) return '';
  const arr = [' ', '-', '(', ')', '_'];
  let res = phone;
  _.forEach(arr, (x) => { res = res.replaceAll(x, ''); });
  return res.length;
}

export function getStateData(info = {}) {
  if (_.isEmpty(info)) return {};
  // console.log('props: ', props);
  const tempObj = {};
  Object.keys(info).forEach((key) => {
    if (info[key] !== undefined && info[key] !== '') _.assign(tempObj, { [key]: info[key] });
  });
  // console.log('tempObj: ', tempObj);
  return { ...tempObj };
}

export function checkNoData(data = []) {
  if (data.length === 0 || data.includes('') || data.includes(null) || data.includes(undefined) || data.includes([])) return true;
  return false;
}

export function handleNormalRangeData(data = {}) {
  if (_.isEmpty(data)) return [];
  const {
    heartRateMin,
    heartRateMax,
    bloodPressureMin,
    bloodPressureMax,
    inrMin,
    inrMax,
    ehraScoreMin,
    ehraScoreMax,
    bloodPressureMinUnit,
    bloodPressureMaxUnit,
  } = data;
  const normalRangeArr = [
    {
      title: 'Heart rate',
      data: [`Min: ${heartRateMin} bpm`, `Max: ${heartRateMax} bpm`],
    },
    {
      title: 'Blood pressure',
      data: [`Min: ${bloodPressureMin}/${bloodPressureMinUnit} mmHg`, `Max: ${bloodPressureMax}/${bloodPressureMaxUnit} mmHg`],
    },
    {
      title: 'INR',
      data: [`Min: ${inrMin}`, `Max: ${inrMax}`],
    },
    {
      title: 'EHRA score',
      data: [`Min: ${ehraScoreMin}`, `Max: ${ehraScoreMax}`],
    },
  ];
  return normalRangeArr;
}

export function handleMediComplianceNotiData(data = {}) {
  if (_.isEmpty(data)) return [];
  const { mediNotiForNurse, mediNotiForMD } = data;
  const mediComplianceNotiArr = [
    {
      title: 'For nurse',
      data: `${mediNotiForNurse} hour${mediNotiForNurse > 1 ? 's' : ''}`,
    },
    {
      title: 'For MD',
      data: `${mediNotiForMD} hour${mediNotiForMD > 1 ? 's' : ''}`,
    },
  ];
  return mediComplianceNotiArr;
}

export function handleSymptomsData(data = {}) {
  if (_.isEmpty(data)) return [];
  const {
    increasingSOB, chestPain, abnormalBleeding, lightHeadedness, sleepDC,
  } = data;
  const symptomsArr = [
    {
      title: 'Increasing shortness of breath',
      data: `${increasingSOB} day${increasingSOB > 1 ? 's' : ''}`,
    },
    {
      title: 'Chest pain',
      data: `${chestPain} day${chestPain > 1 ? 's' : ''}`,
    },
    {
      title: 'Abnormal bleeding',
      data: `${abnormalBleeding} day${abnormalBleeding > 1 ? 's' : ''}`,
    },
    {
      title: 'Light headedness',
      data: `${lightHeadedness} day${lightHeadedness > 1 ? 's' : ''}`,
    },
    {
      title: 'Sleep disturbance changes',
      data: `${sleepDC} day${sleepDC > 1 ? 's' : ''}`,
    },
  ];
  return symptomsArr;
}

export function limitedText(title, limit = 30) {
  if (!title) return '';
  const len = title.length;
  if (len > limit) return `${title.substring(0, limit - 3)}...`;
  return title;
}

export function setMultipleCheckboxData(data = []) {
  if (data.length === 0) return [];
  const tempArr = [];
  _.forEach(data, (x) => {
    const obj = {
      value: x.value || '',
      isCheck: x.isCheck || '',
      content: x.content || '',
      suffix: x?.suffix || '',
    };
    tempArr.push(obj);
  });
  return tempArr;
}

export function getFRSAgeSex(age = 0, gender = 'Male') {
  if (gender === 'Male') {
    if (age <= 34) return 0;
    if (age >= 35 && age <= 39) return 2;
    if (age >= 40 && age <= 44) return 5;
    if (age >= 45 && age <= 49) return 7;
    if (age >= 50 && age <= 54) return 8;
    if (age >= 55 && age <= 59) return 10;
    if (age >= 60 && age <= 64) return 11;
    if (age >= 65 && age <= 59) return 12;
    if (age >= 70 && age <= 74) return 14;
    // if (age >= 75) return 15;
    return 15;
  }
  if (age <= 34) return 0;
  if (age >= 35 && age <= 39) return 2;
  if (age >= 40 && age <= 44) return 4;
  if (age >= 45 && age <= 49) return 5;
  if (age >= 50 && age <= 54) return 7;
  if (age >= 55 && age <= 59) return 8;
  if (age >= 60 && age <= 64) return 9;
  if (age >= 65 && age <= 59) return 10;
  if (age >= 70 && age <= 74) return 11;
  // if (age >= 75) return 12;
  return 12;
}

export function getHDLScore(HDLCholesterol = 0) {
  if (HDLCholesterol > 1.6) return -2;
  if (HDLCholesterol >= 1.3 && HDLCholesterol <= 1.6) return -1;
  if (HDLCholesterol >= 1.2 && HDLCholesterol <= 1.29) return 0;
  if (HDLCholesterol >= 0.9 && HDLCholesterol <= 1.19) return 1;
  // if (HDLCholesterol < 0.9) return 2;
  return 2;
}

export function getTotalCholesterol(totalCholesterol = 0, gender = 'Male') {
  if (totalCholesterol < 4.1) return 0;
  if (totalCholesterol >= 4.1 && totalCholesterol <= 5.19) return 1;
  if (gender === 'Male') {
    if (totalCholesterol >= 5.2 && totalCholesterol <= 6.19) return 2;
    if (totalCholesterol >= 6.2 && totalCholesterol <= 7.2) return 3;
    // if (HDLCholesterol > 7.2) return 2;
    return 4;
  }
  if (totalCholesterol >= 5.2 && totalCholesterol <= 6.19) return 3;
  if (totalCholesterol >= 6.2 && totalCholesterol <= 7.2) return 4;
  // if (HDLCholesterol > 7.2) return 5;
  return 5;
}

export function getSystolicBP(systolicBP = 0, bloodPressure = false, gender = 'Male') {
  if (gender === 'Male') {
    if (bloodPressure) {
      if (systolicBP < 120) return 0;
      if (systolicBP >= 120 && systolicBP <= 129) return 2;
      if (systolicBP >= 130 && systolicBP <= 139) return 3;
      if (systolicBP >= 140 && systolicBP <= 149) return 4;
      if (systolicBP >= 150 && systolicBP <= 159) return 4;
      // >= 160
      return 5;
    }
    if (systolicBP < 120) return -2;
    if (systolicBP >= 120 && systolicBP <= 129) return 0;
    if (systolicBP >= 130 && systolicBP <= 139) return 1;
    if (systolicBP >= 140 && systolicBP <= 149) return 2;
    if (systolicBP >= 150 && systolicBP <= 159) return -2;
    // >= 160
    return 3;
  }
  if (bloodPressure) {
    if (systolicBP < 120) return -1;
    if (systolicBP >= 120 && systolicBP <= 129) return 2;
    if (systolicBP >= 130 && systolicBP <= 139) return 3;
    if (systolicBP >= 140 && systolicBP <= 149) return 5;
    if (systolicBP >= 150 && systolicBP <= 159) return 6;
    // >= 160
    return 7;
  }
  if (systolicBP < 120) return -3;
  if (systolicBP >= 120 && systolicBP <= 129) return 0;
  if (systolicBP >= 130 && systolicBP <= 139) return 1;
  if (systolicBP >= 140 && systolicBP <= 149) return 2;
  if (systolicBP >= 150 && systolicBP <= 159) return 4;
  // >= 160
  return 5;
}

export function getSmokerScore(smoker = false, gender = 'Male') {
  if (gender === 'Male') {
    if (smoker) return 4;
    return 0;
  }
  if (smoker) return 3;
  return 0;
}

export function getStep9TotalScore(age = 0, gender = 'Male', smoker = false,
  totalCholesterol = 0, HDLCholesterol = 0, systolicBP = 0, bloodPressure = false) {
  console.log('gender, age, smoker,  totalCholesterol, HDLCholesterol, systolicBP, bloodPressure,: ',
    gender, age, smoker, totalCholesterol, HDLCholesterol, systolicBP, bloodPressure);

  const ageScore = getFRSAgeSex(age, gender);
  const totalChores = getTotalCholesterol(totalCholesterol, gender);
  const hdlScore = getHDLScore(HDLCholesterol);
  const sysScore = getSystolicBP(systolicBP, bloodPressure, gender);
  const smokeSocre = getSmokerScore(smoker, gender);

  const score = ageScore + totalChores + hdlScore + sysScore + smokeSocre;

  console.log('step 9 total: ', ageScore, totalChores, hdlScore, sysScore, smokeSocre);
  return score;
}
const CVGTotalPoints = _.range(-3, 22, 1);
const MaleCVDData = [
  '<1',
  1.1, 1.4, 1.6, 1.9, 2.3, 2.8, 3.3, 3.9, 4.7, 5.6, 6.7, 7.9, 9.4, 11.2, 13.3, 15.6, 18.4, 21.6, 25.3, 29.4,
  '>30', '>30', '>30', '>30'];
const FemaleCVDData = [
  '<1', '<1',
  1.0, 1.2, 1.5, 1.7, 2.0, 2.4, 2.8, 3.3, 3.9, 4.5, 5.3, 6.3, 7.3, 8.6, 10.0, 11.7, 13.7, 15.9, 18.51, 21.5, 24.8, 27.5,
  '>30'];
export function getCVGRisk(totalScore = 0, gender = 'Male') {
  // console.log('tempCVG: ', CVGTotalPoints, MaleCVDData, FemaleCVDData);
  console.log('totalScore, gender: ', totalScore, gender);
  let tempScore = totalScore;
  if (totalScore < -3) tempScore = -3;
  if (totalScore > 21) tempScore = 21;
  const item = _.findIndex(CVGTotalPoints, x => x === tempScore);
  console.log('item: ', item);
  if (item !== -1) {
    if (gender === 'Male') return MaleCVDData[item];
    return FemaleCVDData[item];
  }
  return '--';
}

export function getStep9HeartRate(totalScore = 0, gender = 'Male') {
  const x = totalScore;
  if (gender === 'Male') {
    if (x === 8) return 48;
    if (x < 8) {
      if (x <= 0) return '<30';
      if (x > 0 && x < 1) return 31;
      if (x === 1) return 32;
      if (x === 2) return 34;
      if (x === 3) return 36;
      if (x === 4) return 38;
      if (x > 4 && x < 5) return 39;
      if (x === 5) return 40;
      if (x === 6) return 42;
      if (x === 7) return 45;
    }
    if (x > 8) {
      if (x === 9) return 51;
      if (x === 10) return 54;
      if (x > 10 && x < 11) return 55;
      if (x === 11) return 57;
      if (x > 11 && x < 12) return 59;
      if (x === 12) return 60;
      if (x === 13) return 64;
      if (x === 14) return 68;
      if (x === 15) return 72;
      if (x > 15 && x < 16) return 73;
      if (x === 16) return 73;
      if (x > 16 && x < 17) return 79;
    }
    return '>80';
  }
  if (x === 8) return 51;
  if (x < 8) {
    if (x < 1) return '<30';
    if (x === 1) return 31;
    if (x > 1 && x < 2) return 32;
    if (x === 2) return 34;
    if (x === 3) return 36;
    if (x > 3 && x < 4) return 38;
    if (x === 4) return 39;
    if (x > 4 && x < 5) return 40;
    if (x === 5) return 42;
    if (x === 6) return 45;
    if (x === 7) return 48;
  }
  if (x > 8) {
    if (x > 8 && x < 9) return 54;
    if (x === 9) return 55;
    if (x > 9 && x < 10) return 57;
    if (x === 10) return 59;
    if (x > 10 && x < 11) return 60;
    if (x === 11) return 64;
    if (x === 12) return 68;
    if (x > 12 && x < 13) return 72;
    if (x === 13) return 73;
    if (x > 13 && x < 14) return 76;
    if (x === 14) return 79;
  }
  return '>80';
}

export function getStep9Risk(cvgRisk = 0) {
  if (cvgRisk >= 20) return 'High';
  if (cvgRisk >= 10 && cvgRisk < 20) return 'Intermediate';
  return 'Low';
}

export function getDateSummaryAttachment(date = undefined, summary = '', attachment = []) {
  const dataArr = [
    {
      title: 'Date',
      data: date,
    },
    {
      title: 'Summary',
      data: summary,
    },
    {
      title: 'Attachment',
      data: attachment,
      type: 'ATTACHMENT',
    },
  ];
  return dataArr;
}

export function getBiofluxInfo(info = '', comments = '', attachment = []) {
  const dataArr = [
    {
      title: 'Diagnosis info',
      data: info,
    },
    {
      title: 'Technician  comments',
      data: comments,
    },
    {
      title: 'Attachment',
      data: attachment,
      type: 'ATTACHMENT',
    },
  ];
  return dataArr;
}

export function getTestResult(summary = '', attachment = [], testTitle) {
  let dataArr;
  if (testTitle) {
    dataArr = [
      {
        title: 'Test title',
        data: testTitle,
      },
      {
        title: 'Summary',
        data: summary,
      },
      {
        title: 'Attachment',
        data: attachment,
        type: 'ATTACHMENT',
      },
    ];
  } else {
    dataArr = [
      {
        title: 'Summary',
        data: summary,
      },
      {
        title: 'Attachment',
        data: attachment,
        type: 'ATTACHMENT',
      },
    ];
  }
  return dataArr;
}

export function convertNewMedicationItemSearchForAll(arr = []) {
  const object = [];
  _.forEach(arr, (x) => {
    if (!_.find(object, d => (d.prescribableName === x.prescribable_name))) {
      object.push({
        name: x.prescribable_name,
        prescribableName: x.prescribable_name,
        dosageForm: x.dosage_form,
        strength: x.strength,
        productId: _.join(x.ndc_product_codes, ','),

        route: x.route,
        quantity: 1,
        frequency: 1,

        title: x.prescribable_name,
        dis: x.strength.number || x.strength.unit ? `${x.strength.number || ''}${x.strength.unit || ''}` : 'None',
      });
    }
  });
  return object;
}

export function convertNewMedicationItem(arr = []) {
  const object = [];
  _.forEach(arr, (x) => {
    if (!_.find(object, d => (d.prescribableName === x.prescribable_name && JSON.stringify(d.strength) === JSON.stringify(x.strength)))) {
      if (x?.strength && x?.strength.unit && !x?.strength.unit.includes('USP')) {
        object.push({
          name: x.name,
          prescribableName: x.prescribable_name,
          dosageForm: x.dosage_form,
          strength: x.strength,
          productId: _.join(x.ndc_product_codes, ','),

          route: x.route,
          quantity: 1,
          frequency: 1,

          title: x.prescribable_name,
          dis: x.strength.number || x.strength.unit ? `${x.strength.number || ''}${x.strength.unit || ''}` : '',
        });
      }
    }
  });
  return object;
}

export const fetchAPISearchMedication = (search = '') => {
  const url = `${URL_SEARCH_MEDICATION}/drug_names?q=${search}`;
  console.log('url', url);
  return axios.get(url, {
    headers: {
      Authorization: KEY_MEDICATION,
    },
  });
};

export async function getMedicalName(term = '') {
  try {
    const medical = await fetchAPISearchMedication(term);
    console.log('Search result: ', medical);
    const searchResult = convertNewMedicationItem(medical?.data?.products);
    console.log('searchResult: ', searchResult);
  } catch (error) {
    console.log('error', error);
  }
}

export function convertLoginData(loginData = {}) {
  const {
    // eslint-disable-next-line camelcase
    birthdate, email, email_verified, family_name, gender, given_name, role, sub, username,
  } = loginData?.user;
  const dob = moment(birthdate, 'YYYY-MM-DD').isValid() ? moment(birthdate, 'YYYY-MM-DD').format('MM/DD/YYYY') : undefined;
  const formatedData = {
    dob,
    email,
    isVerified: email_verified,
    gender,
    lastName: family_name,
    firstName: given_name,
    fullName: `${given_name} ${family_name}`,
    role,
    sub,
    username,
  };
  return formatedData;
}
