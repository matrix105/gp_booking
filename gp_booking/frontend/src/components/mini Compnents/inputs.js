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
        "Stay safe", "Stay home", "Stay strong"
    ]
}

const registerInput = {
    title: "Register",
    inputs: [
        {
            label: "First name",
            id: "filled-size-large",
            type: "text",
        },
        {
            label: "Last name",
            id: "filled-size-large",
            type: "text",
        },
        {
            label: "Date of birth",
            id: "filled-size-large",
            type: "text",
        },
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
        {
            label: "Confirm Password",
            id: "standard-password-input-size-large",
            type: "password",
        },

    ]

    ,
    buttons: [

        {
            name: "Sign Up",
            color: "primary",
            type: "submit"
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
        "Stay safe", "Stay home", "Stay strong"
    ]
}
export { loginInput, registerInput }