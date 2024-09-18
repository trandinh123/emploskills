import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/reactQuery';
import { projectManagementApis, projectManagementKeys } from './projectManagement.api';

export const getProjectsQueryOptions = () => {
    return queryOptions({
        queryKey: [projectManagementKeys.GET_PROJECTS],
        queryFn: projectManagementApis.getProjects,
        select: data => data.data,
    });
};

type UseGetProjectsOptions = QueryConfig<typeof getProjectsQueryOptions>;

export const useGetProjects = (queryConfig: UseGetProjectsOptions = {}) => {
    return useQuery({
        ...getProjectsQueryOptions(),
        ...queryConfig,
    });
};