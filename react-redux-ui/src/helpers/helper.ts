export const oneHourAgo = (dateStr: string | null | undefined) => {
    if (dateStr === null || dateStr === undefined) {
        return false;
    }

    const date = new Date(dateStr);
    const hour = 1000 * 60 * 60;
    const hourago = Date.now() - hour;

    const ret: boolean = date.valueOf() > hourago.valueOf();
    return ret;
};
