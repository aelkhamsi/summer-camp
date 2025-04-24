"use client"

import { Scroll } from 'lucide-react'
import { useAuthModal } from '../auth/auth-modal';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/app/store/userAtom';
import { useRouter } from "next/navigation"
import { useState } from 'react';
import { LoadingDots } from '@mdm/ui';

const CtaButton = () => {
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const user = useAtomValue(userAtom)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    if (user) {
      setIsLoading(true)
      router.push('/application')
    }
    else {
      setShowAuthModal(true)
    }
  }

  return (
    <>
      <AuthModal />
      
      <button 
        className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        onClick={handleClick}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full gap-x-2 cursor-pointer items-center justify-center rounded-full bg-white px-6 py-1 text-black backdrop-blur-3xl">
          <Scroll className='h-5 w-5'/>

          {!isLoading
            ? 'Participer'
            : <LoadingDots color="#808080" />
          }
        </span>
      </button>
    </>
  )
}

export default CtaButton
