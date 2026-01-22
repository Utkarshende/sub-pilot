// 1. API CONNECTION URLS
export const API_URLS = {
  BASE: "http://localhost:8080/api",
  AUTH: "/users",
  SUBS: "/subscriptions",
};

export const BUDGET_KEY = 'user_monthly_budget';

// 2. ALERT & TOAST NOTIFICATIONS
// Logic: Keeping these central makes it easy to change the "tone" of your app
export const ALERT_MESSAGES = {
  SUCCESS_ADD: "Subscription added successfully!",
  SUCCESS_DELETE: "Subscription removed successfully!",
  SUCCESS_LOGIN: "Welcome back!",
  ERROR_FETCH: "Could not load your subscriptions.",
  ERROR_SAVE: "Failed to save subscription. Try again.",
  ERROR_DELETE: "Could not delete. Please refresh.",
  ERROR_GENERIC: "Something went wrong.",
};

// 3. TOAST TYPES (Colors)
export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

// 4. BUTTON STYLES (Tailwind Classes)
export const BTN_VARIANTS = {
  PRIMARY: "bg-blue-600 text-white hover:bg-blue-700",
  DANGER: "bg-red-600 text-white hover:bg-red-700",
  GHOST: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

// 5. CATEGORY CONFIGURATION
export const CATEGORIES = [
  { id: 1, label: "Entertainment", value: "entertainment", color: "#4F46E5" },
  { id: 2, label: "Software/SaaS", value: "software", color: "#10B981" },
  { id: 3, label: "Utilities", value: "utilities", color: "#F59E0B" },
  { id: 4, label: "Health & Fitness", value: "health", color: "#EF4444" },
  { id: 5, label: "Education", value: "education", color: "#8B5CF6" },
  { id: 6, label: "Others", value: "others", color: "#6B7280" },
];

// 6. GENERAL UI STRINGS
export const UI_STRINGS = {
  APP_NAME: "SubPilot",
  SAVE: "Save Subscription",
  CANCEL: "Cancel",
  CONFIRM_DELETE: "Are you sure you want to delete this?",
  EMPTY_STATE: "No subscriptions yet. Add one above!",
};

