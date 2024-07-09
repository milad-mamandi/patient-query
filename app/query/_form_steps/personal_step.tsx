import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { personal_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DirectionProvider } from '@radix-ui/react-direction'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface StepProps {
    formData: Partial<z.infer<typeof personal_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof personal_step_schema>>>>
    nextStep: () => void
}

const PersonalStep: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
    const form = useForm<z.infer<typeof personal_step_schema>>({
        resolver: zodResolver(personal_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof personal_step_schema>> = data => {
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div
                    className='flex flex-col gap-2'
                    key={1}
                    initial={{
                        x: 200,
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    exit={{
                        x: -200,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                >
                    <span className='text-3xl '>اطلاعات شخصی خود را پر کنید</span>
                    <div className='flex flex-col sm:flex-row gap-2 mt-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='نام' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='fname'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='نام خانوادگی' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row gap-2'>
                        <FormField
                            control={form.control}
                            name='age'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input type='number' placeholder='سن' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='weight'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Input type='number' placeholder='وزن (به کیلوگرم)' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <FormField
                            control={form.control}
                            name='gender'
                            render={({ field }) => (
                                <FormItem>
                                    <DirectionProvider dir='rtl'>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='جنسیت' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='male'>مذکر</SelectItem>
                                                <SelectItem value='female'>مونث</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </DirectionProvider>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row w-full gap-2 mt-4'>
                        <Button className='w-full bg-blue-500 hover:bg-blue-400' type='submit'>
                            ادامه
                        </Button>
                        <Link href='../' className='w-full'>
                            <Button className='w-full bg-red-500 hover:bg-red-400'>خروج</Button>
                        </Link>
                    </div>
                </motion.div>
            </form>
        </Form>
    )
}

export default PersonalStep
