import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {FormInputType} from "utils/zodResolvers/validationSchema";


export const applicationApi = createApi({
    reducerPath: 'applicationApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://cv-form-back.vercel.app/" }),
    endpoints: (builder) => ({
        createApplication: builder.mutation<void, FormInputType>({
            query: (application) => {
                const formData = new FormData
                Object.keys(application).forEach((key) => {
                    const validKey = key as keyof FormInputType;
                    if (validKey !== 'resume') {
                        const value = application[validKey];
                        if (Array.isArray(value)) {
                            value.forEach(item => formData.append(validKey, item));
                        } else if (value && typeof value === 'object' && !(value instanceof File)) {
                            formData.append(validKey, JSON.stringify(value));
                        } else {
                            formData.append(validKey, value as string | Blob);
                        }
                    }
                });
                if(application.resume&&application.resume.length>0) {
                    formData.append('resume',application.resume[0])
                }
                console.log(formData)
                return{
                    url: 'applications',
                    method: 'POST',
                    body: formData,
                }
            },
        }),
        getApplication: builder.query<Application, string>({
            query: (id) => `applications/${id}`,
        }),
    }),
});

export const { useCreateApplicationMutation, useGetApplicationQuery } = applicationApi;


export interface Application {
    id?: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    birthDate: string;
    birthPlace: string;
    resume: File | null;
    about?: string;
    jobDirection: 'frontend' | 'backend';
    frameworksFrontend?: string[];
    frameworksBackend?: string[];
    customFrontendFrameworks?: {
        ssr: string;
        uiKit: string;
        stateManager: string;
    };
    customBackendFrameworks?: string[];
}