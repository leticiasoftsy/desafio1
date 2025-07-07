export interface User {
    id?: string;
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    address: Address;
}

export interface Name {
    firstname: string;
    lastname: string;
}

export interface Address {
    city: string;
    geolocation: {
        lat: string;
        long: string;
    };
    number: number;
    street: string;
    zipcode: string;
}