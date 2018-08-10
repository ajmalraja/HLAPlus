import { IuserToken } from './iuser-token';

export class UserToken implements IuserToken {

    public Access_token: string;
    public UserName: string;
    public Error: string;
    public Errordesc: string;
    public Expires: Date;
    public Refresh_token:string;
}
