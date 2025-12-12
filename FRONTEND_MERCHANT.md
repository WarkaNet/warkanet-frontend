# MERCHANT PORTAL - Developer Handoff Document
## Multi-Merchant Loyalty Platform

**Team**: Frontend Merchant Portal  
**Tech Stack**: React + Vite + TypeScript + Tailwind CSS + Recharts  

---

## 📋 What You're Building

You are building a **Merchant Portal** for business owners who participate in a Web3 loyalty rewards program. Merchants can:
- Issue **ULT tokens** (loyalty rewards) to customers after purchases
- Accept ULT redemptions (scan customer voucher QR codes)
- View analytics (customer growth, redemption trends)
- Track monthly settlement payments
- Optionally enable **equity fundraising** (sell business shares as MST tokens)

Think of it as: **Square POS meets Kickstarter meets Cardano blockchain**

---

## 🎯 Expected Final Result

A fully functional web application with:
- ✅ Dashboard showing key metrics (customers, ULT issued, net position)
- ✅ Issue rewards page with QR scanner for customer wallets
- ✅ Accept redemption page with voucher QR validation
- ✅ Analytics charts (customer growth, redemption trends)
- ✅ Equity management (enable fundraising, view investors, distribute dividends)

---

## 📱 Pages to Build (5 Total)

### Page 1: Merchant Dashboard (`/merchant/dashboard`)

**Purpose**: Overview of merchant's loyalty program performance

**Components**:

1. **Metric Cards** (4 cards)
   - **Total Customers**: Count of unique customers who earned ULT
   - **ULT Issued This Month**: Total ULT given to customers
   - **ULT Redeemed This Month**: Total ULT customers redeemed
   - **Net Position**: Difference (issued - redeemed) in ADA value
   - Each card shows: Icon, Number, Label, Trend ("+15 this month")

2. **Charts Section** (2 charts)
   - **Customer Growth**: Line chart showing daily customer count over last 30 days
   - **ULT Activity**: Bar chart showing issued vs redeemed per week

3. **Settlement Banner**
   - Next settlement date (e.g., "Feb 1, 2025")
   - Expected payout amount
   - Link to settlement history

4. **Quick Actions**
   - Button: "Issue Reward" → navigate to issue page
   - Button: "Accept Redemption" → navigate to redemption page

**API Calls**:

```typescript
// Get merchant stats
GET /api/merchants/:merchantId/stats
Response: {
  total_customers: 150,
  ult_issued_this_month: 25000,
  ult_redeemed_this_month: 8000,
  net_position_ada: -170.00, // negative = merchant owes network
  next_settlement_date: "2025-02-01"
}

// Get analytics data
GET /api/merchants/:merchantId/analytics?period=30days
Response: {
  customer_growth: [
    { date: "2025-01-01", count: 100 },
    { date: "2025-01-02", count: 105 },
    // ... 30 days
  ],
  ult_activity: [
    { week: "Week 1", issued: 5000, redeemed: 1200 },
    { week: "Week 2", issued: 6200, redeemed: 1800 },
    // ... 4 weeks
  ]
}
```

**Data Formats**:
```typescript
interface MerchantStats {
  total_customers: number;
  ult_issued_this_month: number;
  ult_redeemed_this_month: number;
  net_position_ada: number;
  next_settlement_date: string;
}

interface Analytics {
  customer_growth: Array<{ date: string; count: number }>;
  ult_activity: Array<{ week: string; issued: number; redeemed: number }>;
}
```

---

### Page 2: Issue Reward (`/merchant/issue`)

**Purpose**: Give ULT to customer after purchase

