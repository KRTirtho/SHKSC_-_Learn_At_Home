export const toFirstLetterUppercase:Function = (payload:string):string=>{
    const converter = payload[0].toUpperCase()
    const existing = payload.slice(1, payload.length)
    const joiner = converter+existing;
    return joiner;
}