export interface UserDto {
    email: string;
    password: string;
}

export interface RegisterUserDto {
    email: string;
    password: string;
    confirmPassword: string;
}
