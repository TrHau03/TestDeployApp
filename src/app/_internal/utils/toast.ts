'use client';

import Swal, { SweetAlertOptions } from 'sweetalert2';

export const showAlert = ({
  icon = 'success',
  title = 'Action completed successfully',
  text = '', // hỗ trợ mô tả phụ
  position = 'top-end',
  timer = 3000,
  ...rest
}: SweetAlertOptions) => {
  const toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    // 👇 Ẩn scrollbar bằng cách thêm style khi mở popup
    didOpen: (popup) => {
      popup.style.overflow = 'hidden';
    },
    ...rest,
  });

  toast.fire({
    icon,
    title,
    text,
    padding: '10px 20px',
    ...rest,
  });
};
