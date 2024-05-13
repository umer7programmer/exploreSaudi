import bcrypt from "bcrypt"
//hash password 
export const hashPassword=async(password)=>{
    const saltRounds=10;
    const hashed=await bcrypt.hash(password,saltRounds);
    return hashed;

}

//compare password
export const comaparePassword=async(password,hashed)=>{
    const comparePass=await bcrypt.compare(password,hashed);
    return comparePass;
}