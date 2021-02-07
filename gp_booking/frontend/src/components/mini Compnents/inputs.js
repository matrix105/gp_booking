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
        }
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
            type: "submit"
        }

    ],
    img: "https://thisisbeyond.co.uk/uploads/images/_1180x1554_crop_center-center_none/nhs-poster.jpg",
    alt: "NHS",
    messages: [
        "Stay safe", "Stay home", "Stay strong"
    ]
}

const registerInput = {

}

export default loginInput