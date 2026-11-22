// 2026-12-18 00:00 KST부터 자동으로 마감 안내 페이지를 보여줌
export const config = { matcher: '/:path*' };

const CLOSE_AT = Date.parse('2026-12-17T15:00:00Z'); // = 2026-12-18 00:00 KST

export default function middleware(request) {
  const url = new URL(request.url);
  const preview = url.searchParams.get('preview') === 'closed';
  if (Date.now() >= CLOSE_AT || preview) {
    return new Response(null, {
      headers: { 'x-middleware-rewrite': new URL('/closed.html', request.url).toString() },
    });
  }
}
