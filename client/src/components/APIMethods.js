import axios from "axios";

const extractEmployeeData = (res) => ({
  type: "employeeInfo",
  employeeList: res.data.list,
  departmentList: res.data.departments,
  ageRanges: res.data.ageRanges,
  ageRangeStrings: res.data.ageRanges.map(
    (range) => `${range.min} - ${range.max}`
  ),
});
/**
 * Receives the entire list of employees.
 */
const getAllEmployees = (dispatch) => {
  const source = axios.CancelToken.source();
  axios
    .get("/api/employees", { cancelToken: source.token })
    .then((res) => dispatch(extractEmployeeData(res)))
    .catch((err) => {
      console.error(`Couldn't GET /api/employees`);
    });
  // Cancel any lingering API requests on component unmount.
  return () => source.cancel();
};

/**
 * Search by employee name on back-end.
 */
const searchEmployees = (dispatch, name, ageRange, department) => {
  const source = axios.CancelToken.source();
  axios
    .get("/api/employees/search", {
      params: {
        name,
        minAge: ageRange.min,
        maxAge: ageRange.max,
        department,
      },
      cancelToken: source.token,
    })
    .then((res) => dispatch(extractEmployeeData(res)))
    .catch((err) => {
      console.error(`Couldn't GET /api/employees/search`);
    });
  // Cancel any lingering API requests on component unmount.
  return () => source.cancel();
};

export { getAllEmployees, searchEmployees };
