import { createStackNavigator } from "react-navigation";

import Camera from "../screens/Camera"; //inicio
import Results from "../screens/Results"; //inicio
import { withNavigation } from "react-navigation";
export const Root = createStackNavigator(
  {
    CameraScreen: {
      screen: Camera,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    ResultsScreen: {
      screen: Results,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
    //MaterialScreen: {
    //  screen: MaterialsScreen
    //}
  },
  { headerMode: "none" }
);
