import {Toaster} from "@/components/ui/toaster";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render} from "@testing-library/react";

export const renderComponent = (component: React.ReactNode, {queryClient = new QueryClient()} = {}) => {
    return render(
        <QueryClientProvider client={queryClient}>
            {component}
            <Toaster />
        </QueryClientProvider>
    );
};
