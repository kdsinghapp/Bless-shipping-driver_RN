
import { base_url } from './index';
import { endpoints } from './endpoints';
import ScreenNameEnum from '../routes/screenName.enum';
import { loginSuccess, logout } from '../redux/feature/authSlice';
import { errorToast, successToast } from '../utils/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogout = async (dispatch: any) => {
  try {
    dispatch(logout());    // reset Redux state
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

const saveAuthData = async (userData: any, token: any) => {
  try {
    await AsyncStorage.setItem('authData', JSON.stringify({ userData, token }));
    console.log('Auth data saved successfully');
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};
const getAuthData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('authData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading auth data:', error);
    return null;
  }
};

export interface LoginApiParam {
  email: string;
  password: string;
  dispatch: any;
  navigation: any;
}

const LogiApi = async (
  param: LoginApiParam,
  setLoading: (loading: boolean) => void,
): Promise<any> => {
  try {
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const formdata = new FormData();
    formdata.append('email', param?.email ?? '');
    formdata.append('password', param?.password ?? '');

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(`${base_url}/${endpoints.Login}`, requestOptions);
    const text = await response.text();

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      errorToast('Invalid server response');
      return undefined;
    }
 

    if (parsed?.status == '1') {
      const userData = parsed?.result;
      const token = parsed?.result?.access_token;
      successToast(parsed?.message ?? 'Login successful');
      param.dispatch(loginSuccess({ userData, token }));
      if (token) {
        await AsyncStorage.setItem('token', token);
      }
      param.navigation.reset({
        index: 0,
        routes: [{ name: ScreenNameEnum.DeliveryDrawer }],
      });
      return parsed;
    } 
    if(parsed?.status === "0"){
  errorToast(parsed?.message)
}
  } catch (error) {
    console.error('Login error:', error);
    errorToast('Network error');
    return undefined;
  } finally {
    setLoading(false);
  }
};


export {
  LogiApi,

  handleLogout,
  getAuthData,

  saveAuthData,

}  