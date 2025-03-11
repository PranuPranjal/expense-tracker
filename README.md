# Expense Tracker App

A modern, responsive web application for tracking personal expenses and managing budgets. Built with Next.js, MongoDB, and Tailwind CSS.

## Features

### Dashboard
- Real-time expense tracking and visualization
- Monthly summary with total expenses and highest spending category
- Latest transactions display
- Interactive charts:
  - Category-wise expense distribution (Pie Chart)
  - Budget vs. Actual comparison
  - Monthly expense trends

### Transaction Management
- Add, edit, and delete transactions
- Categorize expenses
- View transaction history
- Sort and filter capabilities
- Date-based organization

### Budget Management
- Set and manage category-wise budgets
- Real-time budget tracking
- Visual budget vs. actual comparison
- Monthly budget reset

### Data Visualization
- Monthly expense bar chart
- Category-wise pie chart
- Budget comparison chart
- Responsive and interactive charts

## Technology Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Charts**: Recharts
- **Icons**: React Icons
- **State Management**: React Hooks
- **API**: REST API with Next.js API routes

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
expense-tracker/
├── components/         # React components
├── pages/             # Next.js pages
│   ├── api/          # API routes
│   └── ...           # Page components
├── public/           # Static files
├── styles/          # Global styles
└── utils/           # Utility functions
```

## Key Components

- `TransactionForm`: Add/Edit transaction details
- `TransactionList`: Display and manage transactions
- `CategoryPieChart`: Visualize expense distribution
- `BudgetComparisonChart`: Compare budget vs. actual spending
- `Chart`: Display monthly expense trends

## API Endpoints

- `GET /api/transactions`: Fetch all transactions
- `POST /api/transactions`: Create new transaction
- `PUT /api/transactions`: Update existing transaction
- `DELETE /api/transactions`: Delete transaction

## Features in Detail

### Transaction Management
- Add transactions with description, amount, category, and date
- Edit existing transactions
- Delete transactions
- View transaction history
- Filter and sort capabilities

### Budget Management
- Set monthly budgets for different categories
- Track spending against budgets
- Visual representations of budget utilization
- Automatic monthly reset

### Reporting and Analytics
- Monthly expense summaries
- Category-wise spending analysis
- Historical trend analysis
- Budget variance analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for the beautiful charts
- MongoDB team for the powerful database
- React Icons for the comprehensive icon set
