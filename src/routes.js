import Vue from 'vue';
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

export default [
    {
        path: '/',
        name: 'HomePage',
        component: Index
    },
    {
        path: '/listings',
        name: 'All Listings',
        component: () => import('./views/Listing.vue')
    },
    {
        path: '/listings/:type',
        name: 'All Listings For sale/rent',
        component: () => import('./views/Listing.vue')
    },
    {
        path: '/property/:id',
        name: 'Single Property',
        component: () => import('./views/Property.vue')
    },
    {
        path: '/agents',
        name: 'Top Agents and Agencies',
        component: () => import('./views/Agents.vue')
    },
    {
        path: '/agent/:id',
        name: 'Single Agent',
        component: () => import('./views/Agent.vue')
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('./views/User.vue'),
        children: [
            { 
                name: 'Notification',
                path: 'notification', 
                component:  () => import('./views/user/Notification.vue'),
                meta: { requiresAuth: true }
            },
            { 
                name: 'My Favorite Properties',
                path: 'favorite', 
                component:  () => import('./views/user/Favorite.vue'),
                meta: { requiresAuth: true }
            },
            { 
                name: 'Client Request',
                path: 'requests', 
                component:  () => import('./views/user/Requests.vue'),
                meta: { requiresAuth: true }
            },
            { 
                name: 'My Listings',
                path: 'listing', 
                component:  () => import('./views/user/Listing.vue'),
                meta: { requiresAuth: true }
            },
        ]
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('./views/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/post',
        name: 'PostAd',
        component: () => import('./views/PostAd.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'Administrator',
        component: () => import('./views/Admin.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/docs',
        name: 'Documentation',
        component: () => import('./views/Docs.vue'),
    },
    {
        path: '/subscription',
        name: 'Agents Subscription Page',
        component: () => import('./views/Subscription.vue'),
        //meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'About Us Page',
        component: () => import('./views/About.vue'),
    },
    {
        path: '/terms',
        name: 'Terms and Conditions',
        component: () => import('./views/Terms.vue'),
    },
    {
        path: '/policy',
        name: 'Privacy and Policy',
        component: () => import('./views/Policy.vue'),
    },
    {
        path: '/success',
        name: 'Sign up success',
        component: () => import('./views/Success.vue'),
    },
    {
        path: '/safety',
        name: 'Safety Tips',
        component: () => import('./views/Safety.vue'),
    },
    {
        path: '/featured-agent-advert',
        name: 'Become a featured Agent',
        component: () => import('./views/Featured.vue'),
    },
    {
        path: '/place-banner',
        name: 'Advertise your business on our site',
        component: () => import('./views/Banner.vue'),
    },
    {
        path: "*",
        name: '404',
        component: () => import('./views/404.vue')
    }
]