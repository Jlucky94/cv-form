import {useGetApplicationQuery} from "api/apiSlice";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const ApplicationPage = () => {
    const {id} = useParams<string>()
    const {data: application, isSuccess} = useGetApplicationQuery(id!);

    useEffect(() => {
        console.log(application)
    }, [isSuccess])

    return (
        <div>
            Информация о резюме в консоль логе
        </div>
    );
};

export default ApplicationPage;