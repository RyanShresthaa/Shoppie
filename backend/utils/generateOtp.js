const generateOtp = () => {
    return Math.floor(Math.random() * 900000) +100000  ///yesle chai tero 1lakh bata 9lakh samma bhitra ko number ma opt generate garcha +100000 bhaneko starting point
}


export default generateOtp