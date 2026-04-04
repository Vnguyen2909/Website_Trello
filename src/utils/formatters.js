export const formatcapitalizeFirstLetterter = (val) => {
    if(!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
