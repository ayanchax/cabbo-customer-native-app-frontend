import { env } from "@/services/env";
const APP_NAME = "Cabbo";

export const APP = {
    name: APP_NAME,
    tagline: "Your ride, simplified",

    copy: {
        startupErrorTitle: "We couldn’t get things ready.",
        startupErrorDescription: "Please try loading the app again.",
        tryAgain: "Try again",
        welcome: "Let's get you there",
        signInTitle: "Your next ride,\none step away.",
        rideArtworkCaption: "A little planning. A great ride.",
        bootstrapSubtitle: "A good ride starts here.",
        phonePrivacyNote: "Your number stays private.",
        onboardingDescription: "A couple of details, and you're ready to plan your next ride.",
        onboardingFooter: "Just the essentials. You can edit your details later.",
        outsideIndiaNotice: `It looks like you're accessing ${APP_NAME} from outside India. You can sign in with an Indian mobile number (+91).`,
        sessionExpiredDescription: `Your session has expired. Verify your mobile number again to continue with ${APP_NAME}.`,
        accountUnavailable: `We can't sign in to this account right now. Please contact ${APP_NAME} support.`,
    },
} as const;

export const API_VERSION = env.apiVersion || "/api/v1";

export const EXPECTED_EMAIL_VERIFICATION_ENDPOINT =
    "/customer/email-verification/verify";
export const ENDPOINTS = {
    AUTH: {
        INITIATE_ONBOARDING: `${API_VERSION}/auth/onboard/initiate`,
        VERIFY_ONBOARDING_WITH_OTP: `${API_VERSION}/auth/onboard/verify`,
        ONBOARD_AND_LOGIN: `${API_VERSION}/auth/onboard`,
        INITIATE_LOGIN: `${API_VERSION}/auth/login/initiate`,
        LOGIN_WITH_OTP: `${API_VERSION}/auth/login`,
        RESEND_OTP: `${API_VERSION}/auth/resend-otp`,
    },
    GEOGRAPHY: {
        SERVER: `${API_VERSION}/geography/`,
        CLIENT: env.clientGeolocationApiUrl || "https://ipapi.co/json/",
    },
    LOCATION: {
        SEARCH: `${API_VERSION}/locations/search`,
        REVERSE_GEOCODE: `${API_VERSION}/locations/reverse-geocode`,
        LOCATION_BY_PLACE_ID: `${API_VERSION}/locations/place-details`,
    },
    CUSTOMER: {
        IS_LOGGED_IN: `${API_VERSION}/customer/profile/is-logged-in`,
        PROFILE: `${API_VERSION}/customer/profile`,
        LOGOUT: `${API_VERSION}/customer/profile/logout`,
        UPDATE_NAME: `${API_VERSION}/customer/profile/update/name`,
        UPDATE_EMAIL: `${API_VERSION}/customer/profile/update/email`,
        REINITIATE_EMAIL_VERIFICATION: `${API_VERSION}/customer/email-verification/initiate`,
        UPLOAD_PROFILE_PICTURE: `${API_VERSION}/customer/profile/upload/profile-picture`,
        REMOVE_PROFILE_PICTURE: `${API_VERSION}/customer/profile/remove/profile-picture`,
        VERIFY_EMAIL: `${API_VERSION}/customer/email-verification/verify`,

    },
    LEGAL: {
        PAGES: `${API_VERSION}/legal/pages`,
        COMPANY: `${API_VERSION}/company`,
    },
    TRIP: {
        CLASSIFY_TYPE: `${API_VERSION}/trips/trip-type-classification/classify`,
        GET_PACKAGES_BY_TRIP_TYPE_AND_REGION: `${API_VERSION}/trips/trip-packages`,
        GET_PRIOR_BOOKING_WINDOW: `${API_VERSION}/trips/prior-booking-window`,
        SEARCH: `${API_VERSION}/trips/search`,
        INITIATE_BOOKING: `${API_VERSION}/trips/initiate-booking`,
        GET_BOOKING: `${API_VERSION}/trips/bookings`, // Append booking ID to get details for specific booking
        CANCEL_BOOKING: `${API_VERSION}/trips/bookings`, // Append booking ID and /cancel to cancel a booking
        UPDATE_NON_COST_IMPACTING_TRIP_DETAILS: `${API_VERSION}/trips/bookings`,
        GET_TRIP_TYPE_CONSTRAINTS: `${API_VERSION}/trips/constraints`,
        MY_TRIPS: `${API_VERSION}/trips/bookings`,
        MY_TRIPS_FEED: `${API_VERSION}/trips/bookings/my/feed`,
        REFUND_DETAILS: `${API_VERSION}/trips/refunds/refund`,
        GET_SUPPORT_CONTACTS: `${API_VERSION}/trips/support`,
        REVIEW_TRIP: `${API_VERSION}/trips/reviews`, // append booking ID/submit-review to rate a trip

    },
    FLEET: {
        GET_AVAILABLE_CABS: `${API_VERSION}/trips/fleet/`,
    }



}

export const TRIP_TYPES =
{
    AIRPORT_PICKUP: "airport_pickup", // pickup from airport to any drop location, also known as airport transfers
    AIRPORT_DROPOFF: "airport_drop", // drop to airport from any pickup location, also known airport transfers
    OUTSTATION: "outstation", // long-distance multi day trips outside the city, also known as outstation or inter-city rides   
    LOCAL: "local", // short-distance same day trips within the city, also known as point-to-point or intra-city rides or hourly rentals
}

export const CAB_TYPES = {
    HATCHBACK: "Hatchback",
    SEDAN: "Sedan",
    SEDAN_PLUS: "Premium Sedan",
    SUV: "SUV",
    SUV_PLUS: "SUV+"
}

export const DEFAULT_USER_LOCALE = "en-US";
export const DEFAULT_USER_TIMEZONE = "UTC";
export const DEFAULT_CURRENCY_SYMBOL = "₹";
export const DEFAULT_CURRENCY_CODE = "INR";
export const PAYMENT_ORDER_STATUS = {
    CREATED: "created"
}

export const DEFAULT_GEOGRAPHY = {
    country_name: "India",
    country_code: "IN",
    phone_code: "+91",
    flag: "🇮🇳",
    currency: DEFAULT_CURRENCY_CODE,
    currency_symbol: DEFAULT_CURRENCY_SYMBOL,
    currency_decimal_places: 2,
    currency_in_words: "Rupees",
    currency_international_name: "Indian Rupee",
    timezone: "Asia/Kolkata",
    utc_offset: "+05:30",
};

export const TRIP_STATUS = {
    CONFIRMED: "confirmed",
    ONGOING: "ongoing",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
    CLOSED: "closed",
    DISPUTED: "dispute",
    CREATED: "created",
}

export const TRIP_OCCURENCE_LABELS = {
    UPCOMING: "upcoming",
    ONGOING: "ongoing",
    CANCELLED: "cancelled",
    COMPLETED: "completed",
    PAST: "past",
}

export const REFUND_STATUS = {
    COMPLETED: "completed",
    PROCESSING: "processing",
    INITIATED: "initiated",
    FAILED: "failed",
    NOT_APPLICABLE: "not_applicable",
    UNKNOWN: "unknown",
    PROCESSED: "processed",
    PENDING: "pending",
    SUCCESS: "success",
}

export { SERVER_ERROR_CODES, SERVER_STATUS_CODES } from "./serverConstants";


