'use client';
import { showAlert } from '@/app/_internal/utils/toast';
import { useTriggerAuth, useUser } from '@/client/auth';
import http from '@/client/integration/http';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMenuMore from '@/components/icon/menu/icon-menu-more';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages';
import { getTranslation } from '@/i18n';
import { IRootState } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useSWRMutation from 'swr/mutation';
import LoginStreakIcon from '../common/login-streak/login-streakikon';
import Dropdown from '../dropdown';
import IconLogout from '../icon/icon-logout';

const Header = () => {
  const pathname = usePathname();
  const user = useUser();
  const { t,  } = getTranslation();

  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      const all = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      const allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul = selector.closest('ul.sub-menu');
      if (ul) {
         
        let ele :any= ul?.closest('li.menu')?.querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathname]);

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const triggerAuth = useTriggerAuth();

  const {
    trigger: logout,
    isMutating,
  } = useSWRMutation<unknown, Error, string, unknown>('/api/auth/logout', () => http.post('/api/auth/logout'), {
    onSuccess: async () => {
      showAlert({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully!',
      });
      triggerAuth();
    },
    onError: async () => {
      showAlert({
        icon: 'error',
        title: 'Error!',
        text: 'There was a problem logging you out. Please try again.',
      });
    },
  });

