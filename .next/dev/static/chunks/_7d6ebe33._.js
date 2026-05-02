(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/config/env.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_API_BASE_URL = "http://localhost:8080/api";
const env = {
    apiBaseUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/api-error.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
class ApiError extends Error {
    code;
    status;
    details;
    constructor(params){
        super(params.message);
        this.name = "ApiError";
        this.code = params.code;
        this.status = params.status;
        this.details = params.details;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/endpoints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMIN_ENDPOINTS",
    ()=>ADMIN_ENDPOINTS,
    "AUTH_ENDPOINTS",
    ()=>AUTH_ENDPOINTS,
    "BANK_CREDITLENS_ENDPOINTS",
    ()=>BANK_CREDITLENS_ENDPOINTS,
    "BANK_CUSTOMER_FINANCIAL_ENDPOINTS",
    ()=>BANK_CUSTOMER_FINANCIAL_ENDPOINTS,
    "BANK_LOANSENSE_ENDPOINTS",
    ()=>BANK_LOANSENSE_ENDPOINTS,
    "CUSTOMER_ENDPOINTS",
    ()=>CUSTOMER_ENDPOINTS,
    "PUBLIC_CREDITLENS_ENDPOINTS",
    ()=>PUBLIC_CREDITLENS_ENDPOINTS,
    "PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS",
    ()=>PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS,
    "REGISTRATION_ENDPOINTS",
    ()=>REGISTRATION_ENDPOINTS,
    "SPENDIQ_ENDPOINTS",
    ()=>SPENDIQ_ENDPOINTS,
    "TRANSACT_ENDPOINTS",
    ()=>TRANSACT_ENDPOINTS,
    "USER_PROFILE_ENDPOINTS",
    ()=>USER_PROFILE_ENDPOINTS
]);
const AUTH_ENDPOINTS = {
    login: "/auth/login",
    me: "/auth/me",
    register: "/auth/register",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    verifyOtp: "/auth/verify-otp",
    resetPassword: "/auth/reset-password"
};
const REGISTRATION_ENDPOINTS = {
    bankCustomer: {
        stepOneDraft: "/bank-officers/customers/step-1/draft",
        stepOneContinue: "/bank-officers/customers/step-1/continue",
        stepOneUpdateDraft: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/step-1/draft`,
        stepOneUpdateContinue: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/step-1/continue`
    },
    publicCustomer: "/public-customers",
    bankOfficer: {
        draft: "/admin/bank-officers/draft",
        create: "/admin/bank-officers"
    }
};
const CUSTOMER_ENDPOINTS = {
    bankOfficerCustomers: "/bank-officers/customers",
    verifyBankAccount: "/bank-officers/customers/accounts/verify",
    bankOfficerCustomerByUser: (userId)=>`/bank-officers/customers/user/${userId}`,
    bankOfficerCustomerStepOneByNic: "/bank-officers/customers/step-1/by-nic",
    bankOfficerCustomerGeneratedCredentials: "/bank-officers/customers/credentials/generate"
};
const BANK_CUSTOMER_FINANCIAL_ENDPOINTS = {
    saveIncomeStep: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/steps/income/continue`,
    saveLoanStep: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/steps/loans/continue`,
    saveCardStep: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/steps/cards/continue`,
    saveLiabilityStep: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/steps/liabilities/continue`,
    saveCribLinkingStep: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/steps/crib-linking/continue`,
    completeCribReviewStep: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/steps/review/complete`,
    current: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/current`,
    history: (bankCustomerId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/history`,
    byId: (bankCustomerId, bankRecordId)=>`/bank-officers/customers/${bankCustomerId}/financial-records/${bankRecordId}`
};
const PUBLIC_CUSTOMER_FINANCIAL_ENDPOINTS = {
    me: "/public-customers/me",
    cardProviders: "/public-customers/card-providers",
    base: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records`,
    saveIncomeStep: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records/steps/income`,
    saveLoanStep: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records/steps/loans`,
    saveCardStep: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records/steps/cards`,
    saveLiabilityStep: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records/steps/liabilities`,
    current: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records/current`,
    history: (publicCustomerId)=>`/public-customers/${publicCustomerId}/financial-records/history`,
    byId: (publicCustomerId, recordId)=>`/public-customers/${publicCustomerId}/financial-records/${recordId}`
};
const PUBLIC_CREDITLENS_ENDPOINTS = {
    createEvaluation: "/creditlens/public/evaluations",
    current: "/creditlens/public/current",
    dashboard: "/creditlens/public/dashboard",
    trends: "/creditlens/public/trends",
    insights: "/creditlens/public/insights",
    report: "/creditlens/public/report",
    reportPdf: (selfEvaluationId)=>`/creditlens/public/report/${selfEvaluationId}/pdf`,
    history: "/creditlens/public/history",
    byId: (selfEvaluationId)=>`/creditlens/public/evaluations/${selfEvaluationId}`
};
const BANK_CREDITLENS_ENDPOINTS = {
    current: "/creditlens/bank/current",
    dashboard: "/creditlens/bank/dashboard",
    trends: "/creditlens/bank/trends",
    insights: "/creditlens/bank/insights",
    report: "/creditlens/bank/report",
    reportPdf: (bankEvaluationId)=>`/creditlens/bank/report/${bankEvaluationId}/pdf`,
    history: "/creditlens/bank/history",
    byId: (bankEvaluationId)=>`/creditlens/bank/evaluations/${bankEvaluationId}`
};
const BANK_LOANSENSE_ENDPOINTS = {
    current: "/loansense/bank/current",
    history: "/loansense/bank/history",
    byId: (loansenseEvaluationId)=>`/loansense/bank/evaluations/${loansenseEvaluationId}`,
    loanType: (loanType)=>`/loansense/bank/loan-types/${encodeURIComponent(loanType)}`
};
const USER_PROFILE_ENDPOINTS = {
    current: "/users/profile",
    update: "/users/profile",
    imageUpload: "/users/profile/image",
    imageDelete: "/users/profile/image"
};
const ADMIN_ENDPOINTS = {
    bankOfficers: "/admin/bank-officers",
    branches: "/admin/branches",
    users: "/admin/users",
    dashboardSummary: "/admin/dashboard/summary",
    dashboardRecentActions: "/admin/dashboard/recent-actions",
    auditLogs: "/admin/audit-logs",
    auditLogFilters: "/admin/audit-logs/filters",
    auditLogRecent: "/admin/audit-logs/recent",
    loanPolicies: "/admin/loan-policies"
};
const TRANSACT_ENDPOINTS = {
    dashboardCurrentBalance: "/bank-customers/transact/dashboard/current-balance",
    dashboardSummary: "/bank-customers/transact/dashboard/summary",
    transactionsInitiate: "/bank-customers/transact/transactions/initiate",
    transactionsVerifyOtp: "/bank-customers/transact/transactions/verify-otp",
    transactionsResendOtp: "/bank-customers/transact/transactions/resend-otp",
    transactionsHistory: "/bank-customers/transact/transactions/history",
    bankOfficerTransactionsHistory: "/bank-officers/transact/transactions",
    transactionByReference: (referenceNo)=>`/bank-customers/transact/transactions/${encodeURIComponent(referenceNo)}`,
    beneficiaries: "/bank-customers/transact/beneficiaries",
    beneficiaryById: (beneficiaryId)=>`/bank-customers/transact/beneficiaries/${beneficiaryId}`
};
const SPENDIQ_ENDPOINTS = {
    categories: "/spendiq/categories",
    expenses: "/spendiq/expenses",
    incomes: "/spendiq/incomes",
    budgets: "/spendiq/budgets",
    summary: "/spendiq/summary",
    expenseById: (expenseId)=>`/spendiq/expenses/${expenseId}`,
    incomeById: (incomeId)=>`/spendiq/incomes/${incomeId}`
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/auth.storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authPersistence",
    ()=>authPersistence,
    "localStateStorage",
    ()=>localStateStorage
]);
const inMemoryStorage = new Map();
const localStateStorage = {
    getItem: (name)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return window.localStorage.getItem(name);
    },
    setItem: (name, value)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.localStorage.setItem(name, value);
    },
    removeItem: (name)=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        window.localStorage.removeItem(name);
    }
};
const authPersistence = {
    storage: localStateStorage
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/auth.store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOGOUT_INTENT_KEY",
    ()=>LOGOUT_INTENT_KEY,
    "getRoleRedirectPath",
    ()=>getRoleRedirectPath,
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.storage.ts [app-client] (ecmascript)");
;
;
;
const LOGOUT_INTENT_KEY = "logout_intent";
const roleRedirectMap = {
    PUBLIC_CUSTOMER: "/public-customer",
    BANK_CUSTOMER: "/bank-customer",
    BANK_OFFICER: "/bank-officer",
    ADMIN: "/admin"
};
function isUserRole(value) {
    return value === "PUBLIC_CUSTOMER" || value === "BANK_CUSTOMER" || value === "BANK_OFFICER" || value === "ADMIN";
}
function getRoleRedirectPath(role) {
    return roleRedirectMap[role];
}
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        token: null,
        role: null,
        user: null,
        identity: null,
        profile: null,
        login: (payload)=>{
            const rawRole = payload.user.role;
            if (!isUserRole(rawRole)) {
                throw new Error(`Unsupported role returned by backend: ${rawRole}`);
            }
            const nextRole = rawRole;
            set({
                token: payload.accessToken,
                role: nextRole,
                user: payload.user,
                identity: null,
                profile: null
            });
            return getRoleRedirectPath(nextRole);
        },
        setIdentity: (identity)=>{
            set({
                identity
            });
        },
        setProfile: (profile)=>{
            set({
                profile
            });
        },
        clearSession: ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                window.sessionStorage.removeItem(LOGOUT_INTENT_KEY);
            }
            set({
                token: null,
                role: null,
                user: null,
                identity: null,
                profile: null
            });
        },
        logout: ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                window.sessionStorage.setItem(LOGOUT_INTENT_KEY, "1");
            }
            set({
                token: null,
                role: null,
                user: null,
                identity: null,
                profile: null
            });
        }
    }), {
    name: "primecore-auth",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authPersistence"].storage),
    partialize: (state)=>({
            token: state.token,
            role: state.role
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient,
    "default",
    ()=>__TURBOPACK__default__export__,
    "toApiError",
    ()=>toApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/env.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/api-error.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/endpoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
;
;
;
;
;
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].apiBaseUrl,
    timeout: 15000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});
