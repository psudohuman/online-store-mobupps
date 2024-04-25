import {isValidEmail} from "../../utils";

const validEmails: string[] =
    [
        "email@example.com",
        "firstname.lastname@example.com",
        "email@subdomain.example.com",
        "email@example.com",
        "a1234567890@example.com",
        "email@example.co.jp",
    ]

const invalidEmails: string[] = [
    "plainaddress",
    "#@%^%#$@#$@#.com",
    "@example.com",
    "Joe Smith <email@example.com>",
    "email.example.com",
    "email@example@example.com",
    ".email@example.com",
    "email.@example.com",
    "email..email@example.com",
    "あいうえお@example.com",
    "email@example.com (Joe Smith)",
    "email@example",
    "email@-example.com",
    "email@111.222.333.44444",
    "email@example..com",
    "Abc..123@example.com"
];

describe("isValidEmail", () => {
    test("Truthy for all valid emails", () => {
        for(const email of validEmails){
            expect(isValidEmail(email)).toBe(true);
        }
    });

    test("Falsy for all invalid emails", () => {
        for(const email of invalidEmails){
            expect(isValidEmail(email)).toBe(false);
        }
    });
});