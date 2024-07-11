import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { medical_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface StepProps {
    formData: Partial<z.infer<typeof medical_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof medical_step_schema>>>>
    nextStep: () => void
    prevStep: () => void
}

const MedicalStep: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const form = useForm<z.infer<typeof medical_step_schema>>({
        resolver: zodResolver(medical_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof medical_step_schema>> = data => {
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }
    const isUlEmpty = form.watch('ul_disease_empty', false)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div
                    className='flex flex-col gap-4'
                    key={4}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='ul_disease'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>بیماری های زمینه ای</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='مانند دیابت، سرطان، مشکلات قلبی...'
                                            {...field}
                                            disabled={isUlEmpty}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name='ul_disease_empty'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center gap-1'>
                                    <FormControl>
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormLabel>ندارم</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='disease_background'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>سابقه بیماری</FormLabel>
                                    <FormControl>
                                        <Input placeholder='مانند سرخک، سل، سیفلیس...' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='meds'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>دارو های مصرفی</FormLabel>
                                    <FormControl>
                                        <Input placeholder='تمامی داروهایی که مصرف میکنید را بنویسید...' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='mt-4 flex w-full flex-col gap-2 sm:flex-row'>
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

export default MedicalStep
