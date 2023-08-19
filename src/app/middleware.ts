import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  console.log('request', request.url);
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/signIn',
}