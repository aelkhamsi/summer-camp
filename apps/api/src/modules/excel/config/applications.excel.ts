import { educationFields, educationLevels, regionLabels } from '../labels';

export const rowFactory = (applications: any[], configService) => {
  const awsBucketName = configService.get('AWS_BUCKET_NAME');
  const awsBucketRegion = configService.get('AWS_BUCKET_REGION');

  return applications.map((application: any) => ({
    id: application?.id,
    firstName: application?.user?.firstName,
    lastName: application?.user?.lastName,
    email: application?.user?.email,
    dateOfBirth: new Date(application?.dateOfBirth),
    identityCardNumber: application?.identityCardNumber,
    studentNumber: application?.studentNumber,
    city: application?.city,
    region: regionLabels[application?.region],
    phoneNumber: application?.phoneNumber,
    guardianFullName: application?.guardianFullName,
    guardianPhoneNumber: application?.guardianPhoneNumber,
    relationshipWithGuardian: application?.relationshipWithGuardian,
    healthInformations: application?.healthInformations,

    educationLevel: educationLevels.find(
      (level) => level.value == application?.educationLevel,
    )?.label,
    highschool: application?.highschool,
    averageGrade: application?.averageGrade,
    mathAverageGrade: application?.mathAverageGrade,
    ranking: application?.ranking,
    mathRanking: application?.mathRanking,

    motivations: application?.motivations,
    hasPreviousMathMarocParticipations:
      application?.hasPreviousMathMarocParticipations,
    previousMathMarocParticipations:
      application?.previousMathMarocParticipations,
    hasPreviousExperiences: application?.hasPreviousExperiences,
    previousExperiences: application?.previousExperiences,
    comments: application?.comments,

    fileCnie: {
      text: application?.fileCnieUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileCnieUrl}`,
    },
    fileSchoolCertificate: {
      text: application?.fileSchoolCertificateUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileSchoolCertificateUrl}`,
    },
    fileGrades: {
      text: application?.fileGradesUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileGradesUrl}`,
    },
    fileRegulations: {
      text: application?.fileRegulationsUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileRegulationsUrl}`,
    },
    fileParentalAuthorization: {
      text: application?.fileParentalAuthorizationUrl ? 'link' : ' ',
      hyperlink: `https://${awsBucketName}.s3.${awsBucketRegion}.amazonaws.com/${application?.fileParentalAuthorizationUrl}`,
    },

    status: application?.status?.status,
  }));
};
