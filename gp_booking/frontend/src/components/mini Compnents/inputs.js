const loginInput = {
    title: "LOGIN",
    inputs: [
        {
            label: "Email",
            id: "filled-size-large",
            type: "text",
        },
        {
            label: "Password",
            id: "standard-password-input-size-large",
            type: "password",
        },
    ]

    ,
    buttons: [
        {
            name: "Login",
            color: "primary",
            type: "submit"
        },

        {
            name: "Sign Up",
            color: "default",
            type: "button"
        }

    ],
    image: [
        {
            src: "https://thisisbeyond.co.uk/uploads/images/_1180x1554_crop_center-center_none/nhs-poster.jpg",
            alt: "NHS",
        }
    ]
    ,
    messages: [
        "Stay Home", "Protect The NHS", "Save Lives"
    ]
}

const registerInput = {
    title: "Register",
    inputs: [
        {
            label: "First name",
            id: "firtName",
            type: "text",
        },
        {
            label: "Last name",
            id: "lastName",
            type: "text",
        },
        {
            label: "",
            id: "dob",
            type: "date",
        },
        {
            label: "Email",
            id: "email",
            type: "text",
        },
        {
            label: "Password",
            id: "password",
            type: "password",
        },
        {
            label: "Confirm Password",
            id: "cPassword",
            type: "password",
        },
        {
            label: "NHS number",
            id: "nhsNumber",
            type: "text",
        },

    ]

    ,
    buttons: [

        {
            name: "Sign Up",
            color: "primary",
            type: "submit",
            id: "signUp"
        }

    ],
    image: [
        {
            src: "https://media.newyorker.com/photos/5e9a2cce0079fc0008bc3621/master/w_2560%2Cc_limit/200427_r36295web.jpg",
            alt: "NHS"
        }
    ]
    ,
    messages: [
        "Stay Home", "Protect The NHS", "Save Lives"
    ]
}
export { loginInput, registerInput }