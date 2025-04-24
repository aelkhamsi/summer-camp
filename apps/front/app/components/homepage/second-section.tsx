import { BookIcon, CalendarMDMIcon, LocationIcon } from '@mdm/ui'
import { ImageStack } from '../image-stack'

const images = [
  {
    name: 'MDM conference',
    src: '/past-edition/mdm_1.webp' 
  },
  {
    name: 'MDM conference',
    src: '/past-edition/mdm_2.webp' 
  },
  {
    name: 'MDM conference',
    src: '/past-edition/mdm_3.webp' 
  },
  {
    name: 'MathSprint contest',
    src: '/past-edition/mathsprint_1.webp' 
  },
  {
    name: 'MathSprint contest',
    src: '/past-edition/mathsprint_2.webp'
  },
]

const SecondSection = () => {
  return (    
    <div className='relative isolate overflow-hidden w-full flex flex-col justify-center items-center py-14 bg-[url(/logomark_beige.svg)] bg-no-repeat bg-center shadow-xl shadow-slate-800'>
      <div
        className="flex flex-col w-full space-y-4 md:flex-row md:justify-between md:space-x-8 lg:w-3/4 text-base mb-12 md:mb-20"
      >
        <div className="w-full space-y-4 p-4 lg:p-0">
          <p className='font-bold text-xs text-[#1C55FF]'>C'est quoi Summer Camp ?</p>
          <h1 className='font-bold text-3xl'>Summer Camp, une aventure scientifique et mathématique au cœur de l&apos;été</h1>
          <p>Le <span className='font-bold'>Summer Camp</span>, c&apos;est une semaine d&apos;immersion dédiée aux mathématiques et aux sciences, pensée pour les jeunes curieux et passionnés.</p>
          <p>À travers des séances de haut niveau en mathématiques, une introduction à l&apos;informatique, des ateliers et des workshops, les élèves explorent les notions scientifiques de façon concrète et ludique.</p>
          <p>Bien plus qu&apos;un camp d&apos;été, c&apos;est une aventure intellectuelle, une rencontre entre esprits vifs, et une occasion unique de nourrir sa passion tout en s&apos;amusant.</p>
        </div>

        <div className="w-full">
          <ImageStack
            images={images}
            autoplay={true}
          />
        </div>
      </div>

      <div className='text-3xl font-bold p-4 lg:p-0'>
        Retour sur Summer Camp 2024
      </div>

      <div
        className="flex flex-col md:flex-row md:justify-between md:space-x-8 w-full lg:w-3/4 text-base md:my-12"
      >
        <div className='w-full flex justify-start p-4 lg:p-0'>
          <div className="w-fit space-y-4 font-medium text-3xl lg:text-4xl">
            <p><span className='bg-gradient-to-br from-[#1C55FF] to-[#ABA8A9] inline-block text-transparent bg-clip-text'>75+</span> Participants</p>
            <p><span className='bg-gradient-to-br from-[#1C55FF] to-[#ABA8A9] inline-block text-transparent bg-clip-text'>1</span> Semaine prise en charge</p>
            <p>✨ Des formations d&apos;excellence</p>
            <p>🏖️ Des jeux, du sport et des sorties</p>
          </div>
        </div>

        <div className="w-full flex flex-col px-4 space-y-4">
          <p>L'édition passée de Summer Camp s'est tenue à Martil en collaboration avec LYMED</p>
          <p>Une édition qui a réuni une centaine de passionnés de mathématiques autour de conférences d'experts, de stands et de compétitions</p>
          <p>En 2025, Summer Camp promet d'aller encore plus loin, en offrant une expérience enrichie avec de nouvelles activités, des intervenants de renommée internationale et des opportunités inédites pour tous les passionnés de mathématiques</p>
        </div>
      </div>
    </div>
  )
}

export default SecondSection
