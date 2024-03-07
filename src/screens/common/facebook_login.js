
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from "react-native-fbsdk";
import { BASE_URL } from "../../constant/api";
import { keys, setValue, getValue } from "../../helpers/Storage";
import NetworkUtils from "./NetworkUtills";

checkNetworkFacebookLogin = async (setIsLoading, navigation) => {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
        perFormFacebookLogin(setIsLoading, navigation);
    } else {

    }
}

export function loginWithFacebook(setIsLoading, navigation) {
    checkNetworkFacebookLogin(setIsLoading, navigation);
};

function perFormFacebookLogin(setIsLoading, navigation) {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', "email"]).then(
        login => {
            if (login.isCancelled) {
                console.log('Login cancelled');
            } else {
                AccessToken.getCurrentAccessToken().then(data => {
                    const accessToken = data.accessToken.toString();
                    getInfoFromToken(accessToken, setIsLoading, navigation);
                });
            }
        },
        error => {
            console.log('Login fail with error: ' + error);
        },
    );
}

function getInfoFromToken(token, setIsLoading, navigation) {
    const PROFILE_REQUEST_PARAMS = {
        fields: {
            string: 'id, name,  first_name, last_name, email, picture.width(400).height(400)'
        },
    };
    const profileRequest = new GraphRequest(
        '/me',
        { token, parameters: PROFILE_REQUEST_PARAMS },
        (error, result) => {
            if (error) {
                console.log('login info has error: ' + error);
            } else {
                console.log(JSON.stringify(result));
                //this.setState({userInfo: result});
                console.log('result:', result);
                FacebookLogin(result, setIsLoading, navigation);
            }
        },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
};

function FacebookLogin(json, setIsLoading, navigation) {
    var data = new FormData();
    data.append('id', json.id);
    data.append('firstname', json.first_name);
    data.append('lastname', json.last_name);
    data.append('email', json.email);
    data.append('pic_url', json.picture.data.url);

    console.log('method called ' + JSON.stringify(data));
    setIsLoading(true);

    fetch(BASE_URL + 'fb-user.php', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data,
    })
        .then((response) => response.json())
        .then((responseJson) => {
            setIsLoading(false);
            parseResponse(responseJson, navigation);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
}

function parseResponse(responseJson, navigation) {
    console.log('response object:' + JSON.stringify(responseJson));
    if (responseJson.success) {
        console.log('user id :' + responseJson.user_id);

        setValue(keys.USER_ID, responseJson.user_id);
        setValue(keys.USER_NAME, responseJson.user_name);
        setValue(keys.TOKEN, responseJson.token_id);
        setValue(keys.USER_EMAIL, responseJson.user_email);
        setValue(keys.USER_PIC, responseJson.pic_url);

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
    } else {
        alert(responseJson.message ? responseJson.message : 'Something went wrong.');
    }
}