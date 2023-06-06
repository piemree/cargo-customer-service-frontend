import Dashboard from './views/pages/dashboard/Dashboard';
import TicketDetails from './views/pages/ticketDetails/TicketDetails';

const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/ticket/:id', name: 'TicketDetails', element: TicketDetails },
];

export { privateRoutes };
