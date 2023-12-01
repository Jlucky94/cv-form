import {Controller, useForm} from 'react-hook-form';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel, FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
    Typography
} from '@mui/material';
import {FormInputType, formSchema} from "utils/zodResolvers/validationSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import styles from './ApplicationForm.module.scss'
import {useEffect, useState} from "react";
import {useCreateApplicationMutation} from "api/apiSlice";


export const ApplicationForm = () => {
    const [createApplication] = useCreateApplicationMutation();

    const [backendInput, setBackendInput] = useState('') // Для кастомных БД

    const [selectedFrontendFrameworks, setSelectedFrontendFrameworks] = useState<string[]>([]);
    const [selectedBackendFrameworks, setSelectedBackendFrameworks] = useState<string[]>([]);
    const [customBackendFrameworks, setCustomBackendFrameworks] = useState<string[]>([]); // Для кастомных БД

    const {control, handleSubmit, register, watch, setValue, formState: {errors}} = useForm<FormInputType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jobDirection: ''
        }
    });
    const jobDirection = watch('jobDirection')

    const handleFrontendFrameworkChange = (framework: string, isChecked: boolean) => {
        setSelectedFrontendFrameworks(prev => {
            const updatedFrameworks = isChecked ? [...prev, framework] : prev.filter(f => f !== framework);
            setValue('frameworksFrontend', updatedFrameworks);
            return updatedFrameworks;
        });
    };
    const handleBackendFrameworkChange = (framework: string, isChecked: boolean) => {
        setSelectedBackendFrameworks(prev => {
            const updatedFrameworks = isChecked ? [...prev, framework] : prev.filter(f => f !== framework);
            setValue('frameworksBackend', updatedFrameworks);
            return updatedFrameworks;
        });
    };

    const handleAddCustomBackendFramework = () => {
        setCustomBackendFrameworks(prev => [...prev, backendInput])
        setValue('databaseBackendFrameworks', customBackendFrameworks)
        setBackendInput('')
    }
    const handleDeleteCustomBackendFramework = (index: number) => {
        const arr = customBackendFrameworks.filter((_, i) => index !== i)
        setCustomBackendFrameworks(arr)
        setValue('databaseBackendFrameworks', customBackendFrameworks)
    }


    const onSubmit = async (data: FormInputType) => {
        console.log(data)
        try {
            console.log('try')
            createApplication(data);
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
        }
    };
    //TODO при смене направления зачищать фреймворки с другого направления
    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <div className={styles.fullName}>
                <Controller
                    name="lastName"
                    control={control}
                    render={({field}) => <TextField {...field} label="Фамилия" error={!!errors.lastName}
                                                    helperText={errors.lastName?.message}
                    />}
                />
                <Controller
                    name="firstName"
                    control={control}
                    render={({field}) => <TextField {...field} label="Имя" error={!!errors.firstName}
                                                    helperText={errors.firstName?.message}/>}
                />
                <Controller
                    name="patronymic"
                    control={control}
                    render={({field}) => <TextField {...field} label="Отчество" error={!!errors.patronymic}
                                                    helperText={errors.patronymic?.message}/>}
                />
            </div>
            <div className={styles.birthInfo}>
                <Controller
                    name="birthDate"
                    control={control}
                    render={({field}) => <TextField {...field} type="date" label="Дата рождения"
                                                    InputLabelProps={{shrink: true}} error={!!errors.birthDate}
                                                    helperText={errors.birthDate?.message}
                    />}
                />
                <Controller
                    name="birthPlace"
                    control={control}
                    render={({field}) => <TextField {...field} label="Место рождения" error={!!errors.birthPlace}
                                                    helperText={errors.birthPlace?.message}
                    />}
                />
            </div>
            <Controller
                name="resume"
                control={control}
                render={() => (
                    <input type="file" accept="application/pdf" {...register('resume', {required: true})} />
                )}
            />
            <Controller
                name="about"
                control={control}
                render={({field}) => <TextareaAutosize {...field} aria-label="Пара слов о себе" minRows={3}
                                                       placeholder="Пара слов о себе"/>}
            />
            <FormControl fullWidth>
                <InputLabel id="job-direction-label">Направление</InputLabel>
                <Controller
                    name="jobDirection"
                    control={control}
                    render={({field}) => (
                        <Select {...field} labelId="job-direction-label" label="Направление"
                                error={!!errors.jobDirection}>
                            <MenuItem value="">Выберите направление</MenuItem>
                            <MenuItem value="frontend">Фронтенд</MenuItem>
                            <MenuItem value="backend">Бекенд</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>
            {jobDirection === 'frontend' && (
                <>
                    <div>Опыт работы с фреймворками:</div>
                    <FormControl error={!!errors.frameworksFrontend}>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e) => handleFrontendFrameworkChange('React', e.target.checked)}
                                checked={selectedFrontendFrameworks.includes('React')}

                            />}
                            label="React"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e) => handleFrontendFrameworkChange('Angular', e.target.checked)}
                                checked={selectedFrontendFrameworks.includes('Angular')}/>}
                            label="Angular"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e) => handleFrontendFrameworkChange('Svelte', e.target.checked)}
                                checked={selectedFrontendFrameworks.includes('Svelte')}
                            />}
                            label="Svelte"
                        />
                        {errors.frameworksFrontend && (
                            <FormHelperText>{errors.frameworksFrontend?errors.frameworksFrontend.message:''}</FormHelperText>
                        )}
                    </FormControl>
                    <div className={styles.customFrontendFrameworks}>
                        <Controller
                            name="customFrontendFrameworks.ssr"
                            control={control}
                            render={({field}) => <TextField {...field} label="Любимый SSR-фреймворк"
                                                            error={!!errors.customFrontendFrameworks?.ssr}
                                                            helperText={errors.customFrontendFrameworks?.ssr?.message}
                            />}
                        />
                        <Controller
                            name="customFrontendFrameworks.uiKit"
                            control={control}
                            render={({field}) => <TextField {...field} label="Любимый фреймворк для разметки"
                                                            error={!!errors.customFrontendFrameworks?.uiKit}
                                                            helperText={errors.customFrontendFrameworks?.uiKit?.message}
                            />}
                        />
                        <Controller
                            name="customFrontendFrameworks.stateManager"
                            control={control}
                            render={({field}) => <TextField {...field} label="Любимый стейт менеджер"
                                                            error={!!errors.customFrontendFrameworks?.stateManager}
                                                            helperText={errors.customFrontendFrameworks?.stateManager?.message}
                            />}
                        />
                    </div>
                </>
            )}

            {jobDirection === 'backend' && (
                <>
                    <div>
                        <Typography>Опыт работы с фреймворками</Typography>
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e) => handleBackendFrameworkChange('Express', e.target.checked)}
                                checked={selectedBackendFrameworks.includes('Express')}/>}
                            label="Express"
                        />
                        <FormControlLabel
                            control={<Checkbox
                                onChange={(e) => handleBackendFrameworkChange('Spring boot', e.target.checked)}
                                checked={selectedBackendFrameworks.includes('Spring boot')}/>}
                            label="Spring boot"
                        />
                        <FormControlLabel
                            control={<Checkbox onChange={(e) => handleBackendFrameworkChange('Nest', e.target.checked)}
                                               checked={selectedBackendFrameworks.includes('Nest')}/>}
                            label="Nest"
                        />
                    </div>
                    <div className={styles.customFrontendFrameworks}>
                        <Typography>Опыт работы с БД :</Typography>
                        <div>
                            <div className={styles.customBackendFrameworks}>
                                {customBackendFrameworks.map((fw, i) => <Typography>{fw}
                                    <Button onClick={() => handleDeleteCustomBackendFramework(i)}
                                            style={{color: "red"}}>X</Button>
                                </Typography>)}
                            </div>
                            <div style={{marginTop: 20}}>
                                <TextField value={backendInput} onChange={(e) => setBackendInput(e.target.value)}/>
                                <Button
                                    type={"submit"}
                                    style={{marginLeft: 20}}
                                    variant={"contained"}
                                    onClick={handleAddCustomBackendFramework}>Добавить</Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Button type="submit" className={styles.submitButton}>Отправить</Button>
        </form>
    );
};
