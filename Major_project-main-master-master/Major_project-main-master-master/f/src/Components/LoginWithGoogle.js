
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

function LoginWithGoogle(){

    useGoogleOneTapLogin({
        onError: error => console.log(error),
        onSuccess: response => console.log(response),
        googleAccountConfigs: {
          client_id:"177775215506-ung3a2fq9rilrq19n6it14hqea8j1aso.apps.googleusercontent.com"
        },
      });

    return(
        <>
          
        </>
    )
}
export default LoginWithGoogle;