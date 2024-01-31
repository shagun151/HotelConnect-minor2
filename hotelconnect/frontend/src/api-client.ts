import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (formData:RegisterFormData) => {
    console.log("API_BASE_URL:", API_BASE_URL);
    const response = await fetch (`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials:"include",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok){
        throw new Error(responseBody.message);
    }
   
};

export const signIn = async (formData: SignInFormData) => {
     
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const body = await response.json();
   
    if(!response.ok){
        throw new Error(body.message)
    }
    return body;
};
export const validateToken = async ()=>{
    const response= await fetch (`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });

    console.log('Response Status:', response.status);
    
    if (!response.ok){
        throw new Error("Token invalid");
    }
    return response.json();
};

export const signOut = async ()=>{
    const  response = await fetch (`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST"
    });

    if(!response.ok){
        throw new Error("Error during sign out");
    }
   
    
    try {
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
            // Parse the response only if it is in JSON format
            const userData = await response.json();
            return userData;
        } else {
            return { message: "Sign-out successful." };
        }
    } catch (error) {
        // Handle parsing errors
        console.error("Error parsing response:", error);
        throw new Error("Unexpected response format during sign-out");
    }
   
};



