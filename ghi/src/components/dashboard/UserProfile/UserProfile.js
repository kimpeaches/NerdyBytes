import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function UserProfile() {
  const { token } = useAuthContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const userId = 1; // TODO: get the user id from the token
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
    getUser();
  }, [token]);

  console.log(user);

  return (
    <div className="user-profile">
      <h2>Hello {user.username}!</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Volutpat diam ut
        venenatis tellus in metus vulputate. Malesuada fames ac turpis egestas
        integer eget aliquet nibh praesent. Laoreet id donec ultrices tincidunt
        arcu non sodales neque sodales. In cursus turpis massa tincidunt. Turpis
        egestas pretium aenean pharetra magna ac. Eleifend mi in nulla posuere
        sollicitudin aliquam ultrices sagittis orci. Quis lectus nulla at
        volutpat diam. Sit amet mattis vulputate enim nulla aliquet. Tellus in
        metus vulputate eu scelerisque. Leo vel orci porta non pulvinar. Lacus
        viverra vitae congue eu consequat ac felis. Condimentum mattis
        pellentesque id nibh tortor id aliquet lectus proin. Nibh mauris cursus
        mattis molestie. Semper feugiat nibh sed pulvinar. Varius quam quisque
        id diam vel. Eget mi proin sed libero enim sed faucibus turpis. Eget
        aliquet nibh praesent tristique magna sit amet purus gravida.
      </p>
      <p>
        Id venenatis a condimentum vitae sapien. In massa tempor nec feugiat
        nisl pretium fusce id. Adipiscing tristique risus nec feugiat in
        fermentum posuere. Laoreet suspendisse interdum consectetur libero.
        Volutpat commodo sed egestas egestas. Morbi enim nunc faucibus a
        pellentesque sit amet porttitor. Fringilla ut morbi tincidunt augue. At
        in tellus integer feugiat scelerisque varius morbi enim nunc. Ac
        placerat vestibulum lectus mauris ultrices eros in. Erat imperdiet sed
        euismod nisi porta lorem mollis. Etiam non quam lacus suspendisse. Id
        diam maecenas ultricies mi eget mauris pharetra et. Suscipit adipiscing
        bibendum est ultricies integer. Volutpat consequat mauris nunc congue
        nisi vitae suscipit. Sodales neque sodales ut etiam. Nam libero justo
        laoreet sit amet cursus sit amet dictum. Sed tempus urna et pharetra
        pharetra massa. Nisi scelerisque eu ultrices vitae auctor eu augue.
        Fermentum odio eu feugiat pretium nibh.
      </p>
      <p>
        Eu consequat ac felis donec et odio. Faucibus et molestie ac feugiat
        sed. Natoque penatibus et magnis dis parturient montes nascetur
        ridiculus. Aliquam sem et tortor consequat id porta nibh venenatis cras.
        Tristique risus nec feugiat in. Ac tincidunt vitae semper quis lectus
        nulla. Tortor dignissim convallis aenean et. In tellus integer feugiat
        scelerisque. Et netus et malesuada fames ac. Amet luctus venenatis
        lectus magna fringilla urna porttitor rhoncus dolor. Fames ac turpis
        egestas sed tempus urna et. Tempus urna et pharetra pharetra massa
        massa.
      </p>
    </div>
  );
}

export default UserProfile;
