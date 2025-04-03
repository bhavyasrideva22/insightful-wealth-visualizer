
/**
 * Formats a number as Indian Rupee with commas and the ₹ symbol
 * @param value The number to format
 * @returns Formatted currency string
 */
export const formatIndianRupee = (value: number): string => {
  // Format the number with Indian numbering system (lakhs, crores)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  
  return formatter.format(value);
};

/**
 * Formats a percentage value
 * @param value The number to format as percentage
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Formats a large number into a readable format with appropriate suffix (K, L, Cr)
 * @param value The number to format
 * @returns Formatted number with suffix
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  } else {
    return `₹${value}`;
  }
};

/**
 * Validates if a string is a valid email address
 * @param email The email string to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