apiClient.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
const PUBLIC_AUTH_ENDPOINTS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].login,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].register,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].forgotPassword,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].verifyOtp,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].resetPassword
];
function isPublicAuthRequest(url) {
    if (!url) {
        return false;
    }
    return PUBLIC_AUTH_ENDPOINTS.some((endpoint)=>url.includes(endpoint));
}
apiClient.interceptors.response.use((response)=>response, (error)=>{
    const axiosError = error;
    const status = axiosError.response?.status;
    const requestUrl = axiosError.config?.url;
    const shouldHandleUnauthorized = (status === 401 || status === 403) && !isPublicAuthRequest(requestUrl);
    if (shouldHandleUnauthorized) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().clearSession();
        if (("TURBOPACK compile-time value", "object") !== "undefined" && window.location.pathname !== "/login") {
            window.location.replace("/login");
        }
    }
    return Promise.reject(error);
});
function resolveApiErrorCode(status) {
    if (status === 401) return "UNAUTHORIZED";
    if (status === 403) return "FORBIDDEN";
    if (status === 404) return "NOT_FOUND";
    if (status === 409) return "CONFLICT";
    if (status === 400 || status === 422) return "VALIDATION_ERROR";
    if (status && status >= 500) return "SERVER_ERROR";
    return "UNKNOWN_ERROR";
}
function toApiError(error) {
    const axiosError = error;
    if (axiosError?.isAxiosError) {
        if (axiosError.code === "ECONNABORTED") {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
                message: "Request timed out.",
                code: "TIMEOUT"
            });
        }
        if (!axiosError.response) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
                message: "Network error. Please check your connection.",
                code: "NETWORK_ERROR"
            });
        }
        const status = axiosError.response.status;
        const responseData = axiosError.response.data;
        const message = typeof responseData?.message === "string" && responseData.message || axiosError.message || "Unexpected API error.";
        return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
            message,
            code: resolveApiErrorCode(status),
            status,
            details: responseData
        });
    }
    if (error instanceof Error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
            message: error.message,
            code: "UNKNOWN_ERROR"
        });
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
        message: "Unknown error occurred.",
        code: "UNKNOWN_ERROR"
    });
}
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/auth/auth.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService,
    "forgotPassword",
    ()=>forgotPassword,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "me",
    ()=>me,
    "register",
    ()=>register,
    "resetPassword",
    ()=>resetPassword,
    "verifyOtp",
    ()=>verifyOtp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/endpoints.ts [app-client] (ecmascript)");
;
;
async function login(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].login, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function me() {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].me);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function register(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].register, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function logout() {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].logout);
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function forgotPassword(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].forgotPassword, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function verifyOtp(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].verifyOtp, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function resetPassword(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].resetPassword, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
const authService = {
    login,
    me,
    register,
    logout,
    forgotPassword,
    verifyOtp,
    resetPassword
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
const badgeVariantClasses = {
    success: "border bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] border-[var(--badge-success-border)]",
    warning: "border bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border-[var(--badge-warning-border)]",
    danger: "border bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)] border-[var(--badge-danger-border)]",
    info: "border bg-[var(--badge-info-bg)] text-[var(--badge-info-text)] border-[var(--badge-info-border)]",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
};
function Badge({ className, variant = "info", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]", badgeVariantClasses[variant], className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const variantClasses = {
    primary: "bg-primary text-white shadow-[0_8px_18px_-14px_rgba(79,70,229,0.5)] hover:bg-primary/90 hover:brightness-110 active:scale-[0.98] transition-transform duration-200 dark:bg-[linear-gradient(120deg,var(--primecore-primary),#4338ca)] dark:shadow-[0_4px_20px_-8px_rgba(79,70,229,0.7)]",
    secondary: "bg-(--primecore-surface-soft) text-(--primecore-foreground) hover:bg-(--primecore-surface-soft)/90 dark:bg-(--primecore-surface-soft) dark:text-white dark:hover:bg-(--primecore-surface-soft)/80 border border-(--primecore-border)",
    outline: "border border-(--primecore-border) bg-transparent text-(--primecore-foreground) hover:bg-primary/10 hover:border-primary/50 dark:hover:bg-primary/15",
    ghost: "bg-transparent text-(--primecore-foreground) hover:bg-primary/10 dark:hover:bg-primary/20"
};
const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
    icon: "h-10 w-10 p-0"
};
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref)=>{
    const isDisabled = disabled || loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F9D94] focus-visible:ring-offset-2", "ring-offset-(--primecore-background) disabled:cursor-not-allowed disabled:opacity-60", variantClasses[variant], sizeClasses[size], className),
        disabled: isDisabled,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/button.tsx",
                lineNumber: 50,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 36,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border border-(--primecore-border) bg-(--primecore-surface) p-5 shadow-[0_2px_10px_-9px_rgba(6,49,84,0.22)]", "dark:bg-[linear-gradient(145deg,var(--primecore-surface),var(--primecore-surface-soft))] dark:shadow-[0_14px_36px_-24px_rgba(0,0,0,0.65)]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-3 space-y-1", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-slate-500 dark:text-slate-400", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 37,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-4 flex items-center justify-end gap-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Checkbox = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ref: ref,
        type: "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 shrink-0 rounded border border-(--primecore-border) bg-(--primecore-surface)", "text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2", "ring-offset-(--primecore-background) disabled:cursor-not-allowed disabled:opacity-60", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/checkbox.tsx",
        lineNumber: 9,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Checkbox;
