const MobileReg = /(iPhone|iPad|iPod|iOS|Android)/;
export const isMobile = typeof window !== 'undefined' ? MobileReg.test(window?.navigator?.userAgent) : false;