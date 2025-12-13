import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

interface CustomerGrowthData {
    date: string;
    count: number;
}

interface CustomerGrowthChartProps {
    data?: CustomerGrowthData[];
    isLoading?: boolean;
}

const generateMockData = (): CustomerGrowthData[] => {
    const data: CustomerGrowthData[] = [];
    const today = new Date();
    let baseCount = 0;

    for (let i = 29; i >= 0; i--) {
        const date = subDays(today, i);
        baseCount += Math.floor(Math.random() * 8) + 2;

        data.push({
            date: format(date, 'MMM dd'),
            count: baseCount,
        });
    }

    return data;
};

export default function CustomerGrowthChart({
    data = generateMockData(),
    isLoading = false
}: CustomerGrowthChartProps) {

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft-lg dark:shadow-glow-indigo border border-gray-100/50 dark:border-gray-800/50">
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft-lg dark:shadow-glow-indigo border border-gray-100/50 dark:border-gray-800/50">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Customer Growth
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Total customers over the last 30 days
                </p>
                <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft-lg dark:shadow-glow-indigo border border-gray-100/50 dark:border-gray-800/50">
            {/* Header */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    Customer Growth
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total customers over the last 30 days
                </p>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        className="dark:opacity-10"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="date"
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
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            border: '1px solid #E5E7EB',
                            borderRadius: '12px',
                            padding: '12px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                        }}
                        labelStyle={{
                            color: '#111827',
                            fontWeight: 600,
                            marginBottom: '4px',
                        }}
                        itemStyle={{ color: '#6366F1', fontWeight: 600 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#6366F1"
                        strokeWidth={3}
                        fill="url(#colorGradient)"
                        dot={false}
                        activeDot={{
                            r: 6,
                            fill: '#6366F1',
                            strokeWidth: 2,
                            stroke: '#FFFFFF',
                        }}
                        animationDuration={1200}
                        animationEasing="ease-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
