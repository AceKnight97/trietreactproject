
export const StepData = [
  {
    title: 'General information',
    description: '',
  },
  {
    title: 'AFib history',
    description: '',
  },
  {
    title: 'Quality of life',
    description: '',
  },
];

// CREATE NEW PATIENT
const GenderData = [
  {
    title: 'Male',
    content: '',
  },
  {
    title: 'Female',
    content: '',
  },
];

const CountryData = ['United States', 'Canada'];

const HeightUnitData = ['meter', 'inch'];

const WeightUnitData = ['kg', 'lbs'];

const AddressSigns = {
  CitySign: 'locality',
  StateSign: 'administrative_area_level_1',
  CountrySign: 'country',
  PostCodeSign: 'postal_code',
};

const InsuranceData = [
  {
    title: 'Private',
    content: '',
  },
  {
    title: 'Medicare',
    content: '',
  },
  {
    title: 'Medicaid',
    content: '',
  },
  {
    title: 'OHIP',
    content: '',
  },
  {
    title: 'Out of province',
    content: '',
  },
  {
    title: 'Other insurance',
    content: '',
  },
  {
    title: 'No medical insurance',
    content: '',
  },
];

const AFibDurationQuestion = {
  afibDurationTitle: 'How long diagnosed with AFib?',
  afibDurationdata: [
    {
      title: 'Less than 6 months',
      content: '',
    },
    {
      title: 'From 6 to 12 months',
      content: '',
    },
    {
      title: 'From 12 to 24 months',
      content: '',
    },
    {
      title: 'More than 24 months',
      content: '',
    },
  ],
};

const AFibStatusQuestion = {
  afibStatusTitle: 'How were you diagnosed with atrial fibrillation?',
  afibStatusdata: [
    {
      title: 'Suspected',
      content: 'Explain somehow that atrial fibrillation was suspected by a healthcare practitioner and investigated',
    },
    {
      title: 'Found on routine examination',
      content: 'Explain that the patient was in atrial fibrillation when examined by a healthcare practitioner',
    },
  ],
};

const CardioversionQuestion = {
  cardioversionTitle: 'Have you ever had cardioversion?',
  cardioversiondata: [
    {
      title: 'Yes',
      content: '',
    },
    {
      title: 'No',
      content: '',
    },
  ],
};

const ElectricalShockQuestion = {
  electricalTitle: 'Have you ever received electrical shock to convert your rhythm back to normal?',
  electricaldata: [
    {
      title: 'Yes',
      content: '',
    },
    {
      title: 'No',
      content: '',
    },
  ],
};

const PalpitationsChildren = {
  title: 'Triggers of palpitation', // Palpitation triggers
  data: [
    {
      value: 'Alcohol',
      isCheck: false,
    },
    {
      value: 'Caffeine',
      isCheck: false,
    },
    {
      value: 'Decreased sleep',
      isCheck: false,
    },
    {
      value: 'Others: input another option',
      isCheck: false,
    },
  ],
};

const CurrentSymptomsQuestion = {
  currentSymptomsTitle: 'Current symptoms',
  currentSymptomsData: [
    {
      value: 'Palpitations',
      isCheck: false,
      content: 'A funny or irregular heartbeat',
    },
    {
      value: 'Light headedness',
      isCheck: false,
      content: 'Dizziness or unsteadiness',
    },
    {
      value: 'Fatigue',
      isCheck: false,
      content: 'More tired doing regular activities',
    },
    {
      value: 'Decreasing exercise capacity',
      isCheck: false,
      content: '',
    },
    {
      value: 'Dyspnea',
      isCheck: false,
      content: 'Are you experiencing increased shortness of breath?',
    },
    {
      value: 'Syncope',
      isCheck: false,
      content: 'Have you lost consciousness over the last 2 months?',
    },
    {
      value: 'Chest pain',
      isCheck: false,
      content: '',
    },
  ],
};

const PastMedicalHistorQuestion = {
  pastMedicalHistoryTitle: 'Past medical history',
  pastMedicalHistoryData: [
    {
      value: 'Hypertension',
      isCheck: false,
    },
    {
      value: 'Diabetes mellitus',
      isCheck: false,
    },
    {
      value: 'Myocardial infarction',
      isCheck: false,
    },
    {
      value: 'Stroke Transient Ischemic Attack (mini stroke)',
      isCheck: false,
    },
    {
      value: 'Congestive Heart Failure or LV Dysfunction',
      isCheck: false,
    },
    {
      value: 'Obesity',
      isCheck: false,
    },
    {
      value: 'Obstructive sleep apnea',
      isCheck: false,
    },
    {
      value: 'Cardiothoracic surgery',
      isCheck: false,
    },
    {
      value: 'Smoke',
      isCheck: false,
    },
    {
      value: 'Family history of AFib',
      isCheck: false,
    },
    {
      value: 'Others: input another option',
      isCheck: false,
    },
  ],
};

const MedicationsQuestion = {
  usedTitle: 'Type of medications used to manage AFib?',
  usedData: 'No medications',
  usedSelectData: ['A', 'B', 'C', 'D'],
  usedPlaceholder: 'Find a medicine',

  usingTitle: 'Type of medications using to manage AFib?',
  usingData: 'No medications',
  usingSelectData: ['A', 'B', 'C', 'D'],
  usingPlaceholder: 'Find a medicine',
};

const HospitalizedQuestion = {
  hospitalizedTitle: 'Have you ever been hospitalized because of your atrial fibrillation?',
  hospitalizeddata: [
    {
      title: 'Yes',
      content: '',
    },
    {
      title: 'No',
      content: '',
    },
  ],
};

const ImageOfECGQuestion = {
  imgOETitle: 'Image of ECG',
  imgOEPlaceholder: 'Click or drag files to this area to upload',
};

export const GeneralInformationData = {
  GenderData,
  CountryData,
  HeightUnitData,
  WeightUnitData,
  AddressSigns,
  InsuranceData,
};

export const AfibHistoryData = {
  AFibDurationQuestion,
  AFibStatusQuestion,
  CardioversionQuestion,
  ElectricalShockQuestion,
  CurrentSymptomsQuestion,
  PastMedicalHistorQuestion,
  MedicationsQuestion,
  HospitalizedQuestion,
  ImageOfECGQuestion,
  PalpitationsChildren,
  OtherOption: 'Others: input another option',
  Palpitations: 'Palpitations',
  Myocardial: 'Myocardial infarction',
};

export const QualitiOfLifeData = [
  {
    title: 'Physical functioning (%)',
    value: '',
  },
  {
    title: 'Role limitations due to physical health (%)',
    value: '',
  },
  {
    title: 'Role limitations due to emotional problems (%)',
    value: '',
  },
  {
    title: 'Energy/fatigue (%)',
    value: '',
  },
  {
    title: 'Emotional well-being (%)',
    value: '',
  },
  {
    title: 'Social functioning (%)',
    value: '',
  },
  {
    title: 'Pain (%)',
    value: '',
  },
  {
    title: 'General health (%)',
    value: '',
  },
];

export const QualitiOfLifeTitles = [
  'Physical functioning (%)',
  'Role limitations due to physical health (%)',
  'Role limitations due to emotional problems (%)',
  'Energy/fatigue (%)',
  'Emotional well-being (%)',
  'Social functioning (%)',
  'Pain (%)',
  'General health (%)',
];
