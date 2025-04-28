import CtaSection from "@/app/components/cta/cta-section"
import TextureBg from "@/app/components/texture-bg"
import { ImageStack } from "@/app/components/image-stack"
import { DumbbellIcon, ExamIcon } from "@mdm/ui";
import Link from "next/link";

const images = [
  {
    name: 'MathSprint contest',
    src: '/past-edition/mathsprint_1.webp' 
  },
  {
    name: 'MathSprint contest',
    src: '/past-edition/mathsprint_2.webp'
  },
]

export default function MathSprintPage() {

  return (
    <TextureBg className="bg-[#fff9f3]">
      <div className="w-full flex flex-col items-center max-w-sm md:max-w-screen-xl px-5 xl:px-0 space-y-10 mb-20">
        <h1 className="text-center text-4xl font-bold drop-shadow-sm">
          <span className='text-[#FF4925]'>Test de séléction</span>
        </h1>

        <div
          className="flex flex-col w-full md:flex-row md:justify-between md:space-x-8 text-base"
        >
          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#1C55FF]'>La sélection</p>
            <h1 className='font-bold text-3xl'>Comment se passera la sélection ?</h1>
            <p className="text-lg">Avant de pouvoir participer à cette compétition, un test de sélection sera mené pour évaluer le niveau des potentiels participants</p>
            <p className="text-lg">Le test sera effectué sur une <span className="font-semibold text-gray-800">plateforme en ligne</span> sous la forme d'un QCM surveillé par caméra</p>
          </div>

          <div className="w-full space-y-4 p-4">
            <p className='font-bold text-sm text-[#1C55FF]'>Le syllabus</p>
            <h1 className='font-bold text-3xl'>Quels sujets concernent l'épreuve ?</h1>
            
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              Le syllabus des épreuves sera communiqué prochainement!
            </div>
          </div>
        </div>

        <CtaSection />
      </div>
    </TextureBg>
  )
}