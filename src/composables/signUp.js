import { ref } from "vue";

const errors = ref("");
const singupF = async (email, password) => {
    errors.value = "";

    const body = {
        email: email, password: password, role: "USER" //el role se puede quitar cuando se modifique el endpoint
    }
    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify(body)
      };
      const response = await fetch("http://localhost:8080/api/signup", requestOptions);

      if(response.status !== 201 ){
        const responseText = await response.text()
        errors.value =  JSON.parse(responseText);
      }
}

const useSignUp = () =>{
    
    return {errors, singupF};
}

export default useSignUp