Checkbox.displayName = "Checkbox";
var _c, _c1;
__turbopack_context__.k.register(_c, "Checkbox$React.forwardRef");
__turbopack_context__.k.register(_c1, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function Dialog({ open, onOpenChange, title, description, children, footer }) {
    if (!open) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Close dialog backdrop",
                className: "absolute inset-0 bg-[#063154]/50 backdrop-blur-[2px]",
                onClick: ()=>onOpenChange(false)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-10 w-full max-w-lg rounded-2xl border border-(--primecore-border)", "bg-(--primecore-surface) p-6 shadow-[0_24px_48px_-26px_rgba(2,14,28,0.75)] dark:bg-(--primecore-surface)"),
                children: [
                    (title || description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 space-y-1",
                        children: [
                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-(--primecore-foreground)",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 38,
                                columnNumber: 23
                            }, this),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-(--primecore-foreground)/75",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 39,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-(--primecore-foreground)",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex justify-end gap-2",
                        children: footer
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 43,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Dialog;
var _c;
__turbopack_context__.k.register(_c, "Dialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const Input = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = _s(({ id, label, error, helperText, className, containerClassName, labelClassName, ...props }, ref)=>{
    _s();
    const generatedId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("space-y-1.5", containerClassName),
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: inputId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium text-(--primecore-foreground)", labelClassName),
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/input.tsx",
                lineNumber: 20,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                id: inputId,
                "aria-invalid": !!error,
                "aria-describedby": error || helperText ? messageId : undefined,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full rounded-lg border bg-(--primecore-surface) px-3.5 py-2.5 text-sm text-(--primecore-foreground)", "placeholder:text-(--primecore-foreground)/55", "border-(--primecore-border) focus-visible:outline-none", "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", "ring-offset-background", error && "border-red-500 focus-visible:ring-red-500", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/input.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            (error || helperText) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: messageId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs", error ? "text-red-500 dark:text-red-400" : "text-(--primecore-foreground)/70"),
                children: error ?? helperText
            }, void 0, false, {
                fileName: "[project]/src/components/ui/input.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 19,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
}, "P3bvVUypbBAHy0F8g4TFKgtieUM=")), "P3bvVUypbBAHy0F8g4TFKgtieUM=");
_c1 = Input;
Input.displayName = "Input";
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Label = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Label;
Label.displayName = "Label";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
"use client";
;
;
function Modal(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/modal.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-[#BCC5CC]/45 dark:bg-[#BCC5CC]/25", className)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
_c = Skeleton;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
function Switch({ checked, onCheckedChange, disabled = false, className, id, "aria-label": ariaLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        id: id,
        type: "button",
        role: "switch",
        "aria-checked": checked,
        "aria-label": ariaLabel,
        disabled: disabled,
        onClick: ()=>onCheckedChange(!checked),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex h-9 w-16 items-center rounded-full border transition-all duration-200", "border-(--primecore-border) focus-visible:outline-none focus-visible:ring-2", "focus-visible:ring-[#2F9D94] focus-visible:ring-offset-2 ring-offset-(--primecore-background)", checked ? "bg-[#025F67]" : "bg-(--primecore-surface-soft)", disabled && "cursor-not-allowed opacity-60", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F7F6F2] text-[10px]", "font-semibold uppercase tracking-tight text-[#2F9D94] shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform duration-200", checked ? "translate-x-7" : "translate-x-1")
        }, void 0, false, {
            fileName: "[project]/src/components/ui/switch.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/switch.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = Switch;
var _c;
__turbopack_context__.k.register(_c, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCell",
    ()=>TableCell,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Table = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full overflow-x-auto rounded-xl border border-(--primecore-border) bg-(--primecore-surface)",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full caption-bottom text-sm", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 7,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Table;
const TableHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-(--primecore-surface-soft) dark:bg-primary/18", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = TableHeader;
const TableBody = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr:last-child]:border-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = TableBody;
const TableRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-(--primecore-border) transition-colors hover:bg-primary/8 dark:hover:bg-primary/14", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = TableRow;
const TableHead = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-[0.08em] text-(--primecore-foreground)/75", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = TableHead;
const TableCell = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-4 py-3 align-middle text-(--primecore-foreground)", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/table.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = TableCell;
Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Table$React.forwardRef");
__turbopack_context__.k.register(_c1, "Table");
__turbopack_context__.k.register(_c2, "TableHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "TableHeader");
__turbopack_context__.k.register(_c4, "TableBody$React.forwardRef");
__turbopack_context__.k.register(_c5, "TableBody");
__turbopack_context__.k.register(_c6, "TableRow$React.forwardRef");
__turbopack_context__.k.register(_c7, "TableRow");
__turbopack_context__.k.register(_c8, "TableHead$React.forwardRef");
__turbopack_context__.k.register(_c9, "TableHead");
__turbopack_context__.k.register(_c10, "TableCell$React.forwardRef");
__turbopack_context__.k.register(_c11, "TableCell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/confirmation-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationModal",
    ()=>ConfirmationModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
"use client";
;
;
function ConfirmationModal({ open, title, message, confirmLabel = "Delete", cancelLabel = "Cancel", isProcessing = false, onConfirm, onCancel }) {
    if (!open) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Close confirmation modal",
                onClick: ()=>{
                    if (!isProcessing) {
                        onCancel();
                    }
                },
                className: "absolute inset-0"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onCancel,
                        disabled: isProcessing,
                        title: "Close",
                        className: "absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 pr-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-0.5 rounded-full bg-red-100 p-2 text-red-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-gray-600",
                                        children: message
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-end gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onCancel,
                                disabled: isProcessing,
                                className: "rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50",
                                children: cancelLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onConfirm,
                                disabled: isProcessing,
                                className: "rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50",
                                children: isProcessing ? "Deleting..." : confirmLabel
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/confirmation-modal.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/confirmation-modal.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = ConfirmationModal;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/profile/user-profile.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMyUserProfile",
    ()=>getMyUserProfile,
    "removeMyUserProfileImage",
    ()=>removeMyUserProfileImage,
    "resolveUserProfileImageUrl",
    ()=>resolveUserProfileImageUrl,
    "updateMyUserProfile",
    ()=>updateMyUserProfile,
    "uploadMyUserProfileImage",
    ()=>uploadMyUserProfileImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/endpoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/env.ts [app-client] (ecmascript)");
;
;
;
const ABSOLUTE_URL_REGEX = /^(?:https?:)?\/\//i;
const DATA_URL_REGEX = /^data:/i;
function resolveBackendOrigin() {
    const apiBaseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].apiBaseUrl.trim();
    if (!apiBaseUrl) {
        return "";
    }
    try {
        const url = new URL(apiBaseUrl);
        const pathname = url.pathname.replace(/\/+$/, "");
        url.pathname = pathname.endsWith("/api") ? pathname.slice(0, -4) || "/" : pathname || "/";
        return url.toString().replace(/\/$/, "");
    } catch  {
        return apiBaseUrl.replace(/\/api\/?$/i, "").replace(/\/$/, "");
    }
}
function resolveUserProfileImageUrl(imageUrl) {
    const normalized = imageUrl?.trim() ?? "";
    if (!normalized) {
        return null;
    }
    if (ABSOLUTE_URL_REGEX.test(normalized) || DATA_URL_REGEX.test(normalized)) {
        return normalized;
    }
    const backendOrigin = resolveBackendOrigin();
    if (!backendOrigin) {
        return normalized;
    }
    return normalized.startsWith("/") ? `${backendOrigin}${normalized}` : `${backendOrigin}/${normalized}`;
}
async function getMyUserProfile() {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_PROFILE_ENDPOINTS"].current);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function updateMyUserProfile(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_PROFILE_ENDPOINTS"].update, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function uploadMyUserProfileImage(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_PROFILE_ENDPOINTS"].imageUpload, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function removeMyUserProfileImage() {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_PROFILE_ENDPOINTS"].imageDelete);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/config/site.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSidebarItems",
    ()=>getSidebarItems,
    "getSidebarRoleConfig",
    ()=>getSidebarRoleConfig,
    "siteConfig",
    ()=>siteConfig
]);
const siteConfig = {
    name: "PrimeCore",
    description: "PrimeCore Digital Banking UI",
    navbar: {
        links: [
            {
                title: "Products",
                href: "/products"
            },
            {
                title: "Resources",
                href: "/resources"
            },
            {
                title: "About",
                href: "/about"
            },
            {
                title: "Support",
                href: "/support"
            }
        ],
        auth: {
            login: {
                title: "Login",
                href: "/login"
            },
            signup: {
                title: "Sign Up",
                href: "/register"
            }
        }
    },
    footer: {
        groups: [
            {
                title: "Company",
                links: [
                    {
                        title: "About",
                        href: "/about"
                    },
                    {
                        title: "Careers",
                        href: "/careers"
                    }
                ]
            },
            {
                title: "Legal",
                links: [
                    {
                        title: "Privacy",
                        href: "/privacy"
                    },
                    {
                        title: "Terms",
                        href: "/terms"
                    }
                ]
            },
            {
                title: "Support",
                links: [
                    {
                        title: "Help Center",
                        href: "/support"
                    },
                    {
                        title: "Contact",
                        href: "/contact"
                    }
                ]
            }
        ],
        copyright: "© 2026 PrimeCore Bank. All rights reserved."
    },
    sidebar: {
        PUBLIC_CUSTOMER: {
            roleLabel: "Public Customer",
            appName: "Bank Digital",
            colorClass: "bg-[#0b6d76]",
            items: [
                {
                    title: "Dashboard",
                    href: "/public-customer",
                    icon: "layout-dashboard",
                    section: "general"
                },
                {
                    title: "SpendIQ",
                    href: "/public-customer/spendiq",
                    icon: "line-chart",
                    section: "general"
                },
                {
                    title: "Download Report",
                    href: "/public-customer/spendiq/report",
                    icon: "file-text",
                    section: "other"
                },
                {
                    title: "CreditLens",
                    href: "/public-customer/creditlens",
                    icon: "shield-check",
                    section: "general"
                },
                {
                    title: "Log Out",
                    href: "/",
                    icon: "log-out",
                    section: "account"
                }
            ]
        },
        BANK_CUSTOMER: {
            roleLabel: "Bank Customer",
            appName: "Bank Digital",
            colorClass: "bg-[#3e9fd3]",
            items: [
                {
                    title: "Dashboard",
                    href: "/bank-customer",
                    icon: "layout-dashboard",
                    section: "general"
                },
                {
                    title: "SpendIQ",
                    href: "/bank-customer/spendiq",
                    icon: "line-chart",
                    section: "general"
                },
                {
                    title: "Download Report",
                    href: "/bank-customer/spendiq/report",
                    icon: "file-text",
                    section: "other"
                },
                {
                    title: "CreditLens",
                    href: "/bank-customer/creditlens",
                    icon: "shield-check",
                    section: "general"
                },
                {
                    title: "LoanSense",
                    href: "/bank-customer/loansense",
                    icon: "file-text",
                    section: "general"
                },
                {
                    title: "Transact",
                    href: "/bank-customer/transact",
                    icon: "send",
                    section: "general"
                },
                {
                    title: "Log Out",
                    href: "/",
                    icon: "log-out",
                    section: "account"
                }
            ]
        },
        BANK_OFFICER: {
            roleLabel: "Bank Officer",
            appName: "Bank Officer",
            colorClass: "bg-[#0d3b66]",
            items: [
                {
                    title: "Dashboard",
                    href: "/bank-officer",
                    icon: "layout-dashboard",
                    section: "general"
                },
                {
                    title: "All Customers",
                    href: "/bank-officer/all-customers",
                    icon: "users",
                    section: "general"
                },
                {
                    title: "Add Customer",
                    href: "/bank-officer/add-customer",
                    icon: "user",
                    section: "general"
                },
                {
                    title: "History",
                    href: "/bank-officer/history",
                    icon: "history",
                    section: "general"
                },
                {
                    title: "Credit Analysis",
                    href: "/bank-officer/credit-analysis",
                    icon: "line-chart",
                    section: "general"
                },
                {
                    title: "Transactions",
                    href: "/bank-officer/transactions",
                    icon: "wallet",
                    section: "general"
                },
                {
                    title: "Profile",
                    href: "/bank-officer/profile",
                    icon: "user",
                    section: "general"
                },
                {
                    title: "Help & Support",
                    href: "/bank-officer/support",
                    icon: "help-circle",
                    section: "other"
                },
                {
                    title: "Setting",
                    href: "/bank-officer/settings",
                    icon: "settings",
                    section: "other"
                },
                {
                    title: "Log Out",
                    href: "/",
                    icon: "log-out",
                    section: "account"
                }
            ]
        },
        ADMIN: {
            roleLabel: "Admin",
            appName: "Admin Panel",
            colorClass: "bg-[#0d3b66]",
            items: [
                {
                    title: "Dashboard",
                    href: "/admin",
                    icon: "layout-dashboard",
                    section: "general"
                },
                {
                    title: "Branch Management",
                    href: "/admin/branch-management",
                    icon: "users",
                    section: "general"
                },
                {
                    title: "Officer Management",
                    href: "/admin/bank-officer-management",
                    icon: "user",
                    section: "general"
                },
                {
                    title: "Customer Management",
                    href: "/admin/user-management",
                    icon: "line-chart",
                    section: "general"
                },
                {
                    title: "Loan Policy",
                    href: "/admin/policy-management",
                    icon: "inbox",
                    section: "general"
                },
                {
                    title: "Audit Logs",
                    href: "/admin/audit-logs",
                    icon: "inbox",
                    section: "general"
                },
                {
                    title: "Profile",
                    href: "/admin/profile",
                    icon: "user",
                    section: "general"
                },
                {
                    title: "Help & Support",
                    href: "/admin/support",
                    icon: "help-circle",
                    section: "other"
                },
                {
                    title: "Setting",
                    href: "/admin/settings",
                    icon: "settings",
                    section: "other"
                },
                {
                    title: "Log Out",
                    href: "/",
                    icon: "log-out",
                    section: "account"
                }
            ]
        }
    }
};
function getSidebarItems(role) {
    return siteConfig.sidebar[role].items;
}
function getSidebarRoleConfig(role) {
    return siteConfig.sidebar[role];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
function Footer({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6 mb-4 w-full border border-(--primecore-border) bg-(--primecore-surface-soft)", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-10 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-8 lg:grid-cols-[1.15fr_2fr_0.85fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "inline-flex items-center gap-3 text-lg font-semibold text-(--primecore-foreground)",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                size: 18,
                                                className: "text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 18,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 17,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 20,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "max-w-xs text-sm text-(--primecore-foreground)/70",
                                    children: "Banking for the future."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].footer.groups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-(--primecore-foreground)",
                                                children: "Solutions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-3 space-y-2",
                                                children: group.links.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: item.href,
                                                            className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                            children: item.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/footer.tsx",
                                                            lineNumber: 32,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, item.title, false, {
                                                        fileName: "[project]/src/components/layout/footer.tsx",
                                                        lineNumber: 31,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 29,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, group.title, true, {
                                        fileName: "[project]/src/components/layout/footer.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-semibold text-(--primecore-foreground)",
                                            children: "Solutions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-3 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                        children: "Personal banking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/footer.tsx",
                                                        lineNumber: 45,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                        children: "Business banking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/footer.tsx",
                                                        lineNumber: 50,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 49,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                        children: "Investments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/footer.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-(--primecore-foreground)",
                                    children: "Follow us on"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex items-center gap-3 text-sm font-semibold text-(--primecore-foreground)/70",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "f"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "i"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "x"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "in"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/footer.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-(--primecore-border)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-4 text-center text-xs text-(--primecore-foreground)/65 sm:px-6 lg:px-8",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].footer.copyright
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/footer.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/footer.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/feature-sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureSidebar",
    ()=>FeatureSidebar,
    "featureMeta",
    ()=>featureMeta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-from-line.js [app-client] (ecmascript) <export default as ArrowLeftFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-from-line.js [app-client] (ecmascript) <export default as ArrowRightFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-clock.js [app-client] (ecmascript) <export default as FileClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const featureMeta = {
    spendiq: {
        title: "PrimeCore",
        subtitle: "SpendIQ",
        hrefByRole: {
            PUBLIC_CUSTOMER: "/public-customer/spendiq",
            BANK_CUSTOMER: "/bank-customer/spendiq"
        },
        colorClass: "bg-[#0b1a3a]"
    },
    creditlens: {
        title: "PrimeCore",
        subtitle: "CreditLens",
        hrefByRole: {
            PUBLIC_CUSTOMER: "/public-customer/creditlens",
            BANK_CUSTOMER: "/bank-customer/creditlens"
        },
        colorClass: "bg-[#0a234c]"
    },
    loansense: {
        title: "PrimeCore",
        subtitle: "LoanSense",
        hrefByRole: {
            PUBLIC_CUSTOMER: "/public-customer/loansense",
            BANK_CUSTOMER: "/bank-customer/loansense"
        },
        colorClass: "bg-[#0d3b66]"
    },
    transact: {
        title: "PrimeCore",
        subtitle: "Transact",
        hrefByRole: {
            PUBLIC_CUSTOMER: "/public-customer/transact",
            BANK_CUSTOMER: "/bank-customer/transact"
        },
        colorClass: "bg-[#0B3E5A]"
    }
};
// Helper to build links
const getFeatureLinks = (feature, role)=>{
    const base = featureMeta[feature].hrefByRole[role];
    if (feature === "spendiq") {
        return [
            {
                label: "General",
                items: [
                    {
                        title: "Dashboard",
                        href: base,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Add Expense",
                        href: `${base}/add`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"]
                    },
                    {
                        title: "Expenses History",
                        href: `${base}/history`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                    },
                    {
                        title: "Category Analysis",
                        href: `${base}/category`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
                    },
                    {
                        title: "Budget Management",
                        href: `${base}/budget`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    },
                    {
                        title: "Reports",
                        href: `${base}/report`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
                    }
                ]
            }
        ];
    }
    if (feature === "creditlens") {
        return [
            {
                label: "General",
                items: [
                    {
                        title: "Dashboard",
                        href: base,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Trend Analysis",
                        href: `${base}/trends`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                    },
                    {
                        title: "Credit Insight",
                        href: `${base}/insight`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"]
                    },
                    {
                        title: "Reports",
                        href: `${base}/report`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
                    }
                ]
            }
        ];
    }
    if (feature === "loansense") {
        return [
            {
                label: "General",
                items: [
                    {
                        title: "Dashboard",
                        href: base,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Personal Loan",
                        href: `${base}/personal`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"]
                    },
                    {
                        title: "Vehicle Loan",
                        href: `${base}/vehicle`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"]
                    },
                    {
                        title: "Educational Loan",
                        href: `${base}/education`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"]
                    },
                    {
                        title: "Housing Loan",
                        href: `${base}/housing`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Loan Eligibility History",
                        href: `${base}/history`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
                    }
                ]
            }
        ];
    }
    if (feature === "transact") {
        return [
            {
                label: "General",
                items: [
                    {
                        title: "Dashboard",
                        href: base,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Transfer",
                        href: `${base}/transfer`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"]
                    },
                    {
                        title: "Add Beneficiary",
                        href: `${base}/beneficiary`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
                    },
                    {
                        title: "Transaction History",
                        href: `${base}/history`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__["FileClock"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
                    }
                ]
            }
        ];
    }
    return [];
};
const dashboardHrefByRole = {
    PUBLIC_CUSTOMER: "/public-customer",
    BANK_CUSTOMER: "/bank-customer"
};
function FeatureSidebar({ role, feature, className, onNavigate }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "FeatureSidebar.useAuthStore[logout]": (state)=>state.logout
    }["FeatureSidebar.useAuthStore[logout]"]);
    const [isCollapsed, setIsCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeatureSidebar.useEffect": ()=>{
            const saved = localStorage.getItem("sidebar-collapsed");
            if (saved) {
                setTimeout({
                    "FeatureSidebar.useEffect": ()=>setIsCollapsed(JSON.parse(saved))
                }["FeatureSidebar.useEffect"], 0);
            }
        }
    }["FeatureSidebar.useEffect"], []);
    const toggleCollapse = ()=>{
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
    };
    const currentMeta = featureMeta[feature];
    const sections = getFeatureLinks(feature, role);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("sticky top-0 h-screen flex-col overflow-y-auto text-white transition-all duration-300 shadow-xl z-50", currentMeta.colorClass, isCollapsed ? "w-20" : "w-64", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center", isCollapsed ? "py-6 gap-6" : "px-6 py-8 md:py-10"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between", isCollapsed && "flex-col gap-6"),
                    children: [
                        isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCollapse,
                            className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                            title: "Expand Sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__["ArrowRightFromLine"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 214,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 209,
                            columnNumber: 14
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold leading-tight tracking-tight text-white mb-1",
                                    children: currentMeta.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-white/70 tracking-wide",
                                    children: currentMeta.subtitle
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCollapse,
                            className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                            title: "Collapse Sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__["ArrowLeftFromLine"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 231,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 226,
                            columnNumber: 14
                        }, this),
                        isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold leading-tight tracking-tight text-white",
                            children: "PC"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 237,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 px-4 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: dashboardHrefByRole[role],
                            onClick: onNavigate,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg", isCollapsed && "justify-center px-2"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 257,
                                    columnNumber: 14
                                }, this),
                                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "All Apps"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 258,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 249,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    sections.map((section, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                section.label && !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-bold uppercase tracking-wider text-white/40",
                                        children: section.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                        lineNumber: 267,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 266,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: section.items.map((item, itemIdx)=>{
                                        const isDashboard = item.href === currentMeta.hrefByRole[role];
                                        const isActive = isDashboard ? pathname === item.href : pathname.startsWith(item.href);
                                        const Icon = item.icon;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            onClick: onNavigate,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200", isActive ? "bg-white/10 text-white shadow-sm backdrop-blur-sm" : "text-white/70 hover:bg-white/5 hover:text-white", isCollapsed && "justify-center px-2"),
                                            title: isCollapsed ? item.title : undefined,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 18,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(isActive ? "text-white" : "text-white/70")
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 25
                                                }, this),
                                                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 42
                                                }, this)
                                            ]
                                        }, itemIdx, true, {
                                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                            lineNumber: 280,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 264,
                            columnNumber: 12
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 pt-4 border-t border-white/10 mt-4",
                        children: [
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-bold uppercase tracking-wider text-white/40",
                                    children: "Other"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 306,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 305,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `${currentMeta.hrefByRole[role]}/help`,
                                        onClick: onNavigate,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200", pathname.startsWith(`${currentMeta.hrefByRole[role]}/help`) ? "bg-white/10 text-white shadow-sm backdrop-blur-sm" : "text-white/70 hover:bg-white/5 hover:text-white", isCollapsed && "justify-center px-2"),
                                        title: isCollapsed ? "Help & Support" : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                size: 18,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(pathname.startsWith(`${currentMeta.hrefByRole[role]}/help`) ? "text-white" : "text-white/70")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 322,
                                                columnNumber: 19
                                            }, this),
                                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Help & Support"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 323,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `${currentMeta.hrefByRole[role]}/settings`,
                                        onClick: onNavigate,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200", pathname.startsWith(`${currentMeta.hrefByRole[role]}/settings`) ? "bg-white/10 text-white shadow-sm backdrop-blur-sm" : "text-white/70 hover:bg-white/5 hover:text-white", isCollapsed && "justify-center px-2"),
                                        title: isCollapsed ? "Settings" : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 18,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(pathname.startsWith(`${currentMeta.hrefByRole[role]}/settings`) ? "text-white" : "text-white/70")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this),
                                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 338,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 309,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-auto px-6 pb-4 pt-4", isCollapsed && "px-2"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        onNavigate?.();
                        logout();
                        window.location.replace("/");
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center gap-3 text-left text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg", isCollapsed && "justify-center px-2"),
                    title: isCollapsed ? "Log Out" : undefined,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Log Out"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 361,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                    lineNumber: 347,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/feature-sidebar.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/feature-sidebar.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_s(FeatureSidebar, "T24HoNzijLGQiS+RSDCkeAWBVWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = FeatureSidebar;
