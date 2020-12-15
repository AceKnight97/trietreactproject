import {
  StepData, GeneralInformationData, AfibHistoryData, QualitiOfLifeTitles,
} from './newPatientData';

const AppFlowActions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_COMPLETE: 'LOGIN_COMPLETE',

  GET_ALL_DATA_REQUEST: 'GET_ALL_DATA_REQUEST',
  GET_ALL_DATA_COMPLETE: 'GET_ALL_DATA_COMPLETE',

  RELOAD_PAGE_REQUEST: 'RELOAD_PAGE_REQUEST',

  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_COMPLETE: 'LOGOUT_COMPLETE',
};
export default AppFlowActions;

export const PNMenu = ['Registered', 'Assigned'];
export const AFIB_HISTORY = [
  'Afib diagnosed time',
  'How were you diagnosed with AFib',
  'Cardioversion',
  'Received electronic shocks',
  'Current symptoms',
  'Past medical history',
  'Medication used',
  'Medication using',
  'Hospitalized',
];
export const AFIB_INFORMATION = [
  'AFib confirmed via',
  'Pattern of AFib',
  'Heart valve status',
];
export const COMPLETE_BLOOD_COUNT = [
  'Date',
  'Summary',
  'Attachment',
];
export const LIVER_FUNCTION_TEST = [
  'Date',
  'Summary',
  'Attachment',
];
export const LEAD_ECG = [
  'Date',
  'Summary',
  'Attachment',
];
export const EXERCISE_STRESS_TESTING = [
  'Date',
  'Summary',
  'Attachment',
];
export const ECHOCARDIOGRAM = [
  'Date',
  'LVEF',
];
export const BIOFLUX_DIAGNOSIS = [
  'Diagnosis info',
  'Technician comments',
  'Attachment',
];
export const PAST_MEDICAL_CONDITIONS = [
  'Hypertension',
  'Diabetes mellitus',
  'Myocardial infarction',
];

export const MessageData = {
  ServerErr: 'A temporary server error has occurred. Please try again.',
  ExpiredText: 'Your login session has expired, please try again.',
  FailGenerate: 'Failed to generate serial numbers. Please try again.',
  SuccessGenerate: 'Generate serial number successfully.',
  InvalidCode: 'Invalid code provided, please request a code again.',
  InvalidCodeDisplay: 'Verification code is invalid. Please try again!',
  InvalidNewPassword: 'New password is invalid. Please try again!',
  PasswordNotMatch: 'The passwords do not match.\nPlease try again!',
  InvalidEx: 'The file could not be uploaded.\nOnly files with the following extensions are allowed: PNG, JPEG, JPG.',
  InvalidSize: 'Please enter a file with a valid file size no larger than 20MB.',
  IncorrectUsername: 'Incorrect username or password.',
  InvalidCurPas: 'Invalid current password. Please try again!',
  CodeMisMatch: 'CodeMismatchException',
  CreatedPartner: 'You have just created a new partner.',
  WrongEmailF: 'Email is wrong format!',
  WrongPhoneF: 'Phone is wrong format!',
  IncorrectEnterEmail: 'Incorrectly entered email!',
  InvalidEmail: 'Invalid email!',
  SendCodeToNewEmail: 'A verification code has been sent to your new email.',
  SuccessChangeEmail: 'Your email has been changed.',
  ErrSPAlready: 'Error: Service Partner already exist!',
  ErrSPAlreadyConverted: 'Service partner already exists!',
  Limit100: 'Please enter a value less than or equal to 100.',
  PassTooShort: 'That password is too short. Please make sure the password must be at least 8 characters.',
  PassUpperLower: 'The password includes the use of both upper-case and lower-case letters.',
  PassIncludesDigits: 'The password must include one or more numerical digits.',
  InvalidUserName: 'Invalid username!',
  TheSameEmail: 'New Email cannot be same as your old Email.',
  ExceededLimit: 'Attempt limit exceeded, please try after some time.',
  ExceededErr: 'InvalidParameterException',
  NoInternet: 'Could not connect to server. Please check your internet connection.',
  NoInternetErrCode: 'NetworkError',
  NotFoundUser: 'UserNotFoundException',
  NotVerifyEmailMes: 'Cannot reset password for the user as there is no registered/verified email or phone_number.',
  NotVeriNaviMes: 'is not verified. Do you want to verify this email?',
  NotFPMes: 'is not verified. Please go to your Account Settings and choose Change Email option for Email verification.',
  IsGoForVeri: 'Your email has been verified.',
  UpdateModelImgErr: 'Failed to update model image.',
  ChangeModelImgMsg: 'Model image has been changed successfully.',
  EmptyTableMes: 'There is no data to display',
};

