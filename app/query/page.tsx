'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Bike, Check, ClipboardPlus, Image, Info, Phone, UserRound } from 'lucide-react'
import PersonalStep from './_form_steps/personal_step'
import ScarStep from './_form_steps/scar_step'
import MedicalStep from './_form_steps/medical_step'
import LifestyleStep from './_form_steps/lifestyle_step'
import PnStep from './_form_steps/pn_step'
import { z } from 'zod'
import { formSchema } from '@/lib/schema'
import ImageStep from './_form_steps/image_step'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import CircularProgress from '@mui/joy/CircularProgress'

export default function Query() {
    const { toast } = useToast()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<Partial<z.infer<typeof formSchema>>>({
        name: '',
        fname: '',
        age: '',
        weight: '',
        gender: undefined,
        images: [],
        scar_cause: '',
        scar_duration: '',
        ul_disease: [],
        ul_disease_other: '',
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
        <div className='mb-4 flex min-h-[calc(100dvh-6rem)] flex-col overflow-hidden bg-white text-black'>
            <div className='flex w-full flex-1 flex-row'>
                <div className='hidden w-1/3 border-l-2 border-gray-300 lg:block'>
                    <div className='flex flex-col'>
                        <div className='flex flex-col gap-2 px-16 py-16'>
                            <span className='text-3xl'>
                                {step === 1 && 'فرم اول'}
                                {step === 2 && 'فرم دوم'}
                                {step === 3 && 'فرم سوم'}
                                {step === 4 && 'فرم چهارم'}
                                {step === 5 && 'فرم پنجم'}
                                {step === 6 && 'فرم شیشم'}
                                {step === 7 && 'اتمام!'}
                            </span>
                            <span className='text-lg'>
                                {step === 1 && 'اطلاعات شخصی خود را وارد کنید'}
                                {step === 2 && 'تصاویر زخم خود را بارگذاری کنید'}
                                {step === 3 && 'اطلاعات تکمیلی مربوط به زخم خود را وارد کنید'}
                                {step === 4 && 'سوابق پزشکی خود را وارد کنید'}
                                {step === 5 && 'اطلاعات سبک زندگی خود را وارد کنید'}
                                {step === 6 && 'شماره موبایل خود را وارد کنید'}
                                {step === 7 && 'اطلاعات شما ثبت شد'}
                            </span>
                        </div>
                        <div className='relative flex flex-row items-center justify-between py-5'>
                            <div className='flex flex-row items-center gap-4 px-16'>
                                <div
                                    className={cn(
                                        'rounded-full bg-gray-300 p-3',
                                        step >= 1 && 'bg-green-400 text-white',
                                    )}
                                >
                                    {step > 1 ? <Check size={32} /> : <UserRound size={32} />}
                                </div>
                                <span className='text-2xl'>اطلاعات شخصی</span>
                            </div>
                            <div
                                className={cn(
                                    'absolute -left-[6px] h-[12px] w-[12px] rounded-full bg-gray-300',
                                    step >= 1 && 'bg-green-400',
                                )}
                            ></div>
                        </div>
                        <div className='relative flex flex-row items-center justify-between py-5'>
                            <div className='flex flex-row items-center gap-4 px-16'>
                                <div
                                    className={cn(
                                        'rounded-full bg-gray-300 p-3',
                                        step >= 2 && 'bg-green-400 text-white',
                                    )}
                                >
                                    {step > 2 ? <Check size={32} /> : <Image size={32} />}
                                </div>
                                <span className='text-2xl'>تصاویر زخم</span>
                            </div>
                            <div
                                className={cn(
                                    'absolute -left-[6px] h-[12px] w-[12px] rounded-full bg-gray-300',
                                    step >= 2 && 'bg-green-400',
                                )}
                            ></div>
                        </div>
                        <div className='relative flex flex-row items-center justify-between py-5'>
                            <div className='flex flex-row items-center gap-4 px-16'>
                                <div
                                    className={cn(
                                        'rounded-full bg-gray-300 p-3',
                                        step >= 3 && 'bg-green-400 text-white',
                                    )}
                                >
                                    {step > 3 ? <Check size={32} /> : <Info size={32} />}
                                </div>
                                <span className='text-2xl'>اطلاعات تکمیلی زخم</span>
                            </div>
                            <div
                                className={cn(
                                    'absolute -left-[6px] h-[12px] w-[12px] rounded-full bg-gray-300',
                                    step >= 3 && 'bg-green-400',
                                )}
                            ></div>
                        </div>
                        <div className='relative flex flex-row items-center justify-between py-5'>
                            <div className='flex flex-row items-center gap-4 px-16'>
                                <div
                                    className={cn(
                                        'rounded-full bg-gray-300 p-3',
                                        step >= 4 && 'bg-green-400 text-white',
                                    )}
                                >
                                    {step > 4 ? <Check size={32} /> : <ClipboardPlus size={32} />}
                                </div>
                                <span className='text-2xl'>سوابق پزشکی</span>
                            </div>
                            <div
                                className={cn(
                                    'absolute -left-[6px] h-[12px] w-[12px] rounded-full bg-gray-300',
                                    step >= 4 && 'bg-green-400',
                                )}
                            ></div>
                        </div>
                        <div className='relative flex flex-row items-center justify-between py-5'>
                            <div className='flex flex-row items-center gap-4 px-16'>
                                <div
                                    className={cn(
                                        'rounded-full bg-gray-300 p-3',
                                        step >= 5 && 'bg-green-400 text-white',
                                    )}
                                >
                                    {step > 5 ? <Check size={32} /> : <Bike size={32} />}
                                </div>
                                <span className='text-2xl'>سبک زندگی</span>
                            </div>
                            <div
                                className={cn(
                                    'absolute -left-[6px] h-[12px] w-[12px] rounded-full bg-gray-300',
                                    step >= 5 && 'bg-green-400',
                                )}
                            ></div>
                        </div>
                        <div className='relative flex flex-row items-center justify-between py-5'>
                            <div className='flex flex-row items-center gap-4 px-16'>
                                <div
                                    className={cn(
                                        'rounded-full bg-gray-300 p-3',
                                        step >= 6 && 'bg-green-400 text-white',
                                    )}
                                >
                                    {step > 6 ? <Check size={32} /> : <Phone size={32} />}
                                </div>
                                <span className='text-2xl'>شماره موبایل</span>
                            </div>
                            <div
                                className={cn(
                                    'absolute -left-[6px] h-[12px] w-[12px] rounded-full bg-gray-300',
                                    step >= 6 && 'bg-green-400',
                                )}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-center px-6 lg:w-2/3'>
                    <div className='flex w-full max-w-[428px] flex-col rounded-md backdrop-blur-lg'>
                        <div className='flex flex-row justify-between py-6 lg:hidden'>
                            <div className='flex flex-col items-start justify-center'>
                                <span className='text-xl'>
                                    {step == 1 && 'اطلاعات شخصی خود را وارد نمایید'}
                                    {step == 2 && 'دو عکس از محل زخم آپلود کنید'}
                                    {step == 3 && 'اطلاعات تکمیلی زخم را وارد نمایید'}
                                    {step == 4 && 'سوابق پزشکی خود را وارد نمایید'}
                                    {step == 5 && 'اطلاعات سبک زندگی خود را وارد نمایید'}
                                    {step == 6 && 'شماره موبایل خود را وارد نمایید'}
                                    {step == 7 && 'تمام!'}
                                </span>
                                <span className='text-gray-400'>
                                    {step == 1 && 'بعدی: تصاویر زخم'}
                                    {step == 2 && 'بعدی: اطلاعات تکمیلی زخم'}
                                    {step == 3 && 'بعدی: سوابق پزشکی'}
                                    {step == 4 && 'بعدی: سبک زندگی'}
                                    {step == 5 && 'بعدی: شماره موبایل'}
                                    {step == 6 && 'بعدی: دریافت کد پیگیری'}
                                    {step == 7 && 'کد پیگیری به شماره موبایل شما ارسال خواهد شد'}
                                </span>
                            </div>
                            <CircularProgress
                                determinate
                                value={(step / 7) * 100}
                                sx={{ '--CircularProgress-size': '80px' }}
                            >
                                7 / {step}
                            </CircularProgress>
                        </div>
                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <PersonalStep formData={formData} setFormData={setFormData} nextStep={nextStep} />
                            )}
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
                                <PnStep
                                    formData={formData}
                                    setFormData={setFormData}
                                    prevStep={prevStep}
                                    nextStep={nextStep}
                                />
                            )}
                            {step === 7 && (
                                <div className='flex flex-col items-center justify-center gap-8'>
                                    <Check size={64} color='#22c55e' />
                                    <span className='text-3xl font-bold'>اطلاعات با موفقیت ثبت شد</span>
                                    <div className='flex w-full flex-col gap-4 sm:flex-row'>
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
            </div>
        </div>
    )
}