var _c;
__turbopack_context__.k.register(_c, "FeatureSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Navbar({ className }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-0 z-50 w-full", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-3 text-base font-semibold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-6 md:flex",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.links.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "text-sm font-medium text-white/85 transition-colors hover:text-white",
                                children: item.title
                            }, item.title, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-2 md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.href,
                                className: "inline-flex h-8 items-center justify-center rounded-lg border border-white/35 bg-white px-3 text-xs font-semibold text-(--primecore-foreground) transition-colors hover:bg-white/90",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.href,
                                className: "inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary/90",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "inline-flex items-center justify-center rounded-md p-2 text-white md:hidden",
                        "aria-label": "Toggle navigation",
                        onClick: ()=>setIsOpen((prev)=>!prev),
                        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 59,
                            columnNumber: 39
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/15 bg-[#0a3b60]/95 backdrop-blur md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6",
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.links.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "rounded-md px-2 py-2 text-sm font-medium text-white/90 hover:bg-white/10",
                                onClick: ()=>setIsOpen(false),
                                children: item.title
                            }, item.title, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.href,
                                    className: "inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-white px-3 text-sm font-medium text-(--primecore-foreground) transition-colors hover:bg-white/90",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.href,
                                    className: "inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/navbar.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Navbar, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/page-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageShell",
    ()=>PageShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function PageShell({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/layout/page-shell.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = PageShell;
var _c;
__turbopack_context__.k.register(_c, "PageShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Section",
    ()=>Section
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Section({ id, children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-14 sm:py-16", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/layout/section.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Section;
var _c;
__turbopack_context__.k.register(_c, "Section");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-from-line.js [app-client] (ecmascript) <export default as ArrowLeftFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right-from-line.js [app-client] (ecmascript) <export default as ArrowRightFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/inbox.js [app-client] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-line.js [app-client] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/auth/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const iconMap = {
    "layout-dashboard": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
    wallet: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
    send: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"],
    "line-chart": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"],
    "shield-check": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
    users: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
    "file-text": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
    settings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
    history: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"],
    inbox: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"],
    user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
    "help-circle": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"],
    "log-out": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"]
};
function Sidebar({ role, className, hideCollapse }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "Sidebar.useAuthStore[logout]": (state)=>state.logout
    }["Sidebar.useAuthStore[logout]"]);
    const [isCollapsed, setIsCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLogout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
        } catch  {
        // Local logout should still happen even if backend call fails.
        } finally{
            logout();
            window.location.replace("/");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (hideCollapse) return;
            const saved = localStorage.getItem("sidebar-collapsed");
            if (saved) {
                setTimeout({
                    "Sidebar.useEffect": ()=>setIsCollapsed(JSON.parse(saved))
                }["Sidebar.useEffect"], 0);
            }
        }
    }["Sidebar.useEffect"], [
        hideCollapse
    ]);
    const toggleCollapse = ()=>{
        if (hideCollapse) return;
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
    };
    const roleConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSidebarRoleConfig"])(role);
    const activeHref = roleConfig.items.filter((item)=>item.icon !== "log-out").map((item)=>item.href).filter((href)=>pathname === href || pathname.startsWith(`${href}/`)).sort((a, b)=>b.length - a.length)[0];
    const generalItems = roleConfig.items.filter((item)=>item.section === "general");
    const otherItems = roleConfig.items.filter((item)=>item.section === "other");
    const accountItems = roleConfig.items.filter((item)=>item.section === "account");
    const renderItem = (item)=>{
        const Icon = iconMap[item.icon];
        const isLogout = item.icon === "log-out";
        const isActive = !isLogout && item.href === activeHref;
        if (isLogout) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleLogout,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full items-center gap-3 rounded-lg px-6 py-3 text-left text-sm font-semibold text-white/90 transition-colors hover:bg-white/12", isCollapsed && "justify-center px-2"),
                title: isCollapsed ? item.title : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 18,
                        className: "text-white/75"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: item.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 111,
                        columnNumber: 28
                    }, this)
                ]
            }, item.title, true, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: item.href,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-semibold transition-colors", isActive ? "bg-white/25 text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:rounded-r before:bg-white" : "text-white/85 hover:bg-white/12", isCollapsed && "justify-center px-2"),
            title: isCollapsed ? item.title : undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 18,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(isActive ? "text-white" : "text-white/75")
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: item.title
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 130,
                    columnNumber: 26
                }, this)
            ]
        }, item.title, true, {
            fileName: "[project]/src/components/layout/sidebar.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("sticky top-0 flex h-screen flex-col overflow-y-auto text-white transition-all duration-300", "bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]", isCollapsed ? "w-20" : "w-64", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center", isCollapsed ? "py-6 gap-6" : "px-6 py-8 md:py-10"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between", isCollapsed && "flex-col gap-6"),
                    children: [
                        isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCollapse,
                            className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                            title: "Expand Sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__["ArrowRightFromLine"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 152,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 147,
                            columnNumber: 14
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold leading-tight tracking-tight text-white",
                                    children: "PrimeCore"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base font-normal text-white/70",
                                    children: roleConfig.appName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: !hideCollapse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCollapse,
                                className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                                title: "Collapse Sidebar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__["ArrowLeftFromLine"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar.tsx",
                                    lineNumber: 170,
                                    columnNumber: 20
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar.tsx",
                                lineNumber: 165,
                                columnNumber: 18
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold leading-tight tracking-tight text-white",
                            children: "PC"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 177,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-2 px-6", isCollapsed && "hidden"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs font-semibold uppercase tracking-wider text-white/50",
                    children: "General"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mb-8 space-y-1 px-3",
                children: generalItems.map((item)=>renderItem(item))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            otherItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-2 px-6", isCollapsed && "hidden"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold uppercase tracking-wider text-white/50",
                            children: "Other"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-1 px-3",
                        children: otherItems.map((item)=>renderItem(item))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this),
            accountItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto px-3 pb-8 pt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "space-y-1",
                    children: accountItems.map((item)=>renderItem(item))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/sidebar.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "T24HoNzijLGQiS+RSDCkeAWBVWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/auth-guard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthGuard",
    ()=>AuthGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthGuard({ requiredRole, children, fallback }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGuard.useAuthStore[token]": (state)=>state.token
    }["AuthGuard.useAuthStore[token]"]);
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGuard.useAuthStore[role]": (state)=>state.role
    }["AuthGuard.useAuthStore[role]"]);
    const isHydrated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.hasHydrated();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            if (isHydrated) {
                return;
            }
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.onFinishHydration({
                "AuthGuard.useEffect.unsubscribe": ()=>{
                // Hydration complete, component will re-render via store subscription
                }
            }["AuthGuard.useEffect.unsubscribe"]);
            void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.rehydrate();
            return ({
                "AuthGuard.useEffect": ()=>{
                    unsubscribe();
                }
            })["AuthGuard.useEffect"];
        }
    }["AuthGuard.useEffect"], [
        isHydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            if (!isHydrated) {
                return;
            }
            if (!token || !role) {
                const hasLogoutIntent = ("TURBOPACK compile-time value", "object") !== "undefined" && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOGOUT_INTENT_KEY"]) === "1";
                if (hasLogoutIntent) {
                    router.replace("/");
                    return;
                }
                router.replace("/login");
                return;
            }
            if (role !== requiredRole) {
                router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleRedirectPath"])(role));
            }
        }
    }["AuthGuard.useEffect"], [
        isHydrated,
        token,
        role,
        requiredRole,
        router
    ]);
    if (!isHydrated) {
        return fallback ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-40 animate-pulse rounded-xl border border-(--primecore-border) bg-(--primecore-surface-soft)"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-guard.tsx",
            lineNumber: 60,
            columnNumber: 24
        }, this);
    }
    if (!token || !role || role !== requiredRole) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthGuard, "VpPBEzwxfSS7lQuT/5ZwoOOVjHU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/auth/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$auth$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/auth-guard.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Credit lens background image opacity.126b32c8.png");}),
