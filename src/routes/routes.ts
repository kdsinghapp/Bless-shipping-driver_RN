import OnboardingScreen from "../screen/auth/Onboarding/Onboarding";
import ScreenNameEnum from "./screenName.enum";
import NotificationsScreen from "../screen/Notification/Notification";
import Sinup from "../screen/auth/sinup/Sinup";
import ChangePassword from "../screen/Profile/ChangePassword/ChangePassword";
import HelpScreen from "../screen/Profile/Help/Helps";
import Splash from "../screen/auth/Splash/Splash";
import PhoneLogin from "../screen/auth/PhoneLogin/PhoneLogin";
import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import LegalPoliciesScreen from "../screen/Profile/LegalPoliciesScreen";
import PrivacyPolicy from "../screen/Profile/PrivacyPolicy";
import EditProfile from "../screen/Profile/EditProfile/EditProfile";
import VehicleSelectionScreen from "../screen/auth/VehicleSelection/VehicleSelectionScreen";

import ChooseRole from "../screen/auth/ChooseRole/ChooseRole";
import MerchantDrawerNavigator from "../navigators/MerchantDrawerNavigator";
import DeliveryDrawerNavigator from "../navigators/DeliveryDrawerNavigator";
import DeliveryDashboard from "../screen/DeliveryRole/DeliveryDashboard/DeliveryDashboard";
import DeliveryOrdersList from "../screen/DeliveryRole/DeliveryOrdersList/DeliveryOrdersList";
import DeliveryRequestScreen from "../screen/DeliveryRole/DeliveryRequestScreen/DeliveryRequestScreen";
import DeliveryOrderDetailsScreen from "../screen/DeliveryRole/DeliveryOrderDetails/DeliveryOrderDetailsScreen";
import DeliveryFailedScreen from "../screen/DeliveryRole/DeliveryFailed/DeliveryFailedScreen";
 
import UserRoleLoginScreen from "../screen/auth/UserRoleLoginScreen/UserRoleLoginScreen";
 const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
    {
      name: ScreenNameEnum.Sinup,
      Component: Sinup,
    },
    {
      name: ScreenNameEnum.ChooseRole,
      Component: ChooseRole,
    },
    


    {
      name: ScreenNameEnum.UserRoleLoginScreen,
      Component: UserRoleLoginScreen,
    },
    
   
    





    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },


    {
      name: ScreenNameEnum.EditProfile,
      Component: EditProfile,
    },
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },


    {
      name: ScreenNameEnum.PhoneLogin,
      Component: PhoneLogin,
    },
 

    {
      name: ScreenNameEnum.changePassword,
      Component: ChangePassword,
    },

    {
      name: ScreenNameEnum.Help,
      Component: HelpScreen,
    },
    //    {
    //   name: ScreenNameEnum.TabNavigator,
    //   Component: TabNavigator,
    // },

    {
      name: ScreenNameEnum.PrivacyPolicy,
      Component: PrivacyPolicy,
    },
 
    {
      name: ScreenNameEnum.MerchantDrawer,
      Component: MerchantDrawerNavigator,
    },
    {
      name: ScreenNameEnum.DeliveryDrawer,
      Component: DeliveryDrawerNavigator,
    },
    {
      name: ScreenNameEnum.VEHICLE_SELECTION,
      Component: VehicleSelectionScreen,
    },
    {
      name: ScreenNameEnum.DeliveryHome,
      Component: DeliveryDashboard,
    },
    {
      name: ScreenNameEnum.DeliveryOrdersList,
      Component: DeliveryOrdersList,
    },
    {
      name: ScreenNameEnum.DeliveryRequest,
      Component: DeliveryRequestScreen,
    },
    
    {
      name: ScreenNameEnum.ProfileScreen,
      Component: EditProfile,
    },
    {
      name: ScreenNameEnum.DeliveryOrderDetails,
      Component: DeliveryOrderDetailsScreen,
    },
    {
      name: ScreenNameEnum.DeliveryFailed,
      Component: DeliveryFailedScreen,
    },
     
    
    
    {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component: LegalPoliciesScreen,
    },



    {
      name: ScreenNameEnum.NotificationsScreen,
      Component: NotificationsScreen,
    },
   

    //    {
    //   name: ScreenNameEnum.DocumentShow,
    //   Component: DocumentShow,
    // },

  ],


};

export default _routes;
