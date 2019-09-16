import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER_QUERY } from "./graphql";

function UserID(user) {
  const { loading, error, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId: user.id }
  });

  if (data) {
    return data.getUser;
  } else {
    return null;
  }
}

export default UserID;