"[project]/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png.mjs { IMAGE => \"[project]/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 2048,
    height: 1365,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAgUlEQVR42i2Nuw6CQBRE9/9/w9YfsFVLC2PWmBijGAXk4S6wQHaqYQgUJ1PcM3NN6MFhWBjXLD14zcBjEmluOZg7sGpB1wnlswQPCbixoLl8wUyC1zEEsBXFvKDi6SNhd4+0qaRabR28aBqlcMJsbeT+EXl+gy/9TQvwV4H1X4KWJ6D0lm1VFkrdAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/feature-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureLayout",
    ()=>FeatureLayout,
    "useFeatureLayout",
    ()=>useFeatureLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/layout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/feature-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$auth$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/auth-guard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png.mjs { IMAGE => "[project]/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const FeatureLayoutContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useFeatureLayout() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(FeatureLayoutContext);
}
_s(useFeatureLayout, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function FeatureLayout({ children, role, feature }) {
    _s1();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isCreditLens = feature === "creditlens";
    const isTransact = feature === "transact";
    const isLoanSense = feature === "loansense";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeatureLayout.useEffect": ()=>{
            const onEscape = {
                "FeatureLayout.useEffect.onEscape": (event)=>{
                    if (event.key === "Escape") {
                        setIsMobileSidebarOpen(false);
                    }
                }
            }["FeatureLayout.useEffect.onEscape"];
            window.addEventListener("keydown", onEscape);
            return ({
                "FeatureLayout.useEffect": ()=>window.removeEventListener("keydown", onEscape)
            })["FeatureLayout.useEffect"];
        }
    }["FeatureLayout.useEffect"], []);
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FeatureLayout.useMemo[contextValue]": ()=>({
                openMobileSidebar: ({
                    "FeatureLayout.useMemo[contextValue]": ()=>setIsMobileSidebarOpen(true)
                })["FeatureLayout.useMemo[contextValue]"],
                closeMobileSidebar: ({
                    "FeatureLayout.useMemo[contextValue]": ()=>setIsMobileSidebarOpen(false)
                })["FeatureLayout.useMemo[contextValue]"],
                isMobileSidebarOpen
            })
    }["FeatureLayout.useMemo[contextValue]"], [
        isMobileSidebarOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$auth$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthGuard"], {
        requiredRole: role,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureLayoutContext.Provider, {
            value: contextValue,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-screen overflow-hidden", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureMeta"][feature]?.colorClass),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeatureSidebar"], {
                        role: role,
                        feature: feature,
                        className: "hidden lg:flex"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/feature-layout.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-[70] lg:hidden", isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Close sidebar",
                                onClick: ()=>setIsMobileSidebarOpen(false),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 bg-slate-950/50 transition-opacity", isMobileSidebarOpen ? "opacity-100" : "opacity-0")
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/feature-layout.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-y-0 left-0 max-w-[85vw] transition-transform duration-300 ease-out", isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeatureSidebar"], {
                                        role: role,
                                        feature: feature,
                                        onNavigate: ()=>setIsMobileSidebarOpen(false),
                                        className: "flex !h-full !w-[280px] !max-w-[85vw] !static"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/feature-layout.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-label": "Close menu",
                                        onClick: ()=>setIsMobileSidebarOpen(false),
                                        className: "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/feature-layout.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/feature-layout.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/feature-layout.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/feature-layout.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto rounded-none p-3 sm:p-4 lg:p-0", isCreditLens ? "bg-[#e9eff7] lg:rounded-l-[32px]" : isTransact ? "transact-surface-shade bg-[#f8fcff] lg:rounded-l-[28px]" : isLoanSense ? "loansense-surface-shade bg-[#f7f9ff] lg:rounded-l-[28px]" : "bg-(--primecore-surface) lg:rounded-l-[28px]"),
                        style: isCreditLens ? {
                            backgroundImage: `url("${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                            backgroundRepeat: "no-repeat"
                        } : undefined,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/feature-layout.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/feature-layout.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/feature-layout.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/feature-layout.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s1(FeatureLayout, "fogj0zChM1MRvxCQZ4kDqbtLTCw=");
_c = FeatureLayout;
var _c;
__turbopack_context__.k.register(_c, "FeatureLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/feature-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$page$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/page-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/feature-layout.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/notifications/notification-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildNotificationRouteContext",
    ()=>buildNotificationRouteContext,
    "getNotificationsForContext",
    ()=>getNotificationsForContext,
    "resolveNotificationRouteContext",
    ()=>resolveNotificationRouteContext
]);
"use client";
const ROLE_LABELS = {
    admin: "Admin",
    "bank-officer": "Bank Officer",
    "bank-customer": "Bank Customer",
    "public-customer": "Public Customer"
};
const MODULE_LABELS = {
    creditlens: "CreditLens",
    transact: "Transact",
    loansense: "LoanSense",
    spendiq: "SpendIQ"
};
function isFeatureSegment(value) {
    return Boolean(value && [
        "creditlens",
        "transact",
        "loansense",
        "spendiq"
    ].includes(value));
}
function buildNotificationRouteContext(roleSegment, featureSegment = null) {
    if (!roleSegment) {
        return {
            roleSegment: null,
            featureSegment: null,
            roleLabel: "User",
            moduleLabel: "Dashboard",
            moduleRootPath: null,
            profilePath: null,
            notificationsPath: null
        };
    }
    if (roleSegment === "admin") {
        return {
            roleSegment,
            featureSegment: null,
            roleLabel: ROLE_LABELS.admin,
            moduleLabel: "Admin Workspace",
            moduleRootPath: "/admin",
            profilePath: "/admin/profile",
            notificationsPath: "/admin/notifications"
        };
    }
    if (roleSegment === "bank-officer") {
        return {
            roleSegment,
            featureSegment: null,
            roleLabel: ROLE_LABELS["bank-officer"],
            moduleLabel: "Officer Workspace",
            moduleRootPath: "/bank-officer",
            profilePath: "/bank-officer/profile",
            notificationsPath: "/bank-officer/notifications"
        };
    }
    if (featureSegment) {
        const moduleRootPath = `/${roleSegment}/${featureSegment}`;
        return {
            roleSegment,
            featureSegment,
            roleLabel: ROLE_LABELS[roleSegment],
            moduleLabel: MODULE_LABELS[featureSegment],
            moduleRootPath,
            profilePath: `${moduleRootPath}/profile`,
            notificationsPath: `${moduleRootPath}/notifications`
        };
    }
    return {
        roleSegment,
        featureSegment: null,
        roleLabel: ROLE_LABELS[roleSegment],
        moduleLabel: "Dashboard",
        moduleRootPath: `/${roleSegment}`,
        profilePath: null,
        notificationsPath: null
    };
}
function resolveNotificationRouteContext(pathname) {
    if (!pathname) {
        return buildNotificationRouteContext(null, null);
    }
    const segments = pathname.split("/").filter(Boolean);
    const roleSegment = segments[0];
    if (!roleSegment || ![
        "admin",
        "bank-officer",
        "bank-customer",
        "public-customer"
    ].includes(roleSegment)) {
        return buildNotificationRouteContext(null, null);
    }
    if (roleSegment === "bank-customer" || roleSegment === "public-customer") {
        const featureCandidate = segments[1];
        const featureSegment = isFeatureSegment(featureCandidate) ? featureCandidate : null;
        return buildNotificationRouteContext(roleSegment, featureSegment);
    }
    return buildNotificationRouteContext(roleSegment, null);
}
function withDefaults(items) {
    return items.map((item, index)=>({
            ...item,
            id: String(index + 1)
        }));
}
function getNotificationsForContext(context) {
    const root = context.moduleRootPath ?? "/";
    if (context.roleSegment === "admin") {
        return withDefaults([
            {
                title: "Policy update pending approval",
                message: "A loan interest policy change is waiting for admin validation.",
                time: "5m ago",
                kind: "warning",
                unread: true,
                ctaLabel: "Open Policy Management",
                ctaHref: `${root}/policy-management`
            },
            {
                title: "Audit event triggered",
                message: "Multiple failed login attempts detected for a branch user.",
                time: "18m ago",
                kind: "alert",
                unread: true,
                ctaLabel: "Review Audit Logs",
                ctaHref: `${root}/audit-logs`
            },
            {
                title: "Officer profile update request",
                message: "A bank officer submitted changes requiring admin review.",
                time: "1h ago",
                kind: "info",
                unread: true,
                ctaLabel: "Open Officer Management",
                ctaHref: `${root}/bank-officer-management`
            },
            {
                title: "User access role changed",
                message: "A customer role update was completed successfully.",
                time: "3h ago",
                kind: "success",
                unread: false,
                ctaLabel: "Open User Management",
                ctaHref: `${root}/user-management`
            },
            {
                title: "Branch setup completed",
                message: "New branch metadata was synced with the core system.",
                time: "Yesterday",
                kind: "success",
                unread: false,
                ctaLabel: "Open Branch Management",
                ctaHref: `${root}/branch-management`
            }
        ]);
    }
    if (context.roleSegment === "bank-officer") {
        return withDefaults([
            {
                title: "Customer evaluation assigned",
                message: "A new credit assessment was assigned to your queue.",
                time: "6m ago",
                kind: "info",
                unread: true,
                ctaLabel: "Open Credit Analysis",
                ctaHref: `${root}/credit-analysis`
            },
            {
                title: "High-risk customer alert",
                message: "One customer crossed the risk threshold and needs follow-up.",
                time: "22m ago",
                kind: "alert",
                unread: true,
                ctaLabel: "Open All Customers",
                ctaHref: `${root}/all-customers`
            },
            {
                title: "Transaction review requested",
                message: "Compliance flagged a transaction for manual verification.",
                time: "55m ago",
                kind: "warning",
                unread: true,
                ctaLabel: "Open Transactions",
                ctaHref: `${root}/transactions`
            },
            {
                title: "Customer added successfully",
                message: "A new customer record has been created and validated.",
                time: "2h ago",
                kind: "success",
                unread: false,
                ctaLabel: "Open History",
                ctaHref: `${root}/history`
            },
            {
                title: "Document check complete",
                message: "KYC verification completed for your latest onboarding.",
                time: "Yesterday",
                kind: "success",
                unread: false,
                ctaLabel: "Open Add Customer",
                ctaHref: `${root}/add-customer`
            }
        ]);
    }
    if (context.featureSegment === "creditlens") {
        return withDefaults([
            {
                title: "Credit score updated",
                message: "Your credit risk score was recalculated with latest data.",
                time: "4m ago",
                kind: "info",
                unread: true,
                ctaLabel: "View Report",
                ctaHref: `${root}/report`
            },
            {
                title: "Risk factor increased",
                message: "Credit utilization increased and may affect your score.",
                time: "17m ago",
                kind: "warning",
                unread: true,
                ctaLabel: "Open Insights",
                ctaHref: `${root}/insight`
            },
            {
                title: "Trend alert detected",
                message: "A new monthly trend anomaly has been identified.",
                time: "1h ago",
                kind: "alert",
                unread: true,
                ctaLabel: "Open Trends",
                ctaHref: `${root}/trends`
            },
            {
                title: "Report exported",
                message: "Your latest credit summary report was generated.",
                time: "3h ago",
                kind: "success",
                unread: false,
                ctaLabel: "View Report",
                ctaHref: `${root}/report`
            },
            {
                title: "Profile verified",
                message: "Personal profile details were verified successfully.",
                time: "Yesterday",
                kind: "success",
                unread: false,
                ctaLabel: "Open Profile",
                ctaHref: `${root}/profile`
            }
        ]);
    }
    if (context.featureSegment === "spendiq") {
        return withDefaults([
            {
                title: "Budget limit near threshold",
                message: "Food and Dining reached 85% of this month's budget.",
                time: "3m ago",
                kind: "warning",
                unread: true,
                ctaLabel: "Open Budget",
                ctaHref: `${root}/budget`
            },
            {
                title: "New expense captured",
                message: "A recent card transaction was categorized automatically.",
                time: "14m ago",
                kind: "info",
                unread: true,
                ctaLabel: "Open History",
                ctaHref: `${root}/history`
            },
            {
                title: "Category spike detected",
                message: "Shopping spend increased compared to last week.",
                time: "49m ago",
                kind: "alert",
                unread: true,
                ctaLabel: "Open Category Analysis",
                ctaHref: `${root}/category`
            },
            {
                title: "Expense synced",
                message: "Bank transactions were synced to SpendIQ successfully.",
                time: "2h ago",
                kind: "success",
                unread: false,
                ctaLabel: "Open Dashboard",
                ctaHref: root
            },
            {
                title: "Monthly summary ready",
                message: "Your monthly summary is now available for review.",
                time: "Yesterday",
                kind: "info",
                unread: false,
                ctaLabel: "Open Summary",
                ctaHref: `${root}/summary`
            }
        ]);
    }
    if (context.featureSegment === "loansense") {
        return withDefaults([
            {
                title: "Eligibility refreshed",
                message: "Your loan eligibility profile was updated successfully.",
                time: "6m ago",
                kind: "info",
                unread: true,
                ctaLabel: "Open Dashboard",
                ctaHref: root
            },
            {
                title: "Pre-approved offer available",
                message: "A personal loan offer is now pre-approved for you.",
                time: "19m ago",
                kind: "success",
                unread: true,
                ctaLabel: "Open Personal Loan",
                ctaHref: `${root}/personal`
            },
            {
                title: "Additional documents needed",
                message: "Education loan request needs additional proof documents.",
                time: "58m ago",
                kind: "warning",
                unread: true,
                ctaLabel: "Open Education Loan",
                ctaHref: `${root}/education`
            },
            {
                title: "Rate change notice",
                message: "Loan policy rates changed for housing applications.",
                time: "3h ago",
                kind: "alert",
                unread: false,
                ctaLabel: "Open Housing Loan",
                ctaHref: `${root}/housing`
            },
            {
                title: "History exported",
                message: "Loan eligibility history export completed.",
                time: "Yesterday",
                kind: "success",
                unread: false,
                ctaLabel: "Open History",
                ctaHref: `${root}/history`
            }
        ]);
    }
    if (context.featureSegment === "transact") {
        return withDefaults([
            {
                title: "Transfer completed",
                message: "Your fund transfer was processed successfully.",
                time: "2m ago",
                kind: "success",
                unread: true,
                ctaLabel: "Open History",
                ctaHref: `${root}/history`
            },
            {
                title: "Beneficiary added",
                message: "A new beneficiary was added to your transfer list.",
                time: "11m ago",
                kind: "info",
                unread: true,
                ctaLabel: "Open Beneficiary",
                ctaHref: `${root}/beneficiary`
            },
            {
                title: "Transfer pending review",
                message: "A high-value transfer is under additional verification.",
                time: "39m ago",
                kind: "warning",
                unread: true,
                ctaLabel: "Open Transfer",
                ctaHref: `${root}/transfer`
            },
            {
                title: "Security check passed",
                message: "Your latest transaction passed security validation.",
                time: "2h ago",
                kind: "success",
                unread: false,
                ctaLabel: "Open Dashboard",
                ctaHref: root
            },
            {
                title: "Daily summary ready",
                message: "Your daily transfer summary is available now.",
                time: "Yesterday",
                kind: "info",
                unread: false,
                ctaLabel: "Open History",
                ctaHref: `${root}/history`
            }
        ]);
    }
    return withDefaults([
        {
            title: "No new notifications",
            message: "You are all caught up for now.",
            time: "Just now",
            kind: "info",
            unread: false
        }
    ]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/module-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModuleHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as TriangleAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$profile$2f$user$2d$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/profile/user-profile.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/layout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/feature-layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$notification$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/notifications/notification-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const THEME_BG = {
    creditlens: "bg-[linear-gradient(90deg,#0b2447,#09203a)]",
    transact: "bg-[linear-gradient(90deg,#0B3E5A,#0a3046)]",
    loansense: "bg-[linear-gradient(90deg,#0d3b66,#0a2f51)]",
    spendiq: "bg-[linear-gradient(90deg,#0b1a3a,#0a234c)]",
    staff: "bg-[linear-gradient(90deg,#0b1a3a,#0a234c)]"
};
const NOTIFICATION_KIND_ICON = {
    info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
        size: 14,
        className: "text-sky-400"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/module-header.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
        size: 14,
        className: "text-emerald-400"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/module-header.tsx",
        lineNumber: 50,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlert$3e$__["TriangleAlert"], {
        size: 14,
        className: "text-amber-400"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/module-header.tsx",
        lineNumber: 51,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    alert: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlert$3e$__["TriangleAlert"], {
        size: 14,
        className: "text-rose-400"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/module-header.tsx",
        lineNumber: 52,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0))
};
function formatRoleLabel(roleName) {
    const normalized = roleName?.trim() ?? "";
    if (!normalized) {
        return null;
    }
    return normalized.toLowerCase().split("_").map((part)=>part ? part.charAt(0).toUpperCase() + part.slice(1) : part).join(" ");
}
function NotificationBadge({ show, value }) {
    if (!show) return null;
    if (value === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/module-header.tsx",
            lineNumber: 72,
            columnNumber: 12
        }, this);
    }
    if (value === undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/module-header.tsx",
            lineNumber: 76,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "absolute -right-1 -top-1 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white",
        children: value
    }, void 0, false, {
        fileName: "[project]/src/components/ui/module-header.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c = NotificationBadge;
function ModuleHeader({ title = "Dashboard", subtitle, name, role, theme = "creditlens", className, showBadges = true, notificationBadge, rightContent, avatarSrc, avatarStatusDot = false, menuMode = "none", sidebarRole = "BANK_OFFICER", sidebarHideCollapse = false }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const featureLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFeatureLayout"])();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "ModuleHeader.useAuthStore[token]": (state)=>state.token
    }["ModuleHeader.useAuthStore[token]"]);
    const authUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "ModuleHeader.useAuthStore[authUser]": (state)=>state.user
    }["ModuleHeader.useAuthStore[authUser]"]);
    const authIdentity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "ModuleHeader.useAuthStore[authIdentity]": (state)=>state.identity
    }["ModuleHeader.useAuthStore[authIdentity]"]);
    const authProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "ModuleHeader.useAuthStore[authProfile]": (state)=>state.profile
    }["ModuleHeader.useAuthStore[authProfile]"]);
    const setAuthProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "ModuleHeader.useAuthStore[setAuthProfile]": (state)=>state.setProfile
    }["ModuleHeader.useAuthStore[setAuthProfile]"]);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const notificationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModuleHeader.useEffect": ()=>{
            if (!token || authProfile) {
                return;
            }
            let isCancelled = false;
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$profile$2f$user$2d$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMyUserProfile"])().then({
                "ModuleHeader.useEffect": (profileData)=>{
                    if (!isCancelled) {
                        setAuthProfile(profileData);
                    }
                }
            }["ModuleHeader.useEffect"]).catch({
                "ModuleHeader.useEffect": ()=>undefined
            }["ModuleHeader.useEffect"]);
            return ({
                "ModuleHeader.useEffect": ()=>{
                    isCancelled = true;
                }
            })["ModuleHeader.useEffect"];
        }
    }["ModuleHeader.useEffect"], [
        authProfile,
        setAuthProfile,
        token
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModuleHeader.useEffect": ()=>{
            const raf = requestAnimationFrame({
                "ModuleHeader.useEffect.raf": ()=>{
                    setIsMenuOpen(false);
                    setIsNotificationsOpen(false);
                }
            }["ModuleHeader.useEffect.raf"]);
            return ({
                "ModuleHeader.useEffect": ()=>cancelAnimationFrame(raf)
            })["ModuleHeader.useEffect"];
        }
    }["ModuleHeader.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ModuleHeader.useEffect": ()=>{
            if (!isNotificationsOpen) return;
            const handleMouseDown = {
                "ModuleHeader.useEffect.handleMouseDown": (event)=>{
                    if (!notificationsRef.current?.contains(event.target)) {
                        setIsNotificationsOpen(false);
                    }
                }
            }["ModuleHeader.useEffect.handleMouseDown"];
            const handleKeyDown = {
                "ModuleHeader.useEffect.handleKeyDown": (event)=>{
                    if (event.key === "Escape") {
                        setIsNotificationsOpen(false);
                    }
                }
            }["ModuleHeader.useEffect.handleKeyDown"];
            document.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("keydown", handleKeyDown);
            return ({
                "ModuleHeader.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleMouseDown);
                    document.removeEventListener("keydown", handleKeyDown);
                }
            })["ModuleHeader.useEffect"];
        }
    }["ModuleHeader.useEffect"], [
        isNotificationsOpen
    ]);
    const canOpenMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[canOpenMenu]": ()=>{
            if (menuMode === "sidebar-overlay") return true;
            if (menuMode === "feature-layout") return Boolean(featureLayout);
            return false;
        }
    }["ModuleHeader.useMemo[canOpenMenu]"], [
        featureLayout,
        menuMode
    ]);
    const resolvedRightContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[resolvedRightContent]": ()=>{
            if (rightContent !== undefined) return rightContent;
            if (theme !== "spendiq") return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: {
                    "ModuleHeader.useMemo[resolvedRightContent]": ()=>{
                        const base = pathname?.startsWith("/bank-customer") ? "/bank-customer" : pathname?.startsWith("/public-customer") ? "/public-customer" : "";
                        const target = base ? `${base}/spendiq/add` : "/public-customer/spendiq/add";
                        router.push(target);
                    }
                }["ModuleHeader.useMemo[resolvedRightContent]"],
                className: "hidden items-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 md:inline-flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Add Entry"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/module-header.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this);
        }
    }["ModuleHeader.useMemo[resolvedRightContent]"], [
        pathname,
        rightContent,
        router,
        theme
    ]);
    const handleOpenMenu = ()=>{
        if (menuMode === "feature-layout") {
            featureLayout?.openMobileSidebar();
            return;
        }
        if (menuMode === "sidebar-overlay") {
            setIsMenuOpen(true);
        }
    };
    const routeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[routeContext]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$notification$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveNotificationRouteContext"])(pathname)
    }["ModuleHeader.useMemo[routeContext]"], [
        pathname
    ]);
    const routeKey = `${routeContext.roleSegment}:${routeContext.featureSegment ?? "all"}`;
    const sourceNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[sourceNotifications]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$notifications$2f$notification$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNotificationsForContext"])(routeContext)
    }["ModuleHeader.useMemo[sourceNotifications]"], [
        routeContext
    ]);
    const [dismissedByRoute, setDismissedByRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const dismissedIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[dismissedIds]": ()=>dismissedByRoute[routeKey] ?? []
    }["ModuleHeader.useMemo[dismissedIds]"], [
        dismissedByRoute,
        routeKey
    ]);
    const notifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[notifications]": ()=>sourceNotifications.filter({
                "ModuleHeader.useMemo[notifications]": (item)=>!dismissedIds.includes(item.id)
            }["ModuleHeader.useMemo[notifications]"])
    }["ModuleHeader.useMemo[notifications]"], [
        dismissedIds,
        sourceNotifications
    ]);
    const previewNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[previewNotifications]": ()=>notifications.slice(0, 4)
    }["ModuleHeader.useMemo[previewNotifications]"], [
        notifications
    ]);
    const unreadCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ModuleHeader.useMemo[unreadCount]": ()=>notifications.filter({
                "ModuleHeader.useMemo[unreadCount]": (item)=>item.unread
            }["ModuleHeader.useMemo[unreadCount]"]).length
    }["ModuleHeader.useMemo[unreadCount]"], [
        notifications
    ]);
    const profilePath = routeContext.profilePath;
    const notificationsPath = routeContext.notificationsPath;
    const resolvedUserName = authProfile?.fullName?.trim() || authIdentity?.fullName?.trim() || authUser?.fullName?.trim() || null;
    const resolvedUserRole = authProfile?.roleDisplayName?.trim() || formatRoleLabel(authIdentity?.roleName) || null;
    const resolvedAvatarSrc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$profile$2f$user$2d$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveUserProfileImageUrl"])(authProfile?.profilePictureUrl) ?? (resolvedUserName ? `https://ui-avatars.com/api/?name=${encodeURIComponent(resolvedUserName)}&background=random` : avatarSrc);
    const resolvedName = resolvedUserName || name || "User";
    const resolvedRole = resolvedUserRole || role || "User";
    const handleRemoveNotification = (id)=>{
        setDismissedByRoute((prev)=>{
            const existing = prev[routeKey] ?? [];
            if (existing.includes(id)) return prev;
            return {
                ...prev,
                [routeKey]: [
                    ...existing,
                    id
                ]
            };
        });
    };
    const profileContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white/20",
                children: [
                    resolvedAvatarSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: resolvedAvatarSrc,
                        alt: "User",
                        fill: true,
                        className: "object-cover",
                        sizes: "32px",
                        unoptimized: true
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full w-full bg-gradient-to-br from-slate-400 to-slate-600"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this),
                    avatarStatusDot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#0d3b66] bg-green-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/module-header.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden min-w-0 text-sm leading-tight sm:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-base font-medium",
                        children: resolvedName
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-xs text-white/60",
                        children: resolvedRole
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/module-header.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3 text-white shadow-sm sm:p-4", THEME_BG[theme], className),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center gap-2 sm:gap-3",
                        children: [
                            canOpenMenu ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Open sidebar menu",
                                onClick: handleOpenMenu,
                                className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 transition hover:bg-white/15 lg:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/module-header.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "truncate text-xl font-semibold leading-tight sm:text-2xl",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                        lineNumber: 280,
                                        columnNumber: 13
                                    }, this),
                                    subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-sm text-white/70",
                                        children: subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                        lineNumber: 281,
                                        columnNumber: 25
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 items-center gap-2 sm:gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: notificationsRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-label": "Notifications",
                                        onClick: ()=>setIsNotificationsOpen((current)=>!current),
                                        className: "relative rounded-md bg-white/10 p-2 transition hover:bg-white/15",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NotificationBadge, {
                                                show: showBadges,
                                                value: typeof notificationBadge === "number" ? notificationBadge : unreadCount || notificationBadge
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    isNotificationsOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fixed left-2 right-2 top-16 z-50 rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px] sm:max-w-[92vw]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-2 flex items-center justify-between px-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold",
                                                                children: "Notifications"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-slate-500",
                                                                children: [
                                                                    unreadCount,
                                                                    " unread updates"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 19
                                                    }, this),
                                                    notificationsPath ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setIsNotificationsOpen(false);
                                                            router.push(notificationsPath);
                                                        },
                                                        className: "rounded-md bg-[#0d3b66] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white transition hover:bg-[#0a2e50]",
                                                        children: "View All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 21
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                lineNumber: 302,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-h-80 space-y-2 overflow-y-auto pr-1",
                                                children: previewNotifications.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    setIsNotificationsOpen(false);
                                                                    if (item.ctaHref) {
                                                                        router.push(item.ctaHref);
                                                                        return;
                                                                    }
                                                                    if (notificationsPath) {
                                                                        router.push(notificationsPath);
                                                                    }
                                                                },
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full rounded-xl border px-3 py-2.5 pr-9 text-left transition-colors", item.unread ? "border-slate-200 bg-slate-50 hover:bg-slate-100" : "border-slate-100 hover:bg-slate-50"),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mb-1 flex items-start justify-between gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    NOTIFICATION_KIND_ICON[item.kind],
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-xs font-semibold text-slate-900",
                                                                                        children: item.title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                                                        lineNumber: 344,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                                                lineNumber: 342,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            item.unread ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "mt-1 h-2 w-2 rounded-full bg-sky-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                                                lineNumber: 346,
                                                                                columnNumber: 42
                                                                            }, this) : null
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "line-clamp-2 text-xs text-slate-600",
                                                                        children: item.message
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                                        lineNumber: 348,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "mt-1 text-[11px] text-slate-500",
                                                                        children: item.time
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                                        lineNumber: 349,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                                lineNumber: 324,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: (event)=>{
                                                                    event.stopPropagation();
                                                                    handleRemoveNotification(item.id);
                                                                },
                                                                className: "absolute right-2 top-2 z-10 inline-flex h-5 w-5 items-center justify-center rounded text-slate-400 transition hover:bg-slate-200 hover:text-slate-700",
                                                                "aria-label": "Remove notification",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/ui/module-header.tsx",
                                                                    lineNumber: 361,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/module-header.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/module-header.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            resolvedRightContent,
                            profilePath ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>router.push(profilePath),
                                className: "flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 transition hover:bg-white/20 sm:px-3",
                                "aria-label": "Go to profile page",
                                children: profileContent
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-2 py-1 sm:px-3",
                                children: profileContent
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/module-header.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            menuMode === "sidebar-overlay" && isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 lg:hidden",
                role: "dialog",
                "aria-modal": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Close navigation menu",
                        onClick: ()=>setIsMenuOpen(false),
                        className: "absolute inset-0 bg-slate-950/55"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-full w-72 max-w-[85vw]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                                role: sidebarRole,
                                className: "h-full w-full md:w-full",
                                hideCollapse: sidebarHideCollapse
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setIsMenuOpen(false),
                                className: "absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white hover:bg-white/25",
                                "aria-label": "Close menu",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/module-header.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/module-header.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/module-header.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/module-header.tsx",
                lineNumber: 388,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
