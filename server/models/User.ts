import { model, Schema, Model, Document } from 'mongoose';

const emailValidate = {
    validator: (v: string) => {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(v);
    }
}

const identityMixin = {
    email: {
        type: String,
        validate: emailValidate,
    },
    name: String,
};

const Identity = new Schema({
    ...identityMixin,
    provider: {
        type: String,
        enum: ['google', 'github'],
    },
    auth_id: String,
});

export interface IUser extends Document {
    email: String,
    name: String,
    identities: {email: String, name: String, provider: String, auth_id: String}[],
}
interface IUserModel extends Model<IUser> {
    findByProvider: (provider: string, auth_id: string) => ReturnType<IUserModel['findOne']>
}
const userSchema = new Schema({
    ...identityMixin,
    identities: [Identity],
});

userSchema.static({
    findByProvider(this: IUserModel, provider: string, auth_id: string) {
        return this.findOne({identities: {$elemMatch: {provider, auth_id}}});
    }
});

const UserModel: IUserModel = model<IUser, IUserModel>('User', userSchema);
export default UserModel;