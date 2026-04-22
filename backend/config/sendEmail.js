import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

// Resend() throws if the key is missing; doing that at import time took down the whole API on Vercel.
let resendSingleton = null;
function getResend() {
    const key = process.env.RESEND_API;
    if (!key) return null;
    if (!resendSingleton) resendSingleton = new Resend(key);
    return resendSingleton;
}

const sendEmail = async ({ sendTo, subject, html})=>{
    const resend = getResend();
    if (!resend) {
        console.warn("RESEND_API is not set; email skipped");
        return { error: "Email service is not configured" };
    }
    try {
        const { data, error } = await resend.emails.send({
            from: 'Clone <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        if (error) {
            console.log(error);
            return { error };
        }
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

export default sendEmail;

