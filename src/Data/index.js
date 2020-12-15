import faker from 'faker';
import moment from 'moment';
import _ from 'lodash';

const InsuranceData = ['Private', 'Medicare', 'Medicaid', 'OHIP', 'Out of province', 'Other insurance', 'No medical insurance'];


const today = moment().startOf('day');
const endOfDay = moment().endOf('day');

const firstDayOfYear = moment().startOf('year');
const lastDayOfYear = moment().endOf('year');

const firstDayOfMonth = moment().startOf('month');
const lastDayOfMonth = moment().endOf('month');

export function todayAppointment() {
  return moment(faker.date.between(today, endOfDay)).toISOString();
}

export function dayFromTo(olday = pastDayMoment(), someday = endOfDay) {
  return moment(faker.date.between(olday, someday)).toISOString();
}

export function futureDay() {
  return moment(faker.date.between(today, lastDayOfYear)).toISOString();
}
export function pastDay() {
  return moment(faker.date.between(today, firstDayOfYear)).toISOString();
}
export function pastDayMoment() {
  return moment(faker.date.between(today, firstDayOfYear));
}

export function futureThisMonthDay() {
  return moment(faker.date.between(today, lastDayOfMonth)).toISOString();
}
export function pastThisMonthDay() {
  return moment(faker.date.between(today, firstDayOfMonth)).toISOString();
}
export function pastDOB() {
  return moment(faker.date.between(moment().subtract(20, 'years'), moment().subtract(80, 'years'))).toISOString();
}

export const StopHCData = [
  {
    title: 'Deceased',
    content: '',
  },
  {
    title: 'Changed physicians',
    content: '',
  },
  {
    title: 'Moved',
    content: '',
  },
  {
    title: 'Ad hoc patient',
    content: '',
  },
  {
    title: 'Left reporting',
    content: '',
  },
  {
    title: "Didn't like the solution",
    content: '',
  },
  {
    title: 'Lost to follow up',
    content: '',
  },
  {
    title: 'Moved',
    content: '',
  },
  {
    title: 'Other',
    content: '',
  },
];

function fullName() {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}

function getFullName(firs, last) {
  return `${firs} ${last}`;
}

function fakeID() {
  return faker.random.uuid().slice(0, 7);
}

export function getRandom(n, min = 0) { return Math.floor(Math.random() * Math.floor(n) + min); }

function isDone() {
  return !!getRandom(2);
}
export const NotiStatusData = ['Reviewed', 'Sent', ''];

function notificationStatus() {
  return NotiStatusData[getRandom(3)];
}

const sexArr = ['Male', 'Female'];

const AppTableDataTemp = [];
for (let index = 0; index < 30; index += 1) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const dob = pastDOB();
  const age = today.diff(dob, 'years');
  const height = 1 + getRandom(6, 5) / 10; // m
  const weight = getRandom(90, 30); // kg
  const startDate = pastDay();
  const obj = {
    key: `${index}`,
    patientID: fakeID(),
    firstName,
    lastName,
    patientName: getFullName(firstName, lastName),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    medicalDoctor: fullName(),
    done: isDone(),
    sex: sexArr[getRandom(2)],
    age,
    dob,
    height,
    weight,
    bmi: weight / (height * height),
    insurance: InsuranceData[getRandom(7)],
    address: faker.address.streetAddress(),
    stopDate: dayFromTo(startDate),
    reasonForCompletion: StopHCData[getRandom(9, 0)].title,
    startDate,
    nextFollowUpDate: futureDay(),

    reportTime: pastDay(),
    notificationTime: pastDay(),
    time: futureDay(),
    reasonOfNotification: faker.commerce.productName(),

    md: fullName(),
    nurse: fullName(),
    dateOfService: pastDay(),
    status: notificationStatus(),
  };
  AppTableDataTemp.push(obj);
}

export const AppTableData = AppTableDataTemp;
export const AppTableHeader = ['Patient name', 'Phone number', 'Email', 'Medical doctor', 'Done'];
export const AppTableDataVar = ['patientName', 'phoneNumber', 'email', 'medicalDoctor', 'done'];

export const PNTableHeader = ['Patient ID', 'Patient name', 'Phone number', 'Email'];
export const PNTableDataVar = ['patientID', 'patientName', 'phoneNumber', 'email'];

