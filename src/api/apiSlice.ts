import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {FormInputType} from "utils/zodResolvers/validationSchema";


export const applicationApi = createApi({
    reducerPath: 'applicationApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
    endpoints: (builder) => ({
        createApplication: builder.mutation<void, FormInputType>({
            query: (application) => ({
                url: 'applications',
                method: 'POST',
                body: application,

            }),
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