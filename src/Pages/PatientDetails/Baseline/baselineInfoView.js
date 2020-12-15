import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { Title, Divider } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';
import {
  // AFIB_INFORMATION,
  // COMPLETE_BLOOD_COUNT,
  // LIVER_FUNCTION_TEST,
  // LEAD_ECG,
  // EXERCISE_STRESS_TESTING,
  // ECHOCARDIOGRAM,
  // BIOFLUX_DIAGNOSIS,
  // PAST_MEDICAL_CONDITIONS,
  // AfibConfirmData, AfibPatternData, , ValvularHeartDiseaseData, MitralValveStatusData,
  NewPatientData, HeartValveIssuseData,
} from '../../../Constants/index';
import { getDateSummaryAttachment, getBiofluxInfo } from '../../../Ultis';
import { getRandom } from '../../../Data';
// import InfoTable from '../../../Components/InfoTable';
// import noDocumentIc from '../../../Image/Pages/PatientDetails/no-document-ic.svg';
import { useMergeState } from '../../../Helpers/customHooks';
import QOLChart from '../../../Components/QualityOfLifeChart/qolChart';
import ScoringTable from '../../../Components/InfoTable/scoringTable';
import DisplayData2 from '../../../Components/UI/displayData2';
import AFIBInformation from '../../../Components/Form/afibInformation';
import InputBaselineInfoStep2 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep2';
import InputBaselineInfoStep3 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep3';
import BiofluxDiagnosis from '../../../Components/Form/biofluxDiagnosis';
import PastMedicalConditions from '../../../Components/Form/pastMedicalConditions';
import InputBaselineInfoStep6 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep6';
import InputBaselineInfoStep7 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep7';
import InputBaselineInfoStep8 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep8';
import InputBaselineInfoStep9 from '../../../Components/InputBaselineInfo/inputBaselineInfoStep9';


const { OtherOption, Myocardial } = NewPatientData.AfibHistoryData;

