export const getProfilePic = (gender, username) => {
  gender = gender === "male" ? "boy" : "girl";
  const profilePic =
    process.env.PROFILE_PIC_GENERATOR + `${gender}?username=${username}`;
  return profilePic;
};
