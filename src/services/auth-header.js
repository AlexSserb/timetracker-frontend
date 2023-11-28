export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
    //return { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc2VyYmluMTkwQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNzAxMTk3MDU1LCJ1c2VySWQiOiI1ODE2MmExZS1iN2E0LTRhMTUtODg1Mi01YWVlMWU0YjQ4MzMiLCJpYXQiOjE3MDExOTUyNTV9.Meb2Jwnfd_w0RQx4n5gn15BhOb5RlsE0FG3QU0ZnAG8"};
	}
	
	return {};
}