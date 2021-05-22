import { createRouter, createWebHashHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Home from '../views/Home.vue';
import Article from '../views/Article.vue';

const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition;

		const position = {
			behavior: 'smooth',
			top: 90
		};

		if (to.hash && document.querySelector(to.hash)) position.el = to.hash;
		else {
			position.top = 0;
			position.left = 0;
		}
		return position;
	},
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main,
			children: [
				{
					path: '',
					name: 'Home',
					component: Home
				}
			]
		}, {
			path: '/',
			name: 'Article',
			component: Article,
			children: [
				{
					path: 'privacy-policy',
					name: 'PrivacyPolicy',
					component: () => import(/* webpackChunkName: "PrivacyPolicy" */ '../articles/PrivacyPolicy.vue')
				}, {
					path: 'join-us',
					name: 'JoinUs',
					component: () => import(/* webpackChunkName: "JoinUs" */ '../articles/JoinUs.vue')
				}, {
					path: 'tos',
					name: 'TOS',
					component: () => import(/* webpackChunkName: "TOS" */ '../articles/TOS.vue')
				}, {
					path: 'faq',
					name: 'FAQ',
					redirect: () => {
						window.location.href = 'https://wiki.freeserver.pro/';
					}
				}
			]
		}
	]
});

router.beforeEach((to, from, next) => {
	const hash = to.path.match(/\/?%23(.*)$/);
	if (hash && hash[1] && !to.hash) {
		next({
			path: to.path.replace(new RegExp(`${hash[0]}$`), ''),
			hash: `#${hash[1]}`
		});
	} else {
		next();
	}
});

export default router;
