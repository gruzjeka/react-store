import { ActionTypes } from "./ActionTypes";
import { data } from "./mockData";

export const loadData = (dataType) => ({
  type: ActionTypes.DATA_LOAD,
  payload: {
    dataType: dataType,
    data: data[dataType],
  },
});
