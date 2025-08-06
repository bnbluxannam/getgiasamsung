/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { cookies, url } = event;

  // Nếu người dùng đang truy cập đường dẫn adminvipprodangcap
  if (url.pathname.startsWith('/adminvipprodangcap')) {
    const loggedIn = cookies.get('loggedIn');

    if (!loggedIn) {
      // Chưa đăng nhập → chuyển hướng sang trang login
      return Response.redirect('/dangnhapvipprodangcap', 303);
    }
  }

  return resolve(event);
}
