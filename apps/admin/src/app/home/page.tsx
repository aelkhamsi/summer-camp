"use client"

import { HoverEffect } from "@/components/shared/card-hover-effect";
import Image from "next/image";
import Stats from "./stats";
import { useRecoilValue } from "recoil";
import { applicationsState } from "@/store/applicationsState";

const links = [
  {
    title: "Applications",
    description:
      "Manage candidate applications",
    link: "/home/applications",
  },
  {
    title: "Users",
    description:
      "Manage user pofiles",
    link: "/home/users",
  },
];

const countApplications = (applications: any[], educationLevel?: string) => {
  return (applications||[])?.reduce(
    (count: any[], application: any) => {
      count[0]++;
      if (application?.status?.status === 'PENDING') {
        count[1]++
      }
      if (application?.educationLevel === '1ac') {
        count[2]++
      }
      if (application?.educationLevel === '2ac') {
        count[3]++
      }
      if (application?.educationLevel === '3ac') {
        count[4]++
      }
      if (application?.educationLevel === 'tronc-commun') {
        count[5]++
      }
    
      return count;
    }, 
    [0, 0, 0, 0, 0, 0]
  );
}

export default function Home() {
  const applications = useRecoilValue(applicationsState);
  const [countAll, countPending, count1AC, count2AC, count3AC, countTroncCommun] = countApplications(applications)

  return (
    <>
      <Image
        src="/wordmark_orange.svg"
        alt="Summer Camp"
        width='300'
        height='100'
      />

      <HoverEffect items={links} className="flex justify-center gap-x-4"/>

      <div className="flex gap-x-4">
        <Stats 
          className="text-white bg-[#1C55FF]" 
          valueAll={countAll} 
          valuePending={countPending} 
          value1AC={count1AC} 
          value2AC={count2AC} 
          value3AC={count3AC} 
          valueTroncCommun={countTroncCommun} 
        />
      </div>
    </>
  )
}
