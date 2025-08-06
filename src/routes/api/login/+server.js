export async function POST({ request, cookies }) {
  const data = await request.json();
  if (data.loggedIn) {
    cookies.set('loggedIn', 'true', {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 // 1 giờ
    });
  }
  return new Response(JSON.stringify({ success: true }));
}
