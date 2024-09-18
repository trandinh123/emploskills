import { queryOptions, useQuery } from '@tanstack/react-query';
import { projectManagementApis, projectManagementKeys } from './projectManagement.api';

import { QueryConfig } from '@/lib/reactQuery';

export const getProjectQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: [projectManagementKeys.GET_PROJECT],
        queryFn: () => projectManagementApis.getProject({ id }),
    });
};

type UseProjectOptions = {
    id: number;
    queryConfig?: QueryConfig<typeof getProjectQueryOptions>;
};

export const useGetProject = ({
    id,
    queryConfig,
}: UseProjectOptions) => {
    return useQuery({
        ...getProjectQueryOptions(id),
        ...queryConfig,
    });
};