import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const API_BASE_URL = "https://sachinkathar.onrender.com" 

    // Get latest hero to read resume URL
    const heroRes = await fetch(`${API_BASE_URL}/hero`, { cache: 'no-store', credentials: 'include' })
    if (!heroRes.ok) {
      return NextResponse.json({ message: 'Failed to fetch hero' }, { status: 502 })
    }
    const heroJson = await heroRes.json()
    const resumeUrl: string | undefined = heroJson?.data?.resume?.url
    if (!resumeUrl) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 })
    }

    // Fetch the actual PDF from Cloudinary (no-store to avoid stale)
    const fileRes = await fetch(resumeUrl, { cache: 'no-store', redirect: 'follow' })
    if (!fileRes.ok) {
      return NextResponse.json({ message: 'Failed to fetch resume file', status: fileRes.status }, { status: 502 })
    }

    const buffer = await fileRes.arrayBuffer()
    const filename = `${heroJson?.data?.name || 'resume'}.pdf`

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: new Headers({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
        'Content-Length': String(buffer.byteLength),
      }),
    })
  } catch (err: any) {
    return NextResponse.json({ message: 'Unexpected error', error: err?.message }, { status: 500 })
  }
}
