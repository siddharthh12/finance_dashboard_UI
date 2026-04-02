export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  return {
    income,
    expenses,
    balance: income - expenses,
  };
};

export const getCategoryData = (transactions) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const data = {};
  
  expenses.forEach((t) => {
    data[t.category] = (data[t.category] || 0) + parseFloat(t.amount);
  });
  
  return Object.keys(data).map((category) => ({
    name: category,
    value: data[category],
  }));
};

export const getTimeSeriesData = (transactions) => {
  // Simple grouping by date
  const data = {};
  transactions.forEach((t) => {
    const date = t.date;
    if (!data[date]) {
      data[date] = { date, income: 0, expense: 0 };
    }
    if (t.type === "income") {
      data[date].income += parseFloat(t.amount);
    } else {
      data[date].expense += parseFloat(t.amount);
    }
  });
  
  return Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));
};
