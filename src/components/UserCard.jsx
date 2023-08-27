import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { BASE_URL } from "db";
import { useEffect, useState } from "react";

const UserCard = ({ userId }) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const response = await fetch(
      `${BASE_URL}users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
    setLoading(false);
  };

  useEffect(()=>{
    getUser();
  },[userId])
  console.log(user,"comments");
  return (
    <FlexBetween>
        {
            loading ? (
                <Box>
                    <Typography>Loading...</Typography>
                </Box>
            ) : (
<FlexBetween gap="1rem" padding="10px">
        <UserImage image={user?.picturePath} size="35px" />
        <Box
          onClick={() => {
            navigate(`/profile/${user._id}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {user?.firstName + " " + user?.lastName}
          </Typography>
        </Box>
      </FlexBetween>
            )
        }
    </FlexBetween>
  );
};

export default UserCard;
