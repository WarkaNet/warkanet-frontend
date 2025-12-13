import MetricCard from '../components/MetricCard';
import CustomerGrowthChart from '../components/CustomerGrowthChart';
import ULTActivityChart from '../components/ULTActivityChart';
import SettlementBanner from '../components/SettlementBanner';
import QuickActionButton from '../components/QuickActionButton';
import { Users, Send, Download, TrendingUp, QrCode, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  // Mock data
  const mockStats = {
    total_customers: 25000,
    ult_issued_this_month: 25000,
    ult_redeemed_this_month: 8000,
    net_position_ada: -170.00,
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatADA = (num: number): string => {
    return num.toFixed(2);
  };

  return (
    <div className="space-y-24">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Merchant Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your loyalty program performance.
        </p>
      </motion.div>

      {/* Metric Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        aria-label="Key metrics"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard
            icon={Users}
            value={formatNumber(mockStats.total_customers)}
            label="Total Customers"
            trend={{
              text: 'this month',
              percentage: '+12%',
              direction: 'up',
            }}
            variant="indigo"
          />

          <MetricCard
            icon={Send}
            value={`${formatNumber(mockStats.ult_issued_this_month)} ULT`}
            label="ULT Issued This Month"
            trend={{
              text: 'from last month',
              percentage: '+12%',
              direction: 'up',
            }}
            variant="green"
          />

          <MetricCard
            icon={Download}
            value={`${formatNumber(mockStats.ult_redeemed_this_month)} ULT`}
            label="ULT Redeemed This Month"
            trend={{
              text: 'from last month',
              percentage: '+8%',
              direction: 'up',
            }}
            variant="indigo"
          />

          <MetricCard
            icon={TrendingUp}
            value={`${formatADA(mockStats.net_position_ada)} ADA`}
            label="Net Position"
            trend={{
              text: 'You owe the network',
              percentage: '-4.8%',
              direction: 'down',
            }}
            variant="red"
          />
        </div>
      </motion.section>

      {/* Settlement Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-label="Settlement information"
      >
        <SettlementBanner
          nextSettlementDate="2025-02-01"
          expectedPayout={Math.abs(mockStats.net_position_ada)}
          isOverdue={false}
        />
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        aria-label="Quick actions"
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <QuickActionButton
            icon={QrCode}
            label="Issue Reward"
            description="Scan customer wallet and issue ULT rewards"
            navigateTo="/merchant/issue"
            variant="green"
          />
          <QuickActionButton
            icon={CheckCircle}
            label="Accept Redemption"
            description="Scan and validate customer voucher QR codes"
            navigateTo="/merchant/accept-redemption"
            variant="blue"
          />
        </div>
      </motion.section>

      {/* Charts */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        aria-label="Analytics charts"
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CustomerGrowthChart />
          <ULTActivityChart />
        </div>
      </motion.section>

    </div>
  );
}
