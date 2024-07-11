import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { images_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ImageDrag from '@/components/ui/imagedd'

interface StepProps {
    formData: Partial<z.infer<typeof images_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof images_step_schema>>>>
    nextStep: () => void
    prevStep: () => void
}

const ImageStep: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const form = useForm<z.infer<typeof images_step_schema>>({
        resolver: zodResolver(images_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof images_step_schema>> = data => {
        console.log(data)
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div
                    key={2}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='flex flex-col gap-2'
                >
                    <div className='mt-4 flex flex-col gap-1'>
                        <span className='mt-2 text-slate-500'>
                            عکس ها در زوایای مناسب و با وضوح و نور کاری گرفته شوند
                        </span>
                        <span className='text-slate-500'>
                            استفاده از خط کش تریتا جهت ارسال عکس و مشاوره الزامی میباشد.
                        </span>
                    </div>
                    <FormField
                        control={form.control}
                        name='images'
                        render={({ field }) => (
                            <FormItem className='flex flex-col items-center gap-1'>
                                <FormControl>
                                    <ImageDrag onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='mt-4 flex w-full flex-row gap-2'>
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

export default ImageStep
