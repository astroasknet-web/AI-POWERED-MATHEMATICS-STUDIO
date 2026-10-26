/** Tiny GA4-style event tables for lessons, small enough to check every result by eye. */
export const ga_events = ["ga_events", ["event_date", "user_pseudo_id", "session_id", "event_name", "source", "medium"], [
  ["2025-03-01", "u1", "s1", "session_start", "google", "organic"], ["2025-03-01", "u1", "s1", "page_view", "google", "organic"], ["2025-03-01", "u1", "s1", "view_item", "google", "organic"], ["2025-03-01", "u1", "s1", "add_to_cart", "google", "organic"], ["2025-03-01", "u1", "s1", "purchase", "google", "organic"],
  ["2025-03-01", "u2", "s2", "session_start", "google", "cpc"], ["2025-03-01", "u2", "s2", "page_view", "google", "cpc"], ["2025-03-01", "u2", "s2", "view_item", "google", "cpc"],
  ["2025-03-02", "u3", "s3", "session_start", "newsletter", "email"], ["2025-03-02", "u3", "s3", "page_view", "newsletter", "email"],
  ["2025-03-03", "u1", "s4", "session_start", "(direct)", "(none)"], ["2025-03-03", "u1", "s4", "page_view", "(direct)", "(none)"],
  ["2025-03-03", "u4", "s5", "session_start", "google", "organic"], ["2025-03-03", "u4", "s5", "page_view", "google", "organic"], ["2025-03-03", "u4", "s5", "view_item", "google", "organic"], ["2025-03-03", "u4", "s5", "add_to_cart", "google", "organic"], ["2025-03-03", "u4", "s5", "begin_checkout", "google", "organic"],
]];
export default [ga_events];
