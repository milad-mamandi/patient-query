import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[100dvh] bg-[#f0f8ff] relative overflow-hidden text-black'>
			<div className='flex flex-col gap-4 items-center justify-center px-8'>
				<span className='text-3xl'>
					نیاز به مشاوره دارید؟
				</span>
				<span className='text-xl text-gray-400 direction-reverse'>
					به سوالات زیر با دقت پاسخ دهید تا بتونیم
					دقیق تر به شما پلن درمانی بدیم
				</span>
				<div className='w-full flex flex-row gap-2'>
					<Link href='./query'>
						<Button className='w-28'>
							شروع
						</Button>
					</Link>
					<Button className='w-24 dark border-black border-[1px]'>
						تماس با ما
					</Button>
				</div>
			</div>
		</div>
	)
}