_s(ModuleHeader, "Wr75LZrmu5YpqL3bEBtUFt4mXFY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$feature$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFeatureLayout"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c1 = ModuleHeader;
var _c, _c1;
__turbopack_context__.k.register(_c, "NotificationBadge");
__turbopack_context__.k.register(_c1, "ModuleHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$confirmation$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/confirmation-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$module$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/module-header.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/login/login-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginForm",
    ()=>LoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/auth/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/api-error.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/auth.store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/ui/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const roleOptions = [
    {
        value: "PUBLIC_CUSTOMER",
        label: "Public Customer"
    },
    {
        value: "BANK_CUSTOMER",
        label: "Bank Customer"
    },
    {
        value: "BANK_OFFICER",
        label: "Bank Officer"
    },
    {
        value: "ADMIN",
        label: "Admin"
    }
];
function toRoleLabel(role) {
    const option = roleOptions.find((item)=>item.value === role);
    return option?.label ?? role;
}
function normalizeRole(role) {
    const candidate = role.toUpperCase();
    if (candidate === "PUBLIC_CUSTOMER" || candidate === "BANK_CUSTOMER" || candidate === "BANK_OFFICER" || candidate === "ADMIN") {
        return candidate;
    }
    return null;
}
function createDemoPayload(email, role) {
    const fullName = email.includes("@") ? email.split("@")[0] : "PrimeCore User";
    return {
        accessToken: `demo-token-${Date.now()}`,
        tokenType: "Bearer",
        user: {
            id: "demo-user",
            email,
            fullName,
            role
        }
    };
}
function LoginForm() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "LoginForm.useAuthStore[login]": (state)=>state.login
    }["LoginForm.useAuthStore[login]"]);
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "LoginForm.useAuthStore[token]": (state)=>state.token
    }["LoginForm.useAuthStore[token]"]);
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "LoginForm.useAuthStore[role]": (state)=>state.role
    }["LoginForm.useAuthStore[role]"]);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("demo@primecore.app");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("password123");
    const [selectedRole, setSelectedRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("PUBLIC_CUSTOMER");
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [forceLogin, setForceLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginForm.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const params = new URLSearchParams(window.location.search);
            setForceLogin(params.get("force") === "true");
        }
    }["LoginForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginForm.useEffect": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.hasHydrated()) {
                setIsHydrated(true);
                return;
            }
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.onFinishHydration({
                "LoginForm.useEffect.unsubscribe": ()=>{
                    setIsHydrated(true);
                }
            }["LoginForm.useEffect.unsubscribe"]);
            void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.rehydrate();
            return ({
                "LoginForm.useEffect": ()=>{
                    unsubscribe();
                }
            })["LoginForm.useEffect"];
        }
    }["LoginForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LoginForm.useEffect": ()=>{
            if (forceLogin) {
                return;
            }
            if (!isHydrated || !token || !role) {
                return;
            }
            router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleRedirectPath"])(role));
        }
    }["LoginForm.useEffect"], [
        forceLogin,
        isHydrated,
        token,
        role,
        router
    ]);
    async function onSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login({
                email,
                password
            });
            const normalizedRole = normalizeRole(response.user.role);
            if (!normalizedRole) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
                    message: "Unsupported role returned by server.",
                    code: "UNKNOWN_ERROR"
                });
            }
            const normalizedResponse = {
                ...response,
                user: {
                    ...response.user,
                    role: normalizedRole
                }
            };
            const redirectPath = login(normalizedResponse);
            showToast({
                type: "success",
                title: "Login successful",
                description: `Redirecting to ${toRoleLabel(normalizedRole)} dashboard.`
            });
            router.replace(redirectPath);
        } catch (unknownError) {
            const apiError = unknownError instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? unknownError : null;
            if (apiError && [
                "NETWORK_ERROR",
                "NOT_FOUND",
                "TIMEOUT"
            ].includes(apiError.code)) {
                const demoPayload = createDemoPayload(email, selectedRole);
                const redirectPath = login(demoPayload);
                showToast({
                    type: "info",
                    title: "API unavailable",
                    description: `Started demo session as ${toRoleLabel(selectedRole)}.`
                });
                router.replace(redirectPath);
                return;
            }
            const message = apiError?.message ?? "Unable to login. Please try again.";
            setError(message);
            showToast({
                type: "error",
                title: "Login failed",
                description: message
            });
        } finally{
            setIsSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full space-y-6 text-(--primecore-foreground)",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-2 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-(--primecore-foreground)",
                        children: "Welcome back"
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-(--primecore-foreground)/70",
                        children: "Sign in to continue to your dashboard and account tools."
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/login/login-form.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        label: "Email Address",
                        type: "email",
                        autoComplete: "email",
                        value: email,
                        onChange: (event)=>setEmail(event.target.value),
                        placeholder: "name@example.com",
                        labelClassName: "text-(--primecore-foreground)/70",
                        className: "h-14 rounded-2xl border-(--primecore-border) bg-(--primecore-surface) text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 ring-offset-background"
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "login-password",
                                className: "text-sm font-medium text-(--primecore-foreground)/70",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/app/login/login-form.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "login-password",
                                        type: showPassword ? "text" : "password",
                                        autoComplete: "current-password",
                                        value: password,
                                        onChange: (event)=>setPassword(event.target.value),
                                        placeholder: "Enter your password",
                                        className: "h-14 w-full rounded-2xl border border-(--primecore-border) bg-(--primecore-surface) px-3.5 py-2.5 pr-12 text-sm text-(--primecore-foreground) placeholder:text-(--primecore-foreground)/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/login-form.tsx",
                                        lineNumber: 192,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-label": showPassword ? "Hide password" : "Show password",
                                        onClick: ()=>setShowPassword((prev)=>!prev),
                                        className: "absolute right-3 top-1/2 -translate-y-1/2 text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                        children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/app/login/login-form.tsx",
                                            lineNumber: 207,
                                            columnNumber: 31
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/app/login/login-form.tsx",
                                            lineNumber: 207,
                                            columnNumber: 54
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/login-form.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/login/login-form.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-end text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/forgot-password",
                            className: "font-medium text-[#0d3b66] underline-offset-4 hover:underline dark:text-[#7cc8ff]",
                            children: "Forgot password?"
                        }, void 0, false, {
                            fileName: "[project]/app/login/login-form.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "login-role",
                                className: "text-sm font-medium text-(--primecore-foreground)/70",
                                children: "Role (demo fallback)"
                            }, void 0, false, {
                                fileName: "[project]/app/login/login-form.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "login-role",
                                value: selectedRole,
                                onChange: (event)=>setSelectedRole(event.target.value),
                                className: "h-14 w-full rounded-2xl border border-(--primecore-border) bg-(--primecore-surface) px-4 text-sm text-(--primecore-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background",
                                children: roleOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: option.value,
                                        children: option.label
                                    }, option.value, false, {
                                        fileName: "[project]/app/login/login-form.tsx",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/login/login-form.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-500 dark:text-red-400",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 234,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        className: "mt-3 h-12 w-full rounded-xl bg-primary text-base font-semibold text-white hover:bg-primary/90",
                        loading: isSubmitting,
                        children: isSubmitting ? "Signing in..." : "Sign in"
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 pt-1 text-center text-sm text-(--primecore-foreground)/70",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Need to complete 2FA?",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/verify-otp",
                                        className: "font-medium text-(--primecore-foreground) underline-offset-4 hover:underline",
                                        children: "Verify OTP"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/login-form.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/login/login-form.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "Don't have an account?",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/register",
                                        className: "font-medium text-(--primecore-foreground) underline-offset-4 hover:underline",
                                        children: "Create one"
                                    }, void 0, false, {
                                        fileName: "[project]/app/login/login-form.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/login/login-form.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300",
                        children: "Demo mode: if backend is unavailable, login continues using the selected role."
                    }, void 0, false, {
                        fileName: "[project]/app/login/login-form.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/login/login-form.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/login/login-form.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s(LoginForm, "x4niny7EGb1Gmmwnd8Icn4Ih/20=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = LoginForm;
var _c;
__turbopack_context__.k.register(_c, "LoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/mode-toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModeToggle",
    ()=>ModeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ModeToggle({ className }) {
    _s();
    const { theme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: "ghost",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-9 w-9 px-0", className),
        onClick: ()=>setTheme(theme === "dark" ? "light" : "dark"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            }, void 0, false, {
                fileName: "[project]/src/components/mode-toggle.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            }, void 0, false, {
                fileName: "[project]/src/components/mode-toggle.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Toggle theme"
            }, void 0, false, {
                fileName: "[project]/src/components/mode-toggle.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/mode-toggle.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(ModeToggle, "5ABGV54qnXKp6rHn7MS/8MjwRhQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ModeToggle;
var _c;
__turbopack_context__.k.register(_c, "ModeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7d6ebe33._.js.map