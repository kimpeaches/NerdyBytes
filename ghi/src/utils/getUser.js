import { jwtDecode } from "jwt-decode";

export async function getUser(token, setUser) {
  if (token) {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.account.id;

    const url = `http://localhost:8000/api/user/${userId}`;
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      method: "GET",
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      console.log("Error fetching user");
    }
  }
}
