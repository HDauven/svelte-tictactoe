export const nextMove = async (space) => {
  try {
    const response = await fetch(`${process.env.apiUrl}/next-turn/${space}`);
    const message = await response.json();

    return message.errorMessage;
  } catch (error) {
    console.log(error);
    return "Error connecting";
  }
};

export const reset = async () => {
  try {
    await fetch(`${process.env.apiUrl}/reset`);
  } catch (error) {
    console.log(error);
    return "Error connecting";
  }
};
