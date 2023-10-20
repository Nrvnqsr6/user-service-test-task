// eslint-disable-next-line prettier/prettier
import { AllowNull, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: 'users',
})
export class User extends Model<User> {
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;
}
