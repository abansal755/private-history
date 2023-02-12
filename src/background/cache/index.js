import Favourites from "./Favourites";
import History from "./History";
import Sessions from "./Sessions";

export default {
	history: new History(),
	favourites: new Favourites(),
	sessions: new Sessions(),
};
