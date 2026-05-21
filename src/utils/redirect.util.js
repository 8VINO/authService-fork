const allowedRedirectUrls = [
    "http://localhost:5173/login",
    "http://localhost:5173/home",
    "http://localhost:3000/login",
    "http://localhost:3000/home"
];

export const isAllowedRedirect = (url) => {

    try {

        const parsed = new URL(url);

        const normalized =
            parsed.origin + parsed.pathname;

        return allowedRedirectUrls.includes(normalized);

    } catch {

        return false;
    }
}