**Flow**:
1. Customer shows wallet QR code at checkout
2. Merchant scans QR code → gets customer wallet address
3. Merchant enters purchase amount (USD)
4. System calculates ULT to issue (based on merchant's earn rate)
5. Merchant confirms → ULT sent to customer

**Components**:

1. **QR Scanner**
   - Camera feed showing QR scanner
   - Green box overlay when QR detected
   - Extract wallet address from QR
   - Library: `react-qr-scanner`

2. **Customer Address Display**
   - Show detected wallet address
   - Truncate: `addr1qxy...abc123`
   - "Scan Again" button

3. **Purchase Amount Input**
   - Label: "Purchase Amount (USD)"
   - Number input
   - Show earn rate: "10% cashback"

4. **ULT Calculation Display**
   - Auto-calculate based on amount
   - Formula: `(purchaseUSD / adaPrice) * earnRate * 100`
   - Example: "$30 purchase = 750 ULT"

5. **Issue Button**
   - Large green button
   - Disabled until address scanned and amount entered
   - Loading state while transaction processes

6. **Success Modal**
   - Show: "✅ 750 ULT issued!"
   - Transaction hash (link to Cardano explorer)
   - "Issue Another Reward" button

**API Calls**:

```typescript
// Issue reward
POST /api/loyalty/issue
Request: {
  merchant_id: "uuid",
  customer_address: "addr1...",
  purchase_amount: 30.00
}

Response: {
  ult_issued: 750,
  tx_hash: "abc123...",
  timestamp: "2025-01-15T12:00:00Z"
}

// Error Response
{
  error: "insufficient_reward_pool",
  message: "Your reward pool is empty. Please contact admin."
}
```

**Data Format**:
```typescript
interface IssueRewardRequest {
  merchant_id: string;
  customer_address: string;
  purchase_amount: number;
}

interface IssueRewardResult {
  ult_issued: number;
  tx_hash: string;
  timestamp: string;
}
```

---

### Page 3: Accept Redemption (`/merchant/accept-redemption`)

**Purpose**: Validate customer voucher and apply discount

**Flow**:
1. Customer shows voucher QR code
2. Merchant scans QR code
3. System validates voucher (not expired, not used, correct merchant)
4. Show voucher value
5. Merchant clicks "Accept" → customer gets discount
6. System marks voucher as used

**Components**:

1. **QR Scanner**
   - Same as Issue Reward page
   - Extract voucher NFT from QR

2. **Voucher Details Card**
   - Value (USD): "$2.00"
   - Customer address
   - Expiry date
   - Status badge: "Valid" (green) or "Invalid" (red)

3. **Validation Result**
   - If valid: "✅ Voucher is valid for $2.00 discount"
   - If invalid: "❌ Voucher expired" or "❌ Already used"

4. **Accept Button**
   - Only enabled if voucher is valid
   - "Apply $2.00 Discount"

5. **Success State**
   - "Voucher redeemed successfully!"
   - "Deduct $2.00 from customer total"

**API Calls**:

```typescript
// 1. Validate voucher
POST /api/loyalty/validate-voucher
Request: {
  voucher_nft: "policy.asset123"
}

Response: {
  valid: true,
  value_usd: 2.00,
  customer_address: "addr1...",
  merchant_id: "uuid",
  expiry: "2025-02-14",
  already_used: false
}

// 2. Mark as used
POST /api/loyalty/mark-used
Request: {
  voucher_nft: "policy.asset123",
  merchant_id: "uuid"
}

Response: {
  success: true,
  redeemed_at: "2025-01-15T14:30:00Z"
}
```

**Data Format**:
```typescript
interface Voucher {
  valid: boolean;
  value_usd: number;
  customer_address: string;
  merchant_id: string;
  expiry: string;
  already_used: boolean;
}
```

---

### Page 4: Analytics (`/merchant/analytics`)

**Purpose**: Visualize loyalty program performance

**Charts to Build**:

1. **Customer Growth** (Line Chart - Recharts)
   - X-axis: Dates (last 30 days)
   - Y-axis: Number of customers
   - Data: Daily cumulative customer count
   - Color: Indigo gradient

2. **ULT Issued vs Redeemed** (Bar Chart - Recharts)
   - X-axis: Weeks (last 4 weeks)
   - Y-axis: ULT amount
   - Two bars per week: Issued (green), Redeemed (red)
   - Show legend

3. **Category Breakdown** (Pie Chart - Optional)
   - Show ULT issued by customer segment
   - Data: Top customers vs others

**Example Chart Code**:
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CustomerGrowthChart({ data }: { data: Array<{date: string, count: number}> }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

**API Calls**:

```typescript
// Get analytics
GET /api/merchants/:merchantId/analytics?period=30days

Response: {
  customer_growth: [
    { date: "2025-01-01", count: 100 },
    { date: "2025-01-02", count: 105 }
  ],
  ult_activity: [
    { week: "Week 1", issued: 5000, redeemed: 1200 },
    { week: "Week 2", issued: 6200, redeemed: 1800 }
  ],
  top_customers: [
    { address: "addr1...", ult_earned: 5000 }
  ]
}
```

---

### Page 5: Equity Management (`/merchant/equity`)

**Purpose**: Enable equity fundraising and manage investors

**States**:

**State 1: Not Enabled** (default)
```
Display banner:
"💡 Raise Capital for Your Business"
- Sell equity to customers and investors
- Automated dividend distribution
- Transparent on blockchain

Button: "Enable Equity Track"
```

**State 2: Enabling** (after click)
```
Show modal with form:
- Target Amount (USD)
- Equity Percentage to Sell (%)
- Upload Business Plan (PDF)
- Upload Financials (PDF)

Button: "Submit for Review"
```

**State 3: Pending Review**
```
Show status:
"⏳ Your request is under review"
"We'll contact you within 3 business days"
```

**State 4: Enabled**
```
Show tabs:
1. Overview: Fundraising progress, MST price
2. Investors: Cap table (list of investors with MST holdings)
3. Dividends: Distribute dividends to investors
```

**Components (State 4)**:

1. **Fundraising Overview**
   - Progress bar: "$35,000 raised of $50,000"
   - MST price: "$5.00 per MST"
   - Investors count: "12 investors"

2. **Cap Table**
   - Table showing investors
   - Columns: Address, MST Held, Ownership %, Investment Date
   - Sort by ownership %

3. **Distribute Dividends**
   - Input: Total profit for period
   - Input: Dividend percentage (%)
   - Calculate distribution per investor
   - Button: "Distribute ₳X to 12 investors"

**API Calls**:

```typescript
// 1. Request to enable equity
POST /api/equity/request-enable
Request: {
  merchant_id: "uuid",
  target_amount_usd: 50000,
  equity_percentage: 10,
  business_plan_ipfs: "ipfs://Qm...",
  financials_ipfs: "ipfs://Qm..."
}

Response: {
  request_id: "uuid",
  status: "pending_admin_review"
}

// 2. Get investors (cap table)
GET /api/equity/investors/:merchantId
Response: {
  investors: [
    {
      address: "addr1invest...",
      mst_held: 100,
      ownership_percent: 0.1,
      investment_date: "2025-01-01"
    }
  ]
}

// 3. Distribute dividends
POST /api/equity/distribute-dividends
Request: {
  merchant_id: "uuid",
  total_profit: 10000,
  period: "Q1_2025"
}

Response: {
  total_distributed: 1000,
  num_investors: 12,
  tx_hash: "...",
  distribution_details: [
    {
      investor_address: "addr1...",
      mst_held: 100,
      dividend_usd: 10.00
    }
  ]
}
```

---

## 📦 Required npm Packages

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.0",
    "react-qr-scanner": "^1.0.0-alpha.11",
    "qrcode.react": "^3.1.0",
    "recharts": "^2.10.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.0"
  }
}
```

---

## 🧪 What to Test

1. **Dashboard**:
   - ✅ Metrics load correctly
   - ✅ Charts render
   - ✅ Settlement date displays

2. **Issue Reward**:
   - ✅ QR scanner opens camera
   - ✅ Detects customer wallet QR
   - ✅ Calculates ULT correctly
   - ✅ Transaction succeeds
   - ✅ Shows success message

3. **Accept Redemption**:
   - ✅ QR scanner works
   - ✅ Valid voucher shows value
   - ✅ Invalid voucher shows error
   - ✅ Can mark as used

4. **Analytics**:
   - ✅ Charts load with data
   - ✅ Date range selector works

5. **Equity**:
   - ✅ Enable request submits
   - ✅ Investor table loads
   - ✅ Dividend distribution works

---

## ✅ Definition of Done

Your portal is complete when:
- [ ] All 5 pages render without errors
- [ ] QR scanner works on mobile and desktop
- [ ] Charts display data correctly
- [ ] Can issue rewards end-to-end
- [ ] Can validate and accept vouchers
- [ ] Equity request workflow completes
- [ ] Mobile responsive
- [ ] All TypeScript errors resolved
- [ ] Build succeeds: `npm run build`
- [ ] Deployable to Vercel

---

## 🚀 Getting Started

```bash
# 1. Clone repo
git clone <repo-url>
cd frontend-merchant

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
VITE_API_BASE_URL=https://api.loyalcoin.io

# 4. Run dev server
npm run dev

# 5. Test QR scanner (requires HTTPS or localhost)
# QR scanner needs camera permissions
```

---

## 📞 Who to Ask

- **API Questions**: Backend Team 1 (Loyalty endpoints)
- **Equity Features**: Backend Team 2 (Equity endpoints)
- **Design Questions**: Product Designer
- **Deployment**: DevOps Team

---

You're building the merchant interface for transforming local businesses with Web3 loyalty! 🚀