export const PNAssignedTableHeader = ['Patient ID', 'Patient name', 'Phone number', 'Email', 'Medical doctor'];
export const PNAssignedTableDataVar = ['patientID', 'patientName', 'phoneNumber', 'email', 'medicalDoctor'];

export const PATableHeader = ['Patient ID', 'Patient name', 'Start date', 'Next follow-up date'];
export const PATableDataVar = ['patientID', 'patientName', 'startDate', 'nextFollowUpDate'];

export const PATableHeaderMD = ['Patient ID', 'Patient name', 'Start date', 'Phone number', 'Email', 'Nurse'];
export const PATableDataVarMD = ['patientID', 'patientName', 'startDate', 'phoneNumber', 'email', 'nurse'];

export const PInactiveTableHeader = ['Patient ID', 'Patient name', 'Stop date', 'Reason for completion'];
export const PInactiveTableDataVar = ['patientID', 'patientName', 'stopDate', 'reasonForCompletion'];

export const RNotiTableHeader = ['Notification time', 'Patient ID', 'Patient name', 'Reason of notification', 'Status'];
export const RNotiTableDataVar = ['notificationTime', 'patientID', 'patientName', 'reasonOfNotification', 'status'];

export const RNotiTableHeaderMD = ['Notification time', 'Report time', 'Patient ID', 'Patient name', 'Reason of notification', 'Status'];
export const RNotiTableDataVarMD = ['notificationTime', 'reportTime', 'patientID', 'patientName', 'reasonOfNotification', 'status'];

export const RNotiTableHeaderDetails = ['Time', 'Reason of notification', 'Status'];
export const RNotiTableDataVarDetails = ['time', 'reasonOfNotification', 'status'];

export const RNotiTableHeaderDetailsMD = ['Notification time', 'Report time', 'Reason of notification', 'Status'];
export const RNotiTableDataVarDetailsMD = ['notificationTime', 'reportTime', 'reasonOfNotification', 'status'];

export const RMonTableHeader = ['Date of service', 'Patient ID', 'Patient name', 'Status'];
export const RMonTableDataVar = ['dateOfService', 'patientID', 'patientName', 'status'];

export const RMonTableHeaderDetails = ['Date of service', 'Status'];
export const RMonTableDataVarDetails = ['dateOfService', 'status'];

export const PNTableHeaderMD = ['Patient ID', 'Patient name', 'Phone number', 'Email', 'Nurse'];
export const PNTableDataVarMD = ['patientID', 'patientName', 'phoneNumber', 'email', 'nurse'];


