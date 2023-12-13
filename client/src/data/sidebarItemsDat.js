import { LuLayoutDashboard, LuUsers2 } from 'react-icons/lu';
import { BiUser, BiCategory, BiCategoryAlt, BiTransfer } from 'react-icons/bi';
import { MdOutlineDiscount, MdOutlineInventory2 } from 'react-icons/md';
import { HiOutlineShoppingBag } from 'react-icons/hi';
//import { UsersIcon } from '../icons/Icons';

export const sidebarItemsData = [
    {
        icon: LuLayoutDashboard,
        text: 'Dashboard',
        path: '/dashboard',
    },
    
    {
        icon: MdOutlineDiscount,
        text: 'Products',
        path: '/products',
    },
    {
        icon: BiCategory,
        text: 'Categories',
        path: '/admin/categories',
    },
    {
        icon: BiCategoryAlt,
        text: 'Subcategories',
        path: '/admin/subcategories',
    },
    {
        icon: BiUser,
        text: 'Customers',
        path: '/customers',
    },
    { icon: LuUsers2,
     text: 'Sellers', 
     path: '/admin/S' },
    {
        icon: HiOutlineShoppingBag,
        text: 'Orders',
        path: '/admin/orders',
    },
    {
        icon: BiTransfer,
        text: 'Transactions',
        path: '/admin/dashboard',
    },
    
];