'use client'

import { useEffect, useRef, useState } from 'react'
type props = {
    value: File[]
    onChange: (value: File[]) => void
}
const ImageDrag: React.FC<props> = ({ value, onChange }) => {
    const [images, setImages] = useState<File[]>(value)
    const fileInputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        onChange(images)
    }, [images])
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = Array.from(event.dataTransfer.files)
        setImages(prevImages => [...prevImages, ...files])
    }
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: File[] = Array.from(event.target.files || [])
        setImages(prevImages => [...prevImages, ...files])
    }
    const handleRemove = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }
    return (
        <div className='w-full max-w-4xl mx-auto py-4'>
            <input
                type='file'
                accept='image/*'
                multiple
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            <div
                onDragOver={event => event.preventDefault()}
                onDrop={handleDrop}
                onClick={handleClick}
                className='flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground rounded-lg p-4  cursor-pointer transition-colors hover:border-primary'
            >
                <UploadIcon className='w-12 h-12 mb-4 text-muted-foreground' />
                <h3 className='text-lg font-medium mb-2'>عکس ها را اینجا رها کنید</h3>
                <p className='text-muted-foreground'>یا اینجا کلیک کنید</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                {images.map((image, index) => (
                    <div key={index} className='relative rounded-lg overflow-hidden group'>
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index}`}
                            width={400}
                            height={400}
                            className='w-full h-full object-cover'
                        />
                        <button
                            onClick={() => handleRemove(index)}
                            className='absolute top-2 right-2 bg-background/80 text-muted-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity'
                        >
                            <XIcon className='w-4 h-4' />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function UploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
            <polyline points='17 8 12 3 7 8' />
            <line x1='12' x2='12' y1='3' y2='15' />
        </svg>
    )
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
        </svg>
    )
}
export default ImageDrag
