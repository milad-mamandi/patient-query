import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { medical_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface StepProps {
    formData: Partial<z.infer<typeof medical_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof medical_step_schema>>>>
    nextStep: () => void
    prevStep: () => void
}

const items = [
    {
        id: 'diabetes',
        label: 'دیابت',
    },
    {
        id: 'cancer',
        label: 'سرطان',
    },
    {
        id: 'tuberculosis',
        label: 'سل',
    },
    {
        id: 'syphilis',
        label: 'سفلیس',
    },
    {
        id: 'other',
        label: 'موارد دیگر',
    },
] as const

const MedicalStep: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const form = useForm<z.infer<typeof medical_step_schema>>({
        resolver: zodResolver(medical_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof medical_step_schema>> = data => {
        console.log(data)
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }

    const other_lying_disease = form.watch('ul_disease')

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
                            render={() => (
                                <FormItem>
                                    <div className='mb-4'>
                                        <FormLabel className='text-base'>بیماری های زمینه ای</FormLabel>
                                        <FormDescription>
                                            اگر بیماری زمینه ای دارید، از بین گزینه های زیر انخاب کنید
                                        </FormDescription>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        {items.map(item => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name='ul_disease'
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className='flex flex-row items-start gap-2 space-x-2 space-y-0'
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={checked => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      value => value !== item.id,
                                                                                  ),
                                                                              )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className='font-normal'>{item.label}</FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <AnimatePresence>
                                        {other_lying_disease.includes('other') && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: 'auto',
                                                    opacity: 1,
                                                    transition: {
                                                        height: {
                                                            duration: 0.4,
                                                        },
                                                        opacity: {
                                                            duration: 0.25,
                                                            delay: 0.15,
                                                        },
                                                    },
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        height: {
                                                            duration: 0.4,
                                                        },
                                                        opacity: {
                                                            duration: 0.25,
                                                        },
                                                    },
                                                }}
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name='ul_disease_other'
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder='لطفا نام بیماری را بنویسید'
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
