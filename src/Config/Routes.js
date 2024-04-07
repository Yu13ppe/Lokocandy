import { Main } from '../Components/Main';
import { LokAdm } from '../Adm/LokAdm';

const Routes = [
    {
        title: 'LokAdm',
        path: '/LokAdm',
        component: LokAdm,
    },
    {
        title: '',
        path: '/',
        component: Main,
    }
]

export default Routes;