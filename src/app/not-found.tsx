import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-row flex-wrap  items-center text-gray-500 p-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-center font-mono text-xl'>
                        404 - Page Not Found
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                    <p>Sorry, the page you are looking for does not exist.</p>
                    <Link href={'/'} className='w-full'>
                        <Button className='w-full'>Go Home</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}