const BaselineInfoView = (props) => {
  const [state, setState] = useMergeState({
    afibInfoData: [],
    cbcInfoData: [],
    lftInfoData: [],
    biofluxInfoData: [],
    editKey: '',
  });
  const defProps = { isStrip: true, leftWidth: 3, isEditable: true };

  const { fetchData, className, baselineInformation } = props;

  console.log('View Data: baselineInformation: ', baselineInformation);

  const {
    afibConfirm, afibPattern, heartValveIssue, valvularHeartDisease, heartValveReplacement, mitralValveStatus,
    // step2
    completeBloodCountDate, liverFunctionTestDate, leadECGDate,
    completeBloodCountSummary, liverFunctionTestSummary, leadECGSummary,
    completeBloodCountAttachment, liverFunctionTestAttachment, leadECGAttachment,
    // step3
    exerciseStressTestingDate, exerciseStressTestingSummary, exerciseStressTestingAttachment,
    echocardiogramDate, echocardiogramLVEF,
    // step4
    isUsingBiofluxDiagnosisInfo,
    biofluxDiagnosisTechComment, biofluxDiagnosisInfo, biofluxDiagnosisAttachment,
    // step 5
    pastMedicalHistory, pastMedicalOther, myocardialInfarction,
    // step 6
    cha2ds2VascFinalScore, step6TotalScore, cha2ds2VascScore,
    // step 7
    hasbledClinicalFinalScore, step7TotalScore, hasbledClinical,
    // step 8
    ehraScore,
    // step 9
    isEnsurePatientAge, gender, age, smoker,
    totalCholesterol, HDLCholesterol, systolicBP, bloodPressure,
    step9TotalScore, cvgRisk, heartRate, risk,
  } = baselineInformation;

  const getHeartStatus = () => {
    switch (heartValveIssue) {
      case HeartValveIssuseData[0]:
        return heartValveIssue;
      case HeartValveIssuseData[1]:
        return `${HeartValveIssuseData[1]}: ${valvularHeartDisease}`;
      case HeartValveIssuseData[2]: {
        const tempArr = [];
        _.forEach(heartValveReplacement, (x) => { if (x.isCheck) tempArr.push(x.value); });
        const firstLine = `${HeartValveIssuseData[2]}: ${tempArr.join(', ')}`;
        const secondLine = `Mitral valve status: ${mitralValveStatus}`;
        return `${firstLine}\n${secondLine}`;
      }
      default:
        return heartValveIssue;
    }
  };

  const getAfib = () => {
    const AFibInfoData = [
      {
        title: 'AFib confirmed via',
        data: afibConfirm,
      },
      {
        title: 'Pattern of AFib',
        data: afibPattern,
      },
      {
        title: 'Heart valve status',
        data: getHeartStatus(),
      },
    ];
    return AFibInfoData;
  };

  const getPMCData = (arr = [], pastOther = '', myocar = '') => {
    const dataArr = [];
    _.forEach(arr, (x) => {
      if (x.isCheck) {
        if (x.value === OtherOption) dataArr.push({ title: `${x.value} (${pastOther})` });
        else if (x.value === Myocardial) dataArr.push({ title: `${x.value} (${moment(myocar).format('MMM DD, YYYY')})` });
        else dataArr.push({ title: x.value });
      }
    });
    return dataArr;
  };

  useEffect(() => {
    const afibInfoData = getAfib();
    const cbcInfoData = getDateSummaryAttachment(completeBloodCountDate, completeBloodCountSummary, completeBloodCountAttachment);
    const lftInfoData = getDateSummaryAttachment(liverFunctionTestDate, liverFunctionTestSummary, liverFunctionTestAttachment);
    const leadECGInfoData = getDateSummaryAttachment(leadECGDate, leadECGSummary, leadECGAttachment);
    const estInfoData = getDateSummaryAttachment(exerciseStressTestingDate, exerciseStressTestingSummary, exerciseStressTestingAttachment);
    const biofluxInfoData = isUsingBiofluxDiagnosisInfo ? getBiofluxInfo(biofluxDiagnosisInfo, biofluxDiagnosisTechComment, biofluxDiagnosisAttachment) : [];
    const pmcInfoData = getPMCData(pastMedicalHistory, pastMedicalOther, myocardialInfarction);
    setState({
      afibInfoData, cbcInfoData, lftInfoData, leadECGInfoData, estInfoData, biofluxInfoData, pmcInfoData,
    });
  }, [props.baselineInformation]);

  const {
    editKey, afibInfoData, cbcInfoData, lftInfoData, leadECGInfoData, estInfoData, biofluxInfoData, pmcInfoData,
  } = state;

  const allEditKeys = {
    Afib: 'AFib information',
    CBloodCount: 'Complete blood count',
    LFunctionTest: 'Liver function test',
    LECG: '12-lead ECG',
    EStressTesting: 'Exercise stress testing',
    Echocar: 'Echocardiogram',
    BDiagnosis: 'Bioflux diagnosis',
    pMedicalConditions: 'Past medical conditions',
    indexNames: ['ChA2DS2-VASc', 'HAS-BLED', 'EHRA', 'FRS'],
  };
  const {
    Afib, CBloodCount, LFunctionTest, LECG,
    EStressTesting, Echocar,
    BDiagnosis,
    pMedicalConditions,
    indexNames,
  } = allEditKeys;

  const data1Arr = [
    {
      title: Afib,
      data: afibInfoData,
    },
    {
      title: CBloodCount,
      data: cbcInfoData,
    },
    {
      title: LFunctionTest,
      data: lftInfoData,
    },
    {
      title: LECG,
      data: leadECGInfoData,
    },
  ];

  const data2Arr = [
    {
      title: EStressTesting,
      data: estInfoData,
    },
    {
      title: Echocar,
      data: [
        {
          title: 'Date',
          data: echocardiogramDate,
        },
        {
          title: 'LVEF',
          data: echocardiogramLVEF,
          type: '%',
        },
      ],
    },
  ];

  const tableDataSource = {
    // step 6
    cha2ds2VascFinalScore,
    step6TotalScore,
    // step 7
    hasbledClinicalFinalScore,
    step7TotalScore,
    // step 8
    ehraScore,
    // step 9
    step9TotalScore,
    cvgRisk,
    heartRate,
    risk,
  };

  const onClickSave = (info = {}) => {
    console.log('onClickSave: ', info);
    if (_.isEmpty(info)) {
      setState({ editKey: '' });
      return;
    }
    fetchData('baselineInformation', { ...baselineInformation, ...info });
    setState({ editKey: '' });
  };

  const renderStepEdit = () => {
    let compo = null;
    let title = 'Edit AFib information';
    const type = 'EDIT';
    console.log('editKey: ', editKey);
    // Afib, CBloodCount, LFunctionTest, LECG,
    switch (editKey) {
      case Afib:
        title = 'Edit AFib information';
        compo = (
          <AFIBInformation
            data={{
              afibConfirm,
              afibPattern,
              heartValveIssue,
              valvularHeartDisease,
              heartValveReplacement,
              mitralValveStatus,
            }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      case CBloodCount:
      case LFunctionTest:
      case LECG:
        title = `Edit ${editKey}`;
        compo = (
          <InputBaselineInfoStep2
            data={{
              completeBloodCountDate,
              liverFunctionTestDate,
              leadECGDate,
              completeBloodCountSummary,
              liverFunctionTestSummary,
              leadECGSummary,
              completeBloodCountAttachment,
              liverFunctionTestAttachment,
              leadECGAttachment,
            }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
            Step2Titles={[
              editKey === CBloodCount ? CBloodCount : '',
              editKey === LFunctionTest ? LFunctionTest : '',
              editKey === LECG ? LECG : '',
            ]}
          />
        );
        break;
      case EStressTesting:
      case Echocar:
        title = `Edit ${editKey}`;
        compo = (
          <InputBaselineInfoStep3
            data={{
              exerciseStressTestingDate,
              exerciseStressTestingSummary,
              exerciseStressTestingAttachment,
              echocardiogramDate,
              echocardiogramLVEF,
            }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
            Step3Titles={[
              editKey === EStressTesting ? EStressTesting : '',
              editKey === Echocar ? Echocar : '',
            ]}
          />
        );
        break;
      case BDiagnosis:
        title = 'Edit Bioflux diagnosis';
        compo = (
          <BiofluxDiagnosis
            data={{
              isUsingBiofluxDiagnosisInfo,
              biofluxDiagnosisTechComment,
              biofluxDiagnosisInfo,
              biofluxDiagnosisAttachment,
            }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      case pMedicalConditions:
        title = 'Edit past medical conditions';
        compo = (
          <PastMedicalConditions
            data={{ pastMedicalHistory, pastMedicalOther, myocardialInfarction }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      case indexNames[0]:
        title = 'Edit CHA2DS2-VASc score';
        compo = (
          <InputBaselineInfoStep6
            data={{ cha2ds2VascFinalScore, step6TotalScore, cha2ds2VascScore }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      case indexNames[1]:
        title = 'Edit HAS-BLED clinical characteristic';
        compo = (
          <InputBaselineInfoStep7
            data={{ hasbledClinicalFinalScore, step7TotalScore, hasbledClinical }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      case indexNames[2]:
        title = 'Edit EHRA score';
        compo = (
          <InputBaselineInfoStep8
            data={{ ehraScore }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      case indexNames[3]:
        title = 'Edit Framingham risk score (FRS)';
        compo = (
          <InputBaselineInfoStep9
            data={{
              isEnsurePatientAge,
              gender,
              age,
              smoker,
              totalCholesterol,
              HDLCholesterol,
              systolicBP,
              bloodPressure,
              step9TotalScore,
              cvgRisk,
              heartRate,
              risk,
            }}
            onClickLeft={() => setState({ editKey: '' })}
            onClickRight={onClickSave}
            type={type}
          />
        );
        break;
      default:
        compo = null;
        break;
    }
    return (
      <div className="baseline-edit-step-wrapper">
        <div className="size-20-b-g9">
          <span>{title}</span>
        </div>
        <Divider />
        {compo}
      </div>
    );
  };

  const renderView = () => (
    <div className="baseline-info-main-body">
      {_.map(data1Arr, (x, i) => (
        <DisplayData2
          key={i}
          className={i !== 0 ? 'mt24' : ''}
          title={x.title}
          data={x.data}
          onClickEdit={() => setState({ editKey: x.title })}
          {...defProps}
        />
      ))}

      <div className={classnames('size-16-b-g9', 'mt24')}>
        <span>Previous cardiac monitor</span>
      </div>

      {_.map(data2Arr, (x, i) => (
        <DisplayData2
          key={i}
          titleClassName={classnames('color-gray-10', 'fw-normal')}
          className="mt12"
          title={x.title}
          data={x.data}
          onClickEdit={() => setState({ editKey: x.title })}
          {...defProps}
        />
      ))}

      <DisplayData2
        className="mt24"
        title={BDiagnosis}
        data={isUsingBiofluxDiagnosisInfo ? biofluxInfoData : []}
        onClickEdit={() => setState({ editKey: BDiagnosis })}
        {...defProps}
      />

      <DisplayData2
        className="mt24"
        title={pMedicalConditions}
        data={pmcInfoData}
        type="NONE"
        onClickEdit={() => setState({ editKey: pMedicalConditions })}
        {...defProps}
      />


      <ScoringTable
        className="mt24"
        onClickEdit={x => setState({ editKey: x })}
        dataSource={tableDataSource}
        indexNames={indexNames}
      />

      <QOLChart
        className="mt24 pb-3"
        data={{
          physicalFunctioning: getRandom(101),
          physicalHealth: getRandom(101),
          emotionalProblems: getRandom(101),
          energy: getRandom(101),
          emotional: getRandom(101),
          socialFunctioning: getRandom(101),
          pain: getRandom(101),
          generalHealth: getRandom(101),
        }}
      />
    </div>
  );

  return (
    <div className={classnames('baseline-info-view', className)}>

      {editKey ? renderStepEdit() : renderView()}

    </div>
  );
};

BaselineInfoView.defaultProps = {
  fetchData: () => { },
  className: '',
  baselineInformation: {},
};
BaselineInfoView.propTypes = {
  fetchData: PropTypes.func,
  className: PropTypes.string,
  baselineInformation: PropTypes.shape(),
};

export default BaselineInfoView;
