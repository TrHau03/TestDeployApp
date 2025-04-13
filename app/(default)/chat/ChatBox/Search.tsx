'use client';

import IconSearch from '@/components/icon/icon-search';

export default function SearchChat() {
  return (
    <div className="relative">
      <input type="text" className="peer form-input ltr:pr-9 rtl:pl-9" placeholder="Search agent" />
      <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-2 rtl:left-2">
        <IconSearch />
      </div>
    </div>
  );
}
