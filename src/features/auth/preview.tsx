import { createContext, useContext, useState, type PropsWithChildren } from "react";

export const previewStates = ["Default", "Outside India", "Geography unavailable", "Geography mismatch", "Loading", "Offline", "Server error", "Rate limited", "Account blocked", "Invalid OTP", "Expired OTP"] as const;
export type PreviewState = (typeof previewStates)[number];
function usePreviewModel() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [returning, setReturning] = useState(false);
  const [scenario, setScenario] = useState<PreviewState>("Default");
  const reset = () => { setPhone(""); setName(""); setEmail(""); setReturning(false); setScenario("Default"); };
  return { phone, setPhone, name, setName, email, setEmail, returning, setReturning, scenario, setScenario, reset };
}
const PreviewContext = createContext<ReturnType<typeof usePreviewModel> | null>(null);
export function AuthPreviewProvider({ children }: PropsWithChildren) {
  return <PreviewContext.Provider value={usePreviewModel()}>{children}</PreviewContext.Provider>;
}
export function useAuthPreview() {
  const value = useContext(PreviewContext);
  if (!value) throw new Error("Auth screens require AuthPreviewProvider");
  return value;
}
export const scenarioMessages: Partial<Record<PreviewState, string>> = {
  Offline: "You're offline. Check your connection and try again.",
  "Server error": "We couldn't complete that just now. Please try again.",
  "Rate limited": "Too many attempts. Please wait a little before trying again.",
  "Account blocked": "We can't sign in to this account right now. Please contact Cabbo support.",
  "Invalid OTP": "That code doesn't match. Check the code and try again.",
  "Expired OTP": "That code has expired. Request a new one to continue.",
};
