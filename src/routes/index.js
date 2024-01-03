import HomePage from '@/pages/HomePage';
import ContactPage from '@/pages/ContactPage';
import SiteMapPage from '@/pages/SiteMap/SiteMapPage';
import ProductPage from '@/pages/ProductPage';
import LoginPage from '@/pages/Account/Login_Page';
import RegisterPage from '@/pages/Account/Register_Page';
import ShoppingCartPage from '@/pages/ShoppingCart/Shopping_Cart_Page';
import Nutritional from '@/pages/Nutritional ';
import Detail from '@/components/Layout/Detail/Detail_Index';
import ProfilePage from '@/pages/ProfilePage';
import AboutUsPage from '@/pages/AboutUsPage';
import TermsPage from '@/pages/TermsPage';

const routes = [
    { path: '/', component: HomePage },
    { path: '/contact', component: ContactPage },
    { path: '/sitemap', component: SiteMapPage },
    { path: '/product', component: ProductPage },
    { path: '/product-detail/:id', component: Detail },
    { path: '/about', component: AboutUsPage },
    { path: '/terms', component: TermsPage },
    { path: '/account/login', component: LoginPage },
    { path: '/account/register', component: RegisterPage },
    { path: '/product/nutritional', component: Nutritional },
    { path: '/account/profile', component: ProfilePage },
    { path: '/cart', component: ShoppingCartPage },
    { path: '/cart/:status', component: ShoppingCartPage },
];

export default routes;
