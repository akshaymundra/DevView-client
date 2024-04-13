import Cookies from "js-cookie"


/**
 * Sets the authentication token in a cookie with the specified expiration.
 * @param token - The authentication token to be set.
 * @param expiresIn - The expiration time for the token in days (e.g., '7d' for 7 days).
 */
export const setAuthToken = (token: string, expiresIn: string) => {
    const expiresInDays = Number(expiresIn.replace('d', ''));
    Cookies.set('accessToken', token, { expires: expiresInDays })
}

/**
 * Removes the authentication token from the cookies.
 */
export const removeAuthToken = () => {
    Cookies.remove('accessToken');
}


export const getSkillString = (skills: { label: string, value: string }[]): string => {
    let str = "";
    skills.forEach((skill, index) => {
        if (index === skills.length - 1) {
            str += skill.label;
        } else str += skill.label + ", ";
    });
    return str;
}