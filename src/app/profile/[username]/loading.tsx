import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="max-w-xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full max-w-lg mx-auto">
          <Card className="bg-card animate-pulse">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-500 rounded-full" />
                <div className="mt-4 h-6 w-32 bg-gray-400 rounded" />
                <div className="mt-2 h-4 w-24 bg-gray-400 rounded" />
                <div className="mt-2 h-12 w-48 bg-gray-400 rounded" />

                <div className="w-full mt-6">
                  <div className="flex justify-between mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="h-6 w-10 bg-gray-400 rounded" />
                        <div className="h-4 w-16 bg-gray-400 rounded mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full mt-6 space-y-2 text-sm">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="h-4 w-full bg-gray-500 rounded" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full border-b h-10 flex space-x-4 animate-pulse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-400 rounded" />
          ))}
        </div>

        <div className="mt-6 space-y-6 animate-pulse">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-24 w-full bg-gray-400 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}