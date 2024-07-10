import { z } from 'zod';

const phone_regex = /^09\d{9}$/

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formSchema = z.object({
    name: z.string({ required_error: 'وارد کردن نام الزامی می‌باشد' }).min(3, {
        message: 'نام حداقل باید 3 کاراکتر باشد',
    }),
    fname: z.string({ required_error: 'وارد کردن نام خانوادگی الزامی می‌باشد' }).min(3, {
        message: 'نام خانوادگی حداقل باید 3 کاراکتر باشد',
    }),
    age: z.string({ required_error: 'وارد کردن سن الزامی می‌باشد' }).min(1, 'وارد کردن سن الزامی می‌باشد'),
    weight: z.string({ required_error: 'وارد کردن وزن الزامی می‌باشد' }).min(1, 'وارد کردن وزن الزامی می‌باشد'),
    gender: z.enum(['male', 'female'], { required_error: 'وارد کردن جنسیت الزامی می‌باشد' }),
    images: z
        .any()
        .refine((files) => files?.length > 1, "آپلود حداقل دو عکس الزامی است.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `حداکثر سایز فایل باید 5 مگابایت باشد`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp فرمت های قابل قبول است"
        ),
    scar_cause: z.string({ required_error: 'وارد کردن این فیلد الزامی می‌باشد' }).min(3, {
        message: 'حداقل باید 3 کاراکتر باشد',
    }),
    scar_duration: z.string().optional(),
    ul_disease: z.string({ required_error: 'وارد کردن این فیلد الزامی می‌باشد' }).min(3, {
        message: 'حداقل باید 3 کاراکتر باشد',
    }).optional(),
    disease_background: z.string({ required_error: 'وارد کردن این فیلد الزامی می‌باشد' }).min(3, {
        message: 'حداقل باید 3 کاراکتر باشد',
    }),
    meds: z.string().optional(),
    activity: z.enum(['sedentary', 'moderate', 'active']).optional(),
    location: z.enum(['hospital', 'elderly_home', 'home']).optional(),
    smoke: z.boolean().optional(),
    fatness: z.boolean().optional(),
    alcohol: z.boolean().optional(),
    diaper: z.boolean().optional(),
    phone_number: z.string({ message: 'وارد کردن شماره موبایل الزامی می‌باشد' }).regex(phone_regex, 'شماره موبایل صحیح نمی‌باشد'),
});

export const personal_step_schema = formSchema.pick({ name: true, fname: true, age: true, weight: true, gender: true })
export const images_step_schema = formSchema.pick({ images: true })
export const scar_step_schema = formSchema.pick({ scar_cause: true, scar_duration: true })
export const medical_step_schema = formSchema.pick({ ul_disease: true, disease_background: true, meds: true })
export const lifestyle_step_schema = formSchema.pick({ activity: true, location: true, smoke: true, fatness: true, alcohol: true, diaper: true })
export const pn_step_schema = formSchema.pick({ phone_number: true })