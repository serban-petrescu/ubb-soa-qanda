export default function parse(jwt) {
    try {
        return JSON.parse(atob(jwt.split(".")[1] || ""));
    } catch (e) {
        return {};
    }
}