
import { useRoutes } from 'react-router-dom';
import LayoutComponent from '../../components/Layout/layout';
import {SignUpComponent} from "../../components/Autorization/signin/sigin";
import {LoginInComponent} from "../../components/Autorization/login/login";
import ProtectedRouteAuth from './ProtectedRouteAuth';


function Routes() {
    let routes = useRoutes([
        {
            path: "*",
            element: <LayoutComponent/>
        },
        {
            path: "auth/*",
            children: [
                {
                    path: "login",
                    element:  <ProtectedRouteAuth element={<LoginInComponent/>} />,

                },
                {
                    path: "signup",
                    element: <SignUpComponent/>
                }
            ]
        }
    ]);
    return routes
}


export default Routes