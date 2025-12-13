import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ULTActivityData {
    week: string;
    issued: number;
    redeemed: number;
}

interface ULTActivityChartProps {
    data?: ULTActivityData[];
    isLoading?: boolean;
}

const generateMockData = (): ULTActivityData[] => {
    return [
        { week: 'Week 1', issued: 4000, redeemed: 2000 },
        { week: 'Week 2', issued: 6000, redeemed: 3000 },
        { week: 'Week 3', issued: 8000, redeemed: 4000 },
        { week: 'Week 4', issued: 6000, redeemed: 2000 },
    ];
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                    {payload[0].payload.week}
                </p>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Issued: {(payload[0].value / 1000).toFixed(1)}K ULT
                    </p>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        Redeemed: {(payload[1].value / 1000).toFixed(1)}K ULT
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function ULTActivityChart({
    data = generateMockData(),
    isLoading = false
}: ULTActivityChartProps) {

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft-lg dark:shadow-glow-green border border-gray-100/50 dark:border-gray-800/50">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft-lg dark:shadow-glow-green border border-gray-100/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    ULT Activity
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Issued vs Redeemed over the last 4 weeks
                </p>
                <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft-lg dark:shadow-glow-green border border-gray-100/50 dark:border-gray-800/50">
            {/* Header */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    ULT Activity
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Issued vs Redeemed over the last 4 weeks
                </p>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={8}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        className="dark:opacity-10"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="week"
                        stroke="#9CA3AF"
                        style={{ fontSize: '13px', fontWeight: 500 }}
                        tick={{ fill: '#6B7280' }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        stroke="#9CA3AF"
                        style={{ fontSize: '13px', fontWeight: 500 }}
                        tick={{ fill: '#6B7280' }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Legend
                        wrapperStyle={{
                            fontSize: '14px',
                            fontWeight: 500,
                            paddingTop: '20px',
                        }}
                        iconType="circle"
                    />

                    <Bar
                        dataKey="issued"
                        fill="#22C55E"
                        name="Issued"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1200}
                        animationEasing="ease-out"
                    />

                    <Bar
                        dataKey="redeemed"
                        fill="#EF4444"
                        name="Redeemed"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1200}
                        animationEasing="ease-out"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
