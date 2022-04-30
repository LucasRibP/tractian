import BusinessName from "./business-name";
import Unit from "./unit";

interface Business extends BusinessName{
  units: Unit[];
}

export default Business;