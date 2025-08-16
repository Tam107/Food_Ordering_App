import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "@/AppRoutes.tsx";
import "./global.css"
import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

/**
 * An instance of QueryClient used to manage queries, caching, and background updating in an application.
 *
 * This instance is configured with default options that control the behavior of queries:
 * - `refetchOnWindowFocus`: Determines whether queries should refetch data when the window regains focus. Set to `false`, preventing automatic refetching when the window is focused.
 * - `retry`: Specifies the number of retry attempts for failed queries. Set to `false`, disabling automatic retries on failure.
 *
 * This configuration is typically used to optimize query behavior and tailor it to specific application requirements.
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
})

console.log(queryClient)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <Auth0ProviderWithNavigate>
                    {/*handling auth0 in children(AppRoutes) eg. AuthCallbackPage*/}
                    <AppRoutes/>
                </Auth0ProviderWithNavigate>
            </QueryClientProvider>
        </Router>
    </StrictMode>,
)
