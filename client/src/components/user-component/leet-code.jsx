import { Card, CardContent } from "@/components/ui/card";
import { FaCode } from "react-icons/fa"; // or import a LeetCode SVG if you have one

export function LeetCodeCard({ stats }) {
  return (
    <Card className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-md border border-muted rounded-xl">
      <CardContent className="p-5 space-y-4">
        {/* Header with Icon */}
        <div className="flex items-center gap-3">
          <FaCode className="text-yellow-500 text-2xl" />
          <h3 className="text-xl font-semibold">LeetCode Progress</h3>
        </div>

        {/* Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Solved</span>
            <span className="font-bold">{stats?.all}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-green-600">Easy</span>
            <span className="bg-green-100 dark:bg-green-800/40 px-2 py-1 rounded font-medium">{stats?.easy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-600">Medium</span>
            <span className="bg-yellow-100 dark:bg-yellow-800/40 px-2 py-1 rounded font-medium">{stats?.medium}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-600">Hard</span>
            <span className="bg-red-100 dark:bg-red-800/40 px-2 py-1 rounded font-medium">{stats?.hard}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
