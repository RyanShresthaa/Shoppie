export const DisplayPriceInRupees = (price)=>{
    return new Intl.NumberFormat('en-NP',{
        style : 'currency',
        currency : 'NRP'
    }).format(price)
}