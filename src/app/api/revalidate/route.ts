import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')

    // 1. Validate Secret
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      console.error('Invalid revalidation secret')
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await req.json()
    const { _type, slug } = body

    console.log(`Revalidating: type=${_type}, slug=${slug}`)

    // 2. Logic based on document type
    if (_type === 'project') {
      revalidatePath('/')
      revalidatePath('/projects')
      if (slug) {
        revalidatePath(`/projects/${slug}`)
      }
      console.log('✅ Revalidated: Homepage, Projects, and Detail')
      return NextResponse.json({ revalidated: true, now: Date.now() })
    }

    if (_type === 'author') {
      revalidatePath('/')
      revalidatePath('/about')
      console.log('✅ Revalidated: Homepage and About')
      return NextResponse.json({ revalidated: true, now: Date.now() })
    }

    // Generic revalidation for other types (optional)
    revalidatePath('/')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
