import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { scar_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface StepProps {
    formData: Partial<z.infer<typeof scar_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof scar_step_schema>>>>
    nextStep: () => void
    prevStep: () => void
}

const ScarStep: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const form = useForm<z.infer<typeof scar_step_schema>>({
        resolver: zodResolver(scar_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof scar_step_schema>> = data => {
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div
                    key={3}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className='flex flex-col gap-4'
                >
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='scar_cause'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>علت ایجاد زخم</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='لطفا تمامی اطلاعات مربوط به نحوه و علت ایجاد زخم بنویسید...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <FormField
                            control={form.control}
                            name='scar_duration'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>مدت ابتلا به زخم</FormLabel>
                                    <FormControl>
                                        <Input placeholder='مثلا سه روز، دو هفته، یک ماه...' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row w-full gap-2'>
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

export default ScarStep