export const NewPatientData = {
  StepData,
  GeneralInformationData,
  AfibHistoryData,
  QualitiOfLifeTitles,
};

export const EHRA_SCORE = [
  {
    title: 'None - 1',
    content: 'Normal daily activity discontinued',
  },
  {
    title: 'Mild - 2',
    content: 'Normal daily activity not affected; symptoms not troublesome to patient',
  },
  {
    title: 'Moderate - 3',
    content: 'Normal daily activity not affected but patient troubled by symptoms',
  },
  {
    title: 'Severe - 4',
    content: 'Normal daily activity affected',
  },
  {
    title: 'Disabling - 5',
    content: 'Normal daily activity discontinued',
  },
];

export const CHA2DS2VASCScoreData = [
  {
    value: 'Congestive heart failure',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Hypertension',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Age ≥ 75',
    isCheck: false,
    suffix: 2,
  },
  {
    value: 'Age 65-74',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Diabetes mellitus',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Stroke/TIA/thrombo-embolism',
    isCheck: false,
    suffix: 2,
  },
  {
    value: 'Vascular disease',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Sex Female',
    isCheck: false,
    suffix: 1,
  },
];
export const AdjustedStrokeRateData = ['0.0', 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 6.7, 15.2];

export const HASBLEDClinicalCharacteristicData = [
  {
    value: 'Hypertension',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Abnormal liver function',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Abnormal renal function',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Stroke',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Bleeding',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Labile INRs',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Elderly (Age >65)',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Drugs',
    isCheck: false,
    suffix: 1,
  },
  {
    value: 'Alcohol',
    isCheck: false,
    suffix: 1,
  },
];

export const BleedsPer100PatientYears = [
  `Risk was 0.9% in one validation study (Lip 2011) and 1.13 bleeds per 100 patient-years in another validation study (Pisters 2010).\n
Anticoagulation should be considered: Patient has a relatively low risk for major bleeding (~1/100 patient-years).`,

  `Risk was 3.4% in one validation study (Lip 2011) and 1.02 bleeds per 100 patient-years in another validation study (Pisters 2010).\n
Anticoagulation should be considered: Patient has a relatively low risk for major bleeding (~1/100 patient-years).`,

  `Risk was 4.1% in one validation study (Lip 2011) and 1.88 bleeds per 100 patient-years in another validation study (Pisters 2010).\n
Anticoagulation should be considered: Patient has a relatively low risk for major bleeding (~2/100 patient-years).`,

  `Risk was 5.8% in one validation study (Lip 2011) and 3.72 bleeds per 100 patient-years in another validation study (Pisters 2010).\n
Anticoagulation should be considered: Patient is at high risk for major bleeding.`,

  `Risk was 8.9% in one validation study (Lip 2011) and 8.7 bleeds per 100 patient-years in another validation study (Pisters 2010).\n
Anticoagulation should be considered: Patient is at high risk for major bleeding.`,

  `Risk was 9.1% in one validation study (Lip 2011) and 12.5 bleeds per 100 patient-years in another validation study (Pisters 2010).\n
Anticoagulation should be considered: Patient is at high risk for major bleeding.`,

  `Scores greater than 5 were too rare to determine risk, but are likely over 10%.
Alternatives to anticoagulation should be considered: Patient is at extremely high risk for major bleeding.`,

  `Scores greater than 5 were too rare to determine risk, but are likely over 10%.
Alternatives to anticoagulation should be considered: Patient is at extremely high risk for major bleeding.`,

  `Scores greater than 5 were too rare to determine risk, but are likely over 10%.
Alternatives to anticoagulation should be considered: Patient is at extremely high risk for major bleeding.`,

  `Scores greater than 5 were too rare to determine risk, but are likely over 10%.
Alternatives to anticoagulation should be considered: Patient is at extremely high risk for major bleeding.`,
];

export const AfibConfirmData = ['ECG', 'Holter', 'Bioflux'];
export const AfibPatternData = ['Paroxysmal', 'Persistent', 'Long-standing persistent', 'Permanent', 'Valvular'];
export const HeartValveIssuseData = ['No issue', 'Valvular Heart Disease', 'Heart vale replacement'];

export const ValvularHeartDiseaseData = [
  'Valvular stenosis (narrowing)',
  'Valvular prolapse (slipping out of place)',
  'Regurgitation (leaking)',
];
export const MitralValveStatusData = [
  'Normal', 'Progressive mitral stenosis', 'Severe mitral stenosis', 'Very severe mitral stenosis',
];

export const KEY_MEDICATION = 'f4b34cb4b9df55b5cde78387358edc32';
// export const URL_SEARCH_MEDICATION = 'https://api.drugbankplus.com/v1/us';
export const URL_SEARCH_MEDICATION = 'https://api-js.drugbank.com/v1/us';
