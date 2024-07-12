import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { lifestyle_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { motion } from 'framer-motion'
import { DirectionProvider } from '@radix-ui/react-direction'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface StepProps {
    formData: Partial<z.infer<typeof lifestyle_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof lifestyle_step_schema>>>>
    nextStep: () => void
    prevStep: () => void
}

const LifestyleStep: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const form = useForm<z.infer<typeof lifestyle_step_schema>>({
        resolver: zodResolver(lifestyle_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof lifestyle_step_schema>> = data => {
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div
                    className='flex flex-col gap-6'
                    key={5}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='activity'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>میزان فعالیت</FormLabel>
                                    <DirectionProvider dir='rtl'>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='میزان تحرک' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='sedentary'>
                                                    بی تحرک - ورزش کم یا اصلا ورزش نمی‌کنم
                                                </SelectItem>
                                                <SelectItem value='moderate'>
                                                    نسبتا فعال - حداقل روزی یک ساعت تحرک دارم
                                                </SelectItem>
                                                <SelectItem value='active'>
                                                    پر تحرک - به صورت متداوم ورزش می‌کنم
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </DirectionProvider>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='location'
                            render={({ field }) => (
                                <FormItem className='space-y-3'>
                                    <FormLabel>محل نگهداری بیمار</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className='flex flex-col items-end space-y-1'
                                        >
                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                <FormLabel className='font-normal'>بیمارستان</FormLabel>
                                                <FormControl>
                                                    <RadioGroupItem value='hospital' />
                                                </FormControl>
                                            </FormItem>
                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                <FormLabel className='font-normal'>خانه سالمندان</FormLabel>
                                                <FormControl>
                                                    <RadioGroupItem value='elderly_home' />
                                                </FormControl>
                                            </FormItem>
                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                <FormLabel className='font-normal'>خانه</FormLabel>
                                                <FormControl>
                                                    <RadioGroupItem value='home' />
                                                </FormControl>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name='location'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>محل نگه‌داری بیمار</FormLabel>
                                    <DirectionProvider dir='rtl'>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='محل نگه‌داری' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='hospital'>بیمارستان</SelectItem>
                                                <SelectItem value='elderly_home'>خانه سالمندان</SelectItem>
                                                <SelectItem value='home'>خانه</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </DirectionProvider>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>
                    <div>
                        <span className='text-xl'>وضعیت بهداشتی و زندگی</span>
                        <div className='mt-4 flex flex-col gap-4 sm:flex-row sm:gap-8'>
                            <div className='flex flex-col gap-4'>
                                <FormField
                                    control={form.control}
                                    name='smoke'
                                    render={({ field }) => (
                                        <FormItem className='flex items-center gap-1'>
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel>استعمال دخانیات</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='fatness'
                                    render={({ field }) => (
                                        <FormItem className='flex items-center gap-1'>
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel>چاقی</FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <FormField
                                    control={form.control}
                                    name='alcohol'
                                    render={({ field }) => (
                                        <FormItem className='flex items-center gap-1'>
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel>مصرف الکل</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='diaper'
                                    render={({ field }) => (
                                        <FormItem className='flex items-center gap-1'>
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <FormLabel className='text-base'>
                                                نیاز به استفاده از پوشاک یا ایزی‌لایف
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-2 sm:flex-row'>
                        <Button className='w-full bg-blue-500 hover:bg-blue-400' type='submit'>
                            ادامه
                        </Button>
                        <Button type='button' className='w-full' onClick={prevStep}>
                            قبلی
                        </Button>
                    </div>
                </motion.div>
            </form>
        </Form>
    )
}

export default LifestyleStep
