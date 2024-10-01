import { useContext } from "react";
import CommunityContext from "../../contexts/CommunityContext";

const useCommunity = () => {
    return useContext(CommunityContext);
};

export default useCommunity