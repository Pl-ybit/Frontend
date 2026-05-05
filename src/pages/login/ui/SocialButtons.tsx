export function SocialButtons() {
  return (
    <>
      {/* Google */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
          <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/>
        </svg>
        Google로 계속하기
      </button>

      {/* Naver */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#03C75A] text-white py-2.5 text-sm font-medium hover:bg-[#02b350] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 18V6h4.2L14.8 14.4V6H19v12h-4.2L9.2 9.6V18H5z" fill="white"/>
        </svg>
        네이버로 계속하기
      </button>

      {/* Kakao */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#FEE500] text-[#191919] py-2.5 text-sm font-medium hover:bg-[#f0d800] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#191919">
          <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.62 1.74 4.93 4.35 6.25l-.9 3.34 3.88-2.56A10.7 10.7 0 0 0 12 18c4.97 0 9-3.36 9-7.5S16.97 3 12 3Z"/>
        </svg>
        카카오 계속하기
      </button>
    </>
  )
}
