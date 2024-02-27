import nextAuth from "next-auth";

declare module "next-auth"{
    interface Session{
        user : {
            name : string ,
            department : string,
            matric : string,
            level : number,
            image : string,
            username : string,
            email : string,
            id : string,
            role : string,
            status : string,
            registerDate : string,
        }
    }
}