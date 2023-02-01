import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 2,
        icon: ProductIcon,
        path: '/cars',
        title: 'Car List',
    },
    {
        id: 3,
        icon: ProductIcon,
        path: '/addcar',
        title: 'Add Car',
    },
    {
        id: 4,
        icon: ShippingIcon,
        path: '/blogs',
        title: 'Blogs',
    },
    {
        id: 5,
        icon: ShippingIcon,
        path: '/addblog',
        title: 'Add Blogs',
    },
    {
        id: 6,
        icon: UserIcon,
        path: '/messages',
        title: 'Messages',
    }
]

export default sidebar_menu;