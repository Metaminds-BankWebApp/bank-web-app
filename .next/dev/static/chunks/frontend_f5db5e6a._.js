(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/store/auth.storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOGOUT_INTENT_KEY",
    ()=>LOGOUT_INTENT_KEY,
    "getRoleRedirectPath",
    ()=>getRoleRedirectPath,
    "useAuthStore",
    ()=>useAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.storage.ts [app-client] (ecmascript)");
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
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
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
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authPersistence"].storage),
    partialize: (state)=>({
            token: state.token,
            role: state.role
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/store/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/layout/feature-sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureSidebar",
    ()=>FeatureSidebar,
    "featureMeta",
    ()=>featureMeta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left-from-line.js [app-client] (ecmascript) <export default as ArrowLeftFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-right-from-line.js [app-client] (ecmascript) <export default as ArrowRightFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-right-left.js [app-client] (ecmascript) <export default as ArrowRightLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/banknote.js [app-client] (ecmascript) <export default as Banknote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/file-clock.js [app-client] (ecmascript) <export default as FileClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/receipt.js [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
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
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Add Expense",
                        href: `${base}/add`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"]
                    },
                    {
                        title: "Expenses History",
                        href: `${base}/history`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                    },
                    {
                        title: "Category Analysis",
                        href: `${base}/category`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
                    },
                    {
                        title: "Budget Management",
                        href: `${base}/budget`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    },
                    {
                        title: "Reports",
                        href: `${base}/report`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
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
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Trend Analysis",
                        href: `${base}/trends`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                    },
                    {
                        title: "Credit Insight",
                        href: `${base}/insight`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"]
                    },
                    {
                        title: "Reports",
                        href: `${base}/report`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
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
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Personal Loan",
                        href: `${base}/personal`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"]
                    },
                    {
                        title: "Vehicle Loan",
                        href: `${base}/vehicle`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"]
                    },
                    {
                        title: "Educational Loan",
                        href: `${base}/education`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"]
                    },
                    {
                        title: "Housing Loan",
                        href: `${base}/housing`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Loan Eligibility History",
                        href: `${base}/history`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
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
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                    },
                    {
                        title: "Transfer",
                        href: `${base}/transfer`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightLeft$3e$__["ArrowRightLeft"]
                    },
                    {
                        title: "Add Beneficiary",
                        href: `${base}/beneficiary`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
                    },
                    {
                        title: "Transaction History",
                        href: `${base}/history`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileClock$3e$__["FileClock"]
                    },
                    {
                        title: "Profile",
                        href: `${base}/profile`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
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
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "FeatureSidebar.useAuthStore[logout]": (state)=>state.logout
    }["FeatureSidebar.useAuthStore[logout]"]);
    const [isCollapsed, setIsCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("sticky top-0 h-screen flex-col overflow-y-auto text-white transition-all duration-300 shadow-xl z-50", currentMeta.colorClass, isCollapsed ? "w-20" : "w-64", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center", isCollapsed ? "py-6 gap-6" : "px-6 py-8 md:py-10"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between", isCollapsed && "flex-col gap-6"),
                    children: [
                        isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCollapse,
                            className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                            title: "Expand Sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__["ArrowRightFromLine"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 214,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 209,
                            columnNumber: 14
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold leading-tight tracking-tight text-white mb-1",
                                    children: currentMeta.title
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-white/70 tracking-wide",
                                    children: currentMeta.subtitle
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCollapse,
                            className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                            title: "Collapse Sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__["ArrowLeftFromLine"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 231,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 226,
                            columnNumber: 14
                        }, this),
                        isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold leading-tight tracking-tight text-white",
                            children: "PC"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 237,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex-1 px-4 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: dashboardHrefByRole[role],
                            onClick: onNavigate,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors hover:bg-white/5 rounded-lg", isCollapsed && "justify-center px-2"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 257,
                                    columnNumber: 14
                                }, this),
                                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "All Apps"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 258,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 249,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    sections.map((section, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                section.label && !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 mb-2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-bold uppercase tracking-wider text-white/40",
                                        children: section.label
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                        lineNumber: 267,
                                        columnNumber: 20
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 266,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: section.items.map((item, itemIdx)=>{
                                        const isDashboard = item.href === currentMeta.hrefByRole[role];
                                        const isActive = isDashboard ? pathname === item.href : pathname.startsWith(item.href);
                                        const Icon = item.icon;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            onClick: onNavigate,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200", isActive ? "bg-white/10 text-white shadow-sm backdrop-blur-sm" : "text-white/70 hover:bg-white/5 hover:text-white", isCollapsed && "justify-center px-2"),
                                            title: isCollapsed ? item.title : undefined,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 18,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(isActive ? "text-white" : "text-white/70")
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 25
                                                }, this),
                                                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 42
                                                }, this)
                                            ]
                                        }, itemIdx, true, {
                                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                            lineNumber: 280,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, idx, true, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 264,
                            columnNumber: 12
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 pt-4 border-t border-white/10 mt-4",
                        children: [
                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 mb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] font-bold uppercase tracking-wider text-white/40",
                                    children: "Other"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                    lineNumber: 306,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 305,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `${currentMeta.hrefByRole[role]}/help`,
                                        onClick: onNavigate,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200", pathname.startsWith(`${currentMeta.hrefByRole[role]}/help`) ? "bg-white/10 text-white shadow-sm backdrop-blur-sm" : "text-white/70 hover:bg-white/5 hover:text-white", isCollapsed && "justify-center px-2"),
                                        title: isCollapsed ? "Help & Support" : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                size: 18,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(pathname.startsWith(`${currentMeta.hrefByRole[role]}/help`) ? "text-white" : "text-white/70")
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 322,
                                                columnNumber: 19
                                            }, this),
                                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Help & Support"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 323,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                        lineNumber: 310,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `${currentMeta.hrefByRole[role]}/settings`,
                                        onClick: onNavigate,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200", pathname.startsWith(`${currentMeta.hrefByRole[role]}/settings`) ? "bg-white/10 text-white shadow-sm backdrop-blur-sm" : "text-white/70 hover:bg-white/5 hover:text-white", isCollapsed && "justify-center px-2"),
                                        title: isCollapsed ? "Settings" : undefined,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 18,
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(pathname.startsWith(`${currentMeta.hrefByRole[role]}/settings`) ? "text-white" : "text-white/70")
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this),
                                            !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Settings"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                                lineNumber: 338,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                        lineNumber: 325,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                                lineNumber: 309,
                                columnNumber: 12
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mt-auto px-6 pb-4 pt-4", isCollapsed && "px-2"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>{
                        onNavigate?.();
                        logout();
                        window.location.replace("/");
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex w-full items-center gap-3 text-left text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg", isCollapsed && "justify-center px-2"),
                    title: isCollapsed ? "Log Out" : undefined,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Log Out"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                            lineNumber: 361,
                            columnNumber: 28
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                    lineNumber: 347,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/layout/feature-sidebar.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_s(FeatureSidebar, "T24HoNzijLGQiS+RSDCkeAWBVWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = FeatureSidebar;
var _c;
__turbopack_context__.k.register(_c, "FeatureSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/config/site.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
                    title: "User Management",
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
"[project]/frontend/src/components/layout/navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
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
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-0 z-50 w-full", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-3 text-base font-semibold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                    lineNumber: 21,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden items-center gap-6 md:flex",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.links.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "text-sm font-medium text-white/85 transition-colors hover:text-white",
                                children: item.title
                            }, item.title, false, {
                                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden items-center gap-2 md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.href,
                                className: "inline-flex h-8 items-center justify-center rounded-lg border border-white/35 bg-white px-3 text-xs font-semibold text-(--primecore-foreground) transition-colors hover:bg-white/90",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.title
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.href,
                                className: "inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-white transition-colors hover:bg-primary/90",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.title
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "inline-flex items-center justify-center rounded-md p-2 text-white md:hidden",
                        "aria-label": "Toggle navigation",
                        onClick: ()=>setIsOpen((prev)=>!prev),
                        children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                            lineNumber: 59,
                            columnNumber: 39
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/15 bg-[#0a3b60]/95 backdrop-blur md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6",
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.links.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "rounded-md px-2 py-2 text-sm font-medium text-white/90 hover:bg-white/10",
                                onClick: ()=>setIsOpen(false),
                                children: item.title
                            }, item.title, false, {
                                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.href,
                                    className: "inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-white px-3 text-sm font-medium text-(--primecore-foreground) transition-colors hover:bg-white/90",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.login.title
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.href,
                                    className: "inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-white transition-colors hover:bg-primary/90",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].navbar.auth.signup.title
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                    lineNumber: 65,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/navbar.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/layout/navbar.tsx",
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
"[project]/frontend/config/env.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_API_BASE_URL = "http://localhost:8080/api";
const env = {
    apiBaseUrl: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/types/api-error.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/frontend/src/api/endpoints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    history: "/creditlens/public/history",
    byId: (selfEvaluationId)=>`/creditlens/public/evaluations/${selfEvaluationId}`
};
const BANK_CREDITLENS_ENDPOINTS = {
    current: "/creditlens/bank/current",
    dashboard: "/creditlens/bank/dashboard",
    trends: "/creditlens/bank/trends",
    insights: "/creditlens/bank/insights",
    report: "/creditlens/bank/report",
    history: "/creditlens/bank/history",
    byId: (bankEvaluationId)=>`/creditlens/bank/evaluations/${bankEvaluationId}`
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
    dashboardSummary: "/admin/dashboard/summary"
};
const TRANSACT_ENDPOINTS = {
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
"[project]/frontend/src/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient,
    "default",
    ()=>__TURBOPACK__default__export__,
    "toApiError",
    ()=>toApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/env.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/types/api-error.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/api/endpoints.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
;
;
;
;
;
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["env"].apiBaseUrl,
    timeout: 15000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});
apiClient.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
const PUBLIC_AUTH_ENDPOINTS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].login,
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].register,
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].forgotPassword,
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].verifyOtp,
    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].resetPassword
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
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].getState().clearSession();
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
            return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
                message: "Request timed out.",
                code: "TIMEOUT"
            });
        }
        if (!axiosError.response) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
                message: "Network error. Please check your connection.",
                code: "NETWORK_ERROR"
            });
        }
        const status = axiosError.response.status;
        const responseData = axiosError.response.data;
        const message = typeof responseData?.message === "string" && responseData.message || axiosError.message || "Unexpected API error.";
        return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
            message,
            code: resolveApiErrorCode(status),
            status,
            details: responseData
        });
    }
    if (error instanceof Error) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
            message: error.message,
            code: "UNKNOWN_ERROR"
        });
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$types$2f$api$2d$error$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]({
        message: "Unknown error occurred.",
        code: "UNKNOWN_ERROR"
    });
}
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/api/auth/auth.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/api/endpoints.ts [app-client] (ecmascript)");
;
;
async function login(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].login, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function me() {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].me);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function register(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].register, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function logout() {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].logout);
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function forgotPassword(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].forgotPassword, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function verifyOtp(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].verifyOtp, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
    }
}
async function resetPassword(payload) {
    try {
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$endpoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_ENDPOINTS"].resetPassword, payload);
        return data;
    } catch (error) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toApiError"])(error);
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
"[project]/frontend/src/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-left-from-line.js [app-client] (ecmascript) <export default as ArrowLeftFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/arrow-right-from-line.js [app-client] (ecmascript) <export default as ArrowRightFromLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/inbox.js [app-client] (ecmascript) <export default as Inbox>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chart-line.js [app-client] (ecmascript) <export default as LineChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$auth$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/api/auth/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
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
    "layout-dashboard": __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
    wallet: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"],
    send: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"],
    "line-chart": __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LineChart$3e$__["LineChart"],
    "shield-check": __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
    users: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
    "file-text": __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
    settings: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
    history: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"],
    inbox: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$inbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Inbox$3e$__["Inbox"],
    user: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
    "help-circle": __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"],
    "log-out": __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"]
};
function Sidebar({ role, className, hideCollapse }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "Sidebar.useAuthStore[logout]": (state)=>state.logout
    }["Sidebar.useAuthStore[logout]"]);
    const [isCollapsed, setIsCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleLogout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$api$2f$auth$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
        } catch  {
        // Local logout should still happen even if backend call fails.
        } finally{
            logout();
            window.location.replace("/");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    const roleConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSidebarRoleConfig"])(role);
    const activeHref = roleConfig.items.filter((item)=>item.icon !== "log-out").map((item)=>item.href).filter((href)=>pathname === href || pathname.startsWith(`${href}/`)).sort((a, b)=>b.length - a.length)[0];
    const generalItems = roleConfig.items.filter((item)=>item.section === "general");
    const otherItems = roleConfig.items.filter((item)=>item.section === "other");
    const accountItems = roleConfig.items.filter((item)=>item.section === "account");
    const renderItem = (item)=>{
        const Icon = iconMap[item.icon];
        const isLogout = item.icon === "log-out";
        const isActive = !isLogout && item.href === activeHref;
        if (isLogout) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleLogout,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full items-center gap-3 rounded-lg px-6 py-3 text-left text-sm font-semibold text-white/90 transition-colors hover:bg-white/12", isCollapsed && "justify-center px-2"),
                title: isCollapsed ? item.title : undefined,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 18,
                        className: "text-white/75"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: item.title
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                        lineNumber: 111,
                        columnNumber: 28
                    }, this)
                ]
            }, item.title, true, {
                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: item.href,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex items-center gap-3 rounded-lg px-6 py-3 text-sm font-semibold transition-colors", isActive ? "bg-white/25 text-white before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:rounded-r before:bg-white" : "text-white/85 hover:bg-white/12", isCollapsed && "justify-center px-2"),
            title: isCollapsed ? item.title : undefined,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 18,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(isActive ? "text-white" : "text-white/75")
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: item.title
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                    lineNumber: 130,
                    columnNumber: 26
                }, this)
            ]
        }, item.title, true, {
            fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("sticky top-0 flex h-screen flex-col overflow-y-auto text-white transition-all duration-300", "bg-[linear-gradient(180deg,#0b1a3a_0%,#0a234c_58%,#08142d_100%)]", isCollapsed ? "w-20" : "w-64", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center", isCollapsed ? "py-6 gap-6" : "px-6 py-8 md:py-10"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center justify-between", isCollapsed && "flex-col gap-6"),
                    children: [
                        isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleCollapse,
                            className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                            title: "Expand Sidebar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightFromLine$3e$__["ArrowRightFromLine"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                                lineNumber: 152,
                                columnNumber: 16
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                            lineNumber: 147,
                            columnNumber: 14
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold leading-tight tracking-tight text-white",
                                    children: "PrimeCore"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base font-normal text-white/70",
                                    children: roleConfig.appName
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                            lineNumber: 155,
                            columnNumber: 13
                        }, this),
                        !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: !hideCollapse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCollapse,
                                className: "p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors",
                                title: "Collapse Sidebar",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$from$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftFromLine$3e$__["ArrowLeftFromLine"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                                    lineNumber: 170,
                                    columnNumber: 20
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                                lineNumber: 165,
                                columnNumber: 18
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-bold leading-tight tracking-tight text-white",
                            children: "PC"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                            lineNumber: 177,
                            columnNumber: 14
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-2 px-6", isCollapsed && "hidden"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs font-semibold uppercase tracking-wider text-white/50",
                    children: "General"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mb-8 space-y-1 px-3",
                children: generalItems.map((item)=>renderItem(item))
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            otherItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-2 px-6", isCollapsed && "hidden"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-semibold uppercase tracking-wider text-white/50",
                            children: "Other"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "space-y-1 px-3",
                        children: otherItems.map((item)=>renderItem(item))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this),
            accountItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto px-3 pb-8 pt-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "space-y-1",
                    children: accountItems.map((item)=>renderItem(item))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
                lineNumber: 199,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/layout/sidebar.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "T24HoNzijLGQiS+RSDCkeAWBVWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/layout/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/config/site.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
