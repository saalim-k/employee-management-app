import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const fileName = data.fileName
    const buffer = Buffer.from(data.data, 'base64')
    console.log('data', buffer)
    const dir = path.join(process.cwd(), '/public/avatars')
    fs.writeFileSync(path.join(dir, fileName), buffer)
    return new Response('success', { status: 200 })
  } catch (err: any) {
    console.error(err.stack)
    return new Response(err.stack, { status: 500 })
  }
}
