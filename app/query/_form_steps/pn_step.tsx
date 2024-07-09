import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { pn_step_schema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface StepProps {
    formData: Partial<z.infer<typeof pn_step_schema>>
    setFormData: React.Dispatch<React.SetStateAction<Partial<z.infer<typeof pn_step_schema>>>>
    prevStep: () => void
    nextStep: () => void
}

const PnStep: React.FC<StepProps> = ({ formData, setFormData, prevStep, nextStep }) => {
    const form = useForm<z.infer<typeof pn_step_schema>>({
        resolver: zodResolver(pn_step_schema),
        defaultValues: formData,
    })

    const onSubmit: SubmitHandler<z.infer<typeof pn_step_schema>> = data => {
        setFormData(prev => ({ ...prev, ...data }))
        nextStep()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div
                    className='flex flex-col gap-1'
                    key={6}
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -200, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FormField
                        control={form.control}
                        name='phone_number'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>شماره موبایل</FormLabel>
                                <FormControl>
                                    <Input type='tel' placeholder='09123456789' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </motion.div>
                <div className='flex flex-row w-full gap-2 mt-4'>
                    <Button className='w-full bg-green-500 hover:bg-green-400' type='submit'>
                        تایید
                    </Button>
                    <Button type='button' className='w-full' onClick={prevStep}>
                        قبلی
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default PnStep
