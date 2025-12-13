import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
    icon: LucideIcon;
    value: number | string;
    label: string;
    trend?: {
        text: string;
        percentage?: string;
        direction: 'up' | 'down' | 'neutral';
    };
    isLoading?: boolean;
    variant?: 'indigo' | 'green' | 'red' | 'purple';
}

export default function MetricCard({
    icon: Icon,
    value,
    label,
    trend,
    isLoading = false,
    variant = 'indigo',
}: MetricCardProps) {

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-soft dark:shadow-glow-purple border border-gray-100/50 dark:border-gray-800/50">
                <div className="animate-pulse space-y-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    const gradients = {
        indigo: 'bg-gradient-indigo',
        green: 'bg-gradient-green',
        red: 'bg-gradient-red',
        purple: 'bg-gradient-purple',
    };

    const glows = {
        indigo: 'dark:shadow-glow-indigo',
        green: 'dark:shadow-glow-green',
        red: 'dark:shadow-glow-red',
        purple: 'dark:shadow-glow-purple',
    };

    const trendColors = {
        up: 'text-green-600 dark:text-green-400',
        down: 'text-red-600 dark:text-red-400',
        neutral: 'text-gray-600 dark:text-gray-400',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`
        bg-white dark:bg-gray-900
        rounded-2xl p-8
        shadow-soft-lg ${glows[variant]}
        border border-gray-100/50 dark:border-gray-800/50
        hover:shadow-soft-lg
        transition-all duration-300
      `}
        >
            {/* Icon */}
            <div className={`
        ${gradients[variant]}
        w-16 h-16 rounded-xl
        flex items-center justify-center
        mb-6
        shadow-lg
      `}>
                <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>

            {/* Value */}
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {value}
            </div>

            {/* Label */}
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                {label}
            </div>

            {/* Trend */}
            {trend && (
                <div className="flex items-center gap-2">
                    {trend.direction === 'up' && (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <ArrowUp className="w-4 h-4" />
                            {trend.percentage && (
                                <span className="text-sm font-semibold">{trend.percentage}</span>
                            )}
                        </div>
                    )}
                    {trend.direction === 'down' && (
                        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <ArrowDown className="w-4 h-4" />
                            {trend.percentage && (
                                <span className="text-sm font-semibold">{trend.percentage}</span>
                            )}
                        </div>
                    )}
                    <span className={`text-xs font-medium ${trendColors[trend.direction]}`}>
                        {trend.text}
                    </span>
                </div>
            )}
        </motion.div>
    );
}
