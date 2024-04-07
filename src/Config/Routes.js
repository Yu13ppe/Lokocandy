import { Main } from '../Components/Main';
import { LokAdm } from '../Adm/LokAdm';
import { Dashboard } from '../Adm/Dashboard';

const Routes = [
    {
        title: 'LokAdm',
        path: '/LokAdm',
        component: LokAdm,
    },
    {
        title: 'Dashboard',
        path: '/Dashboard',
        component: Dashboard,
    },
    {
        title: '',
        path: '/',
        component: Main,
    }
]

export default Routes;