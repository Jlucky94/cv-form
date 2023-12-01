import {z} from 'zod';

const isAtLeast18 = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }

    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDifference = today.getMonth() - date.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
        age--;
    }

    return age >= 18;
};
const BirthDateStringSchema = z.string({required_error: "Введите вашу дату рождения"}).refine(isAtLeast18, {
    message: "Возраст должен быть не менее 18 лет",
});

export const formSchema = z.object({
    lastName: z.string({required_error: 'Фамилия обязательна'}).regex(/^[А-Яа-яёЁ]+$/, 'Только кириллица'),
    firstName: z.string({required_error: 'Имя обязательно'}).regex(/^[А-Яа-яёЁ]+$/, 'Только кириллица'),
    patronymic: z.string({required_error: 'Отчество обязательно'}).regex(/^[А-Яа-яёЁ]+$/, 'Только кириллица'),
    birthDate: BirthDateStringSchema,
    birthPlace: z.string({required_error: 'Введите место рождения'}).regex(/^[А-Яа-яёЁ]+$/, 'Только кириллица'),
    resume: z.any({required_error: "'Загрузите ваше резюме.'"})
        .refine((file) => file?.length == 1, 'Загрузите ваше резюме.')
        .refine((file) => file[0]?.type === 'application/pdf', 'Формат файла должен быть PDF.')
        .refine((file) => file[0]?.size <= 1000000, `Резюме должно быть размером до 1МБ.`),
    about: z.string().optional(),
    jobDirection: z.enum(['frontend', 'backend', '']).refine(val => val !== '', 'Необходимо выбрать направление работы'),
    frameworksFrontend: z.array(z.string(),{required_error:'Выберите хотя бы 1 фреймворк'}).refine(arr=>arr.length!==0,'Выберите хотя бы 1 фреймворк'),
    customFrontendFrameworks: z.object({
        ssr: z.string({required_error: "Укажите фреймворк"}),
        uiKit: z.string({required_error: "Укажите фреймворк"}),
        stateManager: z.string({required_error: "Укажите фреймворк"}),
    }).optional(),
    frameworksBackend: z.array(z.string()).optional(),
    databaseBackendFrameworks: z.array(z.string()).optional(),
});

export type FormInputType = z.infer<typeof formSchema>;
