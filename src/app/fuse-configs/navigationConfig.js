import i18next from 'i18next';
import en from './navigation-i18n/en';
import ko from './navigation-i18n/ko';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('ko', 'navigation', ko);

const navigationConfig = [
  {
    id: 'master',
    title: 'master',
    translate: '마스터 관리메뉴',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboard-component',
        title: 'dashboard',
        translate: '대시보드',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
      },
      {
        id: 'client-component',
        title: 'Clients',
        translate: '업체관리',
        type: 'item',
        icon: 'assignment_ind',
        url: '/apps/clientmanager',
        exact: true,
      },
      {
        id: 'update-component',
        title: 'updatemanager',
        translate: '시스템 업데이트 관리',
        type: 'item',
        icon: 'update',
        url: '/apps/updatemanager',
      },
      {
        id: 'user-component',
        title: 'membermanager',
        translate: '회원관리',
        type: 'item',
        icon: 'account_circle',
        url: '/apps/membermanager',
      },
      {
        id: 'premiumcontent-component',
        title: 'premiumcontent',
        translate: '유료컨텐츠 이용관리',
        type: 'item',
        icon: 'shop',
        url: '/apps/premiumcontent',
      },
      {
        id: 'statistics-component',
        title: 'statistics',
        translate: '통계',
        type: 'item',
        icon: 'insert_chart',
        url: '/apps/statistics',
      },
      {
        id: 'notice-component',
        title: 'notice',
        translate: '공지사항',
        type: 'item',
        icon: 'notifications',
        url: '/apps/notice',
      },
      {
        id: 'myinfo-component',
        title: 'myinfo',
        translate: '내정보 수정',
        type: 'item',
        icon: 'edit',
        url: '/apps/myinfo',
      },
    ],
  },
];

export default navigationConfig;
