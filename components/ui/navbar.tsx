import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { Button } from './button'
import { ArrowLeft, ChevronLeft } from 'lucide-react'
const poppins = Poppins({ subsets: ['latin'], weight: '400' })
export default function Navbar() {
    return (
        <nav className='hidden h-24 flex-row-reverse items-center justify-between px-4 md:flex lg:px-16'>
            <Link href={'/'}>
                <span className={cn('text-3xl', poppins.className)}>
                    Wound<span className='text-blue-500'>Care</span>
                </span>
            </Link>
            <ul className='flex flex-row gap-4 text-lg'>
                <Link className='hover:text-blue-500' href={'/'}>
                    <li>خدمات</li>
                </Link>
                <Link className='hover:text-blue-500' href={'/'}>
                    <li>مختصصان</li>
                </Link>
                <Link href={'/'}>
                    <li>نظرات</li>
                </Link>
                <Link className='hover:text-blue-500' href={'/'}>
                    <li>تماس با ما</li>
                </Link>
            </ul>
            <span>
                <Button>
                    مشاوره رایگان
                    <ChevronLeft />
                </Button>
            </span>
        </nav>
    )
}
