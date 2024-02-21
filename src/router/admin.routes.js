import UsersView from '@/views/admin/users/UsersView';
import UsersDetail from '@/views/admin/users/UsersDetail';
import DashboardChart from '@/views/admin/dashboard/DashboardChart';

const adminRoutes = [
    { path: '/admin', component: DashboardChart, name: 'DashboardChart' },
    { path: '/admin/customers', component: UsersView, name: 'customers' },
    { path: '/admin/customers/:id', component: UsersDetail, name: 'customersDetails', props:true }
];
  
export default adminRoutes;