export const logger = {
    info(message: any) {
        console.log(`[INFO] ${message}`)
    },
    error(error: any) {
        console.error(`[ERROR] ${error.message}`)
    },
    warn(warning: any) {
        console.warn(`[WARN] ${warning}`)
    },
}
