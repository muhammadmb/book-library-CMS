export const GetAge = (date) => {
    var age_dt = new Date(Date.now() - date.getTime());
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}