return (
    <header
      className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''} border-b-[0.5px] border-border border-opacity-0`}
    >
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-start py-2">
            <Link href="/" className="main-logo flex items-center gap-2 transition-all duration-300 hover:opacity-80">
              <Image
            className="h-10 w-10 rounded-[100] object-contain"
            src="/assets/images/logoApp.png"
            alt="Ainosha logo"
            width={40}
            height={40}
              />

              <span className="hidden bg-gradient-to-r from-[#01FFFF] to-[#D205D9] bg-clip-text text-xl font-bold tracking-wide text-transparent sm:block">
                Ainosha
              </span>
            </Link>
          </div>

          {/* Mobile menu - Hiển thị chỉ trên mobile */}
          <div className="block sm:hidden">
            <Dropdown
              placement="bottom-start"
              offset={[0, 5]}
              btnClassName="p-2 text-black dark:text-white"
              button={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              }
            >
              <div className="dropdown w-48">
                <nav className="nav text-lg font-semibold">
                  <ul className="flex flex-col">
                    <li className="group border-b border-gray-200 dark:border-gray-700">
                      <Link
                        href="/"
                        className={`relative block w-full p-3 font-bold transition-colors duration-300 group-hover:text-primary ${
                          pathname === '/' ? 'text-primary' : 'text-black dark:text-white'
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="group border-b border-gray-200 dark:border-gray-700">
                      <Link
                        href="/chat"
                        className={`relative block w-full p-3 font-bold transition-colors duration-300 group-hover:text-primary ${
                          pathname === '/chat' ? 'text-primary' : 'text-black dark:text-white'
                        }`}
                      >
                        Chat Bot
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        href="/articles"
                        className={`relative block w-full p-3 font-bold transition-colors duration-300 group-hover:text-primary ${
                          pathname === '/articles' ? 'text-primary' : 'text-black dark:text-white'
                        }`}
                      >
                        Articles
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dropdown>
          </div>

          {/* Desktop navigation - Ẩn trên mobile, hiển thị từ sm trở lên */}
          <div className="hidden w-full justify-center sm:flex">
            <div className="self-center">
              <nav className="nav text-lg font-semibold">
                <ul className="flex items-center">
                  <li className="group p-4">
                    <Link
                      href="/"
                      className={`relative inline-block font-bold ${
                        pathname === '/' ? 'text-primary' : 'text-black dark:text-white'
                      }`}
                    >
                      <span className="relative">
                        <span className="inline-block">Dashboard</span>
                        {pathname !== '/' && (
                          <>
                            <span className="absolute left-0 h-full w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-full">
                              Dashboard
                            </span>
                          </>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li className="group p-4">
                  <div className="relative group">
  <Link
    href="/chat"
    className={`relative inline-block font-bold ${
      pathname === '/chat' ? 'text-primary' : 'text-black dark:text-white'
    }`}
  >
    <span className="relative">
      <span className="inline-block">Chat Bot</span>
      {pathname !== '/chat' && (
        <span className="absolute left-0 h-full w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-full">
          Chat Bot
        </span>
      )}
    </span>
  </Link>

  {/* Dropdown menu */}
  <div className="absolute left-0 mt-2 hidden flex-col space-y-1 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md p-2 group-hover:flex z-50 w-max">
  <Link
    href="/chat/market-scan"
    className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
  >
    Market Scan
  </Link>
  <Link
    href="/chat/coin-deep"
    className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
  >
    Coin Deep
  </Link>
</div>


</div>

                  </li>
                  <li className="group p-4">
                    <Link
                      href="/articles"
                      className={`relative inline-block font-bold ${
                        pathname === '/articles' ? 'text-primary' : 'text-black dark:text-white'
                      }`}
                    >
                      <span className="relative">
                        <span className="inline-block">Articles</span>
                        {pathname !== '/articles' && (
                          <span className="absolute left-0 h-full w-0 overflow-hidden text-primary transition-all duration-300 group-hover:w-full">
                            Articles
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
            <>
              <LoginStreakIcon />
              <div className="dropdown flex shrink-0">
                {user._tag === 'AUTHENTICATED' ? (
                  <Dropdown
                    offset={[0, 8]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="relative group block"
                    button={
                      <img
                        className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                        src="/assets/images/user-profile.jpeg"
                        alt="userProfile"
                      />
                    }
                  >
                    <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                      <li>
                        <div className="flex items-center px-4 py-4">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src="/assets/images/user-profile.jpeg"
                            alt="userProfile"
                          />
                          <div className="truncate ltr:pl-4 rtl:pr-4">
                            <h4 className="text-base">{user.name}</h4>
                            <button
                              type="button"
                              className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                            >
                              {user.email}
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="border-t border-white-light dark:border-white-light/10">
                        <button disabled={isMutating} className="!py-3 text-danger" onClick={logout}>
                          <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </Dropdown>
                ) : (
                  <Link href="/auth/login" className="text-base font-bold text-primary">
                    Sign In
                  </Link>
                )}
              </div>
            </>
          </div>
        </div>
        {/* horizontal menu */}
        <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black dark:border-[#191e3a] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse">
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuPages className="shrink-0" />
                <span className="px-1">{t('pages')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li className="relative">
                <button type="button">
                  {t('users')}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/users/profile">{t('profile')}</Link>
                  </li>
                  <li>
                    <Link href="/users/user-account-settings">{t('account_settings')}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/pages/knowledge-base">{t('knowledge_base')}</Link>
              </li>
              <li>
                <Link href="/pages/contact-us-boxed" target="_blank">
                  {t('contact_us_boxed')}
                </Link>
              </li>
              <li>
                <Link href="/pages/contact-us-cover" target="_blank">
                  {t('contact_us_cover')}
                </Link>
              </li>
              <li>
                <Link href="/pages/faq">{t('faq')}</Link>
              </li>
              <li>
                <Link href="/pages/coming-soon-boxed" target="_blank">
                  {t('coming_soon_boxed')}
                </Link>
              </li>
              <li>
                <Link href="/pages/coming-soon-cover" target="_blank">
                  {t('coming_soon_cover')}
                </Link>
              </li>
              <li>
                <Link href="/pages/maintenence" target="_blank">
                  {t('maintenence')}
                </Link>
              </li>
              <li className="relative">
                <button type="button">
                  {t('error')}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/pages/error404" target="_blank">
                      {t('404')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/error500" target="_blank">
                      {t('500')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/error503" target="_blank">
                      {t('503')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('login')}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/auth/cover-login" target="_blank">
                      {t('login_cover')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-signin" target="_blank">
                      {t('login_boxed')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('register')}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/auth/cover-register" target="_blank">
                      {t('register_cover')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-signup" target="_blank">
                      {t('register_boxed')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('password_recovery')}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/auth/cover-password-reset" target="_blank">
                      {t('recover_id_cover')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-password-reset" target="_blank">
                      {t('recover_id_boxed')}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="relative">
                <button type="button">
                  {t('lockscreen')}
                  <div className="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                    <IconCaretDown />
                  </div>
                </button>
                <ul className="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow dark:bg-[#1b2e4b] dark:text-white-dark ltr:left-[95%] rtl:right-[95%]">
                  <li>
                    <Link href="/auth/cover-lockscreen" target="_blank">
                      {t('unlock_cover')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/boxed-lockscreen" target="_blank">
                      {t('unlock_boxed')}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu nav-item relative">
            <button type="button" className="nav-link">
              <div className="flex items-center">
                <IconMenuMore className="shrink-0" />
                <span className="px-1">{t('more')}</span>
              </div>
              <div className="right_arrow">
                <IconCaretDown />
              </div>
            </button>
            <ul className="sub-menu">
              <li>
                <Link href="/dragndrop">{t('drag_and_drop')}</Link>
              </li>
              <li>
                <Link href="/charts">{t('charts')}</Link>
              </li>
              <li>
                <Link href="/font-icons">{t('font_icons')}</Link>
              </li>
              <li>
                <Link href="/widgets">{t('widgets')}</Link>
              </li>
              <li>
                <Link href="https://vristo.sbthemes.com" target="_blank">
                  {t('documentation')}
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