function Footer({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6 mb-4 w-full border border-(--primecore-border) bg-(--primecore-surface-soft)", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-10 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-8 lg:grid-cols-[1.15fr_2fr_0.85fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "inline-flex items-center gap-3 text-lg font-semibold text-(--primecore-foreground)",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                size: 18,
                                                className: "text-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                lineNumber: 18,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 17,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 20,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "max-w-xs text-sm text-(--primecore-foreground)/70",
                                    children: "Banking for the future."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].footer.groups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-(--primecore-foreground)",
                                                children: "Solutions"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-3 space-y-2",
                                                children: group.links.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: item.href,
                                                            className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                            children: item.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                            lineNumber: 32,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, item.title, false, {
                                                        fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                        lineNumber: 31,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                lineNumber: 29,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, group.title, true, {
                                        fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                        lineNumber: 27,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-sm font-semibold text-(--primecore-foreground)",
                                            children: "Solutions"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 42,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-3 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                        children: "Personal banking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                        lineNumber: 45,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                        children: "Business banking"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                        lineNumber: 50,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                    lineNumber: 49,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        className: "text-sm text-(--primecore-foreground)/70 hover:text-(--primecore-foreground)",
                                                        children: "Investments"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-semibold text-(--primecore-foreground)",
                                    children: "Follow us on"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex items-center gap-3 text-sm font-semibold text-(--primecore-foreground)/70",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "f"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "i"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "x"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--primecore-border) bg-(--primecore-surface)",
                                            children: "in"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/layout/footer.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/footer.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-(--primecore-border)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-4 text-center text-xs text-(--primecore-foreground)/65 sm:px-6 lg:px-8",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$config$2f$site$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].footer.copyright
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/layout/footer.tsx",
                    lineNumber: 83,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/layout/footer.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/layout/footer.tsx",
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
"[project]/frontend/src/components/layout/page-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageShell",
    ()=>PageShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function PageShell({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/layout/page-shell.tsx",
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
"[project]/frontend/src/components/layout/section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Section",
    ()=>Section
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Section({ id, children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("py-14 sm:py-16", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/layout/section.tsx",
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
"[project]/frontend/src/components/layout/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/feature-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$page$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/page-shell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$feature$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/feature-layout.tsx [app-client] (ecmascript)");
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
"[project]/frontend/src/components/auth/auth-guard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthGuard",
    ()=>AuthGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AuthGuard({ requiredRole, children, fallback }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGuard.useAuthStore[token]": (state)=>state.token
    }["AuthGuard.useAuthStore[token]"]);
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "AuthGuard.useAuthStore[role]": (state)=>state.role
    }["AuthGuard.useAuthStore[role]"]);
    const isHydrated = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.hasHydrated();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            if (isHydrated) {
                return;
            }
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.onFinishHydration({
                "AuthGuard.useEffect.unsubscribe": ()=>{
                // Hydration complete, component will re-render via store subscription
                }
            }["AuthGuard.useEffect.unsubscribe"]);
            void __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"].persist.rehydrate();
            return ({
                "AuthGuard.useEffect": ()=>{
                    unsubscribe();
                }
            })["AuthGuard.useEffect"];
        }
    }["AuthGuard.useEffect"], [
        isHydrated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthGuard.useEffect": ()=>{
            if (!isHydrated) {
                return;
            }
            if (!token || !role) {
                const hasLogoutIntent = ("TURBOPACK compile-time value", "object") !== "undefined" && window.sessionStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOGOUT_INTENT_KEY"]) === "1";
                if (hasLogoutIntent) {
                    router.replace("/");
                    return;
                }
                router.replace("/login");
                return;
            }
            if (role !== requiredRole) {
                router.replace((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRoleRedirectPath"])(role));
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
        return fallback ?? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-40 animate-pulse rounded-xl border border-(--primecore-border) bg-(--primecore-surface-soft)"
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/auth/auth-guard.tsx",
            lineNumber: 60,
            columnNumber: 24
        }, this);
    }
    if (!token || !role || role !== requiredRole) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthGuard, "VpPBEzwxfSS7lQuT/5ZwoOOVjHU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = AuthGuard;
var _c;
__turbopack_context__.k.register(_c, "AuthGuard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/auth/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$auth$2f$auth$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/auth/auth-guard.tsx [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/Credit lens background image opacity.126b32c8.png");}),
"[project]/frontend/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png.mjs { IMAGE => \"[project]/frontend/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/frontend/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
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
"[project]/frontend/src/components/layout/feature-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FeatureLayout",
    ()=>FeatureLayout,
    "useFeatureLayout",
    ()=>useFeatureLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/feature-sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/components/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$auth$2f$auth$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/auth/auth-guard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$frontend$2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/frontend/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png.mjs { IMAGE => "[project]/frontend/app/(roles)/public-customer/creditlens/image/Credit lens background image opacity.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const FeatureLayoutContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useFeatureLayout() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(FeatureLayoutContext);
}
_s(useFeatureLayout, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function FeatureLayout({ children, role, feature }) {
    _s1();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isCreditLens = feature === "creditlens";
    const isTransact = feature === "transact";
    const isLoanSense = feature === "loansense";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
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
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$auth$2f$auth$2d$guard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthGuard"], {
        requiredRole: role,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureLayoutContext.Provider, {
            value: contextValue,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-screen overflow-hidden", __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureMeta"][feature]?.colorClass),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeatureSidebar"], {
                        role: role,
                        feature: feature,
                        className: "hidden lg:flex"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-[70] lg:hidden", isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Close sidebar",
                                onClick: ()=>setIsMobileSidebarOpen(false),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 bg-slate-950/50 transition-opacity", isMobileSidebarOpen ? "opacity-100" : "opacity-0")
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-y-0 left-0 max-w-[85vw] transition-transform duration-300 ease-out", isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$feature$2d$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FeatureSidebar"], {
                                        role: role,
                                        feature: feature,
                                        onNavigate: ()=>setIsMobileSidebarOpen(false),
                                        className: "flex !h-full !w-[280px] !max-w-[85vw] !static"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        "aria-label": "Close menu",
                                        onClick: ()=>setIsMobileSidebarOpen(false),
                                        className: "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                                            lineNumber: 98,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto rounded-none p-3 sm:p-4 lg:p-0", isCreditLens ? "bg-[#e9eff7] lg:rounded-l-[32px]" : isTransact ? "transact-surface-shade bg-[#f8fcff] lg:rounded-l-[28px]" : isLoanSense ? "loansense-surface-shade bg-[#f7f9ff] lg:rounded-l-[28px]" : "bg-(--primecore-surface) lg:rounded-l-[28px]"),
                        style: isCreditLens ? {
                            backgroundImage: `url("${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$frontend$2f$app$2f28$roles$292f$public$2d$customer$2f$creditlens$2f$image$2f$Credit__lens__background__image__opacity$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                            backgroundRepeat: "no-repeat"
                        } : undefined,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/layout/feature-layout.tsx",
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
"[project]/frontend/app/(landing)/components/landing-page-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingPageShell",
    ()=>LandingPageShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function LandingPageShell({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mx-auto w-full max-w-[1880px] px-3 sm:px-5 lg:px-7 ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/(landing)/components/landing-page-shell.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = LandingPageShell;
var _c;
__turbopack_context__.k.register(_c, "LandingPageShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/(landing)/components/hero-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/layout/section.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f28$landing$292f$components$2f$landing$2d$page$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/app/(landing)/components/landing-page-shell.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const navItems = [
    {
        title: "Modules",
        href: "#modules"
    },
    {
        title: "Why PrimeCore",
        href: "#about"
    },
    {
        title: "How It Works",
        href: "#how-it-works"
    },
    {
        title: "Contact",
        href: "#support"
    }
];
const trustedBrands = [
    "pingdom",
    "ClickUp",
    "monday.com"
];
const floatingParticles = [
    {
        left: "10%",
        top: "22%",
        size: "h-2 w-2",
        delay: 0,
        duration: 5.8
    },
    {
        left: "26%",
        top: "68%",
        size: "h-1.5 w-1.5",
        delay: 0.6,
        duration: 6.5
    },
    {
        left: "48%",
        top: "18%",
        size: "h-2.5 w-2.5",
        delay: 1.2,
        duration: 6.2
    },
    {
        left: "64%",
        top: "58%",
        size: "h-1.5 w-1.5",
        delay: 0.3,
        duration: 5.9
    },
    {
        left: "84%",
        top: "34%",
        size: "h-2 w-2",
        delay: 0.9,
        duration: 6.8
    }
];
const financeSymbols = [
    {
        symbol: "$",
        left: "12%",
        top: "15%",
        size: "text-2xl",
        delay: 0.1,
        duration: 8.5
    },
    {
        symbol: "€",
        left: "35%",
        top: "55%",
        size: "text-xl",
        delay: 1.2,
        duration: 9.2
    },
    {
        symbol: "¥",
        left: "55%",
        top: "22%",
        size: "text-3xl",
        delay: 0.5,
        duration: 8.8
    },
    {
        symbol: "₿",
        left: "75%",
        top: "68%",
        size: "text-xl",
        delay: 2.1,
        duration: 9.6
    },
    {
        symbol: "₹",
        left: "88%",
        top: "18%",
        size: "text-2xl",
        delay: 1.5,
        duration: 8.4
    },
    {
        symbol: "£",
        left: "62%",
        top: "48%",
        size: "text-xl",
        delay: 0.8,
        duration: 9.1
    },
    {
        symbol: "%",
        left: "22%",
        top: "75%",
        size: "text-4xl",
        delay: 2.5,
        duration: 10.2
    },
    {
        symbol: "¢",
        left: "45%",
        top: "12%",
        size: "text-lg",
        delay: 1.8,
        duration: 7.9
    },
    {
        symbol: "$",
        left: "92%",
        top: "45%",
        size: "text-2xl",
        delay: 1.1,
        duration: 8.7
    },
    {
        symbol: "€",
        left: "8%",
        top: "65%",
        size: "text-3xl",
        delay: 2.3,
        duration: 9.5
    },
    {
        symbol: "£",
        left: "28%",
        top: "35%",
        size: "text-xl",
        delay: 3.0,
        duration: 8.2
    },
    {
        symbol: "¥",
        left: "5%",
        top: "28%",
        size: "text-2xl",
        delay: 0.3,
        duration: 8.9
    },
    {
        symbol: "₿",
        left: "50%",
        top: "85%",
        size: "text-xl",
        delay: 1.7,
        duration: 9.8
    },
    {
        symbol: "₹",
        left: "70%",
        top: "10%",
        size: "text-3xl",
        delay: 0.6,
        duration: 8.1
    },
    {
        symbol: "%",
        left: "82%",
        top: "82%",
        size: "text-2xl",
        delay: 1.4,
        duration: 9.3
    },
    {
        symbol: "¢",
        left: "18%",
        top: "42%",
        size: "text-xl",
        delay: 2.8,
        duration: 8.6
    }
];
function FloatingSymbol({ item, mouseX, mouseY }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const distance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(mouseX, {
        "FloatingSymbol.useTransform[distance]": (val)=>{
            if (!ref.current) return 0;
            const element = ref.current;
            // Calculate distance between mouse pointer (val) and symbol center
            const centerX = element.offsetLeft + element.offsetWidth / 2;
            return val - centerX;
        }
    }["FloatingSymbol.useTransform[distance]"]);
    const distanceY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(mouseY, {
        "FloatingSymbol.useTransform[distanceY]": (val)=>{
            if (!ref.current) return 0;
            const element = ref.current;
            const centerY = element.offsetTop + element.offsetHeight / 2;
            return val - centerY;
        }
    }["FloatingSymbol.useTransform[distanceY]"]);
    const moveX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(distance, [
        -300,
        300
    ], [
        40,
        -40
    ]);
    const moveY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(distanceY, [
        -300,
        300
    ], [
        40,
        -40
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        className: `absolute select-none pointer-events-none ${item.size} font-bold text-white/20`,
        style: {
            left: item.left,
            top: item.top,
            x: moveX,
            y: moveY
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: {
                y: [
                    0,
                    -15,
                    0
                ],
                rotate: [
                    0,
                    -5,
                    5,
                    0
                ],
                opacity: [
                    0.2,
                    0.5,
                    0.2
                ]
            },
            transition: {
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
            },
            children: item.symbol
        }, void 0, false, {
            fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
            lineNumber: 87,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(FloatingSymbol, "FXN8L/3ZauKe8iHXP/LGWoX5aa0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = FloatingSymbol;
function HeroSection() {
    _s1();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSection.useEffect": ()=>{
            const onEscape = {
                "HeroSection.useEffect.onEscape": (event)=>{
                    if (event.key === "Escape") {
                        setIsMobileMenuOpen(false);
                    }
                }
            }["HeroSection.useEffect.onEscape"];
            window.addEventListener("keydown", onEscape);
            return ({
                "HeroSection.useEffect": ()=>window.removeEventListener("keydown", onEscape)
            })["HeroSection.useEffect"];
        }
    }["HeroSection.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeroSection.useEffect": ()=>{
            document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
            return ({
                "HeroSection.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["HeroSection.useEffect"];
        }
    }["HeroSection.useEffect"], [
        isMobileMenuOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$layout$2f$section$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Section"], {
        className: "pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pb-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$app$2f28$landing$292f$components$2f$landing$2d$page$2d$shell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LandingPageShell"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                onMouseMove: handleMouseMove,
                className: "relative overflow-hidden rounded-[32px] bg-[linear-gradient(122deg,#08305a_0%,#0a3f6d_57%,#1f84c4_100%)] px-5 pb-0 pt-5 text-white sm:px-9 sm:pb-0 sm:pt-16 lg:px-14 lg:pb-0 xl:px-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute left-[8%] top-[-20%] h-72 w-72 rounded-full bg-white/10 blur-[120px]",
                                animate: {
                                    x: [
                                        0,
                                        18,
                                        0
                                    ],
                                    y: [
                                        0,
                                        10,
                                        0
                                    ],
                                    opacity: [
                                        0.55,
                                        0.85,
                                        0.55
                                    ]
                                },
                                transition: {
                                    duration: 8.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute right-[-8%] top-[26%] h-72 w-72 rounded-full bg-[#66ccff]/20 blur-[110px]",
                                animate: {
                                    x: [
                                        0,
                                        -14,
                                        0
                                    ],
                                    y: [
                                        0,
                                        -12,
                                        0
                                    ],
                                    opacity: [
                                        0.4,
                                        0.75,
                                        0.4
                                    ]
                                },
                                transition: {
                                    duration: 9,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.4
                                }
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute -left-[20%] top-[40%] h-72 w-[70%] rounded-full bg-[linear-gradient(90deg,rgba(90,196,255,0.18)_0%,rgba(90,196,255,0)_100%)] blur-3xl",
                                animate: {
                                    x: [
                                        0,
                                        32,
                                        0
                                    ],
                                    opacity: [
                                        0.25,
                                        0.55,
                                        0.25
                                    ]
                                },
                                transition: {
                                    duration: 9.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute -right-[18%] top-[12%] h-80 w-[65%] rounded-full bg-[linear-gradient(270deg,rgba(149,225,255,0.22)_0%,rgba(149,225,255,0)_100%)] blur-3xl",
                                animate: {
                                    x: [
                                        0,
                                        -28,
                                        0
                                    ],
                                    opacity: [
                                        0.22,
                                        0.5,
                                        0.22
                                    ]
                                },
                                transition: {
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.6
                                }
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            floatingParticles.map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    className: `absolute rounded-full bg-white/60 shadow-[0_0_12px_rgba(180,230,255,0.65)] ${particle.size}`,
                                    style: {
                                        left: particle.left,
                                        top: particle.top
                                    },
                                    animate: {
                                        y: [
                                            0,
                                            -12,
                                            0
                                        ],
                                        opacity: [
                                            0.2,
                                            0.9,
                                            0.2
                                        ],
                                        scale: [
                                            1,
                                            1.15,
                                            1
                                        ]
                                    },
                                    transition: {
                                        duration: particle.duration,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: particle.delay
                                    }
                                }, `${particle.left}-${particle.top}`, false, {
                                    fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this)),
                            financeSymbols.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingSymbol, {
                                    item: item,
                                    mouseX: mouseX,
                                    mouseY: mouseY
                                }, `${item.symbol}-${idx}`, false, {
                                    fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "relative z-20 flex flex-wrap items-center justify-between gap-5 sm:gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "inline-flex shrink-0 items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/Primecore%20logo%20white%202.png",
                                    alt: "PrimeCore Bank Digital",
                                    width: 560,
                                    height: 250,
                                    className: "h-11 w-auto sm:h-14 lg:h-16",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "hidden items-center gap-8 text-lg lg:flex xl:text-xl",
                                children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "text-white/90 transition-colors hover:text-white",
                                        children: item.title
                                    }, item.title, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 204,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden items-center gap-2 lg:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "inline-flex h-10 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[#123456] transition-colors hover:bg-white/90 sm:h-11 sm:px-6 sm:text-base",
                                        children: "Login"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/register",
                                        className: "inline-flex h-10 items-center justify-center rounded-xl bg-[#3ca3e4] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3198dc] sm:h-11 sm:px-6 sm:text-base",
                                        children: "Sign Up"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Open menu",
                                "aria-expanded": isMobileMenuOpen,
                                onClick: ()=>setIsMobileMenuOpen(true),
                                className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20 lg:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `fixed inset-0 z-[90] lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Close menu overlay",
                                onClick: ()=>setIsMobileMenuOpen(false),
                                className: `absolute inset-0 bg-slate-950/60 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`
                            }, void 0, false, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 241,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: `absolute inset-y-0 left-0 w-[290px] max-w-[86vw] bg-[#08305a] p-5 shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-semibold text-white",
                                                children: "Menu"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-label": "Close menu",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                className: "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 257,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        className: "mt-6 flex flex-col gap-2 text-base text-white/90",
                                        children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.href,
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                className: "rounded-lg px-3 py-2 transition-colors hover:bg-white/10 hover:text-white",
                                                children: item.title
                                            }, item.title, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 grid gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/login",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                className: "inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-[#123456] transition-colors hover:bg-white/90",
                                                children: "Login"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 281,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/register",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                className: "inline-flex h-11 items-center justify-center rounded-xl bg-[#3ca3e4] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3198dc]",
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 mt-6 grid items-end gap-8 lg:mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] xl:gap-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[50rem] space-y-6 pb-3 sm:space-y-8 lg:-mt-2 lg:pb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-6 inline-flex rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm text-white/90 sm:text-base",
                                        children: "100K+ Accounts Opened Globally."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-[clamp(2.5rem,4.2vw,5.6rem)] font-semibold leading-[1.04] tracking-[-0.02em]",
                                        children: "Understand Your Credit. Predict Your Risk. Borrow Smarter."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "max-w-2xl text-[clamp(1rem,1.15vw,1.5rem)] leading-relaxed text-white/80",
                                        children: "PrimeCore is a credit intelligence platform that evaluates financial behavior, predicts loan eligibility, and helps individuals and banks make safer lending decisions."
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex w-full max-w-md items-center gap-2 rounded-2xl bg-white p-2.5 sm:p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/login",
                                                className: "inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-white text-base font-semibold text-[#5b6470] transition-colors hover:bg-[#f2f7ff] sm:text-lg lg:h-14 lg:text-xl",
                                                children: "Get Started"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/register",
                                                className: "inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-[#3ca3e4] text-base font-semibold text-white transition-colors hover:bg-[#3198dc] sm:text-lg lg:h-14 lg:text-xl",
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-6 pt-2 text-lg font-semibold text-white/90 sm:gap-8 sm:text-xl",
                                        children: trustedBrands.map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg sm:text-xl",
                                                children: brand
                                            }, brand, false, {
                                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative min-h-[320px] self-end sm:min-h-[480px] lg:min-h-[700px] xl:min-h-[760px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 right-0 h-[90%] w-[85%] rounded-t-[70px] bg-[linear-gradient(160deg,#2d93d1_0%,#5fc1f5_100%)]/50"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/hero-image.png",
                                        alt: "PrimeCore customer checking finance details on mobile",
                                        fill: true,
                                        className: "object-contain object-bottom",
                                        sizes: "(min-width: 1536px) 40vw, (min-width: 1280px) 42vw, (min-width: 768px) 50vw, 90vw",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/app/(landing)/components/hero-section.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s1(HeroSection, "2SPJpfxZrskWRYEiUYX5lUfHOHU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
_c1 = HeroSection;
var _c, _c1;
__turbopack_context__.k.register(_c, "FloatingSymbol");
__turbopack_context__.k.register(_c1, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/(landing)/components/landing-background.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingBackground",
    ()=>LandingBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
function LandingBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 -z-50 overflow-hidden bg-(--primecore-background) pointer-events-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.4]",
                style: {
                    backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }
            }, void 0, false, {
                fileName: "[project]/frontend/app/(landing)/components/landing-background.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute -left-[10%] -top-[10%] h-[60vh] w-[60vw] rounded-full bg-blue-300/15 blur-[120px]",
                animate: {
                    x: [
                        0,
                        50,
                        0
                    ],
                    y: [
                        0,
                        30,
                        0
                    ],
                    scale: [
                        1,
                        1.1,
                        1
                    ]
                },
                transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/frontend/app/(landing)/components/landing-background.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute -right-[10%] top-[20%] h-[70vh] w-[50vw] rounded-full bg-indigo-300/10 blur-[130px]",
                animate: {
                    x: [
                        0,
                        -30,
                        0
                    ],
                    y: [
                        0,
                        60,
                        0
                    ],
                    scale: [
                        1,
                        1.2,
                        1
                    ]
                },
                transition: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }
            }, void 0, false, {
                fileName: "[project]/frontend/app/(landing)/components/landing-background.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute left-[20%] bottom-[-20%] h-[60vh] w-[60vw] rounded-full bg-sky-200/15 blur-[120px]",
                animate: {
                    x: [
                        0,
                        40,
                        0
                    ],
                    y: [
                        0,
                        -40,
                        0
                    ],
                    scale: [
                        1,
                        1.1,
                        1
                    ]
                },
                transition: {
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }
            }, void 0, false, {
                fileName: "[project]/frontend/app/(landing)/components/landing-background.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/app/(landing)/components/landing-background.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = LandingBackground;
var _c;
__turbopack_context__.k.register(_c, "LandingBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/(landing)/components/fade-in-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FadeInSection",
    ()=>FadeInSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
function FadeInSection({ children, className, delay = 0 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: className,
        initial: {
            opacity: 0,
            y: 28
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            amount: 0.18
        },
        transition: {
            duration: 0.55,
            ease: "easeOut",
            delay
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/app/(landing)/components/fade-in-section.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = FadeInSection;
var _c;
__turbopack_context__.k.register(_c, "FadeInSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/app/(landing)/components/logout-intent-reset.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LogoutIntentReset",
    ()=>LogoutIntentReset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/store/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/store/auth.store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LogoutIntentReset() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LogoutIntentReset.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.sessionStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$store$2f$auth$2e$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOGOUT_INTENT_KEY"]);
        }
    }["LogoutIntentReset.useEffect"], []);
    return null;
}
_s(LogoutIntentReset, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = LogoutIntentReset;
var _c;
__turbopack_context__.k.register(_c, "LogoutIntentReset");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_f5db5e6a._.js.map