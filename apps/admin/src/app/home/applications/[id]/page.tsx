"use client"

import { Label } from '@/components/shared/label'
import Separator from '@/components/shared/separator';
import { formatDate } from '@/lib/utils'
import { applicationsState } from '@/store/applicationsState';
import React, { ReactNode, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { useRouter } from 'next/navigation';
import { ExpandingArrow } from '@/components/shared/icons';
import ApplicationStatus from '../components/application-status';
import FilesTable from './files-table';

const regionLabels = {
  'tanger-tetouan-al-houceima': "Tanger-Tétouan-Al Hoceïma",
  'oriental': "Oriental",
  'fes-meknes': "Fès-Meknès",
  'rabat-sale-kenitra': "Rabat-Salé-Kénitra",
  'beni-mellal-khenifra': "Béni Mellal-Khénifra",
  'casablanca-settat': "Casablanca-Settat",
  'marrakech-safi': "Marrakech-Safi",
  'draa-tafilalet': "Drâa-Tafilalet",
  'souss-massa': "Souss-Massa",
  'guelmim-oued-noun': "Guelmim-Oued Noun",
  'laayoune-sakia-el-hamra': "Laâyoune-Sakia El Hamra",
  'dakhla-oued-eddahab': "Dakhla-Oued Eddahab",
  'abroad': "Abroad",
} as any;

const relationshipWithGuardianLabels = {
  'father': 'Père',
  'mother': 'Mère',
  'guardian': 'Tuteur',
} as any;

const educationLevelLabels = {
  "tronc-commun": "Tronc commun",
  "1ac": "1AC",
  "2ac": "2AC",
  "3ac": "3AC",
} as any;

const booleanLabels = {
  "yes": "Oui",
  "no": "Non",
  "not-selected": "J'ai postulé, mais je n'ai pas été sélectionné."
} as any;

const renderText = (value: any) => {
  return value
    ? value
    : <span className='text-gray-400'>(empty)</span>
}

const Field = ({
  label,
  children,
}: {
  label: string,
  children: ReactNode,
}) => {
  return <div>
    <Label className='text-[#272162] font-semibold'>{label}</Label>
    <p>{children}</p>
  </div>
}

export default function ApplicationDetailsPage({ params }: { params: { id: string } }) {
  const [applications, setApplications] = useRecoilState(applicationsState);
  const [application, setApplication] = useState<any>(undefined); 
  const id = parseInt(params.id);
  const router = useRouter();

  useEffect(() => {
    if (applications) {
      const searchResult = applications.find((application: any) => application?.id === id)
      setApplication(searchResult)
    }
  }, [applications])

  return (
    <>
      {application
        ? (
          <Tabs defaultValue="personal-informations" className='space-y-8'>
            <div 
              className='font-semibold flex cursor-pointer'
              onClick={() => router.push('/home/applications')}
            >
              <ExpandingArrow className='rotate-180 mr-2'/> {"  "} Back
            </div>

            <div 
              className='font-semibold text-2xl flex justify-between'
            >
              <div>
                Application of <span className='bg-gradient-to-br from-sky-800 to-[#272162] inline-block text-transparent bg-clip-text'>{application?.firstName} {application?.lastName}</span>
              </div>

              <ApplicationStatus applicationId={application?.id} status={application?.status?.status} />
            </div>

            <TabsList className="flex justify-start space-x-8 h-[4rem] bg-slate-200 text-black">
              <TabsTrigger value="personal-informations" className='text-base h-full'>Personal Informations</TabsTrigger>
              <TabsTrigger value="education" className='text-base h-full'>Education</TabsTrigger>
              <TabsTrigger value="competition" className='text-base h-full'>Motivations</TabsTrigger>
              <TabsTrigger value="uploads" className='text-base h-full'>Uploads</TabsTrigger>
            </TabsList>
            <Separator className="my-6" />

            {/* PERSONAL INFORMARIONS */}
            <TabsContent value="personal-informations">
              <div className='space-y-6'>
                <Field label='First name'>{renderText(application?.firstName)}</Field>
                <Field label='Last name'>{renderText(application?.lastName)}</Field>
                <Field label='Date of birth'>{renderText(formatDate(application?.dateOfBirth))}</Field>
                <Field label='CNIE number'>{renderText(application?.identityCardNumber)}</Field>
                <Field label='Student Number (Massar)'>{renderText(application?.studentNumber)}</Field>
                <Field label='City of residence'>{renderText(application?.city)}</Field>
                <Field label='Region of residence'>{renderText(regionLabels[application?.region])}</Field>
                <Field label='Phone number'>{renderText(application?.phoneNumber)}</Field>
                <Separator className="my-6" />
                <Field label='Guardian full name'>{renderText(application?.guardianFullName)}</Field>
                <Field label='Guardian phone number'>{renderText(application?.guardianPhoneNumber)}</Field>
                <Field label='Relationship with guardian'>{renderText(relationshipWithGuardianLabels[application?.relationshipWithGuardian])}</Field>
                <Field label='Health Informations'>{renderText(relationshipWithGuardianLabels[application?.healthInformations])}</Field>
              </div>
            </TabsContent>
            
            {/* EDUCATION */}
            <TabsContent value="education">
              <div className='space-y-6'>
                <Field label='Education levels'>{renderText(educationLevelLabels[application?.educationLevel])}</Field>
                <Field label='Highschool'>{renderText(application?.highschool)}</Field>
                <Separator className="my-6" />

                <Field label='Average grade'>{renderText(application?.averageGrade)}</Field>
                <Field label='Math average grade'>{renderText(application?.mathAverageGrade)}</Field>
                <Field label='Ranking'>{renderText(application?.ranking)}</Field>
                <Field label='Math ranking'>{renderText(application?.mathRanking)}</Field>
              </div>
            </TabsContent>
              
            {/* Motivations */}
            <TabsContent value="competition">
              <div className='space-y-6'>
                <Field label='Motivations to participate to Summer Camp'>{renderText(application?.motivations)}</Field> 
                <Field label='Avez-vous déjà participé à des activités de Math&Maroc?'>{renderText(booleanLabels[application?.hasPreviousMathMarocParticipations])}</Field>
                <Field label='Veuillez spécifier lesquelles et le résultat obtenu'>{renderText(application?.previousMathMarocParticipations)}</Field>
                <Field label='Have you participated in competitions before (Olympiads, national contests...) ?'>{renderText(booleanLabels[application?.hasPreviousExperiences])}</Field>
                <Field label='Veuillez spécifier lesquelles et le résultat obtenu'>{renderText(application?.previousExperiences)}</Field>
                <Field label='Comments'>{renderText(application?.comments)}</Field>
              </div>
            </TabsContent>
            
            {/* UPLOADS */}
            <TabsContent value="uploads">
              <div className='md:flex space-y-4 md:space-x-4 md:space-y-0 mt-8'>
                <FilesTable application={application} />
              </div>
            </TabsContent>
          </Tabs>
        )
        : <></>
      }
    </>
  )
}
