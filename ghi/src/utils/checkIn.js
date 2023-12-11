const checkIn = async (user) => {
  const today = new Date().toISOString().slice(0, 10);

  const data = {
    user_id: user.id,
    date: today,
    studied_today: true,
  };

  const url = `${process.env.REACT_APP_API_HOST}/api/dates`;
  const fetchOptions = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, fetchOptions);
  if (response.ok) {
    console.log("User Checked in!");
  } else {
    console.log("Error checking in user.");
  }
};

export default checkIn;
