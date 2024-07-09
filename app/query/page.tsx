'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Check } from 'lucide-react'
import PersonalStep from './_form_steps/personal_step'
import ScarStep from './_form_steps/scar_step'
import MedicalStep from './_form_steps/medical_step'
import LifestyleStep from './_form_steps/lifestyle_step'
import PnStep from './_form_steps/pn_step'
import { z } from 'zod'
import { formSchema } from '@/lib/schema'
import ImageStep from './_form_steps/image_step'
import Link from 'next/link'

export default function Query() {
    const { toast } = useToast()
    const [step, setStep] = useState(7)
    const [formData, setFormData] = useState<Partial<z.infer<typeof formSchema>>>({
        name: '',
        fname: '',
        age: '',
        weight: '',
        gender: undefined,
        images: [],
        scar_cause: '',
        scar_duration: '',
        ul_disease: '',
        disease_background: '',
        meds: '',
        activity: undefined,
        location: undefined,
        smoke: false,
        alcohol: false,
        fatness: false,
        diaper: false,
        phone_number: '',
    })

    const nextStep = () => {
        setStep(prev => prev + 1)
    }

    const prevStep = () => {
        setStep(prev => prev - 1)
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-[100dvh]  p-4 bg-[#f0f8ff] relative overflow-hidden text-black'>
            <div className='flex flex-col rounded-md backdrop-blur-lg max-w-[428px] w-full'>
                <AnimatePresence mode='wait'>
                    {step === 1 && <PersonalStep formData={formData} setFormData={setFormData} nextStep={nextStep} />}
                    {step === 2 && (
                        <ImageStep
                            formData={formData}
                            setFormData={setFormData}
                            prevStep={prevStep}
                            nextStep={nextStep}
                        />
                    )}
                    {step === 3 && (
                        <ScarStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 4 && (
                        <MedicalStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 5 && (
                        <LifestyleStep
                            formData={formData}
                            setFormData={setFormData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {step === 6 && (
                        <PnStep formData={formData} setFormData={setFormData} prevStep={prevStep} nextStep={nextStep} />
                    )}
                    {step === 7 && (
                        <div className='flex items-center justify-center flex-col gap-8'>
                            <Check size={64} color='#22c55e' />
                            <span className='text-3xl font-bold'>اطلاعات با موفقیت ثبت شد</span>
                            <div className='flex flex-col sm:flex-row w-full gap-4'>
                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(String(JSON.stringify(formData)))
                                        toast({
                                            title: 'با موفیقت انجام شد',
                                            description: 'تمامی اطلاعات به صورت JSON در کلیپ‌بورد شما ذخیره شد',
                                        })
                                    }}
                                >
                                    دریافت اطلاعات به صورت JSON
                                </Button>
                                <Link href='../' className='w-full'>
                                    <Button className='w-full bg-red-500 hover:bg-red-400'>بازگشت</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
