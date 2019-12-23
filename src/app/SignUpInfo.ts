export class SignUpInfo {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username: string;
    email: string;
    password: string;
    streetAddress: string;
    suburb: string;
    city: string;
    postalCode: string;
    province: string;
    role: string[];
    
 
    constructor(firstName: string, lastName: string,
        phoneNumber: string,
        username: string,
        email: string, password: string,
          streetAddress: string,
        suburb: string, city: string, postalCode: string,
        province: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.username = email;
        this.email = email;
        this.password = password;
        this.streetAddress = streetAddress;
        this.suburb = suburb;
        this.postalCode = postalCode;
        this.province = province;
        this.role = ['user'];
    }
}