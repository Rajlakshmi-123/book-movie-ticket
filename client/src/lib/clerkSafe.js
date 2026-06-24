import * as clerk from '@clerk/clerk-react'
import React from 'react'

export function useUserSafe() {
  try {
    return clerk.useUser();
  } catch (e) {
    return { user: null };
  }
}

export function useClerkSafe() {
  try {
    return clerk.useClerk();
  } catch (e) {
    return { openSignIn: () => console.warn('Clerk not configured') };
  }
}

export function UserButtonSafe(props) {
  try {
    const C = clerk.UserButton;
    if (!C) return null;
    return React.createElement(C, props, props.children);
  } catch (e) {
    return null;
  }
}

// Provide an actual ClerkProvider when a publishable key is provided.
// Otherwise render children directly (safe no-op).
export const ClerkProviderSafe = ({ children, publishableKey, ...rest }) => {
  if (publishableKey && clerk.ClerkProvider) {
    return React.createElement(clerk.ClerkProvider, { publishableKey, ...rest }, children);
  }
  return children;
}
