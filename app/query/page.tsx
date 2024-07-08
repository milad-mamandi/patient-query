'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ImageDrag from '@/components/ui/imagedd'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { DirectionProvider } from '@radix-ui/react-direction'
import { ChangeEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

type formData = {
	personalInfo: {
		name: string
		fname: string
		age: string
		weight: string
		gender: string
	}
	images: { urls: File[] }
	scarInfo: { cause: string; duration: string }
	medicalInfo: {
		underlying_diseases: string
		disease_background: string
		meds: string
	}
	otherInfo: { activity: string; location: string }
	lifestyleInfo: {
		smoke: boolean
		fat: boolean
		alcohol: boolean
		diaper: boolean
	}
}

type formParams = {
	data: formData
	handler: (
		form: keyof formData,
		field: string,
		value: string | boolean | File[]
	) => void
}

export default function Query() {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	watch,
	// 	formState: { errors },
	// } = useForm()
	const [state, setState] = useState(0)
	const [data, setData] = useState<formData>({
		personalInfo: {
			name: '',
			fname: '',
			age: '',
			weight: '',
			gender: '',
		},
		images: { urls: [] },
		scarInfo: { cause: '', duration: '' },
		medicalInfo: {
			underlying_diseases: '',
			disease_background: '',
			meds: '',
		},
		otherInfo: { activity: '', location: '' },
		lifestyleInfo: {
			smoke: false,
			fat: false,
			alcohol: false,
			diaper: false,
		},
	})
	const { toast } = useToast()

	const handleChange = (
		form: keyof formData,
		field: string,
		value: string | boolean | File[]
	) => {
		setData((prev) => ({
			...prev,
			[form]: {
				...prev[form],
				[field]: value,
			},
		}))
	}
	const nextPage = () => {
		switch (state) {
			case 0:
		}
		if (state < 6) setState((prev) => prev + 1)
	}
	const prevPage = () => {
		if (state > 0) setState((prev) => prev - 1)
	}
	return (
		<div className='flex flex-col items-center justify-center min-h-[100dvh] bg-[#f0f8ff] relative overflow-hidden text-black'>
			<div className='flex flex-col min-w-[500px] p-12 rounded-md backdrop-blur-lg'>
				<AnimatePresence mode='wait'>
					{state === 0 && (
						<PersonalInfo
							data={data}
							handler={handleChange}
						/>
					)}
					{state === 1 && (
						<ImagesInfo
							data={data}
							handler={handleChange}
						/>
					)}
					{state === 2 && (
						<ScarInfo
							data={data}
							handler={handleChange}
						/>
					)}
					{state === 3 && (
						<MedicalInfo
							data={data}
							handler={handleChange}
						/>
					)}
					{state === 4 && (
						<OtherInfo
							data={data}
							handler={handleChange}
						/>
					)}
					{state === 5 && (
						<PhoneNumber
							data={data}
							handler={handleChange}
						/>
					)}
					{state === 6 && (
						<div className='flex items-center justify-center flex-col gap-8'>
							<span className='text-3xl font-bold'>
								اطلاعات با
								موفقیت ثبت شد
							</span>
							<Check
								size={64}
								color='#22c55e'
							/>
							<Button
								onClick={() => {
									navigator.clipboard.writeText(
										String(
											JSON.stringify(
												data
											)
										)
									)
									toast({
										title: 'با موفیقت انجام شد',
										description:
											'تمامی اطلاعات به صورت JSON در کلیپ‌بورد شما ذخیره شد',
									})
								}}>
								دریافت اطلاعات
								به صورت JSON
							</Button>
						</div>
					)}
					<motion.div
						className='flex flex-row w-full gap-2 mt-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}>
						{state < 5 && (
							<Button
								className='w-full bg-blue-500 hover:bg-blue-400'
								onClick={
									nextPage
								}>
								ادامه
							</Button>
						)}
						{state == 5 && (
							<Button
								className='w-full bg-green-500 hover:bg-green-400'
								onClick={
									nextPage
								}>
								تایید
							</Button>
						)}
						{state == 0 && (
							<Button
								className='w-full bg-red-500 hover:bg-red-400'
								onClick={
									prevPage
								}>
								خروج
							</Button>
						)}
						{state > 0 && state < 6 && (
							<Button
								className='w-full'
								onClick={
									prevPage
								}>
								قبلی
							</Button>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}

const PersonalInfo = ({ data, handler }: formParams) => {
	return (
		<motion.div
			className='flex flex-col gap-2'
			key={1}
			initial={{ x: 200, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -200, opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<span className='text-3xl '>
				اطلاعات شخصی خود را پر کنید.
			</span>
			<div className='flex flex-row gap-2 mt-8'>
				<Input
					type='text'
					placeholder='نام'
					value={data.personalInfo.name}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'personalInfo',
							'name',
							e.target.value
						)
					}
				/>
				<Input
					type='text'
					placeholder='نام خانوادگی'
					value={data.personalInfo.fname}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'personalInfo',
							'fname',
							e.target.value
						)
					}
				/>
			</div>
			<div className='flex flex-row gap-2'>
				<Input
					type='number'
					placeholder='سن'
					value={data.personalInfo.age}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'personalInfo',
							'age',
							e.target.value
						)
					}
				/>
				<Input
					type='number'
					placeholder='وزن (به کیلو)'
					value={data.personalInfo.weight}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'personalInfo',
							'weight',
							e.target.value
						)
					}
				/>
			</div>
			<div className='flex flex-col'>
				<DirectionProvider dir='rtl'>
					<Select
						value={data.personalInfo.gender}
						onValueChange={(val) =>
							handler(
								'personalInfo',
								'gender',
								val
							)
						}>
						<SelectTrigger>
							<SelectValue placeholder='جنسیت' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='male'>
								مذکر
							</SelectItem>
							<SelectItem value='female'>
								مونث
							</SelectItem>
						</SelectContent>
					</Select>
				</DirectionProvider>
			</div>
		</motion.div>
	)
}
const ImagesInfo = ({ data, handler }: formParams) => {
	return (
		<motion.div
			key={2}
			initial={{ x: 200, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -200, opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<div className='flex flex-col gap-1'>
				<span className='text-2xl'>
					لطفا حداقل دو عکس از محل زخم آپلود کنید
				</span>
				<span className='mt-2 text-slate-500'>
					عکس ها در زوایای مناسب و با وضوح و نور
					کاری گرفته شوند
				</span>
				<span className='text-slate-500'>
					استفاده از خط کش تریتا جهت ارسال عکس و
					مشاوره الزامی میباشد.
				</span>
			</div>
			<ImageDrag
				value={data.images.urls}
				onChange={(val) =>
					handler('images', 'urls', val)
				}
			/>
		</motion.div>
	)
}
const ScarInfo = ({ data, handler }: formParams) => {
	return (
		<motion.div
			key={3}
			initial={{ x: 200, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -200, opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<div className='flex flex-col gap-4'>
				<div className='flex flex-col gap-1'>
					<label htmlFor='scar_reason'>
						علت ایجاد زخم
					</label>
					<Textarea
						id='scar_reason'
						placeholder='لطفا تمامی اطلاعات مربوط به نحوه و علت ایجاد زخم بنویسید...'
						value={data.scarInfo.cause}
						onChange={(
							e: ChangeEvent<HTMLTextAreaElement>
						) =>
							handler(
								'scarInfo',
								'cause',
								e.target.value
							)
						}
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='scar_duration'>
						مدت ابتلا به زخم
					</label>
					<Input
						id='scar_duration'
						placeholder='مثلا سه روز، دو هفته، یک ماه...'
						value={data.scarInfo.duration}
						onChange={(
							e: ChangeEvent<HTMLInputElement>
						) =>
							handler(
								'scarInfo',
								'duration',
								e.target.value
							)
						}
					/>
				</div>
			</div>
		</motion.div>
	)
}
const MedicalInfo = ({ data, handler }: formParams) => {
	return (
		<motion.div
			className='flex flex-col gap-4'
			key={4}
			initial={{ x: 200, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -200, opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<div className='flex flex-col gap-1'>
				<label htmlFor='ul_disease'>
					بیماری های زمینه ای:
				</label>
				<Input
					value={
						data.medicalInfo
							.underlying_diseases
					}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'medicalInfo',
							'underlying_diseases',
							e.target.value
						)
					}
					id='ul_disease'
					placeholder='مانند دیابت، سرطان، مشکلات قلبی...'
				/>
			</div>
			<div className='flex flex-col gap-1'>
				<label htmlFor='disease_background'>
					سابقه بیماری:
				</label>
				<Input
					id='disease_background'
					value={
						data.medicalInfo
							.disease_background
					}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'medicalInfo',
							'disease_background',
							e.target.value
						)
					}
					placeholder='مانند سرخک، سل، سیفلیس...'
				/>
			</div>
			<div className='flex flex-col gap-1'>
				<label htmlFor='meds'>داری های مصرفی:</label>
				<Input
					id='meds'
					value={data.medicalInfo.meds}
					onChange={(
						e: ChangeEvent<HTMLInputElement>
					) =>
						handler(
							'medicalInfo',
							'meds',
							e.target.value
						)
					}
					placeholder='تمامی داروهایی که مصرف میکنید را بنویسید...'
				/>
			</div>
		</motion.div>
	)
}
const OtherInfo = ({ data, handler }: formParams) => {
	return (
		<motion.div
			className='flex flex-col gap-6'
			key={5}
			initial={{ x: 200, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -200, opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<div className='flex flex-col gap-1'>
				<label>میزان فعالیت:</label>
				<DirectionProvider dir='rtl'>
					<Select
						value={data.otherInfo.activity}
						onValueChange={(val) =>
							handler(
								'otherInfo',
								'activity',
								val
							)
						}>
						<SelectTrigger>
							<SelectValue placeholder='میزان تحرک' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='sedentary'>
								بی تحرک - ورزش
								کم یا اصلا ورزش
								نمی‌کنم
							</SelectItem>
							<SelectItem value='moderate'>
								نسبتا فعال -
								حداقل روزی یک
								ساعت تحرک دارم
							</SelectItem>
							<SelectItem value='system'>
								پر تحرک - به
								صورت متداوم ورزش
								می‌کنم
							</SelectItem>
						</SelectContent>
					</Select>
				</DirectionProvider>
			</div>
			<div className='flex flex-col gap-1'>
				<label>محل نگه‌داری بیمار:</label>
				<DirectionProvider dir='rtl'>
					<Select
						value={data.otherInfo.location}
						onValueChange={(val) =>
							handler(
								'otherInfo',
								'location',
								val
							)
						}>
						<SelectTrigger>
							<SelectValue placeholder='محل نگه‌داری' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='hospital'>
								بیمارستان
							</SelectItem>
							<SelectItem value='elderly_home'>
								خانه سالمندان
							</SelectItem>
							<SelectItem value='home'>
								خانه
							</SelectItem>
						</SelectContent>
					</Select>
				</DirectionProvider>
			</div>
			<div>
				<span className='text-xl'>
					وضعیت بهداشتی و زندگی:
				</span>
				<div className='flex flex-row gap-8 mt-4'>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center gap-1'>
							<Checkbox
								id='smoke'
								checked={
									data
										.lifestyleInfo
										.smoke
								}
								onCheckedChange={(
									val
								) =>
									handler(
										'lifestyleInfo',
										'smoke',
										val
									)
								}
							/>
							<label
								htmlFor='smoke'
								className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								استعمال دخانیات
							</label>
						</div>
						<div className='flex items-center gap-1'>
							<Checkbox
								id='fatness'
								checked={
									data
										.lifestyleInfo
										.fat
								}
								onCheckedChange={(
									val
								) =>
									handler(
										'lifestyleInfo',
										'fat',
										val
									)
								}
							/>
							<label
								htmlFor='fatness'
								className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								چاقی
							</label>
						</div>
					</div>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center gap-1'>
							<Checkbox
								id='alcohol'
								checked={
									data
										.lifestyleInfo
										.alcohol
								}
								onCheckedChange={(
									val
								) =>
									handler(
										'lifestyleInfo',
										'alcohol',
										val
									)
								}
							/>
							<label
								htmlFor='alcohol'
								className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								مصرف الکل
							</label>
						</div>
						<div className='flex items-center gap-1'>
							<Checkbox
								id='diaper'
								checked={
									data
										.lifestyleInfo
										.diaper
								}
								onCheckedChange={(
									val
								) =>
									handler(
										'lifestyleInfo',
										'diaper',
										val
									)
								}
							/>
							<label
								htmlFor='diaper'
								className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								نیاز به استفاده
								پوشک یا ایزی
								لایف
							</label>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
const PhoneNumber = ({ data, handler }: formParams) => {
	return (
		<motion.div
			className='flex flex-col gap-1'
			key={6}
			initial={{ x: 200, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -200, opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<label htmlFor='tel'>
				شماره موبایل خود را وارد کنید:
			</label>
			<Input type='tel' placeholder='09123456789' id='tel' />
		</motion.div>
	)
}
