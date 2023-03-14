// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '홈',
    path: '/',
    icon: icon('pet-house'),
  },
  // {
  //   title: '제목미정(동물 추천)',
  //   path: '/dashboard/user',
  //   icon: icon('hospital'),
  // },
  {
    title: '모든 검색',
    path: '/dashboard/searchAll',
    icon: icon('search'),
  },
  {
    title: '유기동물 조회, 구조',
    path: '/dashboard/recommendation/abandoned/abandonedChart',
    icon: icon('shelter'),
  },
  {
    title: '동물병원 찾기',
    path: '/dashboard/hospital',
    icon: icon('hospital'),
  },
  {
    title: '공원 조회',
    path: '/dashboard/parkinfo',
    icon: icon('ic_park'),
  },
];

export default navConfig;
