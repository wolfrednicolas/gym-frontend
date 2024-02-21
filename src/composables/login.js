import { ref } from "vue";

const errors = ref("");
const loginCallback = async (email, password) => {
    errors.value = "";

    const body = {
        email: email, password: password
    }
    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(body)
      };
    const response = await fetch("http://localhost:8080/api/login", requestOptions);
    const responseText = await response.text()
    const responseJson = JSON.parse(responseText);
    if(response.status !== 200 ){
        errors.value =  responseJson.error;
    }
}

const login = () =>{
    
    return {errors, loginCallback};
}

export default login