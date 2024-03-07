import UsersView from '@/views/admin/users/UsersView';
import UsersDetail from '@/views/admin/users/UsersDetail';
import DashboardChart from '@/views/admin/dashboard/DashboardChart';
import CreateClub from '@/views/admin/clubs/CreateClub';
import ClubsView from '@/views/admin/clubs/ClubsView';

const adminRoutes = [
    { path: '/admin', component: DashboardChart, name: 'DashboardChart' },
    { path: '/admin/customers', component: UsersView, name: 'customers' },
    { path: '/admin/customers/:id', component: UsersDetail, name: 'customersDetails', props:true },
    { path: '/admin/clubs', component: ClubsView, name: 'clubs' },
    { path: '/admin/clubs/new', component: CreateClub, name: 'createClub' },
    //{ path: '/admin/clubs/:id', component: UsersDetail, name: 'customersDetails', props:true },
];
  
export default adminRoutes;