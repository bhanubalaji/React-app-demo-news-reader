
import { useRoutes } from 'react-router-dom';
import LayoutComponent from '../../components/Layout/layout';

function Routes() {
    let routes = useRoutes([
        {
            path: "*",
            element: <LayoutComponent/>
        }
    ]);
    return routes
}


export default Routes