export const DefaultInputBaselineData = {
  HDLCholesterol: '1',
  afibConfirm: 'Bioflux',
  afibPattern: 'Persistent',
  age: 73,
  biofluxDiagnosisAttachment: [],
  biofluxDiagnosisTechComment: 'asdasdasd',
  biofluxDiagnosisInfo: 'asdas',
  bloodPressure: 'No',
  cha2ds2VascScore: [
    {
      value: 'Congestive heart failure', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Hypertension', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Age ≥ 75', isCheck: false, content: '', suffix: 2,
    },
    {
      value: 'Age 65-74', isCheck: true, content: '', suffix: 1,
    },
    {
      value: 'Diabetes mellitus', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Stroke/TIA/thrombo-embolism', isCheck: true, content: '', suffix: 2,
    },
    {
      value: 'Vascular disease', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Sex Female', isCheck: '', content: '', suffix: 1,
    },
  ],
  completeBloodCountAttachment: [],
  completeBloodCountDate: today,
  completeBloodCountSummary: '2sda',
  cvgRisk: 5.3,
  echocardiogramDate: today,
  echocardiogramLVEF: '12',
  ehraScore: {
    title: 'Moderate - 3',
    content: 'Normal daily activity not affected but patient troubled by symptoms',
  },
  exerciseStressTestingAttachment: [],
  exerciseStressTestingDate: today,
  exerciseStressTestingSummary: 'qwsde',
  gender: 'Female',
  hasbledClinical: [
    {
      value: 'Hypertension', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Abnormal liver function', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Abnormal renal function', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Stroke', isCheck: true, content: '', suffix: 1,
    },
    {
      value: 'Bleeding', isCheck: true, content: '', suffix: 1,
    },
    {
      value: 'Labile INRs', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Elderly (Age >65)', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Drugs', isCheck: '', content: '', suffix: 1,
    },
    {
      value: 'Alcohol', isCheck: '', content: '', suffix: 1,
    },
  ],
  heartRate: 55,
  heartValveIssue: 'Valvular Heart Disease',
  heartValveReplacement: [
    { value: 'Left', isCheck: true },
    { value: 'Right', isCheck: false },
  ],
  isEnsurePatientAge: true,
  isUsingBiofluxDiagnosisInfo: true,
  leadECGAttachment: [],
  leadECGDate: today,
  leadECGSummary: 'asd',
  liverFunctionTestAttachment: [],
  liverFunctionTestDate: today,
  liverFunctionTestSummary: 'asd',
  mitralValveStatus: 'Progressive mitral stenosis',
  myocardialInfarction: today,
  pastMedicalHistory: [
    {
      value: 'Hypertension', isCheck: '', content: '', suffix: '',
    },
    {
      value: 'Diabetes mellitus', isCheck: true, content: '', suffix: '',
    },
    {
      value: 'Myocardial infarction', isCheck: true, content: '', suffix: '',
    },
    {
      value: 'Stroke Transient Ischemic Attack (mini stroke)', isCheck: '', content: '', suffix: '',
    },
    {
      value: 'Congestive Heart Failure or LV Dysfunction', isCheck: true, content: '', suffix: '',
    },
    {
      value: 'Obesity', isCheck: '', content: '', suffix: '',
    },
    {
      value: 'Obstructive sleep apnea', isCheck: '', content: '', suffix: '',
    },
    {
      value: 'Cardiothoracic surgery', isCheck: '', content: '', suffix: '',
    },
    {
      value: 'Smoke', isCheck: true, content: '', suffix: '',
    },
    {
      value: 'Family history of AFib', isCheck: '', content: '', suffix: '',
    },
    {
      value: 'Others: input another option', isCheck: '', content: '', suffix: '',
    },
  ],
  risk: 'Low',
  smoker: 'No',
  step: 9,
  systolicBP: '3',
  totalCholesterol: '1',
  step7TotalScore: 9,
  step6TotalScore: 3,
  step9TotalScore: 3,
  type: 'INPUT',
  valvularHeartDisease: 'Valvular stenosis (narrowing)',
  hasbledClinicalFinalScore: 'Risk was 3.4% in one validation study (Lip 2011) and 1.02 bleeds per 100 patient-years in another validation study (Pisters 2010).\n\nAnticoagulation should be considered: Patient has a relatively low risk for major bleeding (~1/100 patient-years)',
  cha2ds2VascFinalScore: '2.2%',
};

export const NotiArrData = [
  {
    title: faker.commerce.productName(),
    content: faker.commerce.productName(),
    time: pastDay(),
    isRead: getRandom(2) === 1,
  },
  {
    title: faker.commerce.productName(),
    content: faker.commerce.productName(),
    time: pastDay(),
    isRead: getRandom(2) === 1,
  },
  {
    title: faker.commerce.productName(),
    content: faker.commerce.productName(),
    time: pastDay(),
    isRead: getRandom(2) === 1,
  },
  {
    title: faker.commerce.productName(),
    content: faker.commerce.productName(),
    time: pastDay(),
    isRead: getRandom(2) === 1,
  },
];

function getMediData(x = 1) {
  const temp = [];
  _.forEach(new Array(x), (y) => {
    temp.push(
      {
        medication: faker.commerce.productName(),
        quantity: getRandom(20, 1),
        timeToTake: _.range(1, 3, 1),
        notes: faker.commerce.productName(),
      },
    );
  });
  return temp;
}

function getPrescriptionData(x = 1) {
  const temp = [];
  _.forEach(new Array(x), (y) => {
    const date = pastDayMoment();
    temp.push(
      {
        date,
        stopDate: moment(faker.date.between(today, date)),
        data: getMediData(getRandom(5, 1)),
      },
    );
  });
  return temp;
}

export const PrescriptionTempData = getPrescriptionData(getRandom(5, 2));
