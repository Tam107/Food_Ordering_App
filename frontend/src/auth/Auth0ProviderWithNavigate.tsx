import {Auth0Provider} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({children}: Props) => {
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;


    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("unable to initialize Auth0ProviderWithNavigate: missing env vars");
        console.log("domain: ", domain, " clientId: ", clientId, " redirectUri: ", redirectUri)
    }

    // appState provide some stored data from the previous session
    // if take access token here will cause error: "wrap component in Auth0Provider" --
    // this is because the Auth0Provider is not yet initialized -> take from children
    // so we take the access token in AuthCallbackPage.tsx
    const onRedirectCallback = () => {
        //             createUser({auth0Id: user.sub, email: user.email})
        navigate("/auth-callback")
    }

    return (
        <Auth0Provider domain={domain} clientId={clientId}
                       authorizationParams={{
                           redirect_uri: redirectUri,
                           audience
                       }}
                       onRedirectCallback={onRedirectCallback}>
            {children}
        </Auth0Provider>
    )
}
export default Auth0ProviderWithNavigate
