import { Calendar, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';

interface SettlementBannerProps {
    nextSettlementDate?: string;
    expectedPayout?: number;
    isOverdue?: boolean;
}

export default function SettlementBanner({
    nextSettlementDate = '2025-02-01',
    expectedPayout = 170.00,
    isOverdue = false,
}: SettlementBannerProps) { 

    const formattedDate = format(parseISO(nextSettlementDate), 'MMMM d, yyyy');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
        bg-gradient-to-br from-indigo-50 to-purple-50
        dark:from-indigo-950/50 dark:to-purple-950/50
        rounded-2xl p-6 sm:p-8
        border-2 border-indigo-100 dark:border-indigo-900/50
        shadow-soft-lg dark:shadow-glow-indigo
      "
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Left Side */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-indigo p-3 rounded-xl shadow-lg">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Next Settlement
                            </h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Expected Payout:</span>
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {expectedPayout.toFixed(2)} <span className="text-xl">ADA</span>
                            </span>
                        </div>

                        <div className="flex items-start gap-2 mt-3 text-sm">
                            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-600 dark:text-gray-400">
                                Amount shown is based on your current net position. Settlement occurs monthly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Action */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => console.log('View settlement history')}
                    className="
            bg-gradient-indigo
            text-white font-semibold
            px-6 py-3 rounded-xl
            shadow-lg hover:shadow-xl
            transition-shadow duration-200
            whitespace-nowrap
          "
                >
                    View Settlement History
                </motion.button>
            </div>
        </motion.div>
    );
}
