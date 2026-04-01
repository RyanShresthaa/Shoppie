const verifyEmailTemplate = (name,url) =>{
    return `
    <p>Dear ${name}</p>
    <p>ThankYou for regestering</p>
    <a href=${url} style="color: white;background: black; margin-top : 12px">
        Verify Email
    </a>
    `
}

export default verifyEmailTemplate;