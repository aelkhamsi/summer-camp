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
import ApplicationActivityChoices from '../components/application-activity-choices';

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
  'guardian': 'Tuteur'
} as any;

const educationLevelLabels = {
  "tronc-commun": "Tronc commun",
  "1bac": "1ère année Bac",
  "2bac": "2ème année Bac",
 } as any;

const educationFieldLabels = {
  "tc-sciences": "TC sciences",
  "tc-technologique": "TC technologique",
  "1bac-sciences-economiques-et-gestion": "1BAC Sciences Economiques et Gestion",
  "1bac-arts-appliques": "1BAC Arts Appliqués",
  "1bac-sciences-experimentales": "1BAC Sciences Expérimentales",
  "1bac-sciences-mathematiques": "1BAC Sciences Mathématiques",
  "1bac-sciences-et-technologies-electriques": "1BAC Sciences et Technologies Electriques",
  "1bac-sciences-et-technologies-mecaniques": "1BAC Sciences et Technologies Mécaniques",
  "2bac-sciences-economiques": "2BAC Sciences Economiques",
  "2bac-sciences-de-gestion-et-comptabilite": "2BAC Sciences de Gestion et Comptabilité",
  "2bac-arts-appliques": "2BAC Arts Appliqués",
  "2bac-sciences-de-la-vie-et-de-la-terre": "2BAC Sciences de la Vie et de la Terre",
  "2bac-sciences-physique-chimie": "2BAC Sciences Physique Chimie",
  "2bac-sciences-agronomiques": "2BAC Sciences Agronomiques",
  "2bac-sciences-mathematiques-a": "2BAC Sciences Mathématiques A",
  "2bac-sciences-mathematiques-b": "2BAC Sciences Mathématiques B",
  "2bac-sciences-et-technologies-electrique": "2BAC Sciences et Technologies Electrique",
  "2bac-sciences-et-technologies-mecanique": "2BAC Sciences et Technologies Mécanique",
  "autre": "Autre",
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
  const [activityChoices, setActivityChoices] = useState<any>(undefined)
  const id = parseInt(params.id);
  const router = useRouter();

  useEffect(() => {
    if (applications) {
      const searchResult = applications.find((application: any) => application?.id === id)
      setApplication(searchResult)
      const activityChoices = JSON.parse(searchResult?.activityChoices)
      setActivityChoices(activityChoices
        ? activityChoices?.sort()
        : undefined
      )
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

            <>
              <ApplicationActivityChoices activityChoices={activityChoices} className='flex flex-start gap-x-2' />
            </>

            <TabsList className="flex justify-start space-x-8 h-[4rem] bg-slate-200 text-black">
              <TabsTrigger value="personal-informations" className='text-base h-full'>Personal Informations</TabsTrigger>
              <TabsTrigger value="education" className='text-base h-full'>Education</TabsTrigger>
              <TabsTrigger value="competition" className='text-base h-full'>Motivation</TabsTrigger>
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
                <Field label='City of residence'>{renderText(application?.city)}</Field>
                <Field label='Region of residence'>{renderText(regionLabels[application?.region])}</Field>
                <Field label='Phone number'>{renderText(application?.phoneNumber)}</Field>
                <Separator className="my-6" />
                <Field label='Guardian full name'>{renderText(application?.guardianFullName)}</Field>
                <Field label='Guardian phone number'>{renderText(application?.guardianPhoneNumber)}</Field>
                <Field label='Relationship with guardian'>{renderText(relationshipWithGuardianLabels[application?.relationshipWithGuardian])}</Field>
              </div>
            </TabsContent>
            
            {/* EDUCATION */}
            <TabsContent value="education">
              <div className='space-y-6'>
                <Field label='Education levels'>{renderText(educationLevelLabels[application?.educationLevel])}</Field>
                <Field label='Education program'>{renderText(educationFieldLabels[application?.educationField])}</Field>
                <Field label='Highschool'>{renderText(application?.highschool)}</Field>
                <Separator className="my-6" />

                <Field label='Average grade'>{renderText(application?.averageGrade)}</Field>
                <Field label='Math average grade'>{renderText(application?.mathAverageGrade)}</Field>
                <Field label='Ranking'>{renderText(application?.ranking)}</Field>
                <Field label='Math ranking'>{renderText(application?.mathRanking)}</Field>
                <Field label='Number of students in class'>{renderText(application?.numberOfStudentsInClass)}</Field>                 
              </div>
            </TabsContent>
              
            {/* COMPETTION */}
            <TabsContent value="competition">
              <div className='space-y-6'>
                <h2 className='font-bold text-lg'>
                  Math Sprint
                  <Separator />
                </h2>
                
                <Field label='Have you participated in competitions before (Olympiads, national contests...) ?'>{renderText(booleanLabels[application?.hasPreviouslyParticipated])}</Field>
                <Field label='If yes, please specify which ones and the achieved result.'>{renderText(application?.previousCompetitions)}</Field>

                <h2 className='font-bold text-lg'>
                  Best Math Video
                  <Separator />
                </h2>
                <Field label='Title'>{renderText(application?.videoTitle)}</Field>
                <Field label='Link'>{renderText(application?.videoLink)}</Field>
                <Field label='Subject'>{renderText(application?.videoSubject)}</Field>
                <Field label='Motivations'>{renderText(application?.videoMotivations)}</Field>
                <Field label='Ressources'>{renderText(application?.videoRessources)}</Field>

                <h2 className='font-bold text-lg'>
                  Stand
                  <Separator />
                </h2>
                <Field label='Subject Title'>{renderText(application?.standSubjectTitle)}</Field>
                <Field label='Subject Details'>{renderText(application?.standSubjectDetails)}</Field>
                <Field label='Members'>{renderText(application?.standMembers)}</Field>

                <h2 className='font-bold text-lg'>
                  General
                  <Separator />
                </h2>
                <Field label='Motivations'>{renderText(application?.motivations)}</Field>
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
