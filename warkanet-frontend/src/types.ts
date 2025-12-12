// Merchant Portal TypeScript Interfaces

// ============================================
// Dashboard & Merchant Stats
// ============================================
export interface MerchantStats {
    total_customers: number;
    ult_issued_this_month: number;
    ult_redeemed_this_month: number;
    net_position_ada: number;
    next_settlement_date: string;
}

export interface Analytics {
    customer_growth: Array<{ date: string; count: number }>;
    ult_activity: Array<{ week: string; issued: number; redeemed: number }>;
}

// ============================================
// Issue Reward
// ============================================
export interface IssueRewardRequest {
    merchant_id: string;
    customer_address: string;
    purchase_amount: number;
}

export interface IssueRewardResult {
    ult_issued: number;
    tx_hash: string;
    timestamp: string;
}

// ============================================
// Voucher Redemption
// ============================================
export interface Voucher {
    valid: boolean;
    value_usd: number;
    customer_address: string;
    merchant_id: string;
    expiry: string;
    already_used: boolean;
}

export interface ValidateVoucherRequest {
    voucher_nft: string;
}

export interface MarkVoucherUsedRequest {
    voucher_nft: string;
    merchant_id: string;
}

export interface MarkVoucherUsedResponse {
    success: boolean;
    redeemed_at: string;
}

// ============================================
// Analytics
// ============================================
export interface CustomerGrowthData {
    date: string;
    count: number;
}

export interface ULTActivityData {
    week: string;
    issued: number;
    redeemed: number;
}

export interface TopCustomer {
    address: string;
    ult_earned: number;
}

export interface AnalyticsResponse {
    customer_growth: CustomerGrowthData[];
    ult_activity: ULTActivityData[];
    top_customers: TopCustomer[];
}

// ============================================
// Equity Management
// ============================================
export interface EquityEnableRequest {
    merchant_id: string;
    target_amount_usd: number;
    equity_percentage: number;
    business_plan_ipfs: string;
    financials_ipfs: string;
}

export interface EquityEnableResponse {
    request_id: string;
    status: 'pending_admin_review' | 'approved' | 'rejected';
}

export interface Investor {
    address: string;
    mst_held: number;
    ownership_percent: number;
    investment_date: string;
    investment_amount_usd?: number;
}

export interface InvestorsResponse {
    investors: Investor[];
}

export interface DividendDistributionDetail {
    investor_address: string;
    mst_held: number;
    dividend_usd: number;
}

export interface DividendDistributionRequest {
    merchant_id: string;
    total_profit: number;
    period: string;
}

export interface DividendDistributionResponse {
    total_distributed: number;
    num_investors: number;
    tx_hash: string;
    distribution_details: DividendDistributionDetail[];
}

export interface FundraisingOverview {
    amount_raised: number;
    target_amount: number;
    mst_price: number;
    mst_sold: number;
    total_investors: number;
}

// ============================================
// Common Types
// ============================================
export type EquityStatus = 'not_enabled' | 'enabling' | 'pending_review' | 'enabled';

export interface APIError {
    error: string;
    message: string;
}

// ============================================
// Merchant Information
// ============================================
export interface Merchant {
    id: string;
    name: string;
    wallet_address: string;
    earn_rate: number; // e.g., 0.10 for 10%
    equity_status: EquityStatus;
}
