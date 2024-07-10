import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <div className='relative flex min-h-[100dvh] flex-col overflow-hidden bg-white text-black md:min-h-fit'>
            <Image
                className='md:hidden'
                src={'/doc.webp'}
                alt='doctor'
                fill={true}
                quality={50}
                style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
            <div className='absolute bottom-0 flex h-full w-full flex-col justify-end gap-2 bg-gradient-to-t from-white via-white via-20% to-transparent to-50% px-8 pb-6 md:hidden'>
                <span className='text-2xl'>نیاز به مشاوره تخصصی دارید؟</span>
                <span>در این صورت با پر کردن فرم زیر هر چه سریع تر به بهبودی زخم های خود کمک کنید</span>
                <Button className='bg-blue-500 text-white'>شروع</Button>
                <Button className='text-white'>تماس با ما</Button>
            </div>
            <div className='mt-8 hidden flex-row gap-4 px-4 md:flex lg:gap-8 lg:px-16'>
                <div className='flex w-full flex-col gap-8'>
                    <div className='max-w-fit rounded bg-blue-200/40 px-2 py-1 text-blue-500'>
                        ما به سلامت شما اهمیت می‌دهیم
                    </div>
                    <span className='text-3xl'>به راحتی با مشاوران و متخصصان ما در ارتباط باشید</span>
                    <span className='text-xl text-gray-400'>
                        برای درمان زخم های خود می‌توانید فرم زیر را پر کنید تا در اسرع وقت مختصصان ما با شما تماس
                        بگیرند. <br /> تمامی اطلاعات ارسالی شما محفوظ خواهد ماند.
                    </span>
                    <div className='flex w-full flex-row gap-4'>
                        <Button className='w-full max-w-36 bg-blue-500 text-white hover:bg-blue-400'>شروع</Button>
                        <Button className='w-full max-w-36 text-white'>تماس با ما</Button>
                    </div>
                    <div className='flex flex-row items-center justify-start divide-x-2 divide-x-reverse divide-gray-200'>
                        <span className='text-3xl'>
                            12<span className='text-blue-500'>+</span>
                        </span>
                        <span className='mr-2 pr-2 text-xl text-gray-400'>سال سابقه در زمینه درمان </span>
                    </div>
                    <div className='grid w-full grid-cols-3 gap-4'>
                        <Card className='flex min-h-96 w-full flex-col overflow-hidden'>
                            <CardContent className='relative w-full flex-1'>
                                <Image src={'/d1.webp'} fill={true} alt='doc' style={{ objectFit: 'cover' }} />
                            </CardContent>
                            <CardFooter className='flex h-2/5 flex-col items-start py-2'>
                                <span className='text-lg'>دکتر قبادی</span>
                                <span className='text-lg text-gray-400'>متخصص پوست و مو</span>
                                <Button className='mt-4 w-full'>رزرو وقت</Button>
                            </CardFooter>
                        </Card>
                        <Card className='flex min-h-96 w-full flex-col overflow-hidden'>
                            <CardContent className='relative w-full flex-1'>
                                <Image
                                    src={'/d2.webp'}
                                    fill={true}
                                    alt='doc'
                                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                                />
                            </CardContent>
                            <CardFooter className='flex h-2/5 flex-col items-start py-2'>
                                <span className='text-lg'>دکتر حسینی</span>
                                <span className='text-lg text-gray-400'>متخصص پوست و مو</span>
                                <Button className='mt-4 w-full'>رزرو وقت</Button>
                            </CardFooter>
                        </Card>
                        <Card className='flex min-h-96 w-full flex-col overflow-hidden'>
                            <CardContent className='relative w-full flex-1'>
                                <Image
                                    src={'/d3.webp'}
                                    fill={true}
                                    alt='doc'
                                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                                />
                            </CardContent>
                            <CardFooter className='flex h-2/5 flex-col items-start py-2'>
                                <span className='text-lg'>دکتر احمدی</span>
                                <span className='text-lg text-gray-400'>متخصص پوست و مو</span>
                                <Button className='mt-4 w-full'>رزرو وقت</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className='relative mx-auto w-full overflow-hidden rounded-xl p-12 shadow-lg'>
                    <Image
                        src={'/doc3.png'}
                        alt='doctor'
                        fill={true}
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                </div>
            </div>
        </div>